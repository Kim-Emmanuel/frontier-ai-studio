"use client";

import React from 'react';

const values = [
  { title: 'Clarity', desc: 'Communicate with intent, design with empathy.' },
  { title: 'Reliability', desc: 'Build systems people can depend on.' },
  { title: 'Curiosity', desc: 'Keep learning and experimenting.' },
  { title: 'Craft', desc: 'Polish details and prioritize UX.' },
];

const ValuesGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {values.map((v, i) => (
        <div key={i} className="card p-4 rounded-lg reveal hover:shadow-lg transition">
          <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">🌟</div>
          <h5 className="font-semibold">{v.title}</h5>
          <p className="text-muted-foreground text-sm">{v.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default ValuesGrid;
