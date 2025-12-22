import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify JWT
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };

    const pathname = req.nextUrl.pathname;

    // Role-based access control
    if (pathname.startsWith("/admin") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (pathname.startsWith("/Nurse") && payload.role !== "nurse") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Allow request if checks pass
    return NextResponse.next();
  } catch (err) {
    // Invalid token → force login
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Configure which routes middleware applies to
export const config = {
  matcher: ["/admin/:path*", "/Nurse/:path*"], // protect these paths
};