"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

// Drop-in wrapper so layout.tsx import stays clean:
// import SessionProvider from "@/components/providers/SessionProvider";

export default function SessionProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
