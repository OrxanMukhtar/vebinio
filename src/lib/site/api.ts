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
    return { hasOwner: (await ownerId(sql)) !== null };
  } catch {
    return { hasOwner: false };
  }
});

export const claimOwner = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await sql`insert into site_owner (id, user_id) values (1, ${context.userId}) on conflict (id) do nothing`;
    const owner = await ownerId(sql);
    return { isOwner: owner === context.userId };
  });

export const getAdminSession = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const owner = await ownerId(sql);
    const isOwner = owner === context.userId;
    return {
      hasOwner: owner !== null,
      isOwner,
      content: isOwner || owner === null ? await loadContent(sql) : null,
    };
  });

export const saveSiteContent = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => siteContentSchema.parse(data))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const owner = await ownerId(sql);
    if (owner !== context.userId) {
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
