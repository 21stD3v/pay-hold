"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Mode = "property" | "delivery";

// ─── Theme config ─────────────────────────────────────────────────────────────

const THEMES = {
	property: {
		bg: "#080808",
		surface: "#0f0f0f",
		border: "#1e1e1e",
		borderHover: "#2e2a1a",
		text: "#e8e8df",
		muted: "#666",
		dim: "#333",
		accent: "#c9a84c",
		accentDim: "rgba(201,168,76,0.08)",
		accentBorder: "rgba(201,168,76,0.25)",
		btnBg: "#c9a84c",
		btnText: "#080808",
		label: "PROPERTY DEALS",
		headline: ["The trust layer", "for Nigerian", "real estate."],
		sub: "Escrow for leases, rentals, sales, and agent deals. Every naira held until every condition is met.",
		pill: "bg-[#1a1a0a] text-[#c9a84c] border-[#3a2e0a]",
		inputBg: "#111",
		focusRing: "#4a3a1a",
		googleBorder: "#2a2a2a",
		googleText: "#555",
		tagline: "Lease · Rent · Buy · Sell · Agent",
		switchActiveBg: "#c9a84c",
		switchActiveText: "#080808",
		switchInactiveBg: "transparent",
		switchInactiveText: "#444",
		switchBorder: "#2a2a2a",
	},
	delivery: {
		bg: "#f4f6f3",
		surface: "#ffffff",
		border: "#e2e8e0",
		borderHover: "#b8d4c0",
		text: "#0d1a12",
		muted: "#8a9e90",
		dim: "#c0cfc4",
		accent: "#1a6b3c",
		accentDim: "rgba(26,107,60,0.06)",
		accentBorder: "rgba(26,107,60,0.2)",
		btnBg: "#1a6b3c",
		btnText: "#ffffff",
		label: "DELIVERY SERVICE",
		headline: ["Secure Payments.", "Protected", "Delivery."],
		sub: "PayHold holds your payment securely, verifies goods, and releases funds only after confirmed delivery.",
		inputBg: "#f8faf8",
		focusRing: "#a3d4b8",
		googleBorder: "#dde8e0",
		googleText: "#8a9e90",
		tagline: "24–72h Hold · 100% Buyer Protection · ₦0 Setup",
		switchActiveBg: "#1a6b3c",
		switchActiveText: "#ffffff",
		switchInactiveBg: "transparent",
		switchInactiveText: "#aaa",
		switchBorder: "#dde8e0",
	},
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoginPage() {
	const [mode, setMode] = useState<Mode>("property");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

	const t = THEMES[mode];
	const isProperty = mode === "property";

	function handleModeSwitch(next: Mode) {
		setMode(next);
		setError(null);
	}

	function handleCredentialsLogin() {
		if (!email || !password) {
			setError("Please fill in all fields.");
			return;
		}
		setError(null);
		startTransition(async () => {
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});
			if (result?.error) {
				setError("Invalid email or password.");
			} else {
				router.push(callbackUrl);
				router.refresh();
			}
		});
	}

	function handleGoogleLogin() {
		signIn("google", { callbackUrl });
	}

	return (
		<div
			style={{
				minHeight: "100vh",
				background: t.bg,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "24px",
				transition: "background 0.4s ease",
				fontFamily: "'DM Sans', system-ui, sans-serif",
			}}
		>
			{/* Google Fonts */}
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        * { box-sizing: border-box; }

        .ph-input {
          width: 100%;
          background: ${t.inputBg};
          border: 1px solid ${t.border};
          color: ${t.text};
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 13px;
          font-weight: 300;
          padding: 11px 14px;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.15s;
          -webkit-appearance: none;
        }
        .ph-input:focus { border-color: ${t.focusRing}; }
        .ph-input::placeholder { color: ${t.dim}; }

        .ph-btn-primary {
          width: 100%;
          background: ${t.btnBg};
          color: ${t.btnText};
          border: none;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.1s;
        }
        .ph-btn-primary:hover { opacity: 0.87; }
        .ph-btn-primary:active { transform: scale(0.99); }
        .ph-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

        .ph-btn-google {
          width: 100%;
          background: transparent;
          border: 1px solid ${t.googleBorder};
          color: ${t.googleText};
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 400;
          padding: 11px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: border-color 0.15s, color 0.15s;
        }
        .ph-btn-google:hover {
          border-color: ${t.accent};
          color: ${t.accent};
        }

        .mode-btn {
          flex: 1;
          padding: 8px 12px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }
      `}</style>

			<div style={{ width: "100%", maxWidth: "400px" }}>
				{/* Logo */}
				<div
					style={{
						textAlign: "center",
						marginBottom: "36px",
						fontFamily: "'Instrument Serif', Georgia, serif",
						fontSize: "22px",
						letterSpacing: "-0.4px",
						color: t.text,
						transition: "color 0.3s",
					}}
				>
					Pay<span style={{ color: t.muted }}>Hold</span>
				</div>

				{/* Mode Switch */}
				<div
					style={{
						display: "flex",
						gap: "4px",
						padding: "4px",
						background: isProperty ? "#111" : "#eaefe9",
						border: `1px solid ${t.switchBorder}`,
						borderRadius: "10px",
						marginBottom: "28px",
						transition: "background 0.3s",
					}}
				>
					{(["property", "delivery"] as Mode[]).map((m) => {
						const active = mode === m;
						return (
							<button
								key={m}
								className='mode-btn'
								onClick={() => handleModeSwitch(m)}
								style={{
									background: active ? t.accent : "transparent",
									color: active ? (isProperty ? "#080808" : "#fff") : t.muted,
								}}
							>
								{m === "property" ? "Property Deals" : "Delivery"}
							</button>
						);
					})}
				</div>

				{/* Card */}
				<div
					style={{
						background: t.surface,
						border: `1px solid ${t.border}`,
						borderRadius: "16px",
						padding: "36px 32px",
						transition: "background 0.3s, border-color 0.3s",
					}}
				>
					{/* Mode label */}
					<div
						style={{
							fontSize: "10px",
							fontWeight: 500,
							letterSpacing: "0.12em",
							textTransform: "uppercase",
							color: t.accent,
							marginBottom: "6px",
							display: "flex",
							alignItems: "center",
							gap: "6px",
						}}
					>
						<span
							style={{
								display: "inline-block",
								width: "16px",
								height: "1px",
								background: t.accent,
							}}
						/>
						{t.label}
					</div>

					{/* Headline */}
					<div
						style={{
							fontFamily: "'Instrument Serif', Georgia, serif",
							fontSize: "28px",
							lineHeight: "1.1",
							letterSpacing: "-0.8px",
							color: t.text,
							marginBottom: "6px",
						}}
					>
						Sign in
					</div>
					<div
						style={{
							fontSize: "12px",
							color: t.muted,
							fontWeight: 300,
							marginBottom: "28px",
						}}
					>
						{t.tagline}
					</div>

					{/* Error */}
					{error && (
						<div
							style={{
								fontSize: "12px",
								color: "#e05a4e",
								background: "rgba(224,90,78,0.08)",
								border: "1px solid rgba(224,90,78,0.2)",
								borderRadius: "7px",
								padding: "9px 12px",
								marginBottom: "16px",
							}}
						>
							{error}
						</div>
					)}

					{/* Email */}
					<div style={{ marginBottom: "12px" }}>
						<label
							style={{
								display: "block",
								fontSize: "10px",
								fontWeight: 500,
								letterSpacing: "0.1em",
								textTransform: "uppercase",
								color: t.muted,
								marginBottom: "7px",
							}}
						>
							Email
						</label>
						<input
							className='ph-input'
							type='email'
							placeholder='you@example.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handleCredentialsLogin()}
							autoComplete='email'
						/>
					</div>

					{/* Password */}
					<div style={{ marginBottom: "6px" }}>
						<label
							style={{
								display: "block",
								fontSize: "10px",
								fontWeight: 500,
								letterSpacing: "0.1em",
								textTransform: "uppercase",
								color: t.muted,
								marginBottom: "7px",
							}}
						>
							Password
						</label>
						<input
							className='ph-input'
							type='password'
							placeholder='••••••••••'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handleCredentialsLogin()}
							autoComplete='current-password'
						/>
					</div>

					{/* Forgot */}
					<div style={{ textAlign: "right", marginBottom: "22px" }}>
						<a
							href='/auth/forgot-password'
							style={{
								fontSize: "11px",
								color: t.muted,
								textDecoration: "none",
								transition: "color 0.15s",
							}}
							onMouseEnter={(e) => (e.currentTarget.style.color = t.accent)}
							onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
						>
							Forgot password?
						</a>
					</div>

					{/* Sign in button */}
					<button
						className='ph-btn-primary'
						onClick={handleCredentialsLogin}
						disabled={isPending}
						style={{ marginBottom: "16px" }}
					>
						{isPending ? "Signing in…" : "Sign in →"}
					</button>

					{/* Divider */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "10px",
							marginBottom: "16px",
						}}
					>
						<div style={{ flex: 1, height: "1px", background: t.border }} />
						<span
							style={{
								fontSize: "10px",
								color: t.dim,
								textTransform: "uppercase",
								letterSpacing: "0.1em",
							}}
						>
							or
						</span>
						<div style={{ flex: 1, height: "1px", background: t.border }} />
					</div>

					{/* Google */}
					<button className='ph-btn-google' onClick={handleGoogleLogin}>
						<svg width='14' height='14' viewBox='0 0 24 24'>
							<path
								fill='#4285F4'
								d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
							/>
							<path
								fill='#34A853'
								d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
							/>
							<path
								fill='#FBBC05'
								d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z'
							/>
							<path
								fill='#EA4335'
								d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
							/>
						</svg>
						Continue with Google
					</button>

					{/* Sign up */}
					<div
						style={{
							textAlign: "center",
							marginTop: "22px",
							fontSize: "11px",
							color: t.muted,
							fontWeight: 300,
						}}
					>
						No account?{" "}
						<a
							href='/auth/register'
							style={{ color: t.accent, textDecoration: "none" }}
						>
							Create one free →
						</a>
					</div>
				</div>

				{/* Footer */}
				<div
					style={{
						textAlign: "center",
						marginTop: "24px",
						fontSize: "11px",
						color: t.dim,
						fontWeight: 300,
					}}
				>
					Lagos · Abuja · Port Harcourt
				</div>
			</div>
		</div>
	);
}
