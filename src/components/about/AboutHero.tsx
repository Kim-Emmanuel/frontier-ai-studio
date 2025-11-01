"use client";

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Button from '../ui/Button';
import Container from '../ui/Container';

const HeroScene = dynamic(() => import('../3d/HeroScene'), { ssr: false });

const AboutHero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);

  // Stats data
  const stats = [
    { value: '50+', label: 'AI Models Deployed', icon: '🤖' },
    { value: '12M+', label: 'Predictions Served', icon: '⚡' },
    { value: '99.9%', label: 'Uptime SLA', icon: '🎯' },
    { value: '24/7', label: 'Enterprise Support', icon: '💬' },
  ];

  // Mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Advanced parallax and mouse tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const animate = () => {
      // Smooth lerp for cursor following
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      container.style.setProperty('--mouse-x', String(currentX));
      container.style.setProperty('--mouse-y', String(currentY));

      // Apply parallax to content
      if (contentRef.current) {
        const offsetX = currentX * 15;
        const offsetY = currentY * 15;
        contentRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }

      // Apply opposite parallax to scene for depth
      if (sceneRef.current) {
        const offsetX = currentX * -25;
        const offsetY = currentY * -25;
        sceneRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.05)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    container.addEventListener('mousemove', onMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Scroll reveal animations
  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = [contentRef.current, sceneRef.current, statsRef.current];
    elements.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [mounted]);

  // Badge float animation
  useEffect(() => {
    if (!badgeRef.current) return;

    let startTime = Date.now();
    let animationFrameId: number;

    const floatAnimation = () => {
      const elapsed = Date.now() - startTime;
      const offset = Math.sin(elapsed * 0.002) * 5;
      
      if (badgeRef.current) {
        badgeRef.current.style.transform = `translateY(${offset}px)`;
      }

      animationFrameId = requestAnimationFrame(floatAnimation);
    };

    animationFrameId = requestAnimationFrame(floatAnimation);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-20">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-scroll 20s linear infinite',
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-20 blur-3xl bg-accent animate-pulse-slow" />
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-15 blur-3xl bg-accent animate-pulse-slow" style={{ animationDelay: '3s' }} />

      <Container>
        <div ref={containerRef} className="about-hero grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          
          {/* Left Content */}
          <div 
            ref={contentRef}
            className={`space-y-6 reveal-content transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            {/* Floating Badge */}
            <div 
              ref={badgeRef}
              className="inline-flex items-center gap-2 bg-pill px-4 py-2 rounded-full backdrop-blur-sm"
              style={{ willChange: 'transform' }}
            >
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-accent animate-ping absolute" />
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--pill-ink)' }}>
                Pioneering AI Solutions Since 2020
              </span>
            </div>

            {/* Main Heading */}
            <h1 
              className="text-5xl md:text-7xl font-bold tracking-tight leading-tight animate-slide-up"
              style={{ 
                fontFamily: 'var(--font-display)',
                animationDelay: '0.1s',
              }}
            >
              Building the Future of
              <br />
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-accent to-ink">
                Artificial Intelligence
              </span>
            </h1>

            {/* Description */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl text-muted leading-relaxed">
                At <strong className="text-ink">Frontier AI Studio</strong>, we transform cutting-edge research into production-ready AI systems that solve real-world challenges.
              </p>
              <p className="text-lg text-muted leading-relaxed">
                From machine learning infrastructure to intuitive AI-powered interfaces, we partner with forward-thinking organizations to build intelligent solutions that scale.
              </p>
            </div>

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {['Machine Learning', 'Computer Vision', 'NLP', 'MLOps', 'Edge AI'].map((tech, i) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-pill/50 backdrop-blur-sm hover:bg-pill hover:scale-105 transition-all duration-300 cursor-default"
                  style={{ 
                    color: 'var(--pill-ink)',
                    animationDelay: `${0.4 + i * 0.05}s`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <Button 
                as="a"
                href="#capabilities"
                className="group relative overflow-hidden"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Our Work
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/10 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Button>

              <Button 
                as="a"
                href="/contact"
                variant="outline"
                className="group"
              >
                <span className="flex items-center gap-2">
                  Start a Project
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:rotate-45" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Button>
            </div>

            {/* Client Logos/Trust Badges */}
            <div className="pt-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <p className="text-sm text-muted mb-4 uppercase tracking-wide">Trusted By Industry Leaders</p>
              <div className="flex flex-wrap items-center gap-6 opacity-60">
                {['Enterprise', 'Startups', 'Research Labs', 'Government'].map((client) => (
                  <div 
                    key={client} 
                    className="text-sm font-semibold text-muted hover:text-ink transition-colors cursor-default"
                  >
                    {client}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Scene */}
          <div 
            ref={sceneRef}
            className={`relative reveal-scene transition-all duration-1000 delay-300 ${
              mounted ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'
            }`}
            style={{ willChange: 'transform' }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-card border-2 border-subtle/50">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-accent/10 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000" />
              
              {/* 3D Scene */}
              <div className="relative aspect-square">
                <HeroScene />
              </div>

              {/* Floating Info Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-card/90 backdrop-blur-md rounded-xl p-4 border border-subtle/50 shadow-xl animate-slide-up-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">Real-time AI Processing</div>
                    <div className="text-xs text-muted">Sub-100ms inference latency</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-pulse-slow" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          </div>
        </div>

        {/* Stats Section */}
        <div 
          ref={statsRef}
          className={`mt-20 pt-12 border-t border-subtle/30 reveal-stats transition-all duration-1000 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div 
                key={i}
                className="text-center group hover:scale-105 transition-transform duration-300 cursor-default"
                style={{ animationDelay: `${0.7 + i * 0.1}s` }}
              >
                <div className="text-4xl mb-2 animate-bounce-slow">{stat.icon}</div>
                <div 
                  className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-br from-accent to-ink"
                >
                  {stat.value}
                </div>
                <div className="text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        /* Gradient Text */
        .text-gradient {
          background: linear-gradient(135deg, var(--accent) 0%, var(--ink) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Animations */
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up-delayed {
          0%, 30% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes grid-scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.05);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up-delayed {
          animation: slide-up-delayed 1.5s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        /* Parallax smoothing */
        .reveal-content,
        .reveal-scene {
          will-change: transform;
          transition: transform 0.1s ease-out;
        }

        /* Hover effects */
        .group:hover .group-hover\\:opacity-100 {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default AboutHero;