"use client";

import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
	const { theme, toggle } = useTheme();
	const [isAnimating, setIsAnimating] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const knobRef = useRef<HTMLDivElement>(null);
	const sunGroupRef = useRef<SVGGElement>(null);
	const moonGroupRef = useRef<SVGGElement>(null);
	const cloudRef = useRef<SVGGElement>(null);
	const starsGroupRef = useRef<SVGGElement>(null);

	const isFirstRender = useRef(true);

	// Initial setup without animation
	useEffect(() => {
		if (isFirstRender.current && knobRef.current && sunGroupRef.current && moonGroupRef.current) {
			const isDark = theme === "dark";
			
			// Set initial positions using CSS transforms
			knobRef.current.style.transform = `translateX(${isDark ? 32 : 0}px)`;
			
			if (sunGroupRef.current) {
				sunGroupRef.current.style.opacity = isDark ? "0" : "1";
				sunGroupRef.current.style.transform = `scale(${isDark ? 0.5 : 1})`;
			}
			
			if (moonGroupRef.current) {
				moonGroupRef.current.style.opacity = isDark ? "1" : "0";
				moonGroupRef.current.style.transform = `scale(${isDark ? 1 : 0.5})`;
			}
			
			if (cloudRef.current) {
				cloudRef.current.style.opacity = isDark ? "0" : "1";
				cloudRef.current.style.transform = `translateX(${isDark ? -5 : 0}px)`;
			}
			
			if (starsGroupRef.current) {
				starsGroupRef.current.style.opacity = isDark ? "1" : "0";
			}

			isFirstRender.current = false;
		}
	}, [theme]);

	const handleToggle = () => {
		if (isAnimating) return;
		setIsAnimating(true);

		const isDark = theme === "light";

		// Animate knob
		if (knobRef.current) {
			knobRef.current.style.transition = "transform 0.55s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
			knobRef.current.style.transform = `translateX(${isDark ? 32 : 0}px)`;
		}

		// Animate track color
		if (trackRef.current) {
			trackRef.current.style.transition = "background-color 0.45s cubic-bezier(0.4, 0, 0.2, 1)";
			trackRef.current.style.backgroundColor = isDark ? "#1a3323" : "#d7f0da";
		}

		if (isDark) {
			// Light -> Dark
			if (cloudRef.current) {
				cloudRef.current.style.transition = "opacity 0.28s cubic-bezier(0.4, 0, 1, 1), transform 0.28s cubic-bezier(0.4, 0, 1, 1)";
				cloudRef.current.style.opacity = "0";
				cloudRef.current.style.transform = "translateX(-10px)";
			}

			if (sunGroupRef.current) {
				setTimeout(() => {
					if (sunGroupRef.current) {
						sunGroupRef.current.style.transition = "all 0.38s cubic-bezier(0.6, -0.28, 0.735, 0.045)";
						sunGroupRef.current.style.opacity = "0";
						sunGroupRef.current.style.transform = "scale(0.5) rotate(-90deg)";
					}
				}, 120);
			}

			if (moonGroupRef.current) {
				setTimeout(() => {
					if (moonGroupRef.current) {
						moonGroupRef.current.style.transition = "all 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
						moonGroupRef.current.style.opacity = "1";
						moonGroupRef.current.style.transform = "scale(1) rotate(0deg)";
					}
				}, 250);
			}

			if (starsGroupRef.current) {
				setTimeout(() => {
					const stars = starsGroupRef.current?.querySelectorAll(".star");
					stars?.forEach((star, i) => {
						setTimeout(() => {
							(star as HTMLElement).style.transition = "all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
							(star as HTMLElement).style.opacity = "1";
							(star as HTMLElement).style.transform = "scale(1)";
						}, i * 50);
					});
				}, 250);
			}
		} else {
			// Dark -> Light
			if (starsGroupRef.current) {
				const stars = starsGroupRef.current.querySelectorAll(".star");
				stars.forEach((star) => {
					(star as HTMLElement).style.transition = "all 0.18s cubic-bezier(0.4, 0, 1, 1)";
					(star as HTMLElement).style.opacity = "0";
					(star as HTMLElement).style.transform = "scale(0.5)";
				});
			}

			if (moonGroupRef.current) {
				setTimeout(() => {
					if (moonGroupRef.current) {
						moonGroupRef.current.style.transition = "all 0.34s cubic-bezier(0.6, -0.28, 0.735, 0.045)";
						moonGroupRef.current.style.opacity = "0";
						moonGroupRef.current.style.transform = "scale(0.5) rotate(-90deg)";
					}
				}, 120);
			}

			if (sunGroupRef.current) {
				setTimeout(() => {
					if (sunGroupRef.current) {
						sunGroupRef.current.style.transition = "all 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
						sunGroupRef.current.style.opacity = "1";
						sunGroupRef.current.style.transform = "scale(1) rotate(0deg)";
					}
				}, 220);
			}

			if (cloudRef.current) {
				setTimeout(() => {
					if (cloudRef.current) {
						cloudRef.current.style.transition = "opacity 0.34s cubic-bezier(0.4, 0, 0.2, 1), transform 0.34s cubic-bezier(0.4, 0, 0.2, 1)";
						cloudRef.current.style.opacity = "1";
						cloudRef.current.style.transform = "translateX(0px)";
					}
				}, 280);
			}
		}

		setTimeout(() => {
			setIsAnimating(false);
			toggle();
		}, 600);
	};

	const handleMouseEnter = () => {
		if (isAnimating || !containerRef.current) return;
		containerRef.current.style.transition = "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)";
		containerRef.current.style.transform = "scale(1.05)";
	};

	const handleMouseLeave = () => {
		if (isAnimating || !containerRef.current) return;
		containerRef.current.style.transition = "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)";
		containerRef.current.style.transform = "scale(1)";
	};

	return (
		<div
			ref={containerRef}
			className={`relative ${className}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<button
				onClick={handleToggle}
				disabled={isAnimating}
				aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
				className="relative w-16 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
				style={{ WebkitTapHighlightColor: "transparent" }}
			>
				{/* Track */}
				<div
					ref={trackRef}
					className="absolute inset-0 rounded-full"
					style={{
						backgroundColor: theme === "dark" ? "#1a3323" : "#d7f0da",
						boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.15)",
						transition: "background-color 0.5s ease",
					}}
				/>

				{/* Knob with SVG */}
				<div
					ref={knobRef}
					className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-lg overflow-visible"
					style={{
						boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)",
					}}
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="absolute inset-0 block"
						aria-hidden="true"
					>
						{/* Sun Group - Perfectly Aligned and Enhanced */}
						<g ref={sunGroupRef} style={{ transformOrigin: "12px 12px" }}>
							<defs>
								{/* Vibrant sun gradient with warmer tones */}
								<radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
									<stop offset="0%" stopColor="#FFF4D6" stopOpacity="1" />
									<stop offset="30%" stopColor="#FFD66B" stopOpacity="1" />
									<stop offset="70%" stopColor="#FFB347" stopOpacity="1" />
									<stop offset="100%" stopColor="#FF9A00" stopOpacity="0.95" />
								</radialGradient>
								
								{/* Glow effect for sun */}
								<filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
									<feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
									<feMerge>
										<feMergeNode in="coloredBlur" />
										<feMergeNode in="SourceGraphic" />
									</feMerge>
								</filter>
							</defs>

							{/* Outer glow layer */}
							<circle
								cx="12"
								cy="12"
								r="5.5"
								fill="#FFD66B"
								opacity="0.3"
								filter="url(#sunGlow)"
							/>

							{/* Sun core with gradient */}
							<circle
								cx="12"
								cy="12"
								r="4.2"
								fill="url(#sunGradient)"
							/>

							{/* Inner highlight for depth */}
							<circle
								cx="11"
								cy="11"
								r="1.5"
								fill="#FFFAEB"
								opacity="0.7"
							/>

							{/* Sun rays group - 8 evenly spaced rays rotating around center */}
							<g className="sun-rays" style={{ transformOrigin: "12px 12px", animation: theme === "light" ? "rotate-rays 12s linear infinite" : "none" }}>
								{Array.from({ length: 8 }).map((_, i) => {
									const angle = i * 45;
									const distance = 7.5;
									const radians = (angle * Math.PI) / 180;
									const x = 12 + Math.cos(radians) * distance;
									const y = 12 + Math.sin(radians) * distance;

									return (
										<g key={`ray-${i}`} className="sun-ray">
											{/* Main ray line from center */}
											<line
												x1="12"
												y1="12"
												x2={x}
												y2={y}
												stroke="#FFD66B"
												strokeWidth="1.8"
												strokeLinecap="round"
												opacity="0.9"
											/>
											{/* Ray tip circle for polished look */}
											<circle
												cx={x}
												cy={y}
												r="1"
												fill="#FFE599"
												opacity="0.8"
											/>
										</g>
									);
								})}
							</g>

							{/* Cloud group - positioned relative to sun */}
							<g ref={cloudRef} style={{ transformOrigin: "16px 14px" }}>
								{/* Main cloud body */}
								<ellipse
									cx="16"
									cy="14"
									rx="3.5"
									ry="2"
									fill="#FFFFFF"
									opacity="0.95"
								/>
								{/* Cloud puffs for realistic shape */}
								<circle cx="14.5" cy="13.5" r="1.5" fill="#FFFFFF" opacity="0.9" />
								<circle cx="17" cy="13.2" r="1.8" fill="#FFFFFF" opacity="0.9" />
								<circle cx="18.5" cy="14" r="1.3" fill="#FFFFFF" opacity="0.85" />
								
								{/* Subtle shadow under cloud */}
								<ellipse
									cx="16"
									cy="14.5"
									rx="3"
									ry="0.5"
									fill="#E6F3FF"
									opacity="0.4"
								/>
							</g>
						</g>

						{/* Moon Group - Silver/Gray with craters */}
						<g ref={moonGroupRef} style={{ transformOrigin: "12px 12px" }}>
							<defs>
								<radialGradient id="moonGradient" cx="35%" cy="35%" r="65%">
									<stop offset="0%" stopColor="#F5F5F5" stopOpacity="1" />
									<stop offset="50%" stopColor="#E0E0E0" stopOpacity="1" />
									<stop offset="100%" stopColor="#BDBDBD" stopOpacity="1" />
								</radialGradient>
								
								{/* Subtle glow for moon */}
								<filter id="moonGlow" x="-30%" y="-30%" width="160%" height="160%">
									<feGaussianBlur stdDeviation="1" result="coloredBlur" />
									<feMerge>
										<feMergeNode in="coloredBlur" />
										<feMergeNode in="SourceGraphic" />
									</feMerge>
								</filter>
							</defs>

							{/* Moon glow */}
							<circle
								cx="12"
								cy="12"
								r="5"
								fill="#E8E8E8"
								opacity="0.2"
								filter="url(#moonGlow)"
							/>

							{/* Moon crescent body */}
							<path
								d="M12 4.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5c1.24 0 2.4-.3 3.43-.83-2.26-1.5-3.75-4.08-3.75-7.02 0-2.94 1.49-5.52 3.75-7.02C14.4 4.8 13.24 4.5 12 4.5z"
								fill="url(#moonGradient)"
							/>

							{/* Moon craters with depth */}
							<g opacity="0.5">
								<circle cx="9" cy="10" r="1.2" fill="#A0A0A0" />
								<circle cx="9.3" cy="9.7" r="0.4" fill="#C0C0C0" />
								
								<circle cx="11" cy="14.5" r="0.9" fill="#A0A0A0" />
								<circle cx="11.2" cy="14.3" r="0.3" fill="#C0C0C0" />
								
								<circle cx="7.5" cy="13.5" r="0.7" fill="#A0A0A0" />
								<circle cx="7.6" cy="13.3" r="0.25" fill="#C0C0C0" />
							</g>

							{/* Moon highlight for 3D effect */}
							<path
								d="M10 5.5c-1.5 1-2.5 2.7-2.5 4.7 0 2 1 3.7 2.5 4.7"
								stroke="#FFFFFF"
								strokeWidth="0.5"
								fill="none"
								opacity="0.3"
							/>
						</g>

						{/* Stars Group */}
						<g ref={starsGroupRef} opacity="0">
							{[
								{ cx: 18, cy: 6, r: 0.9, brightness: 1 },
								{ cx: 19.5, cy: 10, r: 0.7, brightness: 0.8 },
								{ cx: 5, cy: 7, r: 0.8, brightness: 0.9 },
								{ cx: 6, cy: 17.5, r: 0.7, brightness: 0.85 },
								{ cx: 17, cy: 16, r: 0.9, brightness: 1 },
								{ cx: 8, cy: 11, r: 0.6, brightness: 0.75 },
							].map((star, i) => (
								<g
									key={`star-${i}`}
									className="star"
									style={{ 
										transformOrigin: `${star.cx}px ${star.cy}px`,
										animation: theme === "dark" ? `twinkle-${i} ${Math.random() * 1.5 + 1}s ease-in-out infinite ${Math.random() * 2}s` : "none"
									}}
								>
									{/* Star glow */}
									<circle
										cx={star.cx}
										cy={star.cy}
										r={star.r + 0.5}
										fill="#FFFACD"
										opacity={0.2 * star.brightness}
									/>
									{/* Star core */}
									<circle
										cx={star.cx}
										cy={star.cy}
										r={star.r}
										fill="#FFFEF0"
										opacity={0.95 * star.brightness}
									/>
									{/* Vertical sparkle line */}
									<line
										x1={star.cx}
										y1={star.cy - star.r - 1}
										x2={star.cx}
										y2={star.cy + star.r + 1}
										stroke="#FFFEF0"
										strokeWidth="0.4"
										opacity={0.7 * star.brightness}
										strokeLinecap="round"
									/>
									{/* Horizontal sparkle line */}
									<line
										x1={star.cx - star.r - 1}
										y1={star.cy}
										x2={star.cx + star.r + 1}
										y2={star.cy}
										stroke="#FFFEF0"
										strokeWidth="0.4"
										opacity={0.7 * star.brightness}
										strokeLinecap="round"
									/>
								</g>
							))}
						</g>
					</svg>
				</div>

				{/* Focus indicator */}
				<div className="absolute inset-0 rounded-full border-2 border-transparent group-focus-visible:border-accent transition-colors" />
			</button>

			<span className="sr-only">
				{theme === "light" ? "Light" : "Dark"} mode enabled
			</span>

			<style>{`
				@keyframes rotate-rays {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(360deg);
					}
				}

				@keyframes twinkle-0 {
					0%, 100% { opacity: 1; transform: scale(1); }
					50% { opacity: 0.3; transform: scale(0.8); }
				}

				@keyframes twinkle-1 {
					0%, 100% { opacity: 0.8; transform: scale(0.9); }
					50% { opacity: 0.4; transform: scale(1.1); }
				}

				@keyframes twinkle-2 {
					0%, 100% { opacity: 0.9; transform: scale(1); }
					50% { opacity: 0.5; transform: scale(0.85); }
				}

				@keyframes twinkle-3 {
					0%, 100% { opacity: 0.85; transform: scale(0.95); }
					50% { opacity: 0.35; transform: scale(1.05); }
				}

				@keyframes twinkle-4 {
					0%, 100% { opacity: 1; transform: scale(1); }
					50% { opacity: 0.4; transform: scale(0.9); }
				}

				@keyframes twinkle-5 {
					0%, 100% { opacity: 0.75; transform: scale(0.85); }
					50% { opacity: 0.3; transform: scale(1.15); }
				}
			`}</style>
		</div>
	);
};

export default ThemeToggle;