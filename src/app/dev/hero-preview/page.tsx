"use client";

import React from "react";
import { ThemeProvider, useTheme } from "../../../../src/context/ThemeContext";
import ThemeToggle from "../../../../src/components/ThemeToggle";
import Hero from "../../../../src/components/home/Hero";

const PreviewInner: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen w-full" style={{ background: "var(--background)" }}>
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <main className="pt-12">
        <Hero />
      </main>
      <div className="fixed left-6 bottom-6 z-50 text-sm text-muted">Previewing theme: {theme}</div>
    </div>
  );
};

const Page: React.FC = () => {
  return (
    <ThemeProvider>
      <PreviewInner />
    </ThemeProvider>
  );
};

export default Page;
