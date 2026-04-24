/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { useRef, useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

type DealType = "rent" | "lease" | "buy" | "sell";

interface Listing {
	id: string;
	type: DealType;
	title: string;
	location: string;
	price: string;
	period?: string;
	beds: number;
	baths: number;
	sqm: number;
	tag: string;
	tagColor: string;
	accentColor: string;
	verified: boolean;
	escrowReady: boolean;
}

// ─── Mock Listings ──────────────────────────────────────────────────────────

const listings: Listing[] = [
	{
		id: "1",
		type: "rent",
		title: "Executive Penthouse",
		location: "Victoria Island, Lagos",
		price: "₦4,500,000",
		period: "/yr",
		beds: 4,
		baths: 3,
		sqm: 320,
		tag: "FOR RENT",
		tagColor: "#0d4d7d",
		accentColor: "#0d4d7d",
		verified: true,
		escrowReady: true,
	},
	{
		id: "2",
		type: "buy",
		title: "Luxury Terrace Duplex",
		location: "Lekki Phase 1, Lagos",
		price: "₦185,000,000",
		beds: 5,
		baths: 4,
		sqm: 480,
		tag: "FOR SALE",
		tagColor: "#1a7a4a",
		accentColor: "#1a7a4a",
		verified: true,
		escrowReady: true,
	},
	{
		id: "3",
		type: "lease",
		title: "Commercial Office Space",
		location: "Ikoyi, Lagos",
		price: "₦12,000,000",
		period: "/yr",
		beds: 0,
		baths: 2,
		sqm: 650,
		tag: "LEASE",
		tagColor: "#92400e",
		accentColor: "#c9a84c",
		verified: true,
		escrowReady: true,
	},
	{
		id: "4",
		type: "rent",
		title: "Modern 3-Bed Apartment",
		location: "Ajah, Lagos",
		price: "₦1,800,000",
		period: "/yr",
		beds: 3,
		baths: 2,
		sqm: 185,
		tag: "FOR RENT",
		tagColor: "#0d4d7d",
		accentColor: "#0d4d7d",
		verified: false,
		escrowReady: true,
	},
	{
		id: "5",
		type: "sell",
		title: "Detached Bungalow + BQ",
		location: "Abuja, Maitama",
		price: "₦95,000,000",
		beds: 4,
		baths: 3,
		sqm: 290,
		tag: "FOR SALE",
		tagColor: "#1a7a4a",
		accentColor: "#1a7a4a",
		verified: true,
		escrowReady: false,
	},
	{
		id: "6",
		type: "lease",
		title: "Warehouse & Storage",
		location: "Apapa, Lagos",
		price: "₦8,500,000",
		period: "/yr",
		beds: 0,
		baths: 1,
		sqm: 1200,
		tag: "LEASE",
		tagColor: "#92400e",
		accentColor: "#c9a84c",
		verified: true,
		escrowReady: true,
	},
];

// ─── Deal Type Filter ────────────────────────────────────────────────────────

const dealFilters: { id: DealType | "all"; label: string }[] = [
	{ id: "all", label: "All Properties" },
	{ id: "rent", label: "Rent" },
	{ id: "buy", label: "Buy" },
	{ id: "lease", label: "Lease" },
	{ id: "sell", label: "Sell" },
];

// ─── How It Works Steps ──────────────────────────────────────────────────────

const howItWorks = [
	{
		step: "01",
		title: "List or Browse",
		desc: "Agents and landlords list verified properties. Buyers and renters browse with full transparency on price, condition, and history.",
		icon: (
			<svg viewBox='0 0 24 24' fill='none' className='w-6 h-6'>
				<path
					d='M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinejoin='round'
				/>
				<path
					d='M9 22V12h6v10'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinejoin='round'
				/>
			</svg>
		),
		accentColor: "#0d4d7d",
	},
	{
		step: "02",
		title: "Deposit into Escrow",
		desc: "Caution fee, rent, or purchase deposit goes into PayHold escrow instantly. No agent touches the money until conditions are met.",
		icon: (
			<svg viewBox='0 0 24 24' fill='none' className='w-6 h-6'>
				<rect
					x='2'
					y='7'
					width='20'
					height='14'
					rx='2'
					stroke='currentColor'
					strokeWidth='1.5'
				/>
				<path
					d='M16 3H8L2 7h20l-6-4z'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinejoin='round'
				/>
				<path
					d='M12 12v4m-2-2h4'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
				/>
			</svg>
		),
		accentColor: "#1a7a4a",
	},
	{
		step: "03",
		title: "Verify & Inspect",
		desc: "Our team verifies title documents, inspection reports, and agent credentials. All documents stored in PayHold's legal vault.",
		icon: (
			<svg viewBox='0 0 24 24' fill='none' className='w-6 h-6'>
				<path
					d='M9 12l2 2 4-4'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M12 2L4 6v6c0 5.5 3.5 10.7 8 12 4.5-1.3 8-6.5 8-12V6l-8-4z'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinejoin='round'
				/>
			</svg>
		),
		accentColor: "#c9a84c",
	},
	{
		step: "04",
		title: "Keys & Release",
		desc: "Once both parties confirm, keys are handed over and funds released to the agent or landlord. Dispute window: 72 hours.",
		icon: (
			<svg viewBox='0 0 24 24' fill='none' className='w-6 h-6'>
				<path
					d='M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		),
		accentColor: "#1a7a4a",
	},
];

// ─── Stats ───────────────────────────────────────────────────────────────────

const stats = [
	{ value: "₦0", label: "Setup Fee", sub: "Always free to list" },
	{ value: "72h", label: "Dispute Window", sub: "Post-handover protection" },
	{ value: "100%", label: "Deposit Safety", sub: "Escrow-backed guarantee" },
	{ value: "48h", label: "Verification", sub: "Title & agent checks" },
];

// ─── Listing Card ────────────────────────────────────────────────────────────

function ListingCard({ listing }: { listing: Listing }) {
	const [hovered, setHovered] = useState(false);

	return (
		<div
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className='relative rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer'
			style={{
				background: hovered ? "#0d0d0d" : "#090909",
				borderColor: hovered ? listing.accentColor + "50" : "#141414",
				transform: hovered ? "translateY(-3px)" : "translateY(0)",
				boxShadow: hovered ? `0 20px 60px ${listing.accentColor}15` : "none",
			}}
		>
			{/* Top accent line */}
			<div
				className='absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300'
				style={{
					background: `linear-gradient(90deg, transparent, ${listing.accentColor}, transparent)`,
					opacity: hovered ? 1 : 0.25,
				}}
			/>

			{/* Property visual placeholder */}
			<div
				className='relative h-44 overflow-hidden'
				style={{ background: "#0d0d0d" }}
			>
				{/* Abstract property illustration */}
				<svg
					viewBox='0 0 400 176'
					className='w-full h-full'
					preserveAspectRatio='xMidYMid slice'
				>
					<defs>
						<linearGradient
							id={`grad-${listing.id}`}
							x1='0'
							y1='0'
							x2='1'
							y2='1'
						>
							<stop
								offset='0%'
								stopColor={listing.accentColor}
								stopOpacity='0.15'
							/>
							<stop
								offset='100%'
								stopColor={listing.accentColor}
								stopOpacity='0.03'
							/>
						</linearGradient>
					</defs>
					<rect width='400' height='176' fill={`url(#grad-${listing.id})`} />
					{/* Abstract building */}
					<rect
						x='60'
						y='60'
						width='80'
						height='116'
						fill={listing.accentColor}
						fillOpacity='0.08'
						rx='2'
					/>
					<rect
						x='70'
						y='40'
						width='60'
						height='20'
						fill={listing.accentColor}
						fillOpacity='0.12'
						rx='1'
					/>
					<rect
						x='75'
						y='75'
						width='14'
						height='18'
						fill={listing.accentColor}
						fillOpacity='0.2'
						rx='1'
					/>
					<rect
						x='97'
						y='75'
						width='14'
						height='18'
						fill={listing.accentColor}
						fillOpacity='0.2'
						rx='1'
					/>
					<rect
						x='75'
						y='103'
						width='14'
						height='18'
						fill={listing.accentColor}
						fillOpacity='0.2'
						rx='1'
					/>
					<rect
						x='97'
						y='103'
						width='14'
						height='18'
						fill={listing.accentColor}
						fillOpacity='0.2'
						rx='1'
					/>
					<rect
						x='85'
						y='130'
						width='30'
						height='46'
						fill={listing.accentColor}
						fillOpacity='0.15'
						rx='1'
					/>
					{/* Second building */}
					<rect
						x='180'
						y='30'
						width='120'
						height='146'
						fill={listing.accentColor}
						fillOpacity='0.05'
						rx='2'
					/>
					<rect
						x='190'
						y='20'
						width='100'
						height='14'
						fill={listing.accentColor}
						fillOpacity='0.1'
						rx='1'
					/>
					{[0, 1, 2, 3].map((row) =>
						[0, 1, 2, 3].map((col) => (
							<rect
								key={`${row}-${col}`}
								x={193 + col * 23}
								y={38 + row * 28}
								width='14'
								height='18'
								fill={listing.accentColor}
								fillOpacity='0.15'
								rx='1'
							/>
						)),
					)}
					<rect
						x='225'
						y='130'
						width='30'
						height='46'
						fill={listing.accentColor}
						fillOpacity='0.12'
						rx='1'
					/>
					{/* Grid lines */}
					{[0, 1, 2, 3, 4, 5].map((i) => (
						<line
							key={i}
							x1={i * 80}
							y1='0'
							x2={i * 80}
							y2='176'
							stroke={listing.accentColor}
							strokeOpacity='0.04'
							strokeWidth='1'
						/>
					))}
					{[0, 1, 2].map((i) => (
						<line
							key={i}
							x1='0'
							y1={i * 88}
							x2='400'
							y2={i * 88}
							stroke={listing.accentColor}
							strokeOpacity='0.04'
							strokeWidth='1'
						/>
					))}
				</svg>

				{/* Tag */}
				<div className='absolute top-3 left-3'>
					<span
						className='text-[9px] font-mono font-bold tracking-[0.18em] px-2.5 py-1 rounded-full border'
						style={{
							color: listing.tagColor,
							borderColor: listing.tagColor + "50",
							background: listing.tagColor + "15",
						}}
					>
						{listing.tag}
					</span>
				</div>

				{/* Badges */}
				<div className='absolute top-3 right-3 flex flex-col gap-1.5 items-end'>
					{listing.verified && (
						<div className='flex items-center gap-1 bg-[#1a7a4a]/20 border border-[#1a7a4a]/30 rounded-full px-2 py-0.5'>
							<div className='w-1.5 h-1.5 rounded-full bg-[#1a7a4a]' />
							<span className='text-[8px] font-mono text-[#1a7a4a] tracking-wider'>
								VERIFIED
							</span>
						</div>
					)}
					{listing.escrowReady && (
						<div className='flex items-center gap-1 bg-[#0d4d7d]/20 border border-[#0d4d7d]/30 rounded-full px-2 py-0.5'>
							<div className='w-1.5 h-1.5 rounded-full bg-[#4a9fd4]' />
							<span className='text-[8px] font-mono text-[#4a9fd4] tracking-wider'>
								ESCROW READY
							</span>
						</div>
					)}
				</div>
			</div>

			<div className='p-5'>
				<div className='mb-3'>
					<h3 className='text-[#e8e8e0] font-serif text-lg leading-tight tracking-tight mb-1'>
						{listing.title}
					</h3>
					<div className='flex items-center gap-1.5'>
						<svg
							viewBox='0 0 16 16'
							fill='none'
							className='w-3 h-3 shrink-0'
							style={{ color: listing.accentColor }}
						>
							<path
								d='M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.5-2-4.5-4.5-4.5z'
								stroke='currentColor'
								strokeWidth='1.2'
								fill='none'
							/>
							<circle
								cx='8'
								cy='6'
								r='1.5'
								stroke='currentColor'
								strokeWidth='1.2'
								fill='none'
							/>
						</svg>
						<span className='text-[#444] text-xs font-light'>
							{listing.location}
						</span>
					</div>
				</div>

				{/* Price */}
				<div className='flex items-baseline gap-1 mb-4'>
					<span
						className='text-2xl font-serif font-semibold tracking-tight'
						style={{ color: listing.accentColor }}
					>
						{listing.price}
					</span>
					{listing.period && (
						<span className='text-[#333] text-xs font-mono'>
							{listing.period}
						</span>
					)}
				</div>

				{/* Specs */}
				<div className='flex items-center gap-4 pb-4 mb-4 border-b border-[#141414]'>
					{listing.beds > 0 && (
						<div className='flex items-center gap-1.5'>
							<svg
								viewBox='0 0 16 16'
								fill='none'
								className='w-3.5 h-3.5 text-[#333]'
							>
								<path
									d='M1 11V6a2 2 0 012-2h10a2 2 0 012 2v5M1 11h14M1 11v2m14-2v2M3 9h10'
									stroke='currentColor'
									strokeWidth='1.2'
									strokeLinecap='round'
								/>
							</svg>
							<span className='text-[#444] text-xs font-mono'>
								{listing.beds} bed
							</span>
						</div>
					)}
					{listing.type === "lease" && (
						<div className='flex items-center gap-1.5'>
							<svg
								viewBox='0 0 16 16'
								fill='none'
								className='w-3.5 h-3.5 text-[#333]'
							>
								<rect
									x='2'
									y='2'
									width='12'
									height='12'
									rx='1'
									stroke='currentColor'
									strokeWidth='1.2'
								/>
								<path
									d='M5 8h6M8 5v6'
									stroke='currentColor'
									strokeWidth='1.2'
									strokeLinecap='round'
								/>
							</svg>
							<span className='text-[#444] text-xs font-mono'>Commercial</span>
						</div>
					)}
					<div className='flex items-center gap-1.5'>
						<svg
							viewBox='0 0 16 16'
							fill='none'
							className='w-3.5 h-3.5 text-[#333]'
						>
							<path
								d='M2 14l4-4m0 0l2-6 2 6m0 0l4 4M8 4a1 1 0 100-2 1 1 0 000 2z'
								stroke='currentColor'
								strokeWidth='1.2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						<span className='text-[#444] text-xs font-mono'>
							{listing.baths} bath
						</span>
					</div>
					<div className='flex items-center gap-1.5'>
						<svg
							viewBox='0 0 16 16'
							fill='none'
							className='w-3.5 h-3.5 text-[#333]'
						>
							<rect
								x='2'
								y='2'
								width='12'
								height='12'
								rx='1'
								stroke='currentColor'
								strokeWidth='1.2'
							/>
						</svg>
						<span className='text-[#444] text-xs font-mono'>
							{listing.sqm}m²
						</span>
					</div>
				</div>

				{/* CTA */}
				<div
					className='flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300'
					style={{
						background: hovered ? listing.accentColor : "#111",
						border: `1px solid ${hovered ? "transparent" : "#1c1c1c"}`,
					}}
				>
					<span
						className='text-xs font-medium tracking-wide transition-colors duration-300'
						style={{ color: hovered ? "#fff" : "#3a3a3a" }}
					>
						View & Secure Deal
					</span>
					<svg
						viewBox='0 0 16 16'
						fill='none'
						className='w-3.5 h-3.5 transition-all duration-300'
						style={{
							stroke: hovered ? "#fff" : "#3a3a3a",
							transform: hovered ? "translateX(3px)" : "translateX(0)",
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
		</div>
	);
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PropertyPage() {
	const [activeFilter, setActiveFilter] = useState<DealType | "all">("all");
	const [searchVal, setSearchVal] = useState("");
	const listingsRef = useRef<HTMLDivElement>(null);

	const filtered = listings.filter((l) => {
		const matchType = activeFilter === "all" || l.type === activeFilter;
		const matchSearch =
			searchVal === "" ||
			l.title.toLowerCase().includes(searchVal.toLowerCase()) ||
			l.location.toLowerCase().includes(searchVal.toLowerCase());
		return matchType && matchSearch;
	});

	return (
		<div className='min-h-screen bg-[#080808] flex flex-col relative overflow-x-hidden'>
			{/* ── Ambient ── */}
			<div className='fixed inset-0 pointer-events-none z-0'>
				<div className='absolute top-0 left-[15%] w-[700px] h-[500px] bg-[#0d4d7d]/5 rounded-full blur-[140px]' />
				<div className='absolute top-[30%] right-[5%] w-[500px] h-[400px] bg-[#1a7a4a]/4 rounded-full blur-[120px]' />
				<div className='absolute bottom-0 left-[30%] w-[600px] h-[300px] bg-[#c9a84c]/3 rounded-full blur-[100px]' />
				<div
					className='absolute inset-0 opacity-[0.02]'
					style={{
						backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
						backgroundSize: "64px 64px",
					}}
				/>
			</div>

			{/* ── Nav ── */}
			<nav className='relative z-20 flex items-center justify-between px-6 md:px-12 py-6 border-b border-[#111]'>
				<Link href='/' className='font-serif text-xl tracking-tight'>
					<span className='text-[#e8e8e0]'>Pay</span>
					<span className='text-[#444] italic'>Hold</span>
				</Link>
				<div className='flex items-center gap-3'>
					<div className='w-px h-4 bg-[#1a1a1a]' />
					<Link href='/login'>
						<button className='text-xs font-mono tracking-widest uppercase px-4 py-2 rounded-lg border border-[#1c1c1c] text-[#444] hover:border-[#0d4d7d] hover:text-[#0d4d7d] transition-all duration-200'>
							Sign In
						</button>
					</Link>
				</div>
			</nav>

			{/* ── Hero ── */}
			<section className='relative z-10 pt-20 pb-16 px-6 md:px-12 lg:px-20'>
				<div className='max-w-6xl mx-auto'>
					<div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10'>
						<div className='max-w-2xl'>
							{/* Eyebrow */}
							<div className='inline-flex items-center gap-2.5 border border-[#1c1c1c] rounded-full px-4 py-1.5 mb-8'>
								<div className='w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse' />
								<span className='text-[#555] text-[10px] font-mono tracking-[0.2em] uppercase'>
									PayHold · Property Escrow
								</span>
								<div className='w-px h-3 bg-[#222]' />
								<span className='text-[#333] text-[10px] font-mono tracking-wider uppercase'>
									Coming Soon
								</span>
							</div>

							<h1 className='font-serif text-5xl md:text-6xl lg:text-7xl text-[#e8e8e0] leading-[1.05] tracking-tight mb-6'>
								Real Estate.
								<br />
								<em className='text-[#c9a84c]' style={{ fontStyle: "italic" }}>
									Zero Fraud.
								</em>
							</h1>

							<p className='text-[#444] text-lg font-light leading-relaxed max-w-xl mb-8'>
								Rent, lease, buy, or sell property in Nigeria with a trust layer
								that protects every naira. Deposits, caution fees, and purchase
								payments held securely until keys change hands.
							</p>

							{/* Inline trust badges */}
							<div className='flex flex-wrap gap-3'>
								{[
									{ label: "Escrow-Backed Deposits", color: "#0d4d7d" },
									{ label: "Verified Agents", color: "#1a7a4a" },
									{ label: "Legal Vault", color: "#c9a84c" },
									{ label: "72h Dispute Window", color: "#0d4d7d" },
								].map(({ label, color }) => (
									<div
										key={label}
										className='flex items-center gap-2 border rounded-full px-3 py-1.5'
										style={{
											borderColor: color + "30",
											background: color + "08",
										}}
									>
										<div
											className='w-1 h-1 rounded-full'
											style={{ background: color }}
										/>
										<span
											className='text-[10px] font-mono tracking-wider'
											style={{ color: color }}
										>
											{label}
										</span>
									</div>
								))}
							</div>
						</div>

						{/* Stats panel */}
						<div className='grid grid-cols-2 gap-3 lg:w-72 shrink-0'>
							{stats.map(({ value, label, sub }) => (
								<div
									key={label}
									className='rounded-xl border border-[#141414] bg-[#090909] p-4'
								>
									<div className='text-2xl font-serif font-semibold text-[#e8e8e0] tracking-tight mb-0.5'>
										{value}
									</div>
									<div className='text-[10px] font-mono text-[#444] tracking-wider uppercase mb-1'>
										{label}
									</div>
									<div className='text-[10px] text-[#2a2a2a] font-light'>
										{sub}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ── How It Works ── */}
			<section className='relative z-10 py-16 px-6 md:px-12 lg:px-20 border-t border-[#0d0d0d]'>
				<div className='max-w-6xl mx-auto'>
					<div className='flex items-center gap-4 mb-12'>
						<div className='w-6 h-px bg-[#1c1c1c]' />
						<span className='text-[10px] font-mono text-[#333] tracking-[0.2em] uppercase'>
							How Property Escrow Works
						</span>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
						{howItWorks.map((step, i) => (
							<div key={step.step} className='relative group'>
								{/* Connector line */}
								{i < howItWorks.length - 1 && (
									<div
										className='hidden lg:block absolute top-8 left-full w-5 h-px z-10'
										style={{
											background: `linear-gradient(90deg, ${step.accentColor}40, transparent)`,
										}}
									/>
								)}
								<div className='rounded-2xl border border-[#141414] bg-[#090909] p-6 h-full hover:border-[#1c1c1c] transition-all duration-300'>
									<div className='flex items-start justify-between mb-5'>
										<span className='text-5xl font-serif font-bold text-[#111] leading-none'>
											{step.step}
										</span>
										<div
											className='w-10 h-10 rounded-xl flex items-center justify-center'
											style={{
												background: step.accentColor + "15",
												color: step.accentColor,
											}}
										>
											{step.icon}
										</div>
									</div>
									<h3 className='text-[#e8e8e0] font-serif text-base tracking-tight mb-2'>
										{step.title}
									</h3>
									<p className='text-[#333] text-xs font-light leading-relaxed'>
										{step.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── Listings ── */}
			<section
				ref={listingsRef}
				className='relative z-10 py-16 px-6 md:px-12 lg:px-20'
			>
				<div className='max-w-6xl mx-auto'>
					{/* Section header */}
					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10'>
						<div>
							<div className='flex items-center gap-4 mb-2'>
								<div className='w-6 h-px bg-[#1c1c1c]' />
								<span className='text-[10px] font-mono text-[#333] tracking-[0.2em] uppercase'>
									Sample Listings
								</span>
							</div>
							<h2 className='font-serif text-3xl text-[#e8e8e0] tracking-tight'>
								Browse Properties
							</h2>
						</div>

						{/* Search */}
						<div className='relative'>
							<svg
								viewBox='0 0 16 16'
								fill='none'
								className='absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#333]'
							>
								<circle
									cx='7'
									cy='7'
									r='4.5'
									stroke='currentColor'
									strokeWidth='1.2'
								/>
								<path
									d='M10.5 10.5L14 14'
									stroke='currentColor'
									strokeWidth='1.2'
									strokeLinecap='round'
								/>
							</svg>
							<input
								type='text'
								placeholder='Search by title or location...'
								value={searchVal}
								onChange={(e) => setSearchVal(e.target.value)}
								className='pl-9 pr-4 py-2.5 rounded-xl bg-[#0d0d0d] border border-[#1a1a1a] text-[#aaa] text-xs font-light placeholder-[#2a2a2a] focus:outline-none focus:border-[#0d4d7d]/50 transition-colors w-64'
							/>
						</div>
					</div>

					{/* Filters */}
					<div className='flex flex-wrap gap-2 mb-8'>
						{dealFilters.map((f) => (
							<button
								key={f.id}
								onClick={() => setActiveFilter(f.id)}
								className='px-4 py-2 rounded-xl text-xs font-mono tracking-widest uppercase transition-all duration-200 border'
								style={{
									background: activeFilter === f.id ? "#0d4d7d" : "#0d0d0d",
									borderColor: activeFilter === f.id ? "#0d4d7d" : "#1a1a1a",
									color: activeFilter === f.id ? "#fff" : "#333",
								}}
							>
								{f.label}
							</button>
						))}
						<div className='flex items-center gap-2 ml-auto'>
							<span className='text-[10px] font-mono text-[#222] tracking-wider'>
								{filtered.length} PROPERTIES
							</span>
						</div>
					</div>

					{/* Grid */}
					{filtered.length > 0 ? (
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
							{filtered.map((listing) => (
								<ListingCard key={listing.id} listing={listing} />
							))}
						</div>
					) : (
						<div className='text-center py-20'>
							<p className='text-[#222] font-mono text-sm tracking-widest uppercase'>
								No properties found
							</p>
						</div>
					)}
				</div>
			</section>

			{/* ── Deal Types Banner ── */}
			<section className='relative z-10 py-16 px-6 md:px-12 lg:px-20 border-t border-[#0d0d0d]'>
				<div className='max-w-6xl mx-auto'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
						{/* Residential */}
						<div className='rounded-2xl border border-[#141414] bg-[#090909] p-8 relative overflow-hidden group hover:border-[#0d4d7d]/30 transition-all duration-300'>
							<div className='absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl bg-[#0d4d7d]/5 group-hover:bg-[#0d4d7d]/8 transition-all' />
							<div className='relative'>
								<span className='text-[9px] font-mono text-[#0d4d7d] tracking-[0.2em] uppercase border border-[#0d4d7d]/20 bg-[#0d4d7d]/8 px-2.5 py-1 rounded-full'>
									Residential
								</span>
								<h3 className='font-serif text-2xl text-[#e8e8e0] mt-4 mb-3 tracking-tight'>
									Homes, Flats & Apartments
								</h3>
								<p className='text-[#333] text-sm font-light leading-relaxed mb-6'>
									Rent or buy residential property with caution fee and purchase
									deposits held in escrow. No landlord fraud, no agent
									disappearing with your money.
								</p>
								<div className='flex flex-wrap gap-2'>
									{[
										"Caution Fee Escrow",
										"Rent Advance Protection",
										"Title Verification",
									].map((t) => (
										<span
											key={t}
											className='text-[9px] font-mono text-[#2a2a2a] border border-[#1a1a1a] px-2 py-1 rounded-full'
										>
											{t}
										</span>
									))}
								</div>
							</div>
						</div>

						{/* Commercial */}
						<div className='rounded-2xl border border-[#141414] bg-[#090909] p-8 relative overflow-hidden group hover:border-[#c9a84c]/30 transition-all duration-300'>
							<div className='absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl bg-[#c9a84c]/3 group-hover:bg-[#c9a84c]/6 transition-all' />
							<div className='relative'>
								<span className='text-[9px] font-mono text-[#c9a84c] tracking-[0.2em] uppercase border border-[#c9a84c]/20 bg-[#c9a84c]/8 px-2.5 py-1 rounded-full'>
									Commercial
								</span>
								<h3 className='font-serif text-2xl text-[#e8e8e0] mt-4 mb-3 tracking-tight'>
									Offices, Warehouses & Retail
								</h3>
								<p className='text-[#333] text-sm font-light leading-relaxed mb-6'>
									Structure lease agreements for commercial spaces with
									multi-party escrow. Agent commissions only released when all
									conditions are met.
								</p>
								<div className='flex flex-wrap gap-2'>
									{[
										"Agent Commission Hold",
										"Lease Agreement Vault",
										"Multi-Party Flow",
									].map((t) => (
										<span
											key={t}
											className='text-[9px] font-mono text-[#2a2a2a] border border-[#1a1a1a] px-2 py-1 rounded-full'
										>
											{t}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── Coming Soon CTA ── */}
			<section className='relative z-10 py-20 px-6 md:px-12 lg:px-20'>
				<div className='max-w-4xl mx-auto'>
					<div
						className='rounded-3xl p-10 md:p-14 relative overflow-hidden border border-[#1a1a1a]'
						style={{
							background: "linear-gradient(135deg, #0a0a0a 0%, #0d0d0d 100%)",
						}}
					>
						{/* Decorative lines */}
						<div className='absolute inset-0 overflow-hidden rounded-3xl'>
							<div
								className='absolute top-0 left-0 right-0 h-[1px]'
								style={{
									background:
										"linear-gradient(90deg, transparent, #0d4d7d50, #c9a84c50, transparent)",
								}}
							/>
							<div
								className='absolute bottom-0 left-0 right-0 h-[1px]'
								style={{
									background:
										"linear-gradient(90deg, transparent, #1a7a4a50, transparent)",
								}}
							/>
							<div className='absolute top-0 left-[30%] w-[40%] h-full bg-[#0d4d7d]/3 blur-3xl' />
						</div>

						<div className='relative text-center'>
							<div className='inline-flex items-center gap-2 border border-[#c9a84c]/20 bg-[#c9a84c]/5 rounded-full px-4 py-1.5 mb-8'>
								<div className='w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse' />
								<span className='text-[#c9a84c] text-[10px] font-mono tracking-[0.2em] uppercase'>
									Launching Soon
								</span>
							</div>

							<h2 className='font-serif text-4xl md:text-5xl text-[#e8e8e0] tracking-tight mb-4'>
								Be First on the Platform
							</h2>
							<p className='text-[#444] text-base font-light max-w-lg mx-auto mb-10 leading-relaxed'>
								PayHold Property is in final development. Join the waitlist and
								get early access — whether you're a landlord, agent, buyer, or
								renter.
							</p>

							{/* Notify form */}
							<div className='flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto'>
								<input
									type='email'
									placeholder='your@email.com'
									className='flex-1 px-4 py-3 rounded-xl bg-[#111] border border-[#1c1c1c] text-[#888] text-sm font-light placeholder-[#2a2a2a] focus:outline-none focus:border-[#0d4d7d]/50 transition-colors'
								/>
								<button
									className='px-6 py-3 rounded-xl text-sm font-medium tracking-wide text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02] shrink-0'
									style={{
										background: "linear-gradient(135deg, #0d4d7d, #1a7a4a)",
									}}
								>
									Notify Me
								</button>
							</div>

							<p className='text-[#1a1a1a] text-[10px] font-mono tracking-wider mt-4'>
								NO SPAM · EARLY ACCESS ONLY · UNSUBSCRIBE ANYTIME
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ── Footer ── */}
			<div className='relative z-10 text-center pb-8 px-6 border-t border-[#0d0d0d] pt-8'>
				<div className='flex items-center justify-center gap-6 mb-4'>
					<Link
						href='/'
						className='text-[#1c1c1c] text-[10px] font-mono tracking-widest uppercase hover:text-[#333] transition-colors'
					>
						Home
					</Link>
					<div className='w-px h-3 bg-[#111]' />
					<Link
						href='/services'
						className='text-[#1c1c1c] text-[10px] font-mono tracking-widest uppercase hover:text-[#333] transition-colors'
					>
						Services
					</Link>
					<div className='w-px h-3 bg-[#111]' />
					<Link
						href='/contact'
						className='text-[#1c1c1c] text-[10px] font-mono tracking-widest uppercase hover:text-[#333] transition-colors'
					>
						Contact
					</Link>
				</div>
				<p className='text-[#1a1a1a] text-[10px] font-mono tracking-widest uppercase'>
					PayHold · Trust Infrastructure for African Commerce
				</p>
			</div>
		</div>
	);
}
