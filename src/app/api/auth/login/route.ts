import { setAuthCookies } from "@/lib/auth/cookies";
import { verifyPassword } from "@/lib/auth/hash";
import { signAccessToken, signRefreshToken } from "@/lib/auth/jwt";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { email, password } = await req.json();

	const user = await db.user.findUnique({ where: { email } });
	if (!user) {
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	}

	const valid = await verifyPassword(password, user.password);
	if (!valid) {
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	}

	const access = signAccessToken({ id: user.id, role: user.role });
	const refresh = signRefreshToken({ id: user.id });

	setAuthCookies(access, refresh);

	return NextResponse.json({ success: true });
}
