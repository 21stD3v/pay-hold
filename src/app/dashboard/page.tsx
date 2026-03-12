"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
type StatCard = {
	label: string;
	value: string;
	sub: string;
	color: string;
	icon: React.ReactNode;
};

type Activity = {
	id: string;
	type:
		| "deal_created"
		| "deal_accepted"
		| "payment_sent"
		| "deal_completed"
		| "dispute";
	title: string;
	description: string;
	time: string;
	amount?: string;
};

// ─── Mock data (replace with real API calls as you build) ─────────────────────
const mockStats: StatCard[] = [
	{
		label: "Total Deals",
		value: "0",
		sub: "No deals yet",
		color: "from-[#0d4d7d] to-[#1565a0]",
		icon: (
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
					d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
				/>
			</svg>
		),
	},
	{
		label: "Active Deals",
		value: "0",
		sub: "In progress",
		color: "from-[#1a7a4a] to-[#1e9558]",
		icon: (
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
					d='M13 10V3L4 14h7v7l9-11h-7z'
				/>
			</svg>
		),
	},
	{
		label: "Total Value",
		value: "₦0",
		sub: "Across all deals",
		color: "from-purple-600 to-purple-700",
		icon: (
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
					d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
				/>
			</svg>
		),
	},
	{
		label: "Completed",
		value: "0",
		sub: "Successfully closed",
		color: "from-orange-500 to-orange-600",
		icon: (
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
					d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
				/>
			</svg>
		),
	},
];

const mockActivity: Activity[] = [
	// Empty for new users — will populate from API
];

const quickActions = [
	{
		href: "/create-transaction",
		label: "New Deal",
		description: "Start a secure buyer-seller agreement",
		color: "bg-gradient-to-br from-[#0d4d7d] to-[#1a7a4a]",
		textColor: "text-white",
		icon: (
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
					d='M12 4v16m8-8H4'
				/>
			</svg>
		),
	},
	{
		href: "/dashboard/deals",
		label: "View My Deals",
		description: "Track all your active agreements",
		color: "bg-white border-2 border-[#0d4d7d]/20 hover:border-[#0d4d7d]/50",
		textColor: "text-[#0d4d7d]",
		icon: (
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
					d='M4 6h16M4 10h16M4 14h16M4 18h16'
				/>
			</svg>
		),
	},
	{
		href: "/dashboard/notifications",
		label: "Notifications",
		description: "Check your latest updates",
		color: "bg-white border-2 border-[#1a7a4a]/20 hover:border-[#1a7a4a]/50",
		textColor: "text-[#1a7a4a]",
		icon: (
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
					d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
				/>
			</svg>
		),
	},
];

const activityIcons: Record<
	Activity["type"],
	{ icon: React.ReactNode; bg: string }
> = {
	deal_created: {
		bg: "bg-blue-100",
		icon: (
			<svg
				className='w-4 h-4 text-[#0d4d7d]'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M12 4v16m8-8H4'
				/>
			</svg>
		),
	},
	deal_accepted: {
		bg: "bg-green-100",
		icon: (
			<svg
				className='w-4 h-4 text-[#1a7a4a]'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M5 13l4 4L19 7'
				/>
			</svg>
		),
	},
	payment_sent: {
		bg: "bg-purple-100",
		icon: (
			<svg
				className='w-4 h-4 text-purple-600'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
				/>
			</svg>
		),
	},
	deal_completed: {
		bg: "bg-orange-100",
		icon: (
			<svg
				className='w-4 h-4 text-orange-600'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
				/>
			</svg>
		),
	},
	dispute: {
		bg: "bg-red-100",
		icon: (
			<svg
				className='w-4 h-4 text-red-600'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
				/>
			</svg>
		),
	},
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
	const { data: session } = useSession();

	const firstName = session?.user?.name?.split(" ")[0] ?? "there";
	const hour = new Date().getHours();
	const greeting =
		hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

	return (
		<div className='space-y-8'>
			{/* ── Header ──────────────────────────────────────────────────────── */}
			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
				<div>
					<h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
						{greeting}, {firstName} 👋
					</h1>
					<p className='text-gray-500 mt-1 text-sm'>
						Here&apos;s what&apos;s happening with your deals today.
					</p>
				</div>
				<Link
					href='/create-transaction'
					className='inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200'
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
							d='M12 4v16m8-8H4'
						/>
					</svg>
					New Deal
				</Link>
			</div>

			{/* ── Stats grid ──────────────────────────────────────────────────── */}
			<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
				{mockStats.map((stat) => (
					<div
						key={stat.label}
						className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow'
					>
						<div
							className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white flex-shrink-0`}
						>
							{stat.icon}
						</div>
						<div>
							<p className='text-2xl font-bold text-gray-900'>{stat.value}</p>
							<p className='text-sm font-medium text-gray-600'>{stat.label}</p>
							<p className='text-xs text-gray-400'>{stat.sub}</p>
						</div>
					</div>
				))}
			</div>

			{/* ── Quick actions + Activity feed ───────────────────────────────── */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Quick actions — 1/3 */}
				<div className='lg:col-span-1 space-y-4'>
					<h2 className='text-lg font-bold text-gray-900'>Quick Actions</h2>
					<div className='space-y-3'>
						{quickActions.map((action) => (
							<Link
								key={action.href}
								href={action.href}
								className={`flex items-center gap-4 p-4 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 ${action.color}`}
							>
								<div className={`flex-shrink-0 ${action.textColor}`}>
									{action.icon}
								</div>
								<div>
									<p className={`text-sm font-semibold ${action.textColor}`}>
										{action.label}
									</p>
									<p
										className={`text-xs mt-0.5 ${action.textColor} opacity-75`}
									>
										{action.description}
									</p>
								</div>
							</Link>
						))}
					</div>

					{/* Trust card */}
					<div className='bg-gradient-to-br from-[#0d4d7d]/5 to-[#1a7a4a]/5 border border-[#0d4d7d]/10 rounded-2xl p-5'>
						<div className='flex items-center gap-2 mb-2'>
							<svg
								className='w-5 h-5 text-[#1a7a4a]'
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path
									fillRule='evenodd'
									d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
									clipRule='evenodd'
								/>
							</svg>
							<p className='text-sm font-semibold text-[#0d4d7d]'>
								You&apos;re protected
							</p>
						</div>
						<p className='text-xs text-gray-600 leading-relaxed'>
							Every deal on PayHold is structured and tracked. Your payments are
							only released when both parties confirm delivery.
						</p>
					</div>
				</div>

				{/* Activity feed — 2/3 */}
				<div className='lg:col-span-2'>
					<div className='flex items-center justify-between mb-4'>
						<h2 className='text-lg font-bold text-gray-900'>Recent Activity</h2>
						<Link
							href='/dashboard/deals'
							className='text-sm text-[#0d4d7d] font-medium hover:text-[#1a7a4a] transition-colors'
						>
							View all →
						</Link>
					</div>

					<div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
						{mockActivity.length === 0 ? (
							/* Empty state */
							<div className='flex flex-col items-center justify-center py-16 px-6 text-center'>
								<div className='w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4'>
									<svg
										className='w-8 h-8 text-gray-400'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={1.5}
											d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
										/>
									</svg>
								</div>
								<p className='text-gray-900 font-semibold text-base mb-1'>
									No activity yet
								</p>
								<p className='text-gray-500 text-sm mb-6'>
									Create your first deal to get started. It only takes a minute.
								</p>
								<Link
									href='/create-transaction'
									className='inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] text-white text-sm font-semibold rounded-xl hover:shadow-md hover:scale-[1.02] transition-all duration-200'
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
											d='M12 4v16m8-8H4'
										/>
									</svg>
									Create First Deal
								</Link>
							</div>
						) : (
							/* Activity list */
							<ul className='divide-y divide-gray-50'>
								{mockActivity.map((item) => {
									const { icon, bg } = activityIcons[item.type];
									return (
										<li
											key={item.id}
											className='flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors'
										>
											<div
												className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 mt-0.5`}
											>
												{icon}
											</div>
											<div className='flex-1 min-w-0'>
												<p className='text-sm font-semibold text-gray-900'>
													{item.title}
												</p>
												<p className='text-xs text-gray-500 mt-0.5'>
													{item.description}
												</p>
											</div>
											<div className='text-right flex-shrink-0'>
												{item.amount && (
													<p className='text-sm font-semibold text-gray-900'>
														{item.amount}
													</p>
												)}
												<p className='text-xs text-gray-400'>{item.time}</p>
											</div>
										</li>
									);
								})}
							</ul>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
