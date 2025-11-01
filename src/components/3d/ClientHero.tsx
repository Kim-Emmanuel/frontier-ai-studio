"use client";

import React, { Suspense } from 'react';

const LazyHero = React.lazy(() => import('./HeroScene'));

const ClientHero: React.FC = () => {
  return (
    <Suspense fallback={<div className="h-[70vh] bg-card" />}>
      <LazyHero />
    </Suspense>
  );
};

export default ClientHero;
