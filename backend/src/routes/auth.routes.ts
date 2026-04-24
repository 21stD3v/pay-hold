import bcrypt from "bcryptjs";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../lib/prisma"; // your Prisma client singleton
import { AuthRequest, requireAuth } from "../middleware/auth";

const authRouter = Router();

const SALT_ROUNDS = 12;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function signToken(userId: string, email: string) {
	return jwt.sign({ id: userId, email }, process.env.JWT_SECRET!, {
		expiresIn: "7d",
	});
}

function safeUser(user: {
	id: string;
	email: string;
	fullName: string;
	image?: string | null;
}) {
	return {
		id: user.id,
		email: user.email,
		name: user.fullName,
		image: user.image ?? null,
	};
}

// ─── Zod schemas ──────────────────────────────────────────────────────────────
const registerSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, "Password must be at least 8 characters"),
	fullName: z.string().min(2, "Name must be at least 2 characters"),
});

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});

const googleSchema = z.object({
	email: z.string().email(),
	name: z.string().min(1),
	image: z.string().url().nullable().optional(),
	googleId: z.string().min(1),
});

// ─── POST /api/v1/auth/register ───────────────────────────────────────────────
authRouter.post("/register", async (req: Request, res: Response) => {
	const parsed = registerSchema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).json({
			error: "Validation failed",
			issues: parsed.error.flatten().fieldErrors,
		});
	}

	const { email, password, fullName } = parsed.data;

	try {
		const existing = await prisma.user.findUnique({ where: { email } });
		if (existing) {
			return res
				.status(409)
				.json({ error: "An account with this email already exists." });
		}

		const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
		const user = await prisma.user.create({
			data: { email, fullName, passwordHash },
		});

		const accessToken = signToken(user.id, user.email);
		return res.status(201).json({ user: safeUser(user), accessToken });
	} catch (err) {
		console.error("[auth/register]", err);
		return res
			.status(500)
			.json({ error: "Registration failed. Please try again." });
	}
});

// ─── POST /api/v1/auth/login ──────────────────────────────────────────────────
authRouter.post("/login", async (req: Request, res: Response) => {
	const parsed = loginSchema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).json({ error: "Invalid email or password." });
	}

	const { email, password } = parsed.data;

	try {
		const user = await prisma.user.findUnique({ where: { email } });

		// Timing-safe: always run bcrypt even if user not found
		const dummyHash = "$2b$12$invalidhashfortimingsafety000000000000000000";
		const isValid = await bcrypt.compare(
			password,
			user?.passwordHash ?? dummyHash,
		);

		if (!user || !isValid) {
			return res.status(401).json({ error: "Invalid email or password." });
		}

		const accessToken = signToken(user.id, user.email);
		return res.status(200).json({ user: safeUser(user), accessToken });
	} catch (err) {
		console.error("[auth/login]", err);
		return res.status(500).json({ error: "Login failed. Please try again." });
	}
});

// ─── POST /api/v1/auth/google ─────────────────────────────────────────────────
authRouter.post("/google", async (req: Request, res: Response) => {
	const parsed = googleSchema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).json({ error: "Invalid Google payload." });
	}

	const { email, name, image, googleId } = parsed.data;

	try {
		const user = await prisma.user.upsert({
			where: { email },
			update: { googleId, image: image ?? null },
			create: {
				email,
				fullName: name,
				googleId,
				image: image ?? null,
			},
		});

		const accessToken = signToken(user.id, user.email);
		return res.status(200).json({ user: safeUser(user), accessToken });
	} catch (err) {
		console.error("[auth/google]", err);
		return res.status(500).json({ error: "Google sign-in failed." });
	}
});

// ─── GET /api/v1/auth/me ──────────────────────────────────────────────────────
authRouter.get("/me", requireAuth, async (req: AuthRequest, res: Response) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: req.userId },
		});
		if (!user) return res.status(404).json({ error: "User not found." });
		return res.status(200).json({ user: safeUser(user) });
	} catch (err) {
		console.error("[auth/me]", err);
		return res.status(500).json({ error: "Failed to fetch user." });
	}
});

export default authRouter;
