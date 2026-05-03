import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Could validate payload or tokens here. For now, set a short-lived admin cookie.
    const res = NextResponse.json({ success: true });
    res.cookies.set("nawasena_admin", "1", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
    });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
