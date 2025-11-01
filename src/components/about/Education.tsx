"use client";

import React from 'react';

const Education: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="card p-4 rounded-lg reveal">
        <h4 className="font-semibold">BSc Computer Science</h4>
        <div className="text-sm text-muted-foreground">University of Somewhere — 2017–2021</div>
        <p className="text-sm mt-2">Graduated with honours. Thesis on human-centered ML.</p>
      </div>
      <div className="card p-4 rounded-lg reveal">
        <h4 className="font-semibold">Certifications & Achievements</h4>
        <ul className="text-sm text-muted-foreground list-disc list-inside mt-2">
          <li>Design sprint facilitator</li>
          <li>ACM student member</li>
          <li>Published two research posters</li>
        </ul>
      </div>
    </div>
  );
};

export default Education;
