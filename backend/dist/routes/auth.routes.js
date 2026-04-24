"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma"); // your Prisma client singleton
const auth_1 = require("../middleware/auth");
const authRouter = (0, express_1.Router)();
const SALT_ROUNDS = 12;
// ─── Helpers ──────────────────────────────────────────────────────────────────
function signToken(userId, email) {
    return jsonwebtoken_1.default.sign({ id: userId, email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
}
function safeUser(user) {
    return {
        id: user.id,
        email: user.email,
        name: user.fullName,
        image: user.image ?? null,
    };
}
// ─── Zod schemas ──────────────────────────────────────────────────────────────
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
    fullName: zod_1.z.string().min(2, "Name must be at least 2 characters"),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1),
});
const googleSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(1),
    image: zod_1.z.string().url().nullable().optional(),
    googleId: zod_1.z.string().min(1),
});
// ─── POST /api/v1/auth/register ───────────────────────────────────────────────
authRouter.post("/register", async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            error: "Validation failed",
            issues: parsed.error.flatten().fieldErrors,
        });
    }
    const { email, password, fullName } = parsed.data;
    try {
        const existing = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res
                .status(409)
                .json({ error: "An account with this email already exists." });
        }
        const passwordHash = await bcryptjs_1.default.hash(password, SALT_ROUNDS);
        const user = await prisma_1.prisma.user.create({
            data: { email, fullName, passwordHash },
        });
        const accessToken = signToken(user.id, user.email);
        return res.status(201).json({ user: safeUser(user), accessToken });
    }
    catch (err) {
        console.error("[auth/register]", err);
        return res
            .status(500)
            .json({ error: "Registration failed. Please try again." });
    }
});
// ─── POST /api/v1/auth/login ──────────────────────────────────────────────────
authRouter.post("/login", async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid email or password." });
    }
    const { email, password } = parsed.data;
    try {
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        // Timing-safe: always run bcrypt even if user not found
        const dummyHash = "$2b$12$invalidhashfortimingsafety000000000000000000";
        const isValid = await bcryptjs_1.default.compare(password, user?.passwordHash ?? dummyHash);
        if (!user || !isValid) {
            return res.status(401).json({ error: "Invalid email or password." });
        }
        const accessToken = signToken(user.id, user.email);
        return res.status(200).json({ user: safeUser(user), accessToken });
    }
    catch (err) {
        console.error("[auth/login]", err);
        return res.status(500).json({ error: "Login failed. Please try again." });
    }
});
// ─── POST /api/v1/auth/google ─────────────────────────────────────────────────
authRouter.post("/google", async (req, res) => {
    const parsed = googleSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid Google payload." });
    }
    const { email, name, image, googleId } = parsed.data;
    try {
        const user = await prisma_1.prisma.user.upsert({
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
    }
    catch (err) {
        console.error("[auth/google]", err);
        return res.status(500).json({ error: "Google sign-in failed." });
    }
});
// ─── GET /api/v1/auth/me ──────────────────────────────────────────────────────
authRouter.get("/me", auth_1.requireAuth, async (req, res) => {
    try {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: req.userId },
        });
        if (!user)
            return res.status(404).json({ error: "User not found." });
        return res.status(200).json({ user: safeUser(user) });
    }
    catch (err) {
        console.error("[auth/me]", err);
        return res.status(500).json({ error: "Failed to fetch user." });
    }
});
exports.default = authRouter;
