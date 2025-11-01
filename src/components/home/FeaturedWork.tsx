import React, { useState } from "react";
import Card from "../ui/Card";
import { Container, Button } from "../ui";

// Project data with enhanced metadata
const projects = [
	{
		title: "AI Composer",
		desc: "Generative audio experiments with neural synthesis",
		cta: "/projects/ai-composer",
		tags: ["ML", "Audio", "Generative"],
		icon: "🎵",
	},
	{
		title: "Vector Studio",
		desc: "Embeddable ML tools for production environments",
		cta: "/projects/vector-studio",
		tags: ["ML", "Embeddings", "API"],
		icon: "🎯",
	},
	{
		title: "Vision Lab",
		desc: "Realtime image models with sub-100ms inference",
		cta: "/projects/vision-lab",
		tags: ["CV", "Realtime", "Edge"],
		icon: "👁️",
	},
];

const FeaturedWork = () => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


	return (
		<section className="w-full py-20 relative">
			<Container>
				{/* Section Header */}
				<div className="mb-12 space-y-3">
					<div className="inline-flex items-center gap-2 bg-pill px-4 py-1.5 rounded-full">
						<span
							className="text-sm font-medium"
							style={{ color: "var(--pill-ink)" }}
						>
							Featured Work
						</span>
					</div>
					<h2
						className="text-4xl md:text-5xl font-semibold tracking-tight"
						style={{ fontFamily: "var(--font-display)" }}
					>
						Latest Projects
					</h2>
					<p className="text-muted text-lg max-w-2xl">
						Pushing boundaries in machine learning and creative technology
					</p>
				</div>

				{/* Projects Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{projects.map((project, idx) => (
						<Card
							key={project.title}
							hoverable
							className="group cursor-pointer relative overflow-hidden"
							onMouseEnter={() => setHoveredIndex(idx)}
							onMouseLeave={() => setHoveredIndex(null)}
						>
							{/* Hover gradient effect */}
							<div
								className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
								style={{
									background:
										"radial-gradient(circle at center, rgba(14,160,114,0.08) 0%, transparent 70%)",
								}}
							/>

							<div className="relative z-10 space-y-4">
								{/* Icon & Title */}
								<div className="flex items-start justify-between">
									<div className="flex items-center gap-3">
										<div className="text-3xl transform transition-transform duration-300 group-hover:scale-110">
											{project.icon}
										</div>
										<h3
											className="text-xl font-semibold tracking-tight"
											style={{ fontFamily: "var(--font-display)" }}
										>
											{project.title}
										</h3>
									</div>

									{/* Arrow indicator */}
									<svg
										className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
										style={{ color: "var(--accent)" }}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M7 17L17 7M17 7H7M17 7v10"
										/>
									</svg>
								</div>

								{/* Description */}
								<p
									className="text-sm leading-relaxed"
									style={{ color: "var(--muted)" }}
								>
									{project.desc}
								</p>

								{/* Tags */}
								<div className="flex flex-wrap gap-2 pt-2">
									{project.tags.map((tag) => (
										<span
											key={tag}
											className="text-xs px-3 py-1 rounded-full font-medium bg-pill"
											style={{
												color: "var(--pill-ink)",
												fontFamily: "var(--font-mono)",
											}}
										>
											{tag}
										</span>
									))}
								</div>

								{/* CTA Button */}
								<div className="pt-2">
									<Button
										as="a"
										href={project.cta}
										className="w-full justify-center"
									>
										<span>View Project</span>
										<svg
											className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</Button>
								</div>
							</div>

							{/* Active state indicator */}
							{hoveredIndex === idx && (
								<div
									className="absolute bottom-0 left-0 right-0 h-1 animate-pulse"
									style={{
										background:
											"linear-gradient(90deg, transparent, var(--accent), transparent)",
									}}
								/>
							)}
						</Card>
					))}
				</div>

				{/* View All CTA */}
				<div className="mt-12 text-center">
					<Button as="a" href="/projects" className="group">
						<span>View All Projects</span>
						<svg
							className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							/>
						</svg>
					</Button>
				</div>
			</Container>
		</section>
	);
};

export default FeaturedWork;
