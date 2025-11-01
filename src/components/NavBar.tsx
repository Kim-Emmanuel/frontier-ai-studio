"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import gsap from 'gsap';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const NavBar: React.FC = () => {
  const pathname = usePathname() || '/';
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const navLinksRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const ticking = useRef(false);

  // Optimized scroll handler with requestAnimationFrame
  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setScrolled(y > 50);
          
          // Hide on scroll down, show on scroll up
          if (y > lastY.current && y > 100) {
            setHidden(true);
          } else if (y < lastY.current) {
            setHidden(false);
          }
          
          lastY.current = y;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Enhanced accessibility: trap focus and handle ESC key
  useEffect(() => {
    const body = document.body;
    if (menuOpen) {
      body.style.overflow = 'hidden';
      
      const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      const focusableArray = focusable ? Array.from(focusable) : [];
      const firstFocusable = focusableArray[0];
      const lastFocusable = focusableArray[focusableArray.length - 1];

      // Focus first element
      setTimeout(() => firstFocusable?.focus(), 50);

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMenuOpen(false);
          return;
        }

        if (e.key === 'Tab' && focusableArray.length > 0) {
          const activeElement = document.activeElement as HTMLElement;
          
          if (e.shiftKey) {
            // Shift + Tab: backward
            if (activeElement === firstFocusable) {
              e.preventDefault();
              lastFocusable?.focus();
            }
          } else {
            // Tab: forward
            if (activeElement === lastFocusable) {
              e.preventDefault();
              firstFocusable?.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', onKeyDown);
      return () => {
        window.removeEventListener('keydown', onKeyDown);
        body.style.overflow = '';
      };
    }
  }, [menuOpen]);

  // Enhanced GSAP animation for overlay menu
  useEffect(() => {
    if (!menuOpen || !overlayRef.current) return;

    const overlay = overlayRef.current;
    const items = overlay.querySelectorAll('.overlay-item');

    // Animate overlay entrance
    gsap.fromTo(
      overlay,
      { x: '100%' },
      { x: 0, duration: 0.4, ease: 'power3.out' }
    );

    // Stagger animate menu items
    gsap.fromTo(
      items,
      { x: 60, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        stagger: 0.08, 
        duration: 0.5, 
        ease: 'power2.out',
        delay: 0.1
      }
    );
  }, [menuOpen]);

  // Improved active pill positioning with debounce
  const positionPill = useCallback(() => {
    if (!navLinksRef.current || !pillRef.current) return;

    const links = Array.from(navLinksRef.current.querySelectorAll('.nav-link')) as HTMLElement[];
    let activeLink: HTMLElement | null = null;

    // Find exact active link
    for (const link of links) {
      const href = link.getAttribute('href') || '';
      if (href === pathname || (href !== '/' && pathname.startsWith(href))) {
        activeLink = link;
        break;
      }
    }

    if (!activeLink) {
      gsap.to(pillRef.current, { 
        scaleX: 0, 
        duration: 0.2, 
        ease: 'power2.out' 
      });
      return;
    }

    const linkRect = activeLink.getBoundingClientRect();
    const containerRect = navLinksRef.current.getBoundingClientRect();
    const left = linkRect.left - containerRect.left;
    const width = linkRect.width;

    gsap.to(pillRef.current, { 
      left, 
      width,
      scaleX: 1,
      duration: 0.3, 
      ease: 'power3.out' 
    });
  }, [pathname]);

  useEffect(() => {
    positionPill();
    
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(positionPill, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [positionPill]);

  // Enhanced magnetic effect with smooth animation
  const handleMagneticMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const maxDistance = 20;
    const strength = 0.3;
    
    const distance = Math.sqrt(x * x + y * y);
    const factor = Math.min(distance / maxDistance, 1);
    
    const tx = x * strength * (1 - factor);
    const ty = y * strength * (1 - factor);
    
    gsap.to(el, {
      x: tx,
      y: ty,
      duration: 0.3,
      ease: 'power2.out'
    });
  }, []);

  const handleMagneticLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)'
    });
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed left-1/2 -translate-x-1/2 top-6 z-50 transition-all duration-300 ease-out ${
          hidden ? '-translate-y-32 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
        style={{ width: 'min(1400px, calc(100% - 48px))' }}
        aria-label="Main navigation"
      >
        <div
          className={`backdrop-blur-xl bg-card/90 border border-subtle/40 shadow-lg rounded-3xl mx-auto flex items-center justify-between px-6 transition-all duration-300 ${
            scrolled ? 'h-16 shadow-2xl' : 'h-20'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Frontier AI Studio Home">
            <div className="w-12 h-12 bg-gradient-to-br from-accent via-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <span className="font-bold text-white text-xl">F</span>
            </div>
            <span className="hidden md:block font-semibold text-lg text-ink">Frontier</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 relative" ref={navLinksRef}>
            {/* Active pill indicator */}
            <div
              ref={pillRef}
              className="absolute bottom-0 h-0.5 bg-accent rounded-full transition-all duration-300"
              style={{ 
                left: 0, 
                width: 0,
                transformOrigin: 'left'
              }}
              aria-hidden="true"
            />
            
            {LINKS.map((link) => {
              const isActive = pathname === link.href || 
                              (link.href !== '/' && pathname.startsWith(link.href));
              
              return (
                <div
                  key={link.href}
                  className="nav-link-wrapper relative"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                >
                  <Link
                    href={link.href}
                    className={`nav-link relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                      isActive 
                        ? 'text-accent font-semibold' 
                        : 'text-ink hover:text-accent hover:bg-pill/50'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="lg:hidden p-2 rounded-lg hover:bg-pill/50 transition-colors"
              onClick={() => setMenuOpen(true)}
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-[60] lg:hidden" 
          aria-modal="true" 
          role="dialog"
          aria-label="Mobile navigation"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <aside
            ref={overlayRef}
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-card/98 backdrop-blur-xl shadow-2xl border-l border-subtle/40"
          >
            <div className="flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <Link 
                  href="/" 
                  className="flex items-center gap-3"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-teal-600 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-white">F</span>
                  </div>
                  <span className="font-semibold text-lg">Frontier</span>
                </Link>
                
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    aria-label="Close navigation menu"
                    onClick={() => setMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-pill/50 transition-colors"
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2 flex-1">
                {LINKS.map((link, index) => {
                  const isActive = pathname === link.href || 
                                  (link.href !== '/' && pathname.startsWith(link.href));
                  
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`overlay-item text-3xl font-semibold py-3 px-4 rounded-xl transition-all ${
                        isActive 
                          ? 'text-accent bg-pill/50' 
                          : 'text-ink hover:text-accent hover:bg-pill/30'
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Footer - Social Links */}
              <div className="pt-6 border-t border-subtle/40">
                <p className="text-sm text-muted mb-4">Connect with me</p>
                <div className="flex gap-4">
                  <a 
                    href="https://twitter.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:text-accent transition-colors"
                    aria-label="Twitter profile"
                  >
                    Twitter
                  </a>
                  <a 
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:text-accent transition-colors"
                    aria-label="GitHub profile"
                  >
                    GitHub
                  </a>
                  <a 
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:text-accent transition-colors"
                    aria-label="LinkedIn profile"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default NavBar;