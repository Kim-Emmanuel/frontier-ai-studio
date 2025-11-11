"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Container } from "../ui";

const ContactSection: React.FC = () => {
	const [mounted, setMounted] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		company: "",
		budget: "",
		timeline: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const heroRef = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const floatingShapesRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate API call
		setTimeout(() => {
			setIsSubmitting(false);
			setSubmitSuccess(true);
			setFormData({
				name: "",
				email: "",
				company: "",
				budget: "",
				timeline: "",
				message: "",
			});

			setTimeout(() => setSubmitSuccess(false), 5000);
		}, 2000);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<main className="min-h-screen relative overflow-hidden">
			{/* Animated Background */}
			<div className="absolute inset-0 pointer-events-none py-24">
				{/* Gradient Orbs */}
				<div
					className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-20 blur-3xl animate-float"
					style={{
						background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
						animationDelay: "0s",
					}}
				/>
				<div
					className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-15 blur-3xl animate-float"
					style={{
						background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
						animationDelay: "2s",
					}}
				/>

				{/* Floating Shapes */}
				<div ref={floatingShapesRef} className="absolute inset-0">
					{[
						{ left: 15, top: 20, delay: 0, duration: 8.5 },
						{ left: 75, top: 15, delay: 0.5, duration: 9.2 },
						{ left: 45, top: 70, delay: 1, duration: 10.1 },
						{ left: 85, top: 50, delay: 1.5, duration: 8.8 },
						{ left: 25, top: 85, delay: 2, duration: 9.5 },
						{ left: 60, top: 35, delay: 2.5, duration: 10.8 },
					].map((shape, i) => (
						<div
							key={i}
							className="absolute w-2 h-2 rounded-full animate-float-random"
							style={{
								left: `${shape.left}%`,
								top: `${shape.top}%`,
								backgroundColor: "var(--accent)",
								opacity: 0.1,
								animationDelay: `${shape.delay}s`,
								animationDuration: `${shape.duration}s`,
							}}
						/>
					))}
				</div>
			</div>

			<Container className="py-24 relative z-10">
				<div className="max-w-6xl mx-auto">
					{/* Hero Section */}
					<div
						ref={heroRef}
						className={`text-center mb-16 space-y-6 transform transition-all duration-1000 ${
							mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
						}`}
					>
						<div className="inline-flex items-center gap-2 bg-pill px-4 py-2 rounded-full animate-fade-slide-down">
							<div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
							<span className="text-sm font-medium" style={{ color: "var(--pill-ink)" }}>
								Available for Projects
							</span>
						</div>

						<h1
							className="text-5xl md:text-7xl font-bold tracking-tight animate-fade-slide-down"
							style={{
								fontFamily: "var(--font-display)",
								animationDelay: "0.1s",
							}}
						>
							Let's Build Something
							<br />
							<span className="text-gradient">Extraordinary</span>
						</h1>

						<p
							className="text-xl text-muted max-w-2xl mx-auto leading-relaxed animate-fade-slide-down"
							style={{ animationDelay: "0.2s" }}
						>
							Whether you need cutting-edge AI solutions, interactive experiences, or
							innovative web applications — I'm here to bring your vision to life.
						</p>
					</div>

					{/* Main Content Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
						{/* Contact Form */}
						<div
							className={`transform transition-all duration-1000 delay-300 ${
								mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
							}`}
						>
							<Card className="p-8 card-hover">
								<form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
									<div className="space-y-2">
										<h2
											className="text-2xl font-bold"
											style={{ fontFamily: "var(--font-display)" }}
										>
											Send a Message
										</h2>
										<p className="text-sm text-muted">
											Fill out the form below and I'll get back to you within 24-48
											hours
										</p>
									</div>

									{/* Name Input */}
									<div className="space-y-2 animate-fade-slide-up">
										<label
											htmlFor="name"
											className="text-sm font-medium block"
											style={{ color: "var(--ink)" }}
										>
											Name *
										</label>
										<input
											type="text"
											id="name"
											name="name"
											value={formData.name}
											onChange={handleChange}
											required
											className="input-field"
											placeholder="John Doe"
										/>
									</div>

									{/* Email Input */}
									<div className="space-y-2 animate-fade-slide-up" style={{ animationDelay: "0.05s" }}>
										<label
											htmlFor="email"
											className="text-sm font-medium block"
											style={{ color: "var(--ink)" }}
										>
											Email *
										</label>
										<input
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
											required
											className="input-field"
											placeholder="john@example.com"
										/>
									</div>

									{/* Company Input */}
									<div className="space-y-2 animate-fade-slide-up" style={{ animationDelay: "0.1s" }}>
										<label
											htmlFor="company"
											className="text-sm font-medium block"
											style={{ color: "var(--ink)" }}
										>
											Company / Organization
										</label>
										<input
											type="text"
											id="company"
											name="company"
											value={formData.company}
											onChange={handleChange}
											className="input-field"
											placeholder="Acme Corp"
										/>
									</div>

									{/* Budget Select */}
									<div className="space-y-2 animate-fade-slide-up" style={{ animationDelay: "0.15s" }}>
										<label
											htmlFor="budget"
											className="text-sm font-medium block"
											style={{ color: "var(--ink)" }}
										>
											Project Budget
										</label>
										<select
											id="budget"
											name="budget"
											value={formData.budget}
											onChange={handleChange}
											className="input-field"
										>
											<option value="">Select a range</option>
											<option value="<10k">&lt; $10,000</option>
											<option value="10k-25k">$10,000 - $25,000</option>
											<option value="25k-50k">$25,000 - $50,000</option>
											<option value="50k-100k">$50,000 - $100,000</option>
											<option value=">100k">&gt; $100,000</option>
										</select>
									</div>

									{/* Timeline Select */}
									<div className="space-y-2 animate-fade-slide-up" style={{ animationDelay: "0.2s" }}>
										<label
											htmlFor="timeline"
											className="text-sm font-medium block"
											style={{ color: "var(--ink)" }}
										>
											Expected Timeline
										</label>
										<select
											id="timeline"
											name="timeline"
											value={formData.timeline}
											onChange={handleChange}
											className="input-field"
										>
											<option value="">Select timeline</option>
											<option value="urgent">Urgent (1-2 weeks)</option>
											<option value="short">Short-term (1-3 months)</option>
											<option value="medium">Medium-term (3-6 months)</option>
											<option value="long">Long-term (6+ months)</option>
										</select>
									</div>

									{/* Message Textarea */}
									<div className="space-y-2 animate-fade-slide-up" style={{ animationDelay: "0.25s" }}>
										<label
											htmlFor="message"
											className="text-sm font-medium block"
											style={{ color: "var(--ink)" }}
										>
											Project Description *
										</label>
										<textarea
											id="message"
											name="message"
											value={formData.message}
											onChange={handleChange}
											required
											rows={5}
											className="input-field resize-none"
											placeholder="Tell me about your project, goals, and success metrics..."
										/>
									</div>

									{/* Submit Button */}
									<Button
										as="button"
										type="submit"
										disabled={isSubmitting}
										className="w-full group relative overflow-hidden"
									>
										<span className="relative z-10 flex items-center justify-center gap-2">
											{isSubmitting ? (
												<>
													<div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
													Sending...
												</>
											) : submitSuccess ? (
												<>
													<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
													</svg>
													Message Sent!
												</>
											) : (
												<>
													Send Message
													<svg
														className="w-5 h-5 transition-transform group-hover:translate-x-1"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
													</svg>
												</>
											)}
										</span>
										<div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/20 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
									</Button>
								</form>
							</Card>
						</div>

						{/* Sidebar Info */}
						<div
							ref={sidebarRef}
							className={`space-y-6 transform transition-all duration-1000 delay-500 ${
								mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
							}`}
						>
							{/* Alternative Contact Methods */}
							<Card className="p-6 card-hover">
								<h3
									className="text-xl font-semibold mb-4"
									style={{ fontFamily: "var(--font-display)" }}
								>
									Quick Connect
								</h3>
								<div className="space-y-3">
									{[
										{ icon: "✉️", label: "Email", href: "mailto:hello@frontier.ai", text: "hello@frontier.ai" },
										{ icon: "💼", label: "LinkedIn", href: "https://linkedin.com/in/your-profile", text: "linkedin.com/in/your-profile" },
										{ icon: "🐙", label: "GitHub", href: "https://github.com/yourorg", text: "github.com/yourorg" },
										{ icon: "🐦", label: "Twitter", href: "https://twitter.com/yourhandle", text: "@yourhandle" },
									].map((item, i) => (
										<a
											key={i}
											href={item.href}
											className="flex items-center gap-3 p-3 rounded-lg bg-pill/50 hover:bg-pill transition-all duration-300 group hover:scale-105 hover:shadow-md"
											style={{ animationDelay: `${i * 0.1}s` }}
										>
											<span className="text-2xl">{item.icon}</span>
											<div className="flex-1 min-w-0">
												<div className="text-xs text-muted">{item.label}</div>
												<div className="text-sm font-medium truncate group-hover:text-accent transition-colors">
													{item.text}
												</div>
											</div>
											<svg
												className="w-5 h-5 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
											</svg>
										</a>
									))}
								</div>
							</Card>

							{/* Availability Card */}
							<Card className="p-6 card-hover border-2 border-accent/20">
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0">
										<div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center animate-pulse">
											<div className="w-6 h-6 rounded-full bg-accent" />
										</div>
									</div>
									<div className="flex-1">
										<h4 className="font-semibold mb-1">Currently Available</h4>
										<p className="text-sm text-muted mb-3">
											Open to new projects and collaborations
										</p>
										<div className="flex items-center gap-2 text-sm">
											<svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
											<span className="text-muted">Response within 24-48 hours</span>
										</div>
									</div>
								</div>
							</Card>

							{/* Project Guidelines */}
							<Card className="p-6 card-hover">
								<h3
									className="text-xl font-semibold mb-4"
									style={{ fontFamily: "var(--font-display)" }}
								>
									Project Guidelines
								</h3>
								<ul className="space-y-3">
									{[
										"Company or organization name",
										"Your role and decision-making authority",
										"Estimated project budget range",
										"Desired timeline and key milestones",
										"Clear goals and success metrics",
										"Technical requirements or constraints",
									].map((item, i) => (
										<li
											key={i}
											className="flex items-start gap-3 text-sm animate-fade-slide-left"
											style={{ animationDelay: `${i * 0.05}s` }}
										>
											<svg
												className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
											<span className="text-muted">{item}</span>
										</li>
									))}
								</ul>
							</Card>

							{/* Stats */}
							<div className="grid grid-cols-2 gap-4">
								{[
									{ value: "24h", label: "Response Time" },
									{ value: "50+", label: "Projects Completed" },
								].map((stat, i) => (
									<Card
										key={i}
										className="p-4 text-center card-hover"
										style={{ animationDelay: `${i * 0.1}s` }}
									>
										<div
											className="text-3xl font-bold mb-1"
											style={{ color: "var(--accent)" }}
										>
											{stat.value}
										</div>
										<div className="text-xs text-muted">{stat.label}</div>
									</Card>
								))}
							</div>
						</div>
					</div>
				</div>
			</Container>

			<style>{`
				/* Input Fields */
				.input-field {
					width: 100%;
					padding: 0.75rem 1rem;
					border-radius: var(--radius);
					background-color: var(--bg);
					border: 2px solid var(--subtle);
					color: var(--ink);
					font-family: var(--font-sans);
					transition: all 0.3s ease;
					outline: none;
				}

				.input-field:focus {
					border-color: var(--accent);
					box-shadow: 0 0 0 3px rgba(14, 160, 114, 0.1);
					transform: translateY(-1px);
				}

				.input-field::placeholder {
					color: var(--muted);
					opacity: 0.6;
				}

				/* Card Hover Effect */
				.card-hover {
					transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
				}

				.card-hover:hover {
					transform: translateY(-4px);
					box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
				}

				/* Text Gradient */
				.text-gradient {
					background: linear-gradient(135deg, var(--accent) 0%, var(--ink) 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
				}
			`}</style>
		</main>
	);
};

export default ContactSection;
