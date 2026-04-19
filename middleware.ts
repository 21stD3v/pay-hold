// middleware.ts  (project root — same level as app/)
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		// If authenticated user hits /auth/login → redirect to dashboard
		if (req.nextUrl.pathname.startsWith("/auth/login") && req.nextauth.token) {
			return NextResponse.redirect(new URL("/dashboard", req.url));
		}
		return NextResponse.next();
	},
	{
		callbacks: {
			// Return true = allow through. Return false = redirect to login.
			authorized({ req, token }) {
				const { pathname } = req.nextUrl;

				// Public routes — always allow
				const publicPaths = [
					"/",
					"/auth/login",
					"/auth/register",
					"/auth/forgot-password",
					"/api/payments/webhook", // Paystack webhook must be public
					"/how-it-works",
					"/real-estate",
					"/for-sellers",
					"/pricing",
					"/contact",
				];

				const isPublic =
					publicPaths.some(
						(p) => pathname === p || pathname.startsWith(p + "/"),
					) ||
					pathname.startsWith("/api/auth") || // NextAuth API routes
					pathname.startsWith("/_next") ||
					pathname.startsWith("/favicon");

				if (isPublic) return true;

				// Everything else requires a token
				return !!token;
			},
		},
		pages: {
			signIn: "/auth/login",
		},
	},
);

// Match all routes except static files
export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|images|icons|fonts).*)"],
};
