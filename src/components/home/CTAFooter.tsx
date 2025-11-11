"use client";

import React, { useEffect, useRef } from 'react';
import { Container } from '../ui';
import Button from '../ui/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CTAFooter: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main content animation on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
        '-=0.3'
      )
      .fromTo(
        cardsRef.current?.children || [],
        { y: 40, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power2.out' 
        },
        '-=0.5'
      );

      // Floating particles animation
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        Array.from(particles).forEach((particle, i) => {
          gsap.to(particle, {
            y: `random(-30, 30)`,
            x: `random(-20, 20)`,
            duration: `random(3, 5)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.2,
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Magnetic effect for CTA button
  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(button, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      description: 'hello@frontierai.studio',
      link: 'mailto:hello@frontierai.studio',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Schedule Call',
      description: 'Book a 30-min chat',
      link: '#schedule',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Quick Form',
      description: 'Send a message now',
      link: '/contact',
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-bg to-pill/30 -z-10" />
      
      {/* Floating Particles */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none -z-5"
        aria-hidden="true"
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-accent/20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
          />
        ))}
      </div>

      <Container size="lg">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Let's Work Together
          </div>

          {/* Heading */}
          <h2 
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Ready to build something{' '}
            <span 
              className="cta-gradient-text"
            >
              extraordinary
            </span>
            ?
          </h2>

          {/* Description */}
          <p 
            ref={textRef}
            className="text-lg sm:text-xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Let's collaborate to create AI-powered experiences that push boundaries 
            and deliver real value. From concept to deployment, I'm here to help.
          </p>

          {/* Primary CTA */}
          <div 
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className="magnetic-button"
            >
              <Button
                as="a"
                href="/contact"
                className="px-10 py-5 text-lg font-semibold shadow-2xl hover:shadow-accent/50 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start a Project
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </Button>
            </div>

            <button 
              className="px-10 py-5 text-lg font-semibold rounded-xl border-2 border-accent/30 text-ink hover:border-accent hover:bg-accent/5 transition-all duration-300 backdrop-blur-sm group"
              onClick={() => window.location.href = '#projects'}
            >
              <span className="flex items-center gap-2">
                View Portfolio
                <svg 
                  className="w-5 h-5 group-hover:scale-110 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Contact Methods Cards */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              className="group relative bg-card/80 backdrop-blur-sm border border-subtle/40 rounded-2xl p-8 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300 group-hover:scale-110">
                {method.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-2 text-ink group-hover:text-accent transition-colors">
                {method.title}
              </h3>
              <p className="text-muted text-sm group-hover:text-ink transition-colors">
                {method.description}
              </p>

              {/* Arrow Icon */}
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                <svg 
                  className="w-5 h-5 text-accent" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Hover Gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </a>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted mb-4">Trusted by innovative teams</p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="px-3 py-1 text-xs font-medium text-muted border border-subtle/30 rounded-full">
              🚀 Fast Response
            </span>
            <span className="px-3 py-1 text-xs font-medium text-muted border border-subtle/30 rounded-full">
              ✨ Quality First
            </span>
            <span className="px-3 py-1 text-xs font-medium text-muted border border-subtle/30 rounded-full">
              🎯 Result Driven
            </span>
            <span className="px-3 py-1 text-xs font-medium text-muted border border-subtle/30 rounded-full">
              🤝 Collaborative
            </span>
          </div>
        </div>
      </Container>

      {/* Styles */}
      <style jsx>{`
        .cta-gradient-text {
          background: linear-gradient(135deg, #0ea072 0%, #0d8a5f 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @supports not (-webkit-background-clip: text) {
          .cta-gradient-text {
            color: #0ea072;
          }
        }

        .magnetic-button {
          display: inline-block;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CTAFooter;
