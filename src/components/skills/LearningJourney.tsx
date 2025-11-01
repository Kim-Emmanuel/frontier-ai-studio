"use client";

import React from "react";
import { milestones } from "@/data/skillsData";

export default function LearningJourney() {
  return (
    <div className="bg-card p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Learning Journey</h2>
      <div className="space-y-4">
        {milestones.map((m) => (
          <div key={m.id} className="flex items-start gap-4">
            <div className="w-12 text-right text-sm font-mono text-gray-500">{m.year}</div>
            <div className="flex-1">
              <div className="font-medium">{m.title}</div>
              <div className="text-sm text-muted-foreground">{m.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
