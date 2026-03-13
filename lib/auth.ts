import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// ─── Extend NextAuth types ─────────────────────────────────────────────────
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
		email: string;
		name: string;
		image?: string;
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

// ─── Auth Options ──────────────────────────────────────────────────────────
export const authOptions: NextAuthOptions = {
	providers: [
		// ── Google OAuth ────────────────────────────────────────────────────
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

		// ── Email + Password ────────────────────────────────────────────────
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials): Promise<any> {
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

					if (data?.user && data?.accessToken) {
						return {
							id: data.user.id,
							email: data.user.email,
							name: data.user.name,
							image: data.user.image ?? null,
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

	// ── Callbacks ────────────────────────────────────────────────────────────
	callbacks: {
		async signIn({ user, account }) {
			// Google sign-in — upsert user in Express backend
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
					user.id = data.user.id;
					user.accessToken = data.accessToken;
					return true;
				} catch {
					return false;
				}
			}
			return true;
		},

		async jwt({ token, user, account }) {
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
			session.user.id = token.id;
			session.user.accessToken = token.accessToken ?? "";
			return session;
		},
	},

	// ── Pages ─────────────────────────────────────────────────────────────────
	pages: {
		signIn: "/login",
		error: "/login",
	},

	// ── Session ───────────────────────────────────────────────────────────────
	session: {
		strategy: "jwt",
		maxAge: 7 * 24 * 60 * 60, // 7 days
	},

	secret: process.env.NEXTAUTH_SECRET,
	debug: process.env.NODE_ENV === "development",
};
