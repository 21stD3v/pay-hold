/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { useAuthStore, useTransactionStore } from "@/store";
import { TransactionStatus } from "@/types";
import Link from "next/link";
import { useState } from "react";

export default function BuyerDashboard() {
	const user = useAuthStore((state) => state.user);
	const transactions = useTransactionStore((state) => state.transactions);
	const [filter, setFilter] = useState<"all" | TransactionStatus>("all");

	const userTransactions = transactions.filter((t) => t.buyerId === user?.id);

	const filteredTransactions =
		filter === "all"
			? userTransactions
			: userTransactions.filter((t) => t.status === filter);

	const stats = {
		total: userTransactions.length,
		active: userTransactions.filter(
			(t) =>
				t.status !== TransactionStatus.COMPLETED &&
				t.status !== TransactionStatus.CANCELLED,
		).length,
		completed: userTransactions.filter(
			(t) => t.status === TransactionStatus.COMPLETED,
		).length,
		totalSpent: userTransactions
			.filter((t) => t.status === TransactionStatus.COMPLETED)
			.reduce((sum, t) => sum + t.totalAmount, 0),
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50'>
			{/* Header */}
			<div className='bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
					<div className='flex items-center justify-between'>
						<div>
							<h1 className='text-3xl md:text-4xl font-bold text-gray-900'>
								Buyer Dashboard
							</h1>
							<p className='text-gray-600 mt-2 text-lg'>
								Welcome back,{" "}
								<span className='text-[#0d4d7d] font-semibold'>
									{user?.name || "Buyer"}
								</span>
								!
							</p>
						</div>
						<Link href='/create-transaction'>
							<Button className='bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] hover:shadow-xl hover:scale-105 transition-all duration-300 px-6 py-6 text-base font-semibold'>
								<span className='flex items-center gap-2'>
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
									Create Transaction
								</span>
							</Button>
						</Link>
					</div>
				</div>
			</div>

			<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Stats */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-8'>
					<Card className='border-2 border-gray-100 hover:border-[#0d4d7d]/30 hover:shadow-xl transition-all duration-300 group'>
						<CardContent className='pt-6'>
							<div className='text-4xl font-bold bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] bg-clip-text text-transparent mb-2'>
								{stats.total}
							</div>
							<div className='text-sm text-gray-600 font-medium'>
								Total Transactions
							</div>
							<div className='h-1 w-12 bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] rounded-full mt-3 group-hover:w-full transition-all duration-300'></div>
						</CardContent>
					</Card>

					<Card className='border-2 border-gray-100 hover:border-[#0d4d7d]/30 hover:shadow-xl transition-all duration-300 group'>
						<CardContent className='pt-6'>
							<div className='text-4xl font-bold text-amber-500 mb-2'>
								{stats.active}
							</div>
							<div className='text-sm text-gray-600 font-medium'>Active</div>
							<div className='h-1 w-12 bg-amber-500 rounded-full mt-3 group-hover:w-full transition-all duration-300'></div>
						</CardContent>
					</Card>

					<Card className='border-2 border-gray-100 hover:border-[#1a7a4a]/30 hover:shadow-xl transition-all duration-300 group'>
						<CardContent className='pt-6'>
							<div className='text-4xl font-bold text-[#1a7a4a] mb-2'>
								{stats.completed}
							</div>
							<div className='text-sm text-gray-600 font-medium'>Completed</div>
							<div className='h-1 w-12 bg-[#1a7a4a] rounded-full mt-3 group-hover:w-full transition-all duration-300'></div>
						</CardContent>
					</Card>

					<Card className='border-2 border-gray-100 hover:border-[#0d4d7d]/30 hover:shadow-xl transition-all duration-300 group'>
						<CardContent className='pt-6'>
							<div className='text-2xl md:text-3xl font-bold text-[#0d4d7d] mb-2'>
								{formatCurrency(stats.totalSpent)}
							</div>
							<div className='text-sm text-gray-600 font-medium'>
								Total Spent
							</div>
							<div className='h-1 w-12 bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] rounded-full mt-3 group-hover:w-full transition-all duration-300'></div>
						</CardContent>
					</Card>
				</div>

				{/* Transactions List */}
				<Card className='border-2 border-gray-100 shadow-xl'>
					<CardHeader className='border-b border-gray-100'>
						<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
							<CardTitle className='text-2xl font-bold text-gray-900'>
								My Transactions
							</CardTitle>

							{/* Filter */}
							<select
								value={filter}
								onChange={(e) => setFilter(e.target.value as any)}
								className='px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-[#0d4d7d] focus:border-[#0d4d7d] focus:outline-none transition-colors'
							>
								<option value='all'>All Transactions</option>
								<option value={TransactionStatus.PENDING_PAYMENT}>
									Pending Payment
								</option>
								<option value={TransactionStatus.PAYMENT_CONFIRMED}>
									Payment Confirmed
								</option>
								<option value={TransactionStatus.IN_DISPATCH}>
									In Dispatch
								</option>
								<option value={TransactionStatus.DELIVERED}>Delivered</option>
								<option value={TransactionStatus.COMPLETED}>Completed</option>
							</select>
						</div>
					</CardHeader>

					<CardContent>
						{filteredTransactions.length === 0 ? (
							<div className='text-center py-16'>
								<div className='w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#0d4d7d]/10 to-[#1a7a4a]/10 rounded-full flex items-center justify-center'>
									<svg
										className='w-12 h-12 text-[#0d4d7d]'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
										/>
									</svg>
								</div>
								<h3 className='text-xl font-bold text-gray-900 mb-2'>
									No transactions found
								</h3>
								<p className='text-gray-600 mb-6 max-w-md mx-auto'>
									Start your first secure transaction with PayHold and
									experience worry-free buying
								</p>
								<Link href='/create-transaction'>
									<Button className='bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] hover:shadow-xl hover:scale-105 transition-all duration-300 px-8'>
										Create Transaction
									</Button>
								</Link>
							</div>
						) : (
							<div className='space-y-4'>
								{filteredTransactions.map((transaction) => (
									<Link
										key={transaction.id}
										href={`/buyer/transactions/${transaction.id}`}
										className='block p-6 border-2 border-gray-100 rounded-xl hover:border-[#0d4d7d]/50 hover:shadow-xl transition-all duration-300 group'
									>
										<div className='flex items-start justify-between mb-4'>
											<div className='flex-1'>
												<h3 className='font-bold text-gray-900 mb-2 text-lg group-hover:text-[#0d4d7d] transition-colors'>
													{transaction.itemName}
												</h3>
												<p className='text-sm text-gray-500 font-medium'>
													ID:{" "}
													<span className='text-[#0d4d7d]'>
														{transaction.id}
													</span>
												</p>
											</div>
											<StatusBadge status={transaction.status} />
										</div>

										<div className='flex items-center justify-between pt-4 border-t border-gray-100'>
											<div className='text-sm text-gray-600 font-medium'>
												{formatRelativeTime(transaction.createdAt)}
											</div>
											<div className='text-xl font-bold text-gray-900'>
												{formatCurrency(transaction.totalAmount)}
											</div>
										</div>
									</Link>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
