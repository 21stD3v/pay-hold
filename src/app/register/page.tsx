"use client";

import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

	// ── Client-side validation ────────────────────────────────────────────────
	const validate = () => {
		const errors: Record<string, string> = {};

		if (formData.fullName.trim().length < 2) {
			errors.fullName = "Name must be at least 2 characters.";
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = "Please enter a valid email address.";
		}
		if (formData.password.length < 8) {
			errors.password = "Password must be at least 8 characters.";
		}
		if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = "Passwords do not match.";
		}

		setFieldErrors(errors);
		return Object.keys(errors).length === 0;
	};

	// ── Register with email + password ────────────────────────────────────────
	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		setIsLoading(true);
		setError("");

		try {
			// 1. Create account via Express backend
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						fullName: formData.fullName.trim(),
						email: formData.email.trim().toLowerCase(),
						password: formData.password,
					}),
				},
			);

			const data = await res.json();

			if (!res.ok) {
				// Handle known backend errors
				if (res.status === 409) {
					setFieldErrors({
						email: "An account with this email already exists.",
					});
				} else {
					setError(data?.error || "Registration failed. Please try again.");
				}
				return;
			}

			// 2. Auto sign-in after successful registration
			const result = await signIn("credentials", {
				email: formData.email.trim().toLowerCase(),
				password: formData.password,
				redirect: false,
				callbackUrl: "/dashboard",
			});

			if (result?.ok) {
				router.push("/dashboard");
			} else {
				// Account created but auto-login failed — send to login
				router.push("/login?registered=true");
			}
		} catch (err) {
			console.error("[register]", err);
			setError("Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	// ── Google OAuth ──────────────────────────────────────────────────────────
	const handleGoogleLogin = async () => {
		setIsLoading(true);
		setError("");

		try {
			await signIn("google", { callbackUrl: "/dashboard" });
		} catch (err) {
			console.error("[register/google]", err);
			setError("Google sign-in failed. Please try again.");
			setIsLoading(false);
		}
	};

	// ── Password strength indicator ───────────────────────────────────────────
	const getPasswordStrength = () => {
		const p = formData.password;
		if (!p) return null;
		if (p.length < 8)
			return { label: "Too short", color: "bg-red-400", width: "w-1/4" };
		if (p.length < 10 || !/[0-9]/.test(p))
			return { label: "Weak", color: "bg-orange-400", width: "w-2/4" };
		if (!/[^a-zA-Z0-9]/.test(p))
			return { label: "Good", color: "bg-yellow-400", width: "w-3/4" };
		return { label: "Strong", color: "bg-[#1a7a4a]", width: "w-full" };
	};

	const strength = getPasswordStrength();

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4 relative overflow-hidden'>
			{/* Background blobs */}
			<div className='absolute inset-0 pointer-events-none'>
				<div className='absolute top-20 left-10 w-72 h-72 bg-[#0d4d7d]/5 rounded-full blur-3xl animate-pulse' />
				<div
					className='absolute bottom-20 right-10 w-96 h-96 bg-[#1a7a4a]/5 rounded-full blur-3xl animate-pulse'
					style={{ animationDelay: "1s" }}
				/>
			</div>

			<div className='w-full max-w-md relative z-10'>
				{/* Logo */}
				<div className='text-center mb-8'>
					<Link href='/' className='inline-block'>
						<div className='text-4xl font-bold tracking-tight hover:scale-105 transition-transform duration-300'>
							<span className='text-[#0d4d7d]'>Pay</span>
							<span className='text-[#1a7a4a]'>Hold</span>
						</div>
						<p className='text-sm text-gray-500 mt-1'>
							Payment secured. Goods delivered.
						</p>
					</Link>
				</div>

				<Card className='border-2 border-gray-100 shadow-2xl'>
					<CardHeader className='border-b border-gray-100 pb-6'>
						<CardTitle className='text-center text-2xl font-bold text-gray-900'>
							Create Your Account
						</CardTitle>
						<p className='text-center text-sm text-gray-500 mt-1'>
							Join thousands of Nigerians transacting safely
						</p>
					</CardHeader>

					<CardContent className='pt-6'>
						{/* Global error */}
						{error && (
							<div className='mb-5 p-4 bg-red-50 border border-red-200 rounded-lg'>
								<p className='text-sm text-red-700 text-center font-medium'>
									{error}
								</p>
							</div>
						)}

						{/* Google OAuth */}
						<Button
							fullWidth
							variant='outline'
							onClick={handleGoogleLogin}
							disabled={isLoading}
							className='mb-6 border-2 border-gray-200 hover:border-[#0d4d7d] hover:bg-gray-50 transition-all duration-300 py-6'
						>
							<span className='flex items-center justify-center gap-3 text-base font-semibold text-gray-700'>
								<svg className='w-5 h-5' viewBox='0 0 24 24'>
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
										d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
									/>
									<path
										fill='#EA4335'
										d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
									/>
								</svg>
								Sign up with Google
							</span>
						</Button>

						{/* Divider */}
						<div className='relative my-6'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-gray-200' />
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='px-4 bg-white text-gray-400 font-medium'>
									or sign up with email
								</span>
							</div>
						</div>

						{/* Registration form */}
						<form onSubmit={handleRegister} className='space-y-4'>
							{/* Full name */}
							<div>
								<Input
									label='Full Name'
									type='text'
									placeholder='Chidi Okeke'
									value={formData.fullName}
									onChange={(e) => {
										setFormData({ ...formData, fullName: e.target.value });
										setFieldErrors({ ...fieldErrors, fullName: "" });
									}}
									className='bg-gray-50'
									required
								/>
								{fieldErrors.fullName && (
									<p className='text-xs text-red-600 mt-1 ml-1'>
										{fieldErrors.fullName}
									</p>
								)}
							</div>

							{/* Email */}
							<div>
								<Input
									label='Email Address'
									type='email'
									placeholder='chidi@example.com'
									value={formData.email}
									onChange={(e) => {
										setFormData({ ...formData, email: e.target.value });
										setFieldErrors({ ...fieldErrors, email: "" });
									}}
									className='bg-gray-50'
									required
								/>
								{fieldErrors.email && (
									<p className='text-xs text-red-600 mt-1 ml-1'>
										{fieldErrors.email}
									</p>
								)}
							</div>

							{/* Password */}
							<div>
								<Input
									label='Password'
									type='password'
									placeholder='Min. 8 characters'
									value={formData.password}
									onChange={(e) => {
										setFormData({ ...formData, password: e.target.value });
										setFieldErrors({ ...fieldErrors, password: "" });
									}}
									className='bg-gray-50'
									required
								/>
								{/* Password strength bar */}
								{strength && (
									<div className='mt-2'>
										<div className='w-full bg-gray-200 rounded-full h-1.5'>
											<div
												className={`h-1.5 rounded-full transition-all duration-300 ${strength.color} ${strength.width}`}
											/>
										</div>
										<p className='text-xs text-gray-500 mt-1 ml-1'>
											Strength:{" "}
											<span className='font-medium'>{strength.label}</span>
										</p>
									</div>
								)}
								{fieldErrors.password && (
									<p className='text-xs text-red-600 mt-1 ml-1'>
										{fieldErrors.password}
									</p>
								)}
							</div>

							{/* Confirm password */}
							<div>
								<Input
									label='Confirm Password'
									type='password'
									placeholder='Re-enter your password'
									value={formData.confirmPassword}
									onChange={(e) => {
										setFormData({
											...formData,
											confirmPassword: e.target.value,
										});
										setFieldErrors({ ...fieldErrors, confirmPassword: "" });
									}}
									className='bg-gray-50'
									required
								/>
								{fieldErrors.confirmPassword && (
									<p className='text-xs text-red-600 mt-1 ml-1'>
										{fieldErrors.confirmPassword}
									</p>
								)}
							</div>

							{/* Terms */}
							<p className='text-xs text-gray-500 leading-relaxed'>
								By creating an account you agree to PayHold&apos;s{" "}
								<Link
									href='/terms'
									className='text-[#0d4d7d] hover:underline font-medium'
								>
									Terms of Service
								</Link>{" "}
								and{" "}
								<Link
									href='/privacy'
									className='text-[#0d4d7d] hover:underline font-medium'
								>
									Privacy Policy
								</Link>
								.
							</p>

							{/* Submit */}
							<Button
								type='submit'
								fullWidth
								disabled={isLoading}
								className='bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] hover:shadow-xl hover:scale-[1.02] transition-all duration-300 py-6 text-base font-semibold mt-2'
							>
								{isLoading ? (
									<span className='flex items-center justify-center gap-2'>
										<svg
											className='animate-spin w-5 h-5'
											fill='none'
											viewBox='0 0 24 24'
										>
											<circle
												className='opacity-25'
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='4'
											/>
											<path
												className='opacity-75'
												fill='currentColor'
												d='M4 12a8 8 0 018-8v8H4z'
											/>
										</svg>
										Creating account...
									</span>
								) : (
									"Create Account"
								)}
							</Button>
						</form>

						{/* Sign in link */}
						<p className='text-center text-sm text-gray-500 mt-6'>
							Already have an account?{" "}
							<Link
								href='/login'
								className='text-[#0d4d7d] hover:text-[#1a7a4a] font-semibold transition-colors'
							>
								Sign in
							</Link>
						</p>
					</CardContent>
				</Card>

				{/* Back to home */}
				<div className='text-center mt-6'>
					<Link
						href='/'
						className='inline-flex items-center gap-2 text-gray-500 hover:text-[#0d4d7d] text-sm font-medium transition-all hover:gap-3'
					>
						<svg
							className='w-4 h-4'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M10 19l-7-7m0 0l7-7m-7 7h18'
							/>
						</svg>
						Back to Home
					</Link>
				</div>

				{/* Trust badges */}
				<div className='mt-8 flex items-center justify-center gap-6 text-xs text-gray-400'>
					<div className='flex items-center gap-1.5'>
						<svg
							className='w-4 h-4 text-[#1a7a4a]'
							fill='currentColor'
							viewBox='0 0 20 20'
						>
							<path
								fillRule='evenodd'
								d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
								clipRule='evenodd'
							/>
						</svg>
						<span>Free to Join</span>
					</div>
					<div className='flex items-center gap-1.5'>
						<svg
							className='w-4 h-4 text-[#0d4d7d]'
							fill='currentColor'
							viewBox='0 0 20 20'
						>
							<path
								fillRule='evenodd'
								d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
								clipRule='evenodd'
							/>
						</svg>
						<span>Data Protected</span>
					</div>
					<div className='flex items-center gap-1.5'>
						<svg
							className='w-4 h-4 text-[#1a7a4a]'
							fill='currentColor'
							viewBox='0 0 20 20'
						>
							<path
								fillRule='evenodd'
								d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
								clipRule='evenodd'
							/>
						</svg>
						<span>Trusted in Nigeria</span>
					</div>
				</div>
			</div>
		</div>
	);
}
