import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;

  // If token exists or user is trying to authenticate
  if (pathname.includes("/api/auth") || token) {
    // let user go through
    return NextResponse.next();
  }

  // redirect user to login page
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
