"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

const MiniOrb: React.FC<{ pos: [number, number, number]; color?: string }> = ({ pos, color = '#0ea072' }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.005;
    ref.current.position.y = pos[1] + Math.sin(state.clock.elapsedTime + pos[0]) * 0.08;
  });
  return (
    <mesh position={pos} ref={ref}>
      <icosahedronGeometry args={[0.6, 1]} />
      <MeshWobbleMaterial factor={0.4} speed={1.2} color={color} />
    </mesh>
  );
};

const Contact3DBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [accent, setAccent] = useState('#0ea072');

  useEffect(() => {
    try {
      const cs = getComputedStyle(document.documentElement);
      const a = cs.getPropertyValue('--accent')?.trim();
      if (a) setAccent(a);
    } catch {
      // ignore theme access error
    }
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} style={{ height: '100%', width: '100%' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <MiniOrb pos={[0, -0.2, 0]} color={accent} />
        <MiniOrb pos={[1.8, 0.2, -1]} color={accent} />
        <MiniOrb pos={[-1.6, 0.4, -0.5]} color={accent} />
      </Canvas>
    </div>
  );
};

export default Contact3DBackground;
