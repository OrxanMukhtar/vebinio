import { createServerFn } from "@tanstack/react-start";
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

export const claimOwner = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    if (!(await hasPasswordAccount(sql, context.userId))) {
      return { isOwner: false, needsPassword: true as const };
    }
    const current = await ownerId(sql);
    if (current && current !== context.userId) {
      if (await hasPasswordAccount(sql, current)) {
        return { isOwner: false, needsPassword: false as const };
      }
      await sql`update site_owner set user_id = ${context.userId} where id = 1`;
      return { isOwner: true, needsPassword: false as const };
    }
    await sql`insert into site_owner (id, user_id) values (1, ${context.userId}) on conflict (id) do nothing`;
    const owner = await ownerId(sql);
    return { isOwner: owner === context.userId, needsPassword: false as const };
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
