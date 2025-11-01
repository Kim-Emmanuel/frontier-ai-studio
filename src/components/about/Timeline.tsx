"use client";

import React from 'react';

const events = [
  { year: '2017', title: 'Started college', desc: 'Studied computer science and interaction design.' },
  { year: '2019', title: 'Internships', desc: 'Worked on frontend systems and UX at startups.' },
  { year: '2021', title: 'First Product Launch', desc: 'Led a small team to ship an analytics product.' },
  { year: '2023', title: 'AI Startup', desc: 'Joined an AI startup to build developer tooling.' },
];

const Timeline: React.FC = () => {
  return (
    <div className="timeline relative">
      <div className="absolute left-8 top-0 h-full w-1 flex items-start">
        <div className="w-1 h-full bg-secondary/20 rounded" />
        <div className="timeline-progress absolute left-0 top-0 w-1 bg-accent rounded" style={{ height: '0%' }} />
      </div>

      <div className="pl-16">
        {events.map((e, i) => (
          <div key={i} className="mb-12 reveal flex items-start">
            <div className="w-16 text-sm font-mono text-muted-foreground">{e.year}</div>
            <div>
              <h4 className="font-semibold">{e.title}</h4>
              <p className="text-muted-foreground">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
