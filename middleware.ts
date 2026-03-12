import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// ─── Protected route patterns ─────────────────────────────────────────────────
// Any route under /dashboard, /deals, /profile, /settings requires auth.
// Public routes (/, /login, /register, /how-it-works, etc.) are left open.

export default withAuth(
	function middleware(req) {
		// Additional middleware logic can go here if needed
		// e.g. role-based redirects, locale handling
		return NextResponse.next();
	},
	{
		callbacks: {
			authorized({ token }) {
				// Return true if user has a valid session token
				return !!token;
			},
		},
		pages: {
			signIn: "/login",
		},
	},
);

// ─── Route matcher ────────────────────────────────────────────────────────────
export const config = {
	matcher: [
		"/dashboard/:path*",
		"/deals/:path*",
		"/profile/:path*",
		"/settings/:path*",
		"/create-transaction/:path*",
	],
};
