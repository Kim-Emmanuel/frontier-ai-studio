"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "@/components/ui/Button";
import Link from "next/link";

const NotFound: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orbContainerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create GSAP timeline for smooth entrance animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate orbs with floating motion
    if (orbContainerRef.current) {
      gsap.to(orbContainerRef.current, {
        duration: 6,
        repeat: -1,
        yoyo: true,
        y: -30,
        ease: "sine.inOut",
      });
    }

    if (orb1Ref.current) {
      gsap.to(orb1Ref.current, {
        duration: 8,
        repeat: -1,
        x: 30,
        y: -20,
        rotation: 360,
        ease: "none",
      });
    }

    if (orb2Ref.current) {
      gsap.to(orb2Ref.current, {
        duration: 10,
        repeat: -1,
        x: -40,
        y: 30,
        rotation: -360,
        ease: "none",
      });
    }

    // Grid animation - subtle wave effect
    if (gridRef.current) {
      gsap.to(gridRef.current, {
        duration: 0.8,
        repeat: -1,
        opacity: 0.5,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Title entrance
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.5, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8 },
        0
      );
    }

    // Subtitle entrance
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.2
      );
    }

    // Description entrance
    if (descriptionRef.current) {
      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.4
      );
    }

    // Buttons entrance
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll("a, button");
      tl.fromTo(
        buttons,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        0.6
      );
    }

    // Interactive text animation on scroll or mouse move
    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 50;
      const y = (e.clientY - rect.top - rect.height / 2) / 50;

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          x: x * 2,
          y: y * 2,
          duration: 0.3,
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30 -z-10">
        <div
          ref={gridRef}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(var(--grid-color) 1px, transparent 1px),
              linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating Gradient Orbs */}
      <div
        ref={orbContainerRef}
        className="absolute top-1/4 left-1/4 -z-10 pointer-events-none"
      >
        <div
          ref={orb1Ref}
          className="w-96 h-96 rounded-full opacity-20 blur-3xl bg-accent animate-pulse"
          style={{ animationDuration: "4s" }}
        />
      </div>
      <div className="absolute bottom-1/4 right-1/4 -z-10 pointer-events-none">
        <div
          ref={orb2Ref}
          className="w-80 h-80 rounded-full opacity-15 blur-3xl bg-accent"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-2xl mx-auto px-6 text-center space-y-8">
        {/* 404 Number */}
        <div className="relative">
          <h1
            ref={titleRef}
            className="text-9xl md:text-[150px] font-bold tracking-tight leading-none mb-2"
            style={{
              fontFamily: "var(--font-display)",
              background: "linear-gradient(135deg, var(--accent) 0%, var(--ink) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="space-y-2">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--ink)",
            }}
          >
            Page Not Found
          </h2>
          <p
            className="text-lg md:text-xl font-medium"
            style={{ color: "var(--accent)" }}
          >
            Exploring uncharted territory
          </p>
        </div>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-base md:text-lg leading-relaxed max-w-md mx-auto"
          style={{ color: "var(--muted)" }}
        >
          The page you're looking for has drifted into the digital void. Don't
          worry—our navigation systems can guide you back to familiar ground.
        </p>

        {/* Action Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
        >
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full px-10 py-3 text-lg font-bold shadow-2xl hover:shadow-accent/60 transition-all duration-500 group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Return Home
                <svg
                  className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
          </Link>

          <Link href="/projects" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full px-10 py-3 text-lg font-bold border-2 transition-all duration-500 backdrop-blur-xl group"
              style={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
              }}
            >
              <span className="flex items-center gap-2">
                Explore Projects
                <svg
                  className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500"
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
              </span>
            </Button>
          </Link>
        </div>

        {/* Additional Links */}
        {/* <div className="pt-8 border-t border-subtle/30">
          <p className="text-sm text-muted/80 mb-4">Need help finding something?</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { label: "About", href: "/about" },
              { label: "Skills", href: "/skills" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-300 hover:text-accent"
                style={{ color: "var(--muted)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div> */}
      </div>

      {/* Decorative Corner Accents */}
      <div className="absolute top-8 right-8 w-32 h-32 border-t-2 border-r-2 border-accent/30 rounded-tr-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-8 left-8 w-32 h-32 border-b-2 border-l-2 border-accent/30 rounded-bl-3xl pointer-events-none -z-10" />
    </section>
  );
};

export default NotFound;
