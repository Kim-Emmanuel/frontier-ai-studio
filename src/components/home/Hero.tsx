"use client";

import React, { useRef, useEffect, useState } from "react";
import { Container } from "../ui";
import Button from "../ui/Button";
import dynamic from "next/dynamic";
import { SectionContainer } from "../ui/Container";

const ClientHero = dynamic(() => import("../3d/ClientHero"), { ssr: false });

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const canvasCardRef = useRef<HTMLDivElement>(null);
  const floatingShapesRef = useRef<HTMLDivElement>(null);

  // Mouse parallax state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Advanced parallax effect
  useEffect(() => {
    let rafId: number;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    const animate = () => {
      currentX += (mousePos.x - currentX) * 0.05;
      currentY += (mousePos.y - currentY) * 0.05;

      // Apply parallax to content
      if (heroTextRef.current) {
        heroTextRef.current.style.transform = `translate(${currentX * 15}px, ${currentY * 15}px)`;
      }

      // Apply opposite parallax to canvas card
      if (canvasCardRef.current) {
        canvasCardRef.current.style.transform = `translate(${currentX * -25}px, ${currentY * -25}px) perspective(1000px) rotateY(${currentX * 5}deg) rotateX(${-currentY * 5}deg)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [mousePos]);

  // Magnetic button effect
  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "translate(0, 0)";
  };

  return (
    <SectionContainer className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs with enhanced animation */}
        <div className="gradient-orb gradient-orb-1" />
        <div className="gradient-orb gradient-orb-2" />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl animate-pulse-slow"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />

        {/* Floating Particles */}
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

        {/* Geometric Grid Lines */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <Container size="xl" className="relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Content */}
          <div
            ref={heroTextRef}
            className="lg:col-span-7 space-y-8"
            style={{ willChange: "transform" }}
          >
            {/* Status Badge */}
            <div
              className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-pill/80 backdrop-blur-xl border border-accent/30 transition-all duration-1000 ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              <div className="relative flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping absolute" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
              </div>
              <span className="text-sm font-bold text-accent uppercase tracking-wider">
                Pioneering AI Innovation Since 2020
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1
                ref={headlineRef}
                className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none tracking-tight transition-all duration-1000 delay-100 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="block animate-text-reveal" style={{ animationDelay: "0.1s" }}>
                  <span className="hero-gradient-text">Frontier AI</span>
                </span>
                <span className="block animate-text-reveal" style={{ animationDelay: "0.3s" }}>
                  <span className="text-ink">Studio</span>
                </span>
              </h1>

              <div
                className={`text-xl sm:text-2xl lg:text-3xl font-medium text-muted leading-relaxed transition-all duration-1000 delay-500 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <p className="mb-2">
                  Where <span className="text-accent font-bold">Intelligence</span> Meets
                </p>
                <p className="hero-gradient-text text-4xl sm:text-5xl font-bold">
                  Innovation
                </p>
              </div>
            </div>

            {/* Description */}
            <p
              className={`text-lg sm:text-xl text-muted/90 leading-relaxed max-w-2xl transition-all duration-1000 delay-700 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              We transform cutting-edge research into production-ready AI systems. From neural
              networks to immersive 3D experiences, we build intelligent solutions that scale.
            </p>

            {/* Tech Badges */}
            <div
              className={`flex flex-wrap gap-3 transition-all duration-1000 delay-900 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {[
                "Machine Learning",
                "Computer Vision",
                "NLP",
                "3D Graphics",
                "MLOps",
              ].map((tech, i) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm font-semibold rounded-full bg-accent/10 border border-accent/30 text-accent backdrop-blur-sm hover:bg-accent/20 hover:scale-110 hover:border-accent/50 transition-all duration-300 cursor-default animate-badge-pop"
                  style={{ animationDelay: `${1 + i * 0.1}s` }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-1000 delay-1100 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="magnetic-button"
              >
                <Button
                  as="a"
                  href="#projects"
                  className="px-10 py-5 text-lg font-bold shadow-2xl hover:shadow-accent/60 transition-all duration-500 group relative overflow-hidden"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Explore Our Work
                    <svg
                      className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
              </div>

              <div
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="magnetic-button"
              >
                <Button
                  as="a"
                  href="/contact"
                  variant="outline"
                  className="px-10 py-5 text-lg font-bold border-2 border-accent/50 hover:border-accent text-accent hover:bg-accent/10 transition-all duration-500 backdrop-blur-xl group"
                >
                  <span className="flex items-center gap-3">
                    Start a Project
                    <svg
                      className="w-6 h-6 group-hover:rotate-45 transition-transform duration-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </Button>
              </div>
            </div>

            {/* Tech Stack Indicators */}
            <div
              className={`flex flex-wrap items-center gap-6 text-sm text-muted pt-4 transition-all duration-1000 delay-1300 ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
            >
              {[
                { icon: "⚛️", text: "React" },
                { icon: "🎮", text: "Three.js" },
                { icon: "🧠", text: "TensorFlow" },
                { icon: "📘", text: "TypeScript" },
              ].map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 animate-fade-in-stagger"
                  style={{ animationDelay: `${1.4 + i * 0.1}s` }}
                >
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse-ring" />
                  </div>
                  <span className="font-medium">
                    {tech.icon} {tech.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Canvas Card */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div
              ref={canvasCardRef}
              className={`relative w-full max-w-lg transition-all duration-1000 delay-300 ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              style={{ willChange: "transform", transformStyle: "preserve-3d" }}
            >
              {/* Glow Effect Behind Card */}
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/30 via-accent/20 to-accent/30 rounded-3xl blur-2xl opacity-60 animate-pulse-slow" />

              {/* Main Card */}
              <div className="relative rounded-3xl bg-card/40 backdrop-blur-2xl border-2 border-accent/20 shadow-2xl overflow-hidden group hover:border-accent/40 transition-all duration-500">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />

                {/* 3D Canvas */}
                <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
                  <ClientHero />

                  {/* Overlay Info */}
                  <div className="absolute inset-x-6 bottom-6 z-30">
                    <div className="bg-card/95 backdrop-blur-xl rounded-2xl p-5 border border-accent/30 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-xs uppercase tracking-wider text-muted/80 font-bold mb-1">
                            Interactive 3D Model
                          </div>
                          <div className="text-lg font-bold text-ink mb-1">Tika Mask</div>
                          <div className="text-sm text-muted">
                            Drag to rotate • Scroll to zoom
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-accent/20 border-2 border-accent/50 flex items-center justify-center animate-pulse">
                            <svg
                              className="w-6 h-6 text-accent"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-accent/30 rounded-tr-2xl" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-accent/30 rounded-bl-2xl" />
                </div>
              </div>

              {/* Floating Metrics */}
              <div className="absolute -right-8 top-1/4 bg-card/40 backdrop-blur-2xl rounded-2xl p-4 border-2 border-accent/20 shadow-2xl animate-float-gentle hidden xl:block">
                <div className="text-3xl font-bold hero-gradient-text">50M+</div>
                <div className="text-xs text-muted">Predictions</div>
              </div>

              <div className="absolute -left-8 bottom-1/4 bg-card/40 backdrop-blur-2xl rounded-2xl p-4 border-2 border-accent/20 shadow-2xl animate-float-gentle hidden xl:block" style={{ animationDelay: "1s" }}>
                <div className="text-3xl font-bold hero-gradient-text">99.9%</div>
                <div className="text-xs text-muted">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer transition-all duration-1000 delay-1500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        onClick={() => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <div className="flex flex-col items-center gap-3 text-muted hover:text-accent transition-colors duration-300 group">
          <span className="text-xs font-bold uppercase tracking-widest">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2.5 bg-current rounded-full animate-scroll-bounce" />
          </div>
        </div>
      </div>

      <style>{`
        /* Hero Gradient Text */
        .hero-gradient-text {
          background: linear-gradient(135deg, var(--accent) 0%, var(--ink) 50%, var(--accent) 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-wave 8s ease infinite;
        }

        @keyframes gradient-wave {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Text Reveal Animation */
        @keyframes text-reveal {
          from {
            opacity: 0;
            transform: translateY(30px) rotateX(-20deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }

        .animate-text-reveal {
          animation: text-reveal 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }

        /* Badge Pop Animation */
        @keyframes badge-pop {
          0% {
            opacity: 0;
            transform: scale(0.6) translateY(20px);
          }
          60% {
            transform: scale(1.1) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-badge-pop {
          animation: badge-pop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        /* Fade In Stagger */
        @keyframes fade-in-stagger {
          from {
            opacity: 0;
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-stagger {
          animation: fade-in-stagger 0.6s ease-out forwards;
          opacity: 0;
        }

        /* Pulse Ring */
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 var(--accent);
            opacity: 1;
          }
          70% {
            box-shadow: 0 0 0 8px transparent;
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }

        .animate-pulse-ring {
          animation: pulse-ring 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Pulse Slow */
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        /* Float Gentle */
        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }

        /* Scroll Bounce */
        @keyframes scroll-bounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(10px);
            opacity: 0.5;
          }
        }

        .animate-scroll-bounce {
          animation: scroll-bounce 2s ease-in-out infinite;
        }

        /* Magnetic Button */
        .magnetic-button {
          will-change: transform;
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        /* Performance optimizations */
        [class*="animate-"] {
          will-change: transform, opacity;
        }
      `}</style>
    </SectionContainer>
  );
};

export default Hero;