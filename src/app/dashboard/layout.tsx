"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
	{
		href: "/dashboard",
		label: "Dashboard",
		icon: (
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
					d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
				/>
			</svg>
		),
	},
	{
		href: "/dashboard/deals",
		label: "My Deals",
		icon: (
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
					d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
				/>
			</svg>
		),
	},
	{
		href: "/dashboard/create-deal",
		label: "Create Deal",
		icon: (
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
					d='M12 4v16m8-8H4'
				/>
			</svg>
		),
		highlight: true,
	},
	{
		href: "/dashboard/notifications",
		label: "Notifications",
		icon: (
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
					d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
				/>
			</svg>
		),
	},
	{
		href: "/dashboard/settings",
		label: "Settings",
		icon: (
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
					d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
				/>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
				/>
			</svg>
		),
	},
];

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: session } = useSession();
	const pathname = usePathname();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const initials =
		session?.user?.name
			?.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2) ?? "PH";

	return (
		<div className='min-h-screen bg-gray-50 flex'>
			{/* ── Mobile overlay ─────────────────────────────────────────────── */}
			{sidebarOpen && (
				<div
					className='fixed inset-0 bg-black/40 z-40 lg:hidden'
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* ── Sidebar ────────────────────────────────────────────────────── */}
			<aside
				className={`fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-50 flex flex-col transform transition-transform duration-300 ease-out
				lg:translate-x-0 lg:static lg:z-auto
				${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
			>
				{/* Logo */}
				<div className='flex items-center justify-between px-6 py-5 border-b border-gray-100'>
					<Link href='/' className='text-2xl font-bold tracking-tight'>
						<span className='text-[#0d4d7d]'>Pay</span>
						<span className='text-[#1a7a4a]'>Hold</span>
					</Link>
					<button
						onClick={() => setSidebarOpen(false)}
						className='lg:hidden p-1 rounded-md hover:bg-gray-100 transition-colors'
					>
						<svg
							className='w-5 h-5 text-gray-500'
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

				{/* Nav links */}
				<nav className='flex-1 px-4 py-6 space-y-1 overflow-y-auto'>
					{navLinks.map((link) => {
						const isActive = pathname === link.href;
						return (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setSidebarOpen(false)}
								className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
								${
									link.highlight
										? "bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] text-white shadow-md hover:shadow-lg hover:scale-[1.02]"
										: isActive
											? "bg-[#0d4d7d]/10 text-[#0d4d7d]"
											: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
								}`}
							>
								{link.icon}
								{link.label}
							</Link>
						);
					})}
				</nav>

				{/* User profile at bottom */}
				<div className='px-4 py-4 border-t border-gray-100'>
					<div className='flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors'>
						{/* Avatar */}
						<div className='w-9 h-9 rounded-full bg-gradient-to-br from-[#0d4d7d] to-[#1a7a4a] flex items-center justify-center text-white text-sm font-bold flex-shrink-0'>
							{session?.user?.image ? (
								<img
									src={session.user.image}
									alt='avatar'
									className='w-9 h-9 rounded-full object-cover'
								/>
							) : (
								initials
							)}
						</div>
						<div className='flex-1 min-w-0'>
							<p className='text-sm font-semibold text-gray-900 truncate'>
								{session?.user?.name ?? "User"}
							</p>
							<p className='text-xs text-gray-500 truncate'>
								{session?.user?.email ?? ""}
							</p>
						</div>
					</div>

					{/* Sign out */}
					<button
						onClick={() => signOut({ callbackUrl: "/login" })}
						className='mt-2 w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors'
					>
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
								d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
							/>
						</svg>
						Sign Out
					</button>
				</div>
			</aside>

			{/* ── Main content ───────────────────────────────────────────────── */}
			<div className='flex-1 flex flex-col min-w-0'>
				{/* Mobile top bar */}
				<header className='lg:hidden flex items-center justify-between px-4 py-4 bg-white border-b border-gray-200 sticky top-0 z-30'>
					<button
						onClick={() => setSidebarOpen(true)}
						className='p-2 rounded-lg hover:bg-gray-100 transition-colors'
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
					<span className='text-xl font-bold'>
						<span className='text-[#0d4d7d]'>Pay</span>
						<span className='text-[#1a7a4a]'>Hold</span>
					</span>
					<div className='w-9 h-9 rounded-full bg-gradient-to-br from-[#0d4d7d] to-[#1a7a4a] flex items-center justify-center text-white text-sm font-bold'>
						{initials}
					</div>
				</header>

				{/* Page content */}
				<main className='flex-1 p-6 lg:p-8 overflow-auto'>{children}</main>
			</div>
		</div>
	);
}
