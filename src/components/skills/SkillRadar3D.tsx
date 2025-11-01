"use client";

import React, { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import { skills, categories } from "@/data/skillsData";

function CategoryNode({ index, onClick, active }: { index: number; onClick: () => void; active: boolean }) {
  // position categories in a circle
  const angle = (index / categories.length) * Math.PI * 2;
  const radius = 3;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  return (
    <mesh position={[x, 0, z]} onClick={onClick}>
      <sphereGeometry args={[0.2, 16, 12]} />
      <meshStandardMaterial color={active ? "#3b82f6" : "#9ca3af"} />
    </mesh>
  );
}

function SkillNode({ pos, color }: { pos: [number, number, number]; color?: string }) {
  return (
    <mesh position={pos}>
      <sphereGeometry args={[0.12, 12, 8]} />
      <meshStandardMaterial color={color ?? "#60a5fa"} />
    </mesh>
  );
}

export default function SkillRadar3D() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoverSkill] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map: Record<string, typeof skills> = {};
    categories.forEach((c) => (map[c] = skills.filter((s) => s.category === c)));
    return map;
  }, []);

  // compute skill node positions when a category is selected
  const skillNodes = useMemo(() => {
    if (!selectedCategory) return [] as { id: string; pos: [number, number, number]; color: string }[];
    const list = grouped[selectedCategory] || [];
    const baseAngle = categories.indexOf(selectedCategory) / categories.length;
    const centerAngle = baseAngle * Math.PI * 2;
    const centerX = Math.cos(centerAngle) * 3;
    const centerZ = Math.sin(centerAngle) * 3;
    const radius = 1.5;
    return list.map((s, i) => {
      const a = (i / list.length) * Math.PI * 2;
      return { id: s.id, pos: [centerX + Math.cos(a) * radius, 0.1, centerZ + Math.sin(a) * radius] as [number, number, number], color: "#34d399" };
    });
  }, [selectedCategory, grouped]);

  return (
    <div className="bg-card p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Skill Radar (3D)</h2>

      <div className="flex gap-4">
        <div className="w-48">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={`w-full text-left py-2 px-3 rounded-md mb-2 border ${selectedCategory === cat ? "border-blue-500 bg-blue-50" : "border-transparent hover:bg-gray-50"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 relative">
          <div className="h-60 rounded-md overflow-hidden">
            <Canvas camera={{ position: [0, 4, 8], fov: 50 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={0.6} />
              <OrbitControls enablePan={false} enableZoom={true} />

              {/* category nodes in circle */}
              {categories.map((cat, i) => {
                const active = selectedCategory === cat;
                return <CategoryNode key={cat} index={i} onClick={() => setSelectedCategory(active ? null : cat)} active={active} />;
              })}

              {/* skill nodes and connecting lines when category selected */}
              {selectedCategory && skillNodes.map((n) => (
                <React.Fragment key={n.id}>
                  <SkillNode pos={n.pos} color={n.color} />
                  <Line points={[[0, 0, 0], n.pos]} color="#94a3b8" lineWidth={1} dashed={false} />
                </React.Fragment>
              ))}
            </Canvas>
          </div>

          {/* hover / info overlay */}
          <div className="absolute bottom-3 left-3 p-2 bg-white/80 rounded text-sm">
            {selectedCategory ? (
              <div>{selectedCategory} — {grouped[selectedCategory]?.length ?? 0} skills</div>
            ) : (
              <div>Select a category to expand</div>
            )}
            {hoverSkill && <div className="text-xs text-muted-foreground">{hoverSkill}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
