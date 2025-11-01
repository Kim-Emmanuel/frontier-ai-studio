import React from 'react';

const sample = [
  { title: 'Scaling LLMs', href: '#' },
  { title: '3D on the Web', href: '#' },
  { title: 'Designing for AI', href: '#' },
];

const LatestArticles: React.FC = () => {
  return (
    <section className="w-full py-12">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Latest Articles</h3>
        <ul className="space-y-3">
          {sample.map((s) => (
            <li key={s.title} className="p-4 bg-pill rounded-lg">
              <a href={s.href} className="font-medium">{s.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LatestArticles;
