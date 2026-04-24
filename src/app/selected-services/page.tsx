"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const services = [
	{
		id: "commerce",
		href: "/dashboard",
		label: "Commerce Escrow",
		tag: "LIVE · MVP",
		tagColor: "#1a7a4a",
		headline: "Buy & sell physical goods safely.",
		sub: "We hold payment, verify goods, dispatch via our courier network, and release funds on delivery confirmation.",
		stats: [
			{ value: "24-72h", label: "Hold window" },
			{ value: "₦0", label: "Setup fee" },
			{ value: "48h", label: "Dispute window" },
		],
		features: [
			"Secure escrow payment",
			"Physical goods verification",
			"Verified dispatcher network",
			"Real-time tracking",
			"Dispute resolution",
			"USSD activation (*565#)",
		],
		accentColor: "#0d4d7d",
		accentGlow: "rgba(13,77,125,0.12)",
		borderActive: "#0d4d7d",
		comingSoon: false,
		icon: (
			<svg viewBox='0 0 32 32' fill='none' className='w-8 h-8'>
				<path
					d='M4 8h24v16a2 2 0 01-2 2H6a2 2 0 01-2-2V8z'
					stroke='#0d4d7d'
					strokeWidth='1.5'
					fill='none'
				/>
				<path
					d='M4 8l4-4h16l4 4'
					stroke='#0d4d7d'
					strokeWidth='1.5'
					strokeLinejoin='round'
					fill='none'
				/>
				<path
					d='M12 16l3 3 5-5'
					stroke='#1a7a4a'
					strokeWidth='1.8'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		),
	},
	{
		id: "property",
		href: "/properties",
		label: "Property Management",
		tag: "PREVIEW",
		tagColor: "#c9a84c",
		headline: "Rent, lease, and buy property with zero fraud.",
		sub: "Escrow for real estate deals, agent commissions, lease agreements, and property deposits. Money moves only when both sides agree.",
		stats: [
			{ value: "₦0", label: "Setup fee" },
			{ value: "100%", label: "Deposit protection" },
			{ value: "Smart", label: "Contracts" },
		],
		features: [
			"Rent & lease escrow",
			"Agent commission protection",
			"Property deposit holding",
			"Buy/sell deal structuring",
			"Legal document vault",
			"Multi-party deal flow",
		],
		accentColor: "#92400e",
		accentGlow: "rgba(146,64,14,0.1)",
		borderActive: "#c9a84c",
		comingSoon: false,
		icon: (
			<svg viewBox='0 0 32 32' fill='none' className='w-8 h-8'>
				<path
					d='M3 14L16 4l13 10v14a1 1 0 01-1 1H4a1 1 0 01-1-1V14z'
					stroke='#92400e'
					strokeWidth='1.5'
					fill='none'
					strokeLinejoin='round'
				/>
				<path
					d='M12 28V20h8v8'
					stroke='#92400e'
					strokeWidth='1.5'
					strokeLinejoin='round'
				/>
				<path
					d='M10 12h4v4h-4z'
					stroke='#c9a84c'
					strokeWidth='1.2'
					fill='none'
				/>
			</svg>
		),
	},
];

export default function ServiceSelectPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [selected, setSelected] = useState<string | null>(null);
	const [hovering, setHovering] = useState<string | null>(null);
	const [navigating, setNavigating] = useState(false);

	const handleSelect = (service: (typeof services)[0]) => {
		if (service.comingSoon) return;
		setSelected(service.id);
		setNavigating(true);
		setTimeout(() => router.push(service.href), 600);
	};

	const firstName = session?.user?.name?.split(" ")[0] ?? "there";

	if (status === "loading") {
		return (
			<div className='min-h-screen bg-[#080808] flex items-center justify-center'>
				<div className='flex flex-col items-center gap-4'>
					<div className='w-8 h-8 border border-[#0d4d7d] border-t-transparent rounded-full animate-spin' />
					<p className='text-[#444] text-sm font-mono tracking-widest uppercase text-xs'>
						Loading
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-[#080808] flex flex-col relative overflow-hidden'>
			{/* ── Ambient background ── */}
			<div className='absolute inset-0 pointer-events-none'>
				<div className='absolute top-0 left-[20%] w-[600px] h-[400px] bg-[#0d4d7d]/6 rounded-full blur-[120px]' />
				<div className='absolute bottom-0 right-[10%] w-[500px] h-[300px] bg-[#1a7a4a]/5 rounded-full blur-[100px]' />
				<div
					className='absolute inset-0 opacity-[0.025]'
					style={{
						backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
						backgroundSize: "64px 64px",
					}}
				/>
			</div>

			{/* ── Nav ── */}
			<nav className='relative z-10 flex items-center justify-between px-6 md:px-12 py-6 border-b border-[#111]'>
				<div className='font-serif text-xl tracking-tight'>
					<span className='text-[#e8e8e0]'>Pay</span>
					<span className='text-[#444] italic'>Hold</span>
				</div>
				<div className='flex items-center gap-3'>
					<div className='w-7 h-7 rounded-full bg-gradient-to-br from-[#0d4d7d] to-[#1a7a4a] flex items-center justify-center text-white text-xs font-bold'>
						{firstName[0]?.toUpperCase()}
					</div>
					<span className='text-[#555] text-sm font-light hidden sm:block'>
						{session?.user?.email}
					</span>
				</div>
			</nav>

			{/* ── Hero copy ── */}
			<div className='relative z-10 text-center pt-16 pb-12 px-6'>
				<div className='inline-flex items-center gap-2 border border-[#1c1c1c] rounded-full px-4 py-1.5 mb-8'>
					<div className='w-1.5 h-1.5 rounded-full bg-[#1a7a4a] animate-pulse' />
					<span className='text-[#555] text-xs font-mono tracking-widest uppercase'>
						Welcome back, {firstName}
					</span>
				</div>

				<h1 className='text-4xl md:text-5xl lg:text-6xl font-serif text-[#e8e8e0] leading-[1.08] tracking-tight mb-5'>
					What are you
					<br />
					<em
						className='italic text-[#c9a84c] not-italic'
						style={{ fontStyle: "italic" }}
					>
						transacting
					</em>{" "}
					today?
				</h1>
				<p className='text-[#444] text-base md:text-lg font-light max-w-md mx-auto leading-relaxed'>
					Choose your service. PayHold is the trust layer — whatever you&apos;re
					moving, we protect it.
				</p>
			</div>

			{/* ── Service cards ── */}
			<div className='relative z-10 flex-1 flex items-start justify-center px-4 sm:px-6 pb-16'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl'>
					{services.map((service, i) => {
						const isHovered = hovering === service.id;
						const isSelected = selected === service.id;
						const isComingSoon = service.comingSoon;

						return (
							<button
								key={service.id}
								onClick={() => handleSelect(service)}
								onMouseEnter={() => setHovering(service.id)}
								onMouseLeave={() => setHovering(null)}
								disabled={isComingSoon || navigating}
								className='text-left group relative rounded-2xl border transition-all duration-300 overflow-hidden'
								style={{
									background: isHovered ? "#0d0d0d" : "#090909",
									borderColor: isSelected
										? service.borderActive
										: isHovered
											? service.id === "property"
												? "#c9a84c40"
												: "#2a2a2a"
											: "#141414",
									transform: isHovered ? "translateY(-2px)" : "translateY(0)",
									animationDelay: `${i * 80}ms`,
									opacity: navigating && !isSelected ? 0.4 : 1,
									cursor: isComingSoon ? "default" : "pointer",
									boxShadow:
										isHovered && service.id === "property"
											? "0 20px 60px rgba(201,168,76,0.06)"
											: "none",
								}}
							>
								{/* Top gradient line */}
								<div
									className='absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300'
									style={{
										background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)`,
										opacity: isHovered ? 1 : 0.3,
									}}
								/>

								{/* Glow */}
								{isHovered && (
									<div
										className='absolute inset-0 pointer-events-none rounded-2xl'
										style={{
											background: `radial-gradient(ellipse at 30% 0%, ${service.accentGlow}, transparent 70%)`,
										}}
									/>
								)}

								<div className='relative p-7 md:p-8'>
									{/* Header */}
									<div className='flex items-start justify-between mb-6'>
										<div
											className='w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300'
											style={{
												background: isHovered
													? `${service.accentColor}18`
													: "#111",
												transform: isHovered ? "scale(1.05)" : "scale(1)",
											}}
										>
											{service.icon}
										</div>
										<span
											className='text-[10px] font-mono font-semibold tracking-widest px-2.5 py-1 rounded-full border'
											style={{
												color: service.tagColor,
												borderColor: `${service.tagColor}40`,
												background: `${service.tagColor}10`,
											}}
										>
											{service.tag}
										</span>
									</div>

									{/* Title */}
									<div className='mb-1'>
										<span className='text-[10px] font-mono text-[#333] tracking-[0.16em] uppercase'>
											{service.label}
										</span>
									</div>
									<h2 className='text-xl md:text-2xl font-serif text-[#e8e8e0] leading-tight mb-3 tracking-tight'>
										{service.headline}
									</h2>
									<p className='text-[#444] text-sm font-light leading-relaxed mb-7'>
										{service.sub}
									</p>

									{/* Stats */}
									<div className='grid grid-cols-3 gap-3 mb-7 pb-7 border-b border-[#141414]'>
										{service.stats.map((stat) => (
											<div key={stat.label}>
												<div
													className='text-lg font-serif font-semibold tracking-tight'
													style={{ color: service.accentColor }}
												>
													{stat.value}
												</div>
												<div className='text-[10px] text-[#333] font-mono uppercase tracking-wider mt-0.5'>
													{stat.label}
												</div>
											</div>
										))}
									</div>

									{/* Features */}
									<div className='grid grid-cols-2 gap-y-2 gap-x-4 mb-8'>
										{service.features.map((f) => (
											<div key={f} className='flex items-center gap-2'>
												<div
													className='w-1 h-1 rounded-full flex-shrink-0'
													style={{ background: service.accentColor }}
												/>
												<span className='text-[11px] text-[#3a3a3a] font-light'>
													{f}
												</span>
											</div>
										))}
									</div>

									{/* CTA */}
									<div
										className='flex items-center justify-between rounded-xl px-5 py-3.5 transition-all duration-300'
										style={{
											background: isHovered ? service.accentColor : "#111",
											border: `1px solid ${isHovered ? "transparent" : "#1c1c1c"}`,
										}}
									>
										<span
											className='text-sm font-medium tracking-wide transition-colors duration-300'
											style={{
												color: isHovered ? "#fff" : "#3a3a3a",
											}}
										>
											{isSelected && navigating
												? "Entering..."
												: service.id === "property"
													? "Explore Properties"
													: "Enter dashboard"}
										</span>
										<svg
											viewBox='0 0 16 16'
											fill='none'
											className='w-4 h-4 transition-all duration-300'
											style={{
												stroke: isHovered ? "#fff" : "#3a3a3a",
												transform: isHovered
													? "translateX(3px)"
													: "translateX(0)",
											}}
										>
											<path
												d='M3 8h10M9 4l4 4-4 4'
												strokeWidth='1.5'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</div>
								</div>
							</button>
						);
					})}
				</div>
			</div>

			{/* ── Footer ── */}
			<div className='relative z-10 text-center pb-8 px-6'>
				<p className='text-[#222] text-xs font-mono tracking-widest uppercase'>
					PayHold · Trust Infrastructure for African Commerce
				</p>
			</div>
		</div>
	);
}
