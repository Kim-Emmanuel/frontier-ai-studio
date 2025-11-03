"use client";

import React, { Suspense } from 'react';
import { useTheme } from '../../context/ThemeContext';

const LazyHero = React.lazy(() => import('./HeroScene'));

const ClientHero: React.FC = () => {
  const { theme } = useTheme();

  // Explicitly map theme -> colors (matches variables in globals.css)
  const accent = '#0ea072';
  const bg = theme === 'dark' ? '#0a1a0f' : '#e8f6ea';

  return (
    <Suspense fallback={<div className="h-[70vh] bg-card" />}>
      <LazyHero accent={accent} theme={theme} bg={bg} />
    </Suspense>
  );
};

export default ClientHero;
