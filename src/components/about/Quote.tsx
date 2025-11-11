"use client";

import React from 'react';

const Quote: React.FC<{ quote: string; author?: string }> = ({ quote, author }) => {
  return (
    <div className="quote-card p-8 rounded-lg bg-gradient-to-br from-accent/5 to-secondary/5 reveal">
      <blockquote className="text-xl italic leading-relaxed">“{quote}”</blockquote>
      {author && <div className="mt-4 text-sm text-muted-foreground">{author}</div>}
    </div>
  );
};

export default Quote;
