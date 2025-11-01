"use client";

import React, { useState } from "react";
import { skills, categories } from "@/data/skillsData";

export default function TechnologyGrid() {
  const [filter, setFilter] = useState<string | null>(null);
  const filtered = filter ? skills.filter((s) => s.category === filter) : skills;

  return (
    <div className="bg-card p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Technology Grid</h2>
      <div className="flex gap-3 mb-4">
        <button onClick={() => setFilter(null)} className={`px-3 py-1 rounded ${filter === null ? "bg-blue-600 text-white" : "bg-gray-100"}`}>All</button>
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1 rounded ${filter === c ? "bg-blue-600 text-white" : "bg-gray-100"}`}>{c}</button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {filtered.map((s) => (
          <div key={s.id} className="p-3 border rounded flex flex-col hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">{s.name}</div>
              <div className="text-xs text-muted-foreground">{s.years ?? "-"} yrs</div>
            </div>
            <div className="h-2 bg-gray-200 rounded overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-blue-500" style={{ width: `${s.level}%` }} />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">Projects: {s.projects?.join(", ")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
