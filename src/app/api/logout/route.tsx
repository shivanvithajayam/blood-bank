import { NextResponse } from "next/server";

export async function POST() {
  // Create a response that clears the cookie
  const response = NextResponse.json({ message: "Logout successful" });

  response.cookies.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // expire immediately
  });

  return response;
}