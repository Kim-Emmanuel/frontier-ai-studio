"use client";

import React from 'react';

const hobbies = [
  { title: 'Photography', desc: 'Landscape and portrait photography.' },
  { title: 'Cycling', desc: 'Long weekend rides and bikepacking.' },
  { title: 'Open Source', desc: 'Contribute to small tooling projects.' },
];

const BeyondCode: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {hobbies.map((h, i) => (
        <div key={i} className="card p-4 rounded-lg reveal">
          <h5 className="font-semibold">{h.title}</h5>
          <p className="text-sm text-muted-foreground">{h.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default BeyondCode;
