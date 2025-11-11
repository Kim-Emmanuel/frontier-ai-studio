"use client";

import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

const MaskModel: React.FC<{ path?: string }> = ({ path = '/3d/musk.glb' }) => {
  const gltf = useGLTF(path, true) as any;
  const ref = useRef<THREE.Group>(null);

  // Subtle idle rotation + mouse-driven tilt
  const target = useRef({ x: 0, y: 0 });
  
  useFrame(() => {
    if (!ref.current) return;
    
    // Get mouse position from CSS variables or window pointer
    try {
      const pointer = (window as any).__FRONTIER_POINTER__;
      if (pointer && typeof pointer.get === 'function') {
        const pos = pointer.get();
        target.current.x = pos.x || 0;
        target.current.y = pos.y || 0;
      }
    } catch (e) {
      // Fallback to CSS variables
      try {
        const cs = getComputedStyle(document.documentElement);
        target.current.x = parseFloat(cs.getPropertyValue('--mouse-x')) || 0;
        target.current.y = parseFloat(cs.getPropertyValue('--mouse-y')) || 0;
      } catch {
        // ignore
      }
    }
    
    // Smooth lerp rotation based on mouse position
    ref.current.rotation.y += (target.current.x * 0.5 - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (target.current.y * 0.3 - ref.current.rotation.x) * 0.04;
  });

  useEffect(() => {
    // Gentle entrance animation
    if (!ref.current) return;
    ref.current.rotation.x = -0.2;
    ref.current.rotation.y = 0.4;
    ref.current.scale.set(0.8, 0.8, 0.8);
    
    // Animate scale up
    let startTime = Date.now();
    const animateEntrance = () => {
      if (!ref.current) return;
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / 1000, 1); // 1 second animation
      const scale = 0.8 + (progress * 0.2); // Scale from 0.8 to 1.0
      ref.current.scale.set(scale, scale, scale);
      
      if (progress < 1) {
        requestAnimationFrame(animateEntrance);
      }
    };
    
    requestAnimationFrame(animateEntrance);
  }, []);

  return (
    <group ref={ref} dispose={null}>
      <primitive object={gltf.scene} />
    </group>
  );
};

const SceneWrapper: React.FC<{ bg?: string; theme?: 'light' | 'dark'; accent?: string }> = ({ 
  bg, 
  theme = 'dark',
  accent = '#0ea072',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      pointer.current.x = x * 0.8;
      pointer.current.y = -y * 0.6;
      
      // Set CSS vars for parallax effects
      document.documentElement.style.setProperty('--mouse-x', String(pointer.current.x));
      document.documentElement.style.setProperty('--mouse-y', String(pointer.current.y));
    };
    
    el.addEventListener('pointermove', onMove);
    return () => el.removeEventListener('pointermove', onMove);
  }, []);

  // Expose pointer position globally
  useEffect(() => {
    (window as any).__FRONTIER_POINTER__ = { 
      get: () => ({ x: pointer.current.x || 0, y: pointer.current.y || 0 }) 
    };
  }, []);

  // Theme-aware background and lighting
  const bgColor = bg || (theme === 'dark' ? '#0a1a0f' : '#e8f6ea');
  const ambientIntensity = theme === 'dark' ? 0.5 : 0.7;
  const dirIntensity = theme === 'dark' ? 1.2 : 0.9;
  const spotIntensity = theme === 'dark' ? 0.7 : 0.55;

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 5.2], fov: 40 }} 
        shadows
        dpr={[1, 2]}
      >
        <color attach="background" args={[bgColor]} />
        
        {/* Enhanced Lighting Setup */}
        <ambientLight intensity={ambientIntensity} />
        <directionalLight 
          castShadow 
          position={[5, 6, 5]} 
          intensity={dirIntensity}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight 
          position={[-5, 5, 5]} 
          angle={0.3} 
          intensity={spotIntensity} 
          penumbra={0.5}
          castShadow
        />
        
        {/* Accent light for rim lighting effect */}
        <pointLight position={[0, 0, 5]} intensity={0.3} color={accent} />
        
        <Suspense fallback={null}>
          <Environment preset="city" blur={0.8} />
          <MaskModel />
        </Suspense>
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false} 
          enableRotate={true} 
          autoRotate={false}
          minDistance={3}
          maxDistance={8}
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

const ClientHero: React.FC<{ bg?: string; theme?: 'light' | 'dark'; accent?: string }> = ({ bg, theme, accent }) => {
  return (
    <div className="w-full h-full">
      <SceneWrapper bg={bg} theme={theme} accent={accent} />
    </div>
  );
};

export default ClientHero;