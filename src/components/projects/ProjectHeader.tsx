"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '../ui';
import { SectionContainer } from '../ui/Container';

const ProjectHeader: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeaderVisible(true), 100);
  }, []);

  return (
    <SectionContainer spacing="lg" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse-slow"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-8">
          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-pill/80 backdrop-blur-xl border border-accent/30 transition-all duration-1000 ${
              headerVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping absolute" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            </div>
            <span className="text-sm font-bold text-accent uppercase tracking-wider">
              Portfolio Showcase
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h1
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none transition-all duration-1000 delay-100 ${
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="block animate-text-reveal" style={{ animationDelay: '0.1s' }}>
                <span className="hero-gradient-text">Featured</span>
              </span>
              <span className="block animate-text-reveal" style={{ animationDelay: '0.3s' }}>
                <span className="text-ink">Projects</span>
              </span>
            </h1>

            <p
              className={`text-lg sm:text-xl lg:text-2xl text-muted leading-relaxed max-w-3xl mx-auto transition-all duration-1000 delay-500 ${
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              A curated collection of cutting-edge experiments in{' '}
              <span className="text-accent font-semibold">machine learning</span>,{' '}
              <span className="text-accent font-semibold">creative technology</span>, and{' '}
              <span className="text-accent font-semibold">interactive experiences</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 transition-all duration-1000 delay-700 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button
              as="button"
              onClick={() => {
                document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-10 py-5 text-lg font-bold shadow-2xl hover:shadow-accent/60 transition-all duration-500 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Projects
                <svg
                  className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>

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

          {/* Scroll Indicator */}
          <div
            className={`pt-16 transition-all duration-1000 delay-900 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div 
              className="flex flex-col items-center gap-3 text-muted hover:text-accent transition-colors duration-300 cursor-pointer group"
              onClick={() => {
                document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="text-xs font-bold uppercase tracking-widest">View Projects</span>
              <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center p-1.5">
                <div className="w-1.5 h-2.5 bg-current rounded-full animate-scroll-bounce" />
              </div>
            </div>
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

        /* Pulse Slow */
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.15;
            transform: scale(1.05);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
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

        /* Performance optimizations */
        [class*="animate-"] {
          will-change: transform, opacity;
        }
      `}</style>
    </SectionContainer>
  );
};

export default ProjectHeader;