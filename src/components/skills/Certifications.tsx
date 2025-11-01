"use client";

import React from "react";
import { certifications } from "@/data/skillsData";

export default function Certifications() {
  return (
    <div className="bg-card p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
      <div className="flex gap-4 flex-wrap">
        {certifications.map((c) => (
          <div key={c.id} className="w-48 h-28 rounded-md flex items-center justify-center flex-col border p-3" style={{ background: c.badgeColor ? `${c.badgeColor}22` : undefined }}>
            <div className="font-semibold">{c.name}</div>
            <div className="text-xs text-muted-foreground">{c.issuer} • {c.year}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
