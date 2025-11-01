"use client";

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimations: React.FC = () => {
  useEffect(() => {
    // Hero headline parallax
    const hero = document.querySelector('.hero-headline');
    if (hero) {
      gsap.fromTo(
        hero,
        { y: -40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: hero,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Reveal sections
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 36, opacity: 0, skewY: 2 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        }
      );
    });

    // Parallax for elements with data-depth
    const paras = document.querySelectorAll<HTMLElement>('.parallax-y');
    paras.forEach((el) => {
      const depthAttr = el.getAttribute('data-depth');
      const depth = depthAttr ? parseFloat(depthAttr) : 0.08;
      gsap.to(el, {
        y: () => `-${depth * 100}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    });

    // Timeline progress fill
    const timeline = document.querySelector('.timeline');
    const progressEl = document.querySelector('.timeline-progress') as HTMLElement | null;
    if (timeline && progressEl) {
      const tlStart = timeline as Element;
      ScrollTrigger.create({
        trigger: tlStart,
        start: 'top center',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = Math.max(0, Math.min(1, self.progress));
          progressEl.style.height = `${progress * 100}%`;
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
};

export default ScrollAnimations;
