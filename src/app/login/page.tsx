"use client";

import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");

	// ── Credentials login ────────────────────────────────────────────────────
	const handleCredentialsLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const result = await signIn("credentials", {
				email: formData.email,
				password: formData.password,
				redirect: false,
				callbackUrl: "/dashboard",
			});

			if (result?.error) {
				setError("Invalid email or password. Please try again.");
			} else if (result?.ok) {
				const params = new URLSearchParams(window.location.search);
				router.push(params.get("callbackUrl") || "/dashboard");
			}
		} catch (err) {
			console.error("[login/credentials]", err);
			setError("Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	// ── Google login ─────────────────────────────────────────────────────────
	const handleGoogleLogin = async () => {
		setIsLoading(true);
		setError("");

		try {
			await signIn("google", { callbackUrl: "/dashboard" });
		} catch (err) {
			console.error("[login/google]", err);
			setError("Google sign-in failed. Please try again.");
			setIsLoading(false);
		}
	};

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
							Welcome Back
						</CardTitle>
						<p className='text-center text-sm text-gray-500 mt-1'>
							Log in to your PayHold account
						</p>
					</CardHeader>

					<CardContent className='pt-6'>
						{/* Error message */}
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
								{/* Google SVG */}
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
								Continue with Google
							</span>
						</Button>

						{/* Divider */}
						<div className='relative my-6'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-gray-200' />
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='px-4 bg-white text-gray-400 font-medium'>
									or sign in with email
								</span>
							</div>
						</div>

						{/* Email / Password form */}
						<form onSubmit={handleCredentialsLogin} className='space-y-4'>
							<Input
								label='Email'
								type='email'
								placeholder='your@email.com'
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								className='bg-gray-50'
								required
							/>

							<Input
								label='Password'
								type='password'
								placeholder='••••••••'
								value={formData.password}
								onChange={(e) =>
									setFormData({ ...formData, password: e.target.value })
								}
								className='bg-gray-50'
								required
							/>

							<div className='flex items-center justify-between text-sm'>
								<label className='flex items-center gap-2 text-gray-600 cursor-pointer'>
									<input
										type='checkbox'
										className='rounded border-gray-300 accent-[#0d4d7d]'
									/>
									<span>Remember me</span>
								</label>
								<Link
									href='/forgot-password'
									className='text-[#0d4d7d] hover:text-[#1a7a4a] font-medium transition-colors'
								>
									Forgot password?
								</Link>
							</div>

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
										Signing in...
									</span>
								) : (
									"Sign In"
								)}
							</Button>
						</form>

						{/* Sign up link */}
						<p className='text-center text-sm text-gray-500 mt-6'>
							Don&apos;t have an account?{" "}
							<Link
								href='/register'
								className='text-[#0d4d7d] hover:text-[#1a7a4a] font-semibold transition-colors'
							>
								Create one free
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
						<span>Secure Login</span>
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
