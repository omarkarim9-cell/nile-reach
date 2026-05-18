import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type AdminSession = {
  isAdmin?: boolean;
};

function getSessionOptions(): SessionOptions {
  const password = process.env.SESSION_SECRET;
  if (!password || password.length < 32) {
    throw new Error(
      "SESSION_SECRET env var is missing or too short (must be 32+ chars)"
    );
  }
  return {
    password,
    cookieName: "nile-reach-admin",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  };
}

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<AdminSession>(cookieStore, getSessionOptions());
}

export async function isAuthenticated() {
  try {
    const session = await getSession();
    return !!session.isAdmin;
  } catch {
    return false;
  }
}

/**
 * Validate password against ADMIN_PASSWORD env var.
 * Uses a constant-time-ish comparison to avoid timing leaks.
 */
export function checkPassword(provided: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    console.error("[auth] ADMIN_PASSWORD not set");
    return false;
  }
  if (provided.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ provided.charCodeAt(i);
  }
  return mismatch === 0;
}
