"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Counter: React.FC<{ end: number; label: string }> = ({ end, label }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: end,
      duration: 2,
      roundProps: 'val',
      onUpdate: () => {
        el.textContent = String(obj.val);
      },
      ease: 'power2.out',
    });
  }, [end]);

  return (
    <div className="text-center">
      <div className="text-3xl font-bold" ref={ref}>0</div>
      <div className="text-sm text-muted mt-1">{label}</div>
    </div>
  );
};

const Counters: React.FC = () => {
  return (
    <section className="w-full py-12">
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
        <Counter end={24} label="Projects" />
        <Counter end={6} label="Years" />
        <Counter end={18} label="Technologies" />
      </div>
    </section>
  );
};

export default Counters;
