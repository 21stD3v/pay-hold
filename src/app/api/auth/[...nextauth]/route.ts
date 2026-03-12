import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// ─── Extend NextAuth types ────────────────────────────────────────────────────
declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			email: string;
			name: string;
			image?: string;
			accessToken: string;
		};
	}
	interface User {
		id: string;
		accessToken?: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
		accessToken?: string;
		provider?: string;
	}
}

// ─── Auth Options ─────────────────────────────────────────────────────────────
export const authOptions: NextAuthOptions = {
	providers: [
		// ── Google OAuth ──────────────────────────────────────────────────────
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),

		// ── Email + Password (calls your Express backend) ─────────────────────
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				try {
					const res = await fetch(
						`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								email: credentials.email,
								password: credentials.password,
							}),
						},
					);

					if (!res.ok) return null;

					const data = await res.json();

					// data shape expected from Express:
					// { user: { id, email, name }, accessToken: "jwt..." }
					if (data?.user && data?.accessToken) {
						return {
							id: data.user.id,
							email: data.user.email,
							name: data.user.name,
							accessToken: data.accessToken,
						};
					}

					return null;
				} catch {
					return null;
				}
			},
		}),
	],

	// ── Callbacks ─────────────────────────────────────────────────────────────
	callbacks: {
		async signIn({ user, account }) {
			// For Google sign-ins: upsert user in your DB via Express backend
			if (account?.provider === "google") {
				try {
					const res = await fetch(
						`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google`,
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								email: user.email,
								name: user.name,
								image: user.image,
								googleId: account.providerAccountId,
							}),
						},
					);

					if (!res.ok) return false;

					const data = await res.json();
					// Attach backend-issued token to the user object for jwt callback
					user.id = data.user.id;
					user.accessToken = data.accessToken;
					return true;
				} catch {
					return false;
				}
			}

			return true; // credentials provider handles its own auth
		},

		async jwt({ token, user, account }) {
			// Initial sign-in: persist user fields into token
			if (user) {
				token.id = user.id;
				token.accessToken = user.accessToken;
			}
			if (account) {
				token.provider = account.provider;
			}
			return token;
		},

		async session({ session, token }) {
			// Expose token fields to the client-side session
			session.user.id = token.id;
			session.user.accessToken = token.accessToken ?? "";
			return session;
		},
	},

	// ── Pages ─────────────────────────────────────────────────────────────────
	pages: {
		signIn: "/login",
		error: "/login", // Error redirects back to login with ?error= param
	},

	// ── Session strategy ──────────────────────────────────────────────────────
	session: {
		strategy: "jwt",
		maxAge: 7 * 24 * 60 * 60, // 7 days
	},

	// ── Security ──────────────────────────────────────────────────────────────
	secret: process.env.NEXTAUTH_SECRET,

	debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
