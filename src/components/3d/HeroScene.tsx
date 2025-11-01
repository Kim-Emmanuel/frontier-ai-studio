"use client";

import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial, OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Orb: React.FC<{ pos: [number, number, number]; color?: string; interactive?: boolean }> = ({ pos, color = '#0ea072', interactive = false }) => {
  const ref = useRef<THREE.Mesh>(null);
  const vel = useRef(0);
  const mouseOffset = useRef({ x: 0, y: 0 });
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.004 + vel.current * 0.002;
    // apply mouse offset subtly
    ref.current.position.x = pos[0] + mouseOffset.current.x * 0.6;
    ref.current.position.y = pos[1] + Math.sin(state.clock.elapsedTime + pos[0]) * 0.12 + vel.current * 0.02 + mouseOffset.current.y * 0.6;
    // damping
    vel.current *= 0.95;
  });

  // pointer interaction
  useEffect(() => {
    if (!interactive) return;
    const onPointer = () => {
      vel.current = 1.6;
    };
  // prefer the canvas element if available, otherwise fall back to window
  const canvas = (ref.current as any)?.parent?.parent?.domElement as HTMLCanvasElement | undefined;
  const target: HTMLCanvasElement | Window = canvas ?? window;
  target.addEventListener('pointerdown', onPointer);
  return () => target.removeEventListener('pointerdown', onPointer);
  }, [interactive]);

  // update mouse offset from CSS vars
  useEffect(() => {
    const update = () => {
      try {
        const cs = getComputedStyle(document.documentElement);
        const mx = parseFloat(cs.getPropertyValue('--mouse-x')) || 0;
        const my = parseFloat(cs.getPropertyValue('--mouse-y')) || 0;
        mouseOffset.current.x = mx;
        mouseOffset.current.y = my;
      } catch {
        // ignore CSS variable read errors
      }
    };
    const id = setInterval(update, 50);
    update();
    return () => clearInterval(id);
  }, []);

  return (
    <mesh position={pos} ref={ref}>
      <icosahedronGeometry args={[0.9, 2]} />
      <MeshWobbleMaterial factor={0.6} speed={1.5} color={color} envMapIntensity={0.6} />
    </mesh>
  );
};

const MaskModel: React.FC<{ path?: string }> = ({ path = '/3d/musk.glb' }) => {
  const gltf = useGLTF(path, true) as any;
  const ref = useRef<THREE.Group>(null);

  // subtle idle rotation + mouse-driven tilt
  const target = useRef({ x: 0, y: 0 });
  useFrame((state, delta) => {
    if (!ref.current) return;
    // lerp rotation
    ref.current.rotation.y += (target.current.x - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (target.current.y - ref.current.rotation.x) * 0.04;
  });

  useEffect(() => {
    // gentle entrance
    if (!ref.current) return;
    ref.current.rotation.x = -0.2;
    ref.current.rotation.y = 0.4;
  }, []);

  // ✅ FIX: add return here
  return (
    <group ref={ref} dispose={null}>
      <primitive object={gltf.scene} />
    </group>
  );
};


const SceneWrapper: React.FC = () => {
  const [accent, setAccent] = useState('#0ea072');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    try {
      const cs = getComputedStyle(document.documentElement);
      const a = cs.getPropertyValue('--accent')?.trim();
      if (a) setAccent(a);
    } catch {
      // ignore theme access error
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      pointer.current.x = x * 0.8;
      pointer.current.y = -y * 0.6;
      // set CSS vars for other pieces if needed
      document.documentElement.style.setProperty('--mouse-x', String(pointer.current.x));
      document.documentElement.style.setProperty('--mouse-y', String(pointer.current.y));
    };
    el.addEventListener('pointermove', onMove);
    return () => el.removeEventListener('pointermove', onMove);
  }, []);

  // Drive the MaskModel target via a shared ref on window to keep things simple
  useEffect(() => {
    (window as any).__FRONTIER_POINTER__ = { get: () => ({ x: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mouse-x') || '0'), y: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mouse-y') || '0') }) };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 40 }} shadows>
        <color attach="background" args={[0, 0, 0]} />
        <ambientLight intensity={0.45} />
        <directionalLight castShadow position={[5, 6, 5]} intensity={1} />
        <spotLight position={[-5, 5, 5]} angle={0.3} intensity={0.6} penumbra={0.5} />
        <Suspense fallback={null}>
          <Environment preset="city" blur={0.8} />
          <MaskModel />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate={false} />
      </Canvas>
    </div>
  );
};

const HeroScene: React.FC = () => {
  return (
    <div className="w-full h-[60vh] sm:h-[80vh] lg:h-[88vh]">
      <SceneWrapper />
    </div>
  );
};

export default HeroScene;