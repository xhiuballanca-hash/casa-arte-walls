import { createServerFn } from "@tanstack/react-start";
import type { User } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Admin / team management server functions.
 *
 * - Setup state + first-admin creation are public (no session exists yet),
 *   but the first-admin path is hard-locked once a single admin row exists.
 * - Team management verifies the caller through RLS-scoped `has_role`
 *   before touching the privileged client.
 */

async function adminClient() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

async function adminCount() {
  const admin = await adminClient();
  const { count, error } = await admin
    .from("user_roles")
    .select("id", { count: "exact", head: true })
    .eq("role", "admin");
  if (error) throw new Error("Could not read roles");
  return count ?? 0;
}

export const getAdminSetupState = createServerFn({ method: "GET" }).handler(async () => {
  const count = await adminCount();
  return { needsSetup: count === 0 };
});

const firstAdminSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  password: z.string().min(10, "Use at least 10 characters").max(200),
});

export const createFirstAdmin = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => firstAdminSchema.parse(raw))
  .handler(async ({ data }) => {
    if ((await adminCount()) > 0) {
      throw new Error("An administrator already exists. Please sign in.");
    }
    const admin = await adminClient();
    const { data: created, error } = await admin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: { full_name: data.name },
    });
    if (error || !created.user) {
      throw new Error(error?.message ?? "Could not create the account");
    }
    const { error: roleError } = await admin
      .from("user_roles")
      .insert({ user_id: created.user.id, role: "admin" });
    if (roleError) {
      await admin.auth.admin.deleteUser(created.user.id);
      throw new Error("Could not assign the administrator role");
    }
    return { ok: true as const };
  });

// ---------------------------------------------------------------------------
// Team management (admin only)
// ---------------------------------------------------------------------------

type AuthedContext = { supabase: any; userId: string };

async function assertAdmin(ctx: AuthedContext) {
  const { data, error } = await ctx.supabase.rpc("has_role", {
    _user_id: ctx.userId,
    _role: "admin",
  });
  if (error || data !== true) {
    throw new Error("Forbidden");
  }
}

export type TeamMember = {
  user_id: string;
  email: string | null;
  name: string | null;
  created_at: string;
  last_sign_in_at: string | null;
};

async function listAllUsers() {
  const admin = await adminClient();
  const users: User[] = [];
  let page = 1;
  // Team sizes are tiny; cap paging defensively.
  while (page <= 10) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw new Error("Could not list users");
    users.push(...data.users);
    if (data.users.length < 200) break;
    page += 1;
  }
  return users;
}

export const listTeam = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<TeamMember[]> => {
    await assertAdmin(context as AuthedContext);
    const admin = await adminClient();
    const { data: roles, error } = await admin
      .from("user_roles")
      .select("user_id, created_at")
      .eq("role", "admin")
      .order("created_at", { ascending: true });
    if (error) throw new Error("Could not read roles");
    const users = await listAllUsers();
    const byId = new Map(users.map((u) => [u.id, u]));
    return roles.map((r) => {
      const u = byId.get(r.user_id);
      return {
        user_id: r.user_id,
        email: u?.email ?? null,
        name: (u?.user_metadata?.full_name as string | undefined) ?? null,
        created_at: r.created_at,
        last_sign_in_at: u?.last_sign_in_at ?? null,
      };
    });
  });

function generateTemporaryPassword() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(14));
  let out = "";
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return `${out.slice(0, 5)}-${out.slice(5, 10)}-${out.slice(10)}`;
}

const addMemberSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
});

export const addTeamMember = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((raw: unknown) => addMemberSchema.parse(raw))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as AuthedContext);
    const admin = await adminClient();

    const existing = (await listAllUsers()).find(
      (u) => u.email?.toLowerCase() === data.email.toLowerCase(),
    );

    let userId: string;
    let temporaryPassword: string | null = null;

    if (existing) {
      userId = existing.id;
    } else {
      temporaryPassword = generateTemporaryPassword();
      const { data: created, error } = await admin.auth.admin.createUser({
        email: data.email,
        password: temporaryPassword,
        email_confirm: true,
        user_metadata: { full_name: data.name },
      });
      if (error || !created.user) {
        throw new Error(error?.message ?? "Could not create the account");
      }
      userId = created.user.id;
    }

    const { error: roleError } = await admin
      .from("user_roles")
      .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });
    if (roleError) throw new Error("Could not assign the administrator role");

    return { ok: true as const, temporaryPassword, alreadyExisted: !!existing };
  });

const removeMemberSchema = z.object({ user_id: z.string().uuid() });

export const removeTeamMember = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((raw: unknown) => removeMemberSchema.parse(raw))
  .handler(async ({ data, context }) => {
    const ctx = context as AuthedContext;
    await assertAdmin(ctx);
    if (data.user_id === ctx.userId) {
      throw new Error("You cannot remove your own access");
    }
    if ((await adminCount()) <= 1) {
      throw new Error("At least one administrator must remain");
    }
    const admin = await adminClient();
    const { error } = await admin.from("user_roles").delete().eq("user_id", data.user_id);
    if (error) throw new Error("Could not remove the role");
    const { error: delError } = await admin.auth.admin.deleteUser(data.user_id);
    if (delError) throw new Error("Role removed, but the account could not be deleted");
    return { ok: true as const };
  });
