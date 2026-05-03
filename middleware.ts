import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function middleware(request: NextRequest) {
  // First, let supabase proxy update session and cookies
  const { response: supabaseResponse, user } = await updateSession(request);

  const { pathname } = request.nextUrl;

  // Protect admin pages and API
  // Allow unauthenticated access to the admin login page itself
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login")) {
    return supabaseResponse;
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    // Allow access if a simple admin cookie exists (quick dev path)
    const adminCookie = request.cookies.get("nawasena_admin")?.value;
    if (adminCookie) {
      return supabaseResponse;
    }

    // Allow access if user email is listed in ADMIN_EMAILS (comma-separated)
    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    const isAdmin =
      user && user.email && adminEmails.includes(user.email.toLowerCase());

    if (!isAdmin) {
      if (pathname.startsWith("/api/admin")) {
        const res = NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 },
        );
        // copy cookies from supabaseResponse to keep session in sync
        supabaseResponse.cookies.getAll().forEach((c) => {
          // ResponseCookie may not expose options in this environment —
          // copy name + value to keep cookies present for the response.
          res.cookies.set(c.name, String(c.value));
        });
        return res;
      }

      const loginUrl = new URL("/admin/login", request.url);
      const res = NextResponse.redirect(loginUrl);
      supabaseResponse.cookies.getAll().forEach((c) => {
        res.cookies.set(c.name, String(c.value));
      });
      return res;
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    // Run middleware for all non-static requests so the supabase proxy can sync
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
