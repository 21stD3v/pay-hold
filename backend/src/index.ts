import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:3000",
		credentials: true,
	}),
);
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/v1/auth", authRouter);

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
	console.log(`✅ PayHold API running on http://localhost:${PORT}`);
});
