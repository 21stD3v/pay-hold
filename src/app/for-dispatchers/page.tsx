/* eslint-disable react/no-unescaped-entities */
"use client";

import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useState } from "react";

export default function DispatcherRegistrationPage() {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phone: "",
		vehicleType: "",
		vehicleNumber: "",
		hasLicense: false,
		licenseNumber: "",
		experience: "",
		city: "",
		availability: [],
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		console.log("Form submitted:", formData);
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden'>
			{/* Animated Background */}
			<div className='absolute inset-0'>
				<div className='absolute top-20 left-10 w-72 h-72 bg-[#0d4d7d]/5 rounded-full blur-3xl animate-pulse'></div>
				<div
					className='absolute bottom-20 right-10 w-96 h-96 bg-[#1a7a4a]/5 rounded-full blur-3xl animate-pulse'
					style={{ animationDelay: "1s" }}
				></div>
			</div>
			{/* Navigation */}
			<nav className='border-b border-gray-200 bg-white/95 backdrop-blur-md relative z-50'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-20'>
						<Link href='/' className='text-3xl font-bold tracking-tight'>
							<span className='text-[#0d4d7d]'>Pay</span>
							<span className='text-[#1a7a4a]'>Hold</span>
						</Link>
						<Link href='/login'>
							<Button
								variant='outline'
								className='border-[#0d4d7d] text-[#0d4d7d] hover:bg-[#0d4d7d] hover:text-white'
							>
								Login
							</Button>
						</Link>
					</div>
				</div>
			</nav>
			c
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10'>
				<div className='max-w-2xl mx-auto'>
					{/* Header */}
					<div className='text-center mb-10'>
						<div className='inline-flex items-center gap-3 bg-white border-2 border-[#1a7a4a] px-6 py-3 rounded-full mb-6'>
							<span className='text-2xl'>🚚</span>
							<span className='font-bold text-[#1a7a4a]'>
								Dispatcher Program
							</span>
						</div>
						<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
							Join Our Courier Network
						</h1>
						<p className='text-xl text-gray-600'>
							Earn money delivering packages in your area. Flexible hours,
							competitive rates, weekly payouts.
						</p>
					</div>

					{/* Benefits */}
					<div className='grid md:grid-cols-3 gap-4 mb-10'>
						{[
							{
								icon: "💰",
								title: "Great Pay",
								desc: "Earn ₦500-2000 per delivery",
							},
							{
								icon: "📅",
								title: "Flexible Schedule",
								desc: "Work when you want",
							},
							{
								icon: "⭐",
								title: "Build Rating",
								desc: "Get better opportunities",
							},
						].map((benefit) => (
							<div
								key={benefit.title}
								className='bg-white rounded-xl p-6 border-2 border-gray-200 text-center'
							>
								<div className='text-4xl mb-3'>{benefit.icon}</div>
								<h3 className='font-bold text-gray-900 mb-1'>
									{benefit.title}
								</h3>
								<p className='text-sm text-gray-600'>{benefit.desc}</p>
							</div>
						))}
					</div>

					{/* Registration Form */}
					<Card className='border-2 border-gray-200 shadow-2xl'>
						<CardHeader className='border-b border-gray-100'>
							<CardTitle className='text-2xl'>Dispatcher Application</CardTitle>
							<div className='flex items-center gap-4 mt-4'>
								{[1, 2, 3].map((s) => (
									<div key={s} className='flex-1'>
										<div
											className={`h-2 rounded-full transition-all duration-300 ${step >= s ? "bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a]" : "bg-gray-200"}`}
										></div>
										<p className='text-xs text-gray-600 mt-1'>Step {s}</p>
									</div>
								))}
							</div>
						</CardHeader>

						<CardContent className='pt-6'>
							<form onSubmit={handleSubmit}>
								{/* Step 1: Personal Info */}
								{step === 1 && (
									<div className='space-y-5'>
										<h3 className='text-xl font-bold text-gray-900 mb-4'>
											Personal Information
										</h3>

										<Input
											label='Full Name'
											type='text'
											placeholder='John Doe'
											value={formData.fullName}
											onChange={(e) =>
												setFormData({ ...formData, fullName: e.target.value })
											}
											required
										/>

										<Input
											label='Email Address'
											type='email'
											placeholder='john@example.com'
											value={formData.email}
											onChange={(e) =>
												setFormData({ ...formData, email: e.target.value })
											}
											required
										/>

										<Input
											label='Phone Number'
											type='tel'
											placeholder='+234 800 000 0000'
											value={formData.phone}
											onChange={(e) =>
												setFormData({ ...formData, phone: e.target.value })
											}
											required
										/>

										<div>
											<label className='block text-sm font-semibold text-gray-700 mb-2'>
												City/Area
											</label>
											<select
												className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[#0d4d7d] focus:outline-none'
												value={formData.city}
												onChange={(e) =>
													setFormData({ ...formData, city: e.target.value })
												}
												required
											>
												<option value=''>Select your city</option>
												<option value='lagos'>Lagos</option>
												<option value='abuja'>Abuja</option>
												<option value='port-harcourt'>Port Harcourt</option>
												<option value='ibadan'>Ibadan</option>
												<option value='kano'>Kano</option>
											</select>
										</div>

										<Button
											type='button'
											onClick={() => setStep(2)}
											className='w-full bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] hover:shadow-xl transition-all duration-300 py-6'
										>
											Continue to Vehicle Info
										</Button>
									</div>
								)}

								{/* Step 2: Vehicle Info */}
								{step === 2 && (
									<div className='space-y-5'>
										<h3 className='text-xl font-bold text-gray-900 mb-4'>
											Vehicle Information
										</h3>

										<div>
											<label className='block text-sm font-semibold text-gray-700 mb-2'>
												Vehicle Type
											</label>
											<select
												className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[#0d4d7d] focus:outline-none'
												value={formData.vehicleType}
												onChange={(e) =>
													setFormData({
														...formData,
														vehicleType: e.target.value,
													})
												}
												required
											>
												<option value=''>Select vehicle type</option>
												<option value='motorcycle'>Motorcycle/Bike</option>
												<option value='car'>Car</option>
												<option value='van'>Van/Truck</option>
											</select>
										</div>

										<Input
											label='Vehicle Registration Number'
											type='text'
											placeholder='ABC-123-XY'
											value={formData.vehicleNumber}
											onChange={(e) =>
												setFormData({
													...formData,
													vehicleNumber: e.target.value,
												})
											}
											required
										/>

										<div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg'>
											<input
												type='checkbox'
												id='hasLicense'
												checked={formData.hasLicense}
												onChange={(e) =>
													setFormData({
														...formData,
														hasLicense: e.target.checked,
													})
												}
												className='w-5 h-5 rounded border-gray-300'
											/>
											<label
												htmlFor='hasLicense'
												className='text-gray-700 font-medium'
											>
												I have a valid driver's license
											</label>
										</div>

										{formData.hasLicense && (
											<Input
												label='Driver License Number'
												type='text'
												placeholder='License number'
												value={formData.licenseNumber}
												onChange={(e) =>
													setFormData({
														...formData,
														licenseNumber: e.target.value,
													})
												}
												required={formData.hasLicense}
											/>
										)}

										<div>
											<label className='block text-sm font-semibold text-gray-700 mb-2'>
												Delivery Experience
											</label>
											<select
												className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[#0d4d7d] focus:outline-none'
												value={formData.experience}
												onChange={(e) =>
													setFormData({
														...formData,
														experience: e.target.value,
													})
												}
												required
											>
												<option value=''>Select experience level</option>
												<option value='no-experience'>No experience</option>
												<option value='less-than-1-year'>
													Less than 1 year
												</option>
												<option value='1-3-years'>1-3 years</option>
												<option value='3-plus-years'>3+ years</option>
											</select>
										</div>

										<div className='flex gap-3'>
											<Button
												type='button'
												variant='outline'
												onClick={() => setStep(1)}
												className='flex-1'
											>
												Back
											</Button>
											<Button
												type='button'
												onClick={() => setStep(3)}
												className='flex-1 bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] hover:shadow-xl transition-all duration-300'
											>
												Continue
											</Button>
										</div>
									</div>
								)}

								{/* Step 3: Availability & Terms */}
								{step === 3 && (
									<div className='space-y-5'>
										<h3 className='text-xl font-bold text-gray-900 mb-4'>
											Availability & Terms
										</h3>

										<div>
											<label className='block text-sm font-semibold text-gray-700 mb-3'>
												When are you available? (Select all that apply)
											</label>
											<div className='space-y-2'>
												{[
													{
														id: "weekday-morning",
														label: "Weekdays Morning (6am-12pm)",
													},
													{
														id: "weekday-afternoon",
														label: "Weekdays Afternoon (12pm-6pm)",
													},
													{
														id: "weekday-evening",
														label: "Weekdays Evening (6pm-10pm)",
													},
													{ id: "weekend", label: "Weekends (Anytime)" },
												].map((time) => (
													<div
														key={time.id}
														className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'
													>
														<input
															type='checkbox'
															id={time.id}
															className='w-5 h-5 rounded border-gray-300'
														/>
														<label htmlFor={time.id} className='text-gray-700'>
															{time.label}
														</label>
													</div>
												))}
											</div>
										</div>

										<div className='bg-blue-50 border-2 border-blue-200 rounded-xl p-6'>
											<h4 className='font-bold text-gray-900 mb-3'>
												Requirements:
											</h4>
											<ul className='space-y-2 text-sm text-gray-700'>
												<li className='flex items-start gap-2'>
													<svg
														className='w-5 h-5 text-[#1a7a4a] flex-shrink-0 mt-0.5'
														fill='currentColor'
														viewBox='0 0 20 20'
													>
														<path
															fillRule='evenodd'
															d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
															clipRule='evenodd'
														/>
													</svg>
													<span>Valid government-issued ID</span>
												</li>
												<li className='flex items-start gap-2'>
													<svg
														className='w-5 h-5 text-[#1a7a4a] flex-shrink-0 mt-0.5'
														fill='currentColor'
														viewBox='0 0 20 20'
													>
														<path
															fillRule='evenodd'
															d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
															clipRule='evenodd'
														/>
													</svg>
													<span>Clean background check</span>
												</li>
												<li className='flex items-start gap-2'>
													<svg
														className='w-5 h-5 text-[#1a7a4a] flex-shrink-0 mt-0.5'
														fill='currentColor'
														viewBox='0 0 20 20'
													>
														<path
															fillRule='evenodd'
															d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
															clipRule='evenodd'
														/>
													</svg>
													<span>Own vehicle with valid registration</span>
												</li>
												<li className='flex items-start gap-2'>
													<svg
														className='w-5 h-5 text-[#1a7a4a] flex-shrink-0 mt-0.5'
														fill='currentColor'
														viewBox='0 0 20 20'
													>
														<path
															fillRule='evenodd'
															d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
															clipRule='evenodd'
														/>
													</svg>
													<span>Smartphone for the PayHold dispatcher app</span>
												</li>
											</ul>
										</div>

										<div className='flex items-start gap-3 p-4 bg-gray-50 rounded-lg'>
											<input
												type='checkbox'
												id='terms'
												required
												className='w-5 h-5 rounded border-gray-300 mt-0.5'
											/>
											<label htmlFor='terms' className='text-sm text-gray-700'>
												I agree to PayHold's{" "}
												<Link
													href='/terms'
													className='text-[#0d4d7d] font-semibold'
												>
													Terms & Conditions
												</Link>{" "}
												and{" "}
												<Link
													href='/privacy'
													className='text-[#0d4d7d] font-semibold'
												>
													Privacy Policy
												</Link>
												. I understand background checks will be conducted.
											</label>
										</div>

										<div className='flex gap-3'>
											<Button
												type='button'
												variant='outline'
												onClick={() => setStep(2)}
												className='flex-1'
											>
												Back
											</Button>
											<Button
												type='submit'
												className='flex-1 bg-gradient-to-r from-[#0d4d7d] to-[#1a7a4a] hover:shadow-xl hover:scale-105 transition-all duration-300 py-6 font-bold'
											>
												Submit Application
											</Button>
										</div>
									</div>
								)}
							</form>
						</CardContent>
					</Card>

					{/* USSD Activation Info */}
					<div className='mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 text-center'>
						<h3 className='text-2xl font-bold text-gray-900 mb-4'>
							Quick Activation via USSD
						</h3>
						<p className='text-gray-700 mb-4'>
							Once approved, simply dial{" "}
							<span className='text-3xl font-bold text-[#1a7a4a]'>*565#</span>{" "}
							to go online and start receiving deliveries!
						</p>
						<div className='inline-flex items-center gap-2 bg-white px-6 py-3 rounded-lg border-2 border-green-300'>
							<span className='text-2xl'>📱</span>
							<span className='font-bold text-gray-900'>
								Dial *565# to activate
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
