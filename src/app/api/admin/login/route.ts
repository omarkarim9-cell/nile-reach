import { NextRequest, NextResponse } from "next/server";
import { checkPassword, getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (typeof password !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (!checkPassword(password)) {
      // Small artificial delay so brute force is slightly less appealing
      await new Promise((r) => setTimeout(r, 800));
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    const session = await getSession();
    session.isAdmin = true;
    await session.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[login] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
