"use client";

import React from 'react';

const experiences = [
  { company: 'Acme', role: 'Frontend Engineer', period: '2020–2021' },
  { company: 'Nimbus', role: 'Product Engineer', period: '2021–2023' },
  { company: 'AI Labs', role: 'Staff Engineer', period: '2023–Present' },
];

const ExperienceGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {experiences.map((e, i) => (
        <div key={i} className="card p-4 rounded-lg flex items-center gap-4 reveal hover:scale-[1.02] transition-transform">
          <div className="h-14 w-14 rounded-md bg-muted flex items-center justify-center text-sm font-bold">{e.company[0]}</div>
          <div>
            <div className="font-semibold">{e.company}</div>
            <div className="text-sm text-muted-foreground">{e.role}</div>
            <div className="text-xs text-muted-foreground mt-1">{e.period}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceGrid;
