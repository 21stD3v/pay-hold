"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRef, useState } from "react";

// PAYHOLD LANDING PAGE - Professional Redesign
// Brand Colors: #0d4d7d (Deep Blue) + #1a7a4a (Trust Green)

// ─── Why Choose Feature Data ───────────────────────────────────────────────

interface Feature {
	title: string;
	desc: string;
	icon: React.ReactNode;
	barFrom: string;
	barTo: string;
	iconBg: string;
}

const features: Feature[] = [
	{
		title: "Complete Security",
		desc: "Your money is held in secure escrow. Goods are never released without payment. Payment never released without delivery confirmation.",
		icon: (
			<path
				d='M12 2L4 6v6c0 5.5 3.5 10.7 8 12 4.5-1.3 8-6.5 8-12V6l-8-4z'
				stroke='#0d4d7d'
				strokeWidth='1.5'
				fill='none'
				strokeLinejoin='round'
			/>
		),
		barFrom: "#0d4d7d",
		barTo: "#1a7a4a",
		iconBg: "#e6f1fb",
	},
	{
		title: "Fast & Reliable",
		desc: "Quick verification and same-day dispatch. Most transactions complete within 24-48 hours with full tracking.",
		icon: (
			<polygon
				points='13,2 3,14 12,14 11,22 21,10 12,10'
				stroke='#1a7a4a'
				strokeWidth='1.5'
				fill='none'
				strokeLinejoin='round'
			/>
		),
		barFrom: "#1a7a4a",
		barTo: "#0d4d7d",
		iconBg: "#e1f5ee",
	},
	{
		title: "Dispute Protection",
		desc: "48-hour dispute window after delivery. Our experienced team reviews every case fairly and impartially.",
		icon: (
			<>
				<circle
					cx='12'
					cy='12'
					r='10'
					stroke='#0d4d7d'
					strokeWidth='1.5'
					fill='none'
				/>
				<line
					x1='12'
					y1='8'
					x2='12'
					y2='12'
					stroke='#0d4d7d'
					strokeWidth='1.5'
					strokeLinecap='round'
				/>
				<circle cx='12' cy='16' r='0.8' fill='#0d4d7d' />
			</>
		),
		barFrom: "#0d4d7d",
		barTo: "#1a7a4a",
		iconBg: "#e6f1fb",
	},
	{
		title: "Verified Couriers",
		desc: "All dispatchers are background-checked and rated by the community. Transparent ratings ensure quality service.",
		icon: (
			<path
				d='M20 6L9 17l-5-5'
				stroke='#1a7a4a'
				strokeWidth='2'
				fill='none'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		),
		barFrom: "#1a7a4a",
		barTo: "#0d4d7d",
		iconBg: "#e1f5ee",
	},
	{
		title: "Real-Time Tracking",
		desc: "Track your package every step of the way with GPS tracking and instant notifications at each milestone.",
		icon: (
			<>
				<path
					d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'
					stroke='#0d4d7d'
					strokeWidth='1.5'
					fill='none'
				/>
				<circle
					cx='12'
					cy='9'
					r='2.5'
					stroke='#0d4d7d'
					strokeWidth='1.5'
					fill='none'
				/>
			</>
		),
		barFrom: "#0d4d7d",
		barTo: "#1a7a4a",
		iconBg: "#e6f1fb",
	},
	{
		title: "Transparent Pricing",
		desc: "No hidden fees. Clear pricing upfront with low service charges. You always know exactly what you're paying.",
		icon: (
			<>
				<circle
					cx='12'
					cy='12'
					r='10'
					stroke='#1a7a4a'
					strokeWidth='1.5'
					fill='none'
				/>
				<path
					d='M12 6v2m0 8v2M9 9h4.5a1.5 1.5 0 010 3H10a1.5 1.5 0 000 3H15'
					stroke='#1a7a4a'
					strokeWidth='1.5'
					fill='none'
					strokeLinecap='round'
				/>
			</>
		),
		barFrom: "#1a7a4a",
		barTo: "#0d4d7d",
		iconBg: "#e1f5ee",
	},
];

// ─── Feature Card ───────────────────────────────────────────────────────────

function FeatureCard({ feature }: { feature: Feature }) {
	return (
		<div className='group bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#0d4d7d]/30 hover:shadow-2xl transition-all duration-300 h-full'>
			<div
				className='w-10 h-10 rounded-lg flex items-center justify-center mb-6'
				style={{ background: feature.iconBg }}
			>
				<svg
					viewBox='0 0 24 24'
					fill='none'
					className='w-5 h-5'
					xmlns='http://www.w3.org/2000/svg'
				>
					{feature.icon}
				</svg>
			</div>
			<h3 className='text-2xl font-bold text-gray-900 mb-4'>{feature.title}</h3>
			<p className='text-gray-600 leading-relaxed mb-4'>{feature.desc}</p>
			<div
				className='h-1 w-16 rounded-full group-hover:w-24 transition-all duration-300'
				style={{
					background: `linear-gradient(90deg, ${feature.barFrom}, ${feature.barTo})`,
				}}
			/>
		</div>
	);
}

// ─── Why Choose Section (carousel on mobile, grid on desktop) ──────────────

function WhyChooseSection() {
	const [current, setCurrent] = useState(0);
	const touchStartX = useRef(0);

	const goTo = (n: number) => {
		setCurrent(((n % features.length) + features.length) % features.length);
	};

	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = (e: React.TouchEvent) => {
		const diff = touchStartX.current - e.changedTouches[0].clientX;
		if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
	};

	return (
		<section className='py-20 md:py-32 bg-gradient-to-br from-gray-50 to-blue-50/30'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
						Why Choose PayHold?
					</h2>
					<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
						The most trusted intermediary delivery service in Nigeria
					</p>
				</div>

				{/* ── Mobile carousel (hidden sm+) ── */}
				<div className='sm:hidden'>
					<div
						className='overflow-hidden'
						onTouchStart={handleTouchStart}
						onTouchEnd={handleTouchEnd}
					>
						<div
							className='flex transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)] will-change-transform'
							style={{ transform: `translateX(-${current * 100}%)` }}
						>
							{features.map((f) => (
								<div key={f.title} className='min-w-full px-1'>
									<FeatureCard feature={f} />
								</div>
							))}
						</div>
					</div>

					{/* Dots */}
					<div className='flex justify-center gap-1.5 mt-5'>
						{features.map((_, i) => (
							<button
								key={i}
								onClick={() => goTo(i)}
								aria-label={`Go to slide ${i + 1}`}
								className='h-1.5 rounded-full transition-all duration-300'
								style={{
									width: i === current ? "18px" : "6px",
									background: i === current ? "#0d4d7d" : "#ccc",
								}}
							/>
						))}
					</div>

					{/* Prev / Next */}
					<div className='flex justify-center gap-2.5 mt-4'>
						<button
							onClick={() => goTo(current - 1)}
							aria-label='Previous'
							className='w-9 h-9 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-700'
						>
							←
						</button>
						<button
							onClick={() => goTo(current + 1)}
							aria-label='Next'
							className='w-9 h-9 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-700'
						>
							→
						</button>
					</div>
				</div>

				{/* ── Desktop grid (hidden below sm) ── */}
				<div className='hidden sm:grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
					{features.map((f, index) => (
						<div key={f.title} style={{ animationDelay: `${index * 50}ms` }}>
							<FeatureCard feature={f} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function HomePage() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div className='min-h-screen bg-white'>
			{/* Navigation - Fixed Header */}
			<nav className='fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-20'>
						{/* Logo */}
						<Link href='/' className='flex items-center'>
							<div className='text-3xl font-bold tracking-tight'>
								<span className='text-[#0d4d7d]'>Pay</span>
								<span className='text-[#1a7a4a]'>Hold</span>
							</div>
						</Link>

						{/* Desktop Navigation */}
						<div className='hidden lg:flex items-center gap-8'>
							<Link
								href='/how-it-works'
								className='text-gray-700 hover:text-[#0d4d7d] font-medium transition-all duration-200 hover:translate-y-[-1px]'
							>
								How It Works
							</Link>

							<Link
								href='/contact'
								className='text-gray-700 hover:text-[#0d4d7d] font-medium transition-all duration-200 hover:translate-y-[-1px]'
							>
								Contact
							</Link>
							<Link href='/create-transaction'>
								<Button
									size='md'
									className='bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] hover:shadow-lg hover:scale-105 transition-all duration-300'
								>
									Create Transaction
								</Button>
							</Link>
							<Link href='/login'>
								<Button
									variant='outline'
									size='md'
									className='border-[#0d4d7d] text-[#0d4d7d] hover:bg-[#0d4d7d] hover:text-white transition-all duration-300'
								>
									Register
								</Button>
							</Link>
						</div>

						{/* Mobile Hamburger */}
						<button
							onClick={() => setMenuOpen(true)}
							className='lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors'
							type='button'
							aria-label='Open menu'
						>
							<svg
								className='w-6 h-6 text-gray-700'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Mobile Menu Overlay */}
				{menuOpen && (
					<div
						className='fixed inset-0 bg-black/40 z-40 lg:hidden'
						onClick={() => setMenuOpen(false)}
					/>
				)}

				{/* Mobile Menu Panel */}
				<div
					className={`fixed top-0 right-0 bottom-0 w-[280px] bg-transparent z-50 shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
						menuOpen ? "translate-x-0" : "translate-x-full"
					}`}
				>
					<div className='flex items-center justify-between p-6 border-b bg-transparent'>
						<div className='text-2xl font-bold'>
							<span className='text-[#0d4d7d]'>Pay</span>
							<span className='text-[#1a7a4a]'>Hold</span>
						</div>
						<button
							onClick={() => setMenuOpen(false)}
							className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
							type='button'
							aria-label='Close menu'
						>
							<svg
								className='w-6 h-6'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>

					<nav className='p-6 space-y-4 bg-white h-full flex flex-col justify-between'>
						<Link
							href='/how-it-works'
							onClick={() => setMenuOpen(false)}
							className='block text-gray-700 hover:text-[#0d4d7d] font-medium py-2 transition-colors'
						>
							How It Works
						</Link>

						<Link href='/create-transaction' onClick={() => setMenuOpen(false)}>
							<Button
								type='button'
								className='w-full bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a]'
							>
								Create Transaction
							</Button>
						</Link>
						<div className='pt-4 space-y-3'>
							<Link href='/login' onClick={() => setMenuOpen(false)}>
								<Button
									variant='outline'
									className='w-full border-[#0d4d7d] text-[#0d4d7d]'
								>
									Log In
								</Button>
							</Link>
						</div>
					</nav>
				</div>
			</nav>

			{/* Hero Section */}
			<section className='relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50'>
					<div className='absolute top-20 left-10 w-72 h-72 bg-[#0d4d7d]/5 rounded-full blur-3xl animate-pulse' />
					<div
						className='absolute bottom-20 right-10 w-96 h-96 bg-[#1a7a4a]/5 rounded-full blur-3xl animate-pulse'
						style={{ animationDelay: "1s" }}
					/>
				</div>

				<div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
					<div className='max-w-5xl mx-auto text-center'>
						{/* Trust Badge */}
						<div className='inline-flex items-center gap-2 bg-white border border-[#0d4d7d]/20 px-5 py-2.5 rounded-full text-sm font-semibold text-[#0d4d7d] mb-8 shadow-sm hover:shadow-md transition-shadow'>
							<svg
								className='w-5 h-5 text-[#1a7a4a]'
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path
									fillRule='evenodd'
									d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
									clipRule='evenodd'
								/>
							</svg>
							Trusted by thousands across Nigeria
						</div>

						{/* Main Headline */}
						<h1 className='text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight'>
							Secure Payments. <span className='text-[#0d4d7d]'>Protected</span>{" "}
							<span className='text-[#1a7a4a]'>Delivery</span>.
						</h1>

						<p className='text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed'>
							PayHold holds your payment securely, verifies goods, and releases
							funds only after confirmed delivery. Buy and sell locally with
							complete peace of mind.
						</p>

						{/* CTA Buttons */}
						<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
							<Link href='/create-transaction'>
								<Button
									size='lg'
									className='w-full sm:w-auto px-8 py-6 text-lg bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] hover:shadow-2xl hover:scale-105 transition-all duration-300'
								>
									<span className='flex items-center gap-2'>
										Create Transaction
										<svg
											className='w-5 h-5'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M13 7l5 5m0 0l-5 5m5-5H6'
											/>
										</svg>
									</span>
								</Button>
							</Link>
							<Link href='/how-it-works'>
								<Button
									variant='outline'
									size='lg'
									className='w-full sm:w-auto px-8 py-6 text-lg border-2 border-[#0d4d7d] text-[#0d4d7d] hover:bg-[#0d4d7d] hover:text-white transition-all duration-300'
								>
									How It Works
								</Button>
							</Link>
						</div>

						{/* Trust Metrics */}
						<div className='grid grid-cols-3 gap-6 md:gap-12 max-w-3xl mx-auto pt-12 border-t border-gray-200'>
							{[
								{ value: "24-72h", label: "Secure Holding Period" },
								{ value: "100%", label: "Buyer Protection" },
								{ value: "₦0", label: "Setup Fees" },
							].map(({ value, label }) => (
								<div key={label} className='text-center'>
									<div className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] bg-clip-text text-transparent mb-2'>
										{value}
									</div>
									<div className='text-sm md:text-base text-gray-600 font-medium'>
										{label}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className='py-20 md:py-32 bg-white relative'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
							How PayHold Works
						</h2>
						<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
							Four simple steps to secure, worry-free transactions.
							<br />
							<Link
								href='/how-it-works'
								className='text-[#0d4d7d] hover:underline'
							>
								click for complete process..
							</Link>
						</p>
					</div>

					<div className='max-w-6xl mx-auto'>
						<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
							{[
								{
									step: "01",
									title: "Buyer Pays Platform",
									description:
										"Buyer creates transaction and pays the total amount to our secure escrow platform",
									icon: (
										<svg
											className='w-10 h-10'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
											/>
										</svg>
									),
									color: "#0d4d7d",
								},
								{
									step: "02",
									title: "Seller Ships Item",
									description:
										"Seller receives notification and ships the goods to PayHold for verification",
									icon: (
										<svg
											className='w-10 h-10'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
											/>
										</svg>
									),
									color: "#1a7a4a",
								},
								{
									step: "03",
									title: "We Verify & Dispatch",
									description:
										"We inspect the item, confirm it matches description, then dispatch to buyer",
									icon: (
										<svg
											className='w-10 h-10'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
										>
											<path d='M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z' />
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0'
											/>
										</svg>
									),
									color: "#0d4d7d",
								},
								{
									step: "04",
									title: "Payment Released",
									description:
										"After buyer confirms delivery, we automatically release payment to the seller",
									icon: (
										<svg
											className='w-10 h-10'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
											/>
										</svg>
									),
									color: "#1a7a4a",
								},
							].map((item, index) => (
								<div
									key={item.step}
									className='relative group hover:scale-105 transition-transform duration-300'
									style={{ animationDelay: `${index * 100}ms` }}
								>
									<div className='bg-white border-2 border-gray-100 rounded-2xl p-8 h-full hover:border-[#0d4d7d]/30 hover:shadow-xl transition-all duration-300'>
										<div className='text-6xl font-bold text-gray-100 mb-4'>
											{item.step}
										</div>
										<div
											className='inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 transition-all duration-300 group-hover:scale-110'
											style={{
												backgroundColor: `${item.color}15`,
												color: item.color,
											}}
										>
											{item.icon}
										</div>
										<h3 className='text-xl font-bold text-gray-900 mb-3'>
											{item.title}
										</h3>
										<p className='text-gray-600 leading-relaxed'>
											{item.description}
										</p>
									</div>
									{index < 3 && (
										<div className='hidden lg:block absolute top-20 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] opacity-30' />
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Why Choose PayHold — carousel on mobile, grid on desktop */}
			<WhyChooseSection />

			{/* Dispatcher Program */}
			<section className='py-20 md:py-32 bg-white'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='max-w-5xl mx-auto'>
						<div className='bg-gradient-to-br from-[#0d4d7d] to-[#1a7a4a] rounded-3xl p-8 md:p-12 lg:p-16 text-white relative overflow-hidden'>
							<div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl' />
							<div className='absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl' />

							<div className='relative z-10'>
								<div className='text-center mb-12'>
									<h2 className='text-4xl md:text-5xl font-bold mb-4'>
										Join Our Dispatcher Network
									</h2>
									<p className='text-xl text-white/90 max-w-3xl mx-auto'>
										Earn money delivering packages in your area. Simple USSD
										activation makes it easy to get started.
									</p>
								</div>

								<div className='bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20'>
									<div className='text-center'>
										<p className='text-white/90 text-lg mb-4'>
											Dial to Activate
										</p>
										<div className='text-6xl md:text-7xl font-bold mb-4 tracking-wider'>
											*432#
										</div>
										<p className='text-white/80'>
											Available for bike and car dispatchers
										</p>
									</div>
								</div>

								<div className='grid md:grid-cols-2 gap-6 mb-8'>
									{[
										{
											emoji: "📱",
											title: "Simple Activation",
											desc: "Dial *565# to instantly activate your availability status on the PayHold platform",
										},
										{
											emoji: "🔄",
											title: "Fair Distribution",
											desc: "Automatic rotation system ensures fair job distribution among all active dispatchers",
										},
										{
											emoji: "💵",
											title: "Competitive Rates",
											desc: "Earn competitive rates for every delivery with weekly payouts directly to your account",
										},
										{
											emoji: "⭐",
											title: "Build Your Rating",
											desc: "Quality service leads to better ratings, which means more delivery opportunities",
										},
									].map(({ emoji, title, desc }) => (
										<div
											key={title}
											className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20'
										>
											<div className='text-3xl mb-3'>{emoji}</div>
											<h3 className='text-xl font-bold mb-2'>{title}</h3>
											<p className='text-white/90'>{desc}</p>
										</div>
									))}
								</div>

								<div className='text-center'>
									<Link href='/for-dispatchers'>
										<Button
											size='lg'
											className='bg-white text-[#0d4d7d] hover:bg-white/90 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-semibold'
										>
											Learn More About Dispatcher Program
										</Button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className='py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-green-50'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<div className='max-w-4xl mx-auto'>
						<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
							Ready to Transact <span className='text-[#0d4d7d]'>Safely</span>?
						</h2>
						<p className='text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto'>
							Join thousands of Nigerians who buy and sell with complete
							confidence and protection
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Link href='/create-transaction'>
								<Button
									size='lg'
									className='w-full sm:w-auto px-10 py-6 text-lg bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] hover:shadow-2xl hover:scale-105 transition-all duration-300'
								>
									Create Your First Transaction
								</Button>
							</Link>
							<Link href='/for-dispatchers'>
								<Button
									variant='outline'
									size='lg'
									className='w-full sm:w-auto px-10 py-6 text-lg border-2 border-[#1a7a4a] text-[#1a7a4a] hover:bg-[#1a7a4a] hover:text-white transition-all duration-300'
								>
									Become a Dispatcher
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className='bg-gray-900 text-gray-300 py-16'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
						{/* Brand */}
						<div className='lg:col-span-1'>
							<div className='text-3xl font-bold mb-4'>
								<span className='text-[#0d4d7d]'>Pay</span>
								<span className='text-[#1a7a4a]'>Hold</span>
							</div>
							<p className='text-gray-400 mb-4 leading-relaxed'>
								Secure payment and delivery platform for Nigeria. Buy and sell
								locally with complete confidence.
							</p>
							<div className='flex gap-4'>
								<a
									href='https://x.com/payholdhq'
									className='w-10 h-10 bg-gray-800 hover:bg-[#0d4d7d] rounded-lg flex items-center justify-center transition-colors'
								>
									<svg
										className='w-5 h-5'
										fill='currentColor'
										viewBox='0 0 24 24'
									>
										<path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
									</svg>
								</a>
								<a
									href='https://www.instagram.com/payholdhq/'
									className='w-10 h-10 bg-gray-800 hover:bg-[#7d0f0079] rounded-lg flex items-center justify-center transition-colors'
								>
									<svg
										className='w-5 h-5'
										fill='currentColor'
										viewBox='0 0 24 24'
									>
										<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
									</svg>
								</a>
							</div>
						</div>

						{/* Company */}
						<div>
							<h4 className='font-bold text-white mb-4 text-lg'>Company</h4>
							<ul className='space-y-3'>
								{[
									{ label: "About Us", href: "/about" },
									{ label: "How It Works", href: "/how-it-works" },
									{ label: "For Dispatchers", href: "/for-dispatchers" },
									{ label: "Contact Us", href: "/contact" },
								].map(({ label, href }) => (
									<li key={label}>
										<Link
											href={href}
											className='text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block'
										>
											{label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Legal */}
						<div>
							<h4 className='font-bold text-white mb-4 text-lg'>Legal</h4>
							<ul className='space-y-3'>
								{[
									{ label: "Terms & Conditions", href: "/terms" },
									{ label: "Privacy Policy", href: "/privacy-policy" },
									{ label: "Refund Policy", href: "/refund-policy" },
									{ label: "Dispute Resolution", href: "/dispute-resolution" },
								].map(({ label, href }) => (
									<li key={label}>
										<Link
											href={href}
											className='text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block'
										>
											{label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Contact */}
						<div>
							<h4 className='font-bold text-white mb-4 text-lg'>
								Get in Touch
							</h4>
							<ul className='space-y-3 text-gray-400'>
								{[
									{
										icon: (
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
											/>
										),
										text: "payholdit@gmail.com",
									},
									{
										icon: (
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
											/>
										),
										text: "+234 800 000 0000",
									},
									{
										icon: (
											<>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
												/>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
												/>
											</>
										),
										text: "Lagos, Nigeria",
									},
								].map(({ icon, text }) => (
									<li key={text} className='flex items-start gap-2'>
										<svg
											className='w-5 h-5 text-[#1a7a4a] mt-0.5 shrink-0'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											{icon}
										</svg>
										<span>{text}</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className='pt-8 border-t border-gray-800'>
						<p className='text-gray-400 text-sm text-center md:text-left'>
							&copy; 2026 PayHold. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
