import { setAuthCookies } from "@/lib/auth/cookies";
import { verifyPassword } from "@/lib/auth/hash";
import { signAccessToken, signRefreshToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { email, password } = await req.json();

	const user = await prisma.user.findUnique({ where: { email } });
	if (!user || !user.passwordHash) {
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	}

	const valid = await verifyPassword(password, user.passwordHash);
	if (!valid) {
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	}

	const access = signAccessToken({ id: user.id });
	const refresh = signRefreshToken({ id: user.id });

	await setAuthCookies(access, refresh);

	return NextResponse.json({ success: true });
}
