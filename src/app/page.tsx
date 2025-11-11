"use client";

import React, { useEffect } from "react";
import Hero from "../components/home/Hero";
// import FeaturedWork from "../components/home/FeaturedWork";
// import Counters from "../components/home/Counters";
// import LatestArticles from "../components/home/LatestArticles";
// import CTAFooter from "../components/home/CTAFooter";
import ScrollAnimations from "../components/ScrollAnimations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Home = () => {
  useEffect(() => {
    // Section reveal animations
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((section) => {
        gsap.fromTo(
          section as Element,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section as Element,
              start: 'top 80%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="font-sans min-h-screen bg-bg overflow-hidden">
      <main>
        <Hero />

        {/* Content Sections with Spacing */}
        {/* <div className="relative z-30 bg-bg"> */}
          {/* Featured Work */}
          {/* <div id="featured" className="reveal">
            <FeaturedWork />
          </div> */}

          {/* Stats Counter */}
          {/* <div className="reveal">
            <Counters />
          </div> */}

          {/* Latest Articles */}
          {/* <div className="reveal">
            <LatestArticles />
          </div> */}

          {/* CTA Footer */}
          {/* <div className="reveal">
            <CTAFooter />
          </div>
        </div> */}

        <ScrollAnimations />
      </main>
    </div>
  );
};

export default Home;
