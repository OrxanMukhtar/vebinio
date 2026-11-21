import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql, type Sql } from "@/lib/db";
import { defaultContent, readContent, siteContentSchema, type SiteContent } from "@/lib/site/content";

async function loadContent(sql: Sql): Promise<SiteContent> {
  const rows = await sql<{ body: string }>`select body from site_copy where id = 1`;
  const body = rows[0]?.body;
  if (!body) return defaultContent;
  try {
    return readContent(JSON.parse(body));
  } catch {
    return defaultContent;
  }
}

async function hasPasswordAccount(sql: Sql, userId: string): Promise<boolean> {
  const rows = await sql<{ id: string }>`
    select id from "account"
    where "userId" = ${userId}
      and "providerId" = 'credential'
      and "password" is not null
    limit 1
  `;
  return rows.length > 0;
}

async function ownerId(sql: Sql): Promise<string | null> {
  const rows = await sql<{ user_id: string }>`select user_id from site_owner where id = 1`;
  return rows[0]?.user_id ?? null;
}

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sql = await getSql();
    return await loadContent(sql);
  } catch {
    return defaultContent;
  }
});

export const getOwnerGate = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sql = await getSql();
    const owner = await ownerId(sql);
    if (!owner) return { hasOwner: false, ownerHasPassword: false };
    return { hasOwner: true, ownerHasPassword: await hasPasswordAccount(sql, owner) };
  } catch {
    return { hasOwner: false, ownerHasPassword: false };
  }
});

async function claimWithPassword(sql: Sql, userId: string) {
  if (!(await hasPasswordAccount(sql, userId))) {
    return { isOwner: false, needsPassword: true as const, message: "" };
  }
  const current = await ownerId(sql);
  if (current && current !== userId) {
    if (await hasPasswordAccount(sql, current)) {
      return { isOwner: false, needsPassword: false as const, message: "Bu panel artıq başqa hesaba bağlıdır." };
    }
    await sql`update site_owner set user_id = ${userId} where id = 1`;
    return { isOwner: true, needsPassword: false as const, message: "" };
  }
  await sql`insert into site_owner (id, user_id) values (1, ${userId}) on conflict (id) do nothing`;
  const owner = await ownerId(sql);
  return { isOwner: owner === userId, needsPassword: false as const, message: "" };
}

export const claimOwner = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return claimWithPassword(sql, context.userId);
  });

const registerInput = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(128),
});

/**
 * Bind an email and password to the current session, then make that person the
 * owner. A Grok viewer is already signed in, and a brand-new account would be
 * thrown away on the next request — so the password has to live on this session.
 */
export const registerOwner = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => registerInput.parse(data))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const email = data.email.toLowerCase();
    const taken = await sql<{ id: string }>`
      select id from "user" where lower(email) = ${email} and id <> ${context.userId}
    `;
    const otherId = taken[0]?.id;
    if (otherId) {
      const owner = await ownerId(sql);
      if (owner === otherId && (await hasPasswordAccount(sql, otherId))) {
        return { isOwner: false, message: "Bu e-poçt artıq sahib hesabıdır. Həmin şifrə ilə daxil olun." };
      }
      await sql`delete from "user" where id = ${otherId}`;
    }
    if (!(await hasPasswordAccount(sql, context.userId))) {
      const { hashPassword } = await import("better-auth/crypto");
      const hash = await hashPassword(data.password);
      const id = globalThis.crypto.randomUUID();
      await sql`
        insert into "account" ("id", "accountId", "providerId", "userId", "password", "createdAt", "updatedAt")
        values (${id}, ${context.userId}, 'credential', ${context.userId}, ${hash}, now(), now())
      `;
    }
    await sql`
      update "user"
      set email = ${email}, "emailVerified" = true, "updatedAt" = now()
      where id = ${context.userId}
    `;
    return claimWithPassword(sql, context.userId);
  });

export const getAdminSession = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const owner = await ownerId(sql);
    const viewerHasPassword = await hasPasswordAccount(sql, context.userId);
    const ownerHasPassword = owner ? await hasPasswordAccount(sql, owner) : false;
    const isOwner = owner === context.userId && viewerHasPassword;
    return {
      hasOwner: ownerHasPassword,
      isOwner,
      content: isOwner ? await loadContent(sql) : null,
    };
  });

export const saveSiteContent = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => siteContentSchema.parse(data))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const owner = await ownerId(sql);
    if (owner !== context.userId || !(await hasPasswordAccount(sql, context.userId))) {
      throw new Error("Forbidden");
    }
    const body = JSON.stringify(data);
    await sql`
      insert into site_copy (id, body, updated_at)
      values (1, ${body}, now())
      on conflict (id) do update set body = excluded.body, updated_at = now()
    `;
    return { ok: true as const };
  });
