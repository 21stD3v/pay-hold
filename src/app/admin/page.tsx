"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function AdminDashboard() {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [selectedTab, setSelectedTab] = useState("overview");

	// Mock data - replace with real API calls
	const stats = {
		totalTransactions: 1247,
		activeTransactions: 89,
		completedToday: 42,
		revenue: 4567890,
		totalUsers: 3421,
		activeCouriers: 127,
		disputesPending: 8,
		successRate: 98.4
	};

	const recentTransactions = [
		{ id: "TXN-001234", buyer: "John Doe", seller: "Jane Smith", amount: 45000, status: "in_dispatch", time: "5 mins ago" },
		{ id: "TXN-001233", buyer: "Alice Brown", seller: "Bob Wilson", amount: 120000, status: "completed", time: "12 mins ago" },
		{ id: "TXN-001232", buyer: "Mike Johnson", seller: "Sarah Lee", amount: 78000, status: "payment_confirmed", time: "23 mins ago" },
		{ id: "TXN-001231", buyer: "Emma Davis", seller: "Tom Clark", amount: 95000, status: "delivered", time: "1 hour ago" },
		{ id: "TXN-001230", buyer: "Chris Martinez", seller: "Lisa Garcia", amount: 62000, status: "in_dispatch", time: "2 hours ago" },
	];

	const recentDisputes = [
		{ id: "DSP-089", transaction: "TXN-001180", issue: "Item not as described", priority: "high", time: "30 mins ago" },
		{ id: "DSP-088", transaction: "TXN-001165", issue: "Damaged package", priority: "medium", time: "2 hours ago" },
		{ id: "DSP-087", transaction: "TXN-001142", issue: "Wrong item delivered", priority: "high", time: "4 hours ago" },
	];

	const topCouriers = [
		{ name: "Ahmed Ibrahim", deliveries: 234, rating: 4.9, earnings: 456700 },
		{ name: "Chioma Okafor", deliveries: 198, rating: 4.8, earnings: 389400 },
		{ name: "Yusuf Abdullahi", deliveries: 187, rating: 4.7, earnings: 367800 },
	];

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
			{/* Top Navigation Bar */}
			<nav className='bg-white border-b border-gray-200 fixed w-full top-0 z-50 shadow-sm'>
				<div className='px-6 py-4'>
					<div className='flex items-center justify-between'>
						{/* Logo & Menu Toggle */}
						<div className='flex items-center gap-4'>
							<button 
								onClick={() => setSidebarOpen(!sidebarOpen)}
								className='p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden'
							>
								<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
								</svg>
							</button>
							<Link href='/' className='text-3xl font-bold tracking-tight'>
								<span className='text-[#0d4d7d]'>Pay</span>
								<span className='text-[#1a7a4a]'>Hold</span>
							</Link>
							<span className='px-3 py-1 bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] text-white text-xs font-bold rounded-full'>
								ADMIN
							</span>
						</div>

						{/* Search Bar */}
						<div className='hidden md:flex flex-1 max-w-md mx-8'>
							<div className='relative w-full'>
								<input
									type='search'
									placeholder='Search transactions, users, couriers...'
									className='w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#0d4d7d] focus:outline-none transition-colors'
								/>
								<svg className='absolute left-3 top-2.5 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
								</svg>
							</div>
						</div>

						{/* Right Side Actions */}
						<div className='flex items-center gap-4'>
							{/* Notifications */}
							<button className='relative p-2 hover:bg-gray-100 rounded-lg transition-colors'>
								<svg className='w-6 h-6 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' />
								</svg>
								<span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
							</button>

							{/* Admin Profile */}
							<div className='flex items-center gap-3 pl-4 border-l border-gray-200'>
								<div className='w-10 h-10 bg-gradient-to-br from-[#0d4d7d] to-[#1a7a4a] rounded-full flex items-center justify-center text-white font-bold'>
									A
								</div>
								<div className='hidden sm:block'>
									<p className='text-sm font-semibold text-gray-900'>Admin User</p>
									<p className='text-xs text-gray-500'>Super Admin</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<div className='flex pt-16'>
				{/* Sidebar */}
				<aside className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 z-40 ${sidebarOpen ? 'w-64' : 'w-0 lg:w-20'} overflow-hidden`}>
					<nav className='p-4 space-y-2'>
						{[
							{ id: 'overview', icon: '📊', label: 'Overview', color: 'from-blue-500 to-indigo-500' },
							{ id: 'transactions', icon: '💳', label: 'Transactions', color: 'from-green-500 to-emerald-500' },
							{ id: 'users', icon: '👥', label: 'Users', color: 'from-purple-500 to-pink-500' },
							{ id: 'couriers', icon: '🚚', label: 'Couriers', color: 'from-orange-500 to-red-500' },
							{ id: 'disputes', icon: '⚖️', label: 'Disputes', color: 'from-yellow-500 to-amber-500', badge: 8 },
							{ id: 'analytics', icon: '📈', label: 'Analytics', color: 'from-cyan-500 to-blue-500' },
							{ id: 'payments', icon: '💰', label: 'Payments', color: 'from-green-600 to-teal-600' },
							{ id: 'settings', icon: '⚙️', label: 'Settings', color: 'from-gray-500 to-slate-500' },
						].map((item) => (
							<button
								key={item.id}
								onClick={() => setSelectedTab(item.id)}
								className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
									selectedTab === item.id
										? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105`
										: 'hover:bg-gray-100 text-gray-700'
								}`}
							>
								<span className='text-2xl'>{item.icon}</span>
								<span className={`font-semibold transition-opacity ${sidebarOpen ? 'opacity-100' : 'lg:opacity-0'}`}>
									{item.label}
								</span>
								{item.badge && (
									<span className={`ml-auto px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full ${sidebarOpen ? 'block' : 'hidden lg:hidden'}`}>
										{item.badge}
									</span>
								)}
							</button>
						))}
					</nav>
				</aside>

				{/* Main Content */}
				<main className='flex-1 p-6 overflow-auto'>
					{selectedTab === 'overview' && (
						<div className='space-y-6'>
							{/* Header */}
							<div>
								<h1 className='text-3xl font-bold text-gray-900 mb-2'>Dashboard Overview</h1>
								<p className='text-gray-600'>Real-time insights into your delivery operations</p>
							</div>

							{/* Key Metrics */}
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
								{[
									{ label: 'Total Transactions', value: stats.totalTransactions.toLocaleString(), change: '+12.5%', icon: '💳', gradient: 'from-blue-500 to-indigo-500' },
									{ label: 'Active Now', value: stats.activeTransactions, change: '+5', icon: '⚡', gradient: 'from-yellow-500 to-orange-500' },
									{ label: 'Revenue Today', value: `₦${(stats.revenue / 1000000).toFixed(2)}M`, change: '+8.3%', icon: '💰', gradient: 'from-green-500 to-emerald-500' },
									{ label: 'Success Rate', value: `${stats.successRate}%`, change: '+0.4%', icon: '✅', gradient: 'from-purple-500 to-pink-500' },
								].map((metric, index) => (
									<Card key={index} className='border-2 border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300'>
										<CardContent className='pt-6'>
											<div className='flex items-start justify-between mb-4'>
												<div className={`w-12 h-12 bg-gradient-to-br ${metric.gradient} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
													{metric.icon}
												</div>
												<span className='px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full'>
													{metric.change}
												</span>
											</div>
											<div className='text-3xl font-bold text-gray-900 mb-1'>{metric.value}</div>
											<div className='text-sm text-gray-600 font-medium'>{metric.label}</div>
										</CardContent>
									</Card>
								))}
							</div>

							{/* Charts Row */}
							<div className='grid lg:grid-cols-2 gap-6'>
								{/* Revenue Chart */}
								<Card className='border-2 border-gray-100'>
									<CardHeader className='border-b border-gray-100'>
										<CardTitle className='flex items-center justify-between'>
											<span>Revenue Overview</span>
											<select className='px-3 py-1 text-sm border-2 border-gray-200 rounded-lg'>
												<option>Last 7 days</option>
												<option>Last 30 days</option>
												<option>Last 90 days</option>
											</select>
										</CardTitle>
									</CardHeader>
									<CardContent className='pt-6'>
										{/* Simple bar chart representation */}
										<div className='space-y-4'>
											{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
												<div key={day} className='flex items-center gap-4'>
													<div className='w-12 text-sm font-medium text-gray-600'>{day}</div>
													<div className='flex-1 bg-gray-100 rounded-full h-8 overflow-hidden'>
														<div 
															className='bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] h-full rounded-full flex items-center justify-end pr-3'
															style={{width: `${30 + Math.random() * 70}%`}}
														>
															<span className='text-white text-xs font-bold'>₦{(Math.random() * 500 + 200).toFixed(0)}K</span>
														</div>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>

								{/* Transaction Status Distribution */}
								<Card className='border-2 border-gray-100'>
									<CardHeader className='border-b border-gray-100'>
										<CardTitle>Transaction Status</CardTitle>
									</CardHeader>
									<CardContent className='pt-6'>
										<div className='space-y-4'>
											{[
												{ status: 'Completed', count: 1089, percentage: 87, color: 'bg-green-500' },
												{ status: 'In Progress', count: 89, percentage: 7, color: 'bg-blue-500' },
												{ status: 'Disputed', count: 45, percentage: 4, color: 'bg-yellow-500' },
												{ status: 'Cancelled', count: 24, percentage: 2, color: 'bg-red-500' },
											].map((item) => (
												<div key={item.status}>
													<div className='flex items-center justify-between mb-2'>
														<span className='font-medium text-gray-700'>{item.status}</span>
														<span className='text-sm text-gray-600'>{item.count} ({item.percentage}%)</span>
													</div>
													<div className='w-full bg-gray-100 rounded-full h-3'>
														<div className={`${item.color} h-full rounded-full transition-all duration-500`} style={{width: `${item.percentage}%`}}></div>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Recent Activity */}
							<div className='grid lg:grid-cols-2 gap-6'>
								{/* Recent Transactions */}
								<Card className='border-2 border-gray-100'>
									<CardHeader className='border-b border-gray-100'>
										<CardTitle className='flex items-center justify-between'>
											<span>Recent Transactions</span>
											<Link href='/admin/transactions'>
												<Button size='sm' variant='outline' className='text-[#0d4d7d] border-[#0d4d7d]'>
													View All
												</Button>
											</Link>
										</CardTitle>
									</CardHeader>
									<CardContent className='pt-4'>
										<div className='space-y-3'>
											{recentTransactions.map((txn) => (
												<div key={txn.id} className='p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer'>
													<div className='flex items-center justify-between mb-2'>
														<span className='font-bold text-[#0d4d7d]'>{txn.id}</span>
														<span className={`px-3 py-1 rounded-full text-xs font-bold ${
															txn.status === 'completed' ? 'bg-green-100 text-green-700' :
															txn.status === 'in_dispatch' ? 'bg-blue-100 text-blue-700' :
															'bg-yellow-100 text-yellow-700'
														}`}>
															{txn.status.replace('_', ' ').toUpperCase()}
														</span>
													</div>
													<div className='flex items-center justify-between text-sm'>
														<div className='text-gray-600'>
															<span className='font-medium'>{txn.buyer}</span> → <span className='font-medium'>{txn.seller}</span>
														</div>
														<div className='font-bold text-gray-900'>₦{txn.amount.toLocaleString()}</div>
													</div>
													<div className='text-xs text-gray-500 mt-2'>{txn.time}</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>

								{/* Pending Disputes */}
								<Card className='border-2 border-red-100'>
									<CardHeader className='border-b border-red-100 bg-red-50'>
										<CardTitle className='flex items-center justify-between text-red-700'>
											<span className='flex items-center gap-2'>
												<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
													<path fillRule='evenodd' d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
												</svg>
												Pending Disputes
											</span>
											<Link href='/admin/disputes'>
												<Button size='sm' className='bg-red-600 hover:bg-red-700'>
													Review All
												</Button>
											</Link>
										</CardTitle>
									</CardHeader>
									<CardContent className='pt-4'>
										<div className='space-y-3'>
											{recentDisputes.map((dispute) => (
												<div key={dispute.id} className='p-4 bg-white border-2 border-red-100 rounded-xl hover:border-red-300 transition-colors cursor-pointer'>
													<div className='flex items-center justify-between mb-2'>
														<span className='font-bold text-red-700'>{dispute.id}</span>
														<span className={`px-3 py-1 rounded-full text-xs font-bold ${
															dispute.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
														}`}>
															{dispute.priority.toUpperCase()}
														</span>
													</div>
													<div className='text-sm text-gray-900 font-medium mb-1'>{dispute.issue}</div>
													<div className='flex items-center justify-between text-xs text-gray-500'>
														<span>TXN: {dispute.transaction}</span>
														<span>{dispute.time}</span>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Top Performers */}
							<Card className='border-2 border-gray-100'>
								<CardHeader className='border-b border-gray-100'>
									<CardTitle className='flex items-center gap-2'>
										<span className='text-2xl'>🏆</span>
										Top Performing Couriers
									</CardTitle>
								</CardHeader>
								<CardContent className='pt-6'>
									<div className='space-y-4'>
										{topCouriers.map((courier, index) => (
											<div key={courier.name} className='flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-xl hover:from-blue-50 transition-all duration-300'>
												<div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${
													index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
													index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
													'bg-gradient-to-br from-orange-400 to-amber-600'
												}`}>
													#{index + 1}
												</div>
												<div className='flex-1'>
													<div className='font-bold text-gray-900'>{courier.name}</div>
													<div className='flex items-center gap-4 text-sm text-gray-600'>
														<span>{courier.deliveries} deliveries</span>
														<span className='flex items-center gap-1'>
															<svg className='w-4 h-4 text-yellow-500' fill='currentColor' viewBox='0 0 20 20'>
																<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
															</svg>
															{courier.rating}
														</span>
													</div>
												</div>
												<div className='text-right'>
													<div className='font-bold text-[#1a7a4a]'>₦{(courier.earnings / 1000).toFixed(0)}K</div>
													<div className='text-xs text-gray-500'>Total Earnings</div>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							{/* Quick Actions */}
							<Card className='border-2 border-gray-100'>
								<CardHeader className='border-b border-gray-100'>
									<CardTitle>Quick Actions</CardTitle>
								</CardHeader>
								<CardContent className='pt-6'>
									<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
										{[
											{ icon: '📝', label: 'Create Transaction', color: 'from-blue-500 to-indigo-500' },
											{ icon: '👤', label: 'Add User', color: 'from-green-500 to-emerald-500' },
											{ icon: '🚚', label: 'Onboard Courier', color: 'from-orange-500 to-red-500' },
											{ icon: '📊', label: 'Generate Report', color: 'from-purple-500 to-pink-500' },
										].map((action) => (
											<button
												key={action.label}
												className={`p-6 bg-gradient-to-br ${action.color} rounded-xl text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 group`}
											>
												<div className='text-4xl mb-3 group-hover:scale-110 transition-transform'>{action.icon}</div>
												<div className='font-bold'>{action.label}</div>
											</button>
										))}
									</div>
								</CardContent>
							</Card>
						</div>
					)}

					{/* Placeholder for other tabs */}
					{selectedTab !== 'overview' && (
						<div className='text-center py-20'>
							<div className='text-6xl mb-4'>🚧</div>
							<h2 className='text-2xl font-bold text-gray-900 mb-2'>
								{selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Section
							</h2>
							<p className='text-gray-600 mb-6'>This section is under construction</p>
							<Button onClick={() => setSelectedTab('overview')}>
								Back to Overview
							</Button>
						</div>
					)}
				</main>
			</div>
		</div>
	);
}
