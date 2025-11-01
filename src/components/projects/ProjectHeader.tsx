"use client";

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui';
import { SectionContainer } from '../ui/Container';

const ProjectHeader = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const floatingShapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setHeaderVisible(true), 100);
  }, []);


  return (
    <SectionContainer spacing="lg" className="min-h-screen">
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

      <div className="space-y-6">
          <div 
            className={`inline-flex items-center gap-2 bg-pill px-4 py-1.5 rounded-full transform transition-all duration-700 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
          >
            <span className="text-sm font-medium" style={{ color: 'var(--pill-ink)' }}>
              Portfolio
            </span>
          </div>
          
          <h1 
            className={`text-5xl md:text-7xl font-bold tracking-tight transform transition-all duration-700 delay-200 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
          >
            Featured Projects
          </h1>
          
          <p 
            className={`text-xl text-muted max-w-3xl transform transition-all duration-700 delay-300 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
          >
            A curated collection of cutting-edge experiments in machine learning, 
            creative technology, and interactive experiences.
          </p>

          <div 
            className={`flex gap-4 pt-4 transform transition-all duration-700 delay-500 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
          >
            <Button as="a" href="#explore">
              Explore All
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
            <Button as="a" href="/contact" variant="outline">
              Get in Touch
            </Button>
          </div>
        </div>
    </SectionContainer>
  )
}

export default ProjectHeader
