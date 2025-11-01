"use client";

import React, { useEffect, useMemo, useState, useRef } from 'react';
import FilterBar from './FilterBar';
import ProjectCard from './ProjectCard';
import { Container, Button } from '../ui';

type Project = {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  live?: string;
  repo?: string;
  date?: string;
  image?: string;
  color?: string;
}

// Sample projects with images and colors
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'AI Composer',
    desc: 'Generative audio experiments with neural synthesis and real-time processing',
    tags: ['AI', 'Audio', 'ML'],
    live: '#',
    repo: '#',
    date: new Date().toISOString(),
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop',
    color: '#6366f1',
  },
  {
    id: '2',
    title: 'Vector Studio',
    desc: 'Embeddable ML tools for production environments with scalable infrastructure',
    tags: ['React', 'ML', 'API'],
    live: '#',
    repo: '#',
    date: new Date(Date.now() - 86400000).toISOString(),
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    color: '#8b5cf6',
  },
  {
    id: '3',
    title: 'Vision Lab',
    desc: 'Realtime image models with sub-100ms inference for edge computing',
    tags: ['Three.js', 'WebGL', 'CV'],
    live: '#',
    repo: '#',
    date: new Date(Date.now() - 172800000).toISOString(),
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
    color: '#ec4899',
  },
  {
    id: '4',
    title: 'Neural Canvas',
    desc: 'Interactive art generation using diffusion models and style transfer',
    tags: ['AI', 'WebGL', 'Art'],
    live: '#',
    repo: '#',
    date: new Date(Date.now() - 259200000).toISOString(),
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
    color: '#f59e0b',
  },
  {
    id: '5',
    title: 'Quantum Viz',
    desc: '3D visualization of quantum computing concepts and circuit simulations',
    tags: ['Three.js', 'Physics', 'WebGL'],
    live: '#',
    repo: '#',
    date: new Date(Date.now() - 345600000).toISOString(),
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
    color: '#06b6d4',
  },
  {
    id: '6',
    title: 'BioSim Engine',
    desc: 'Real-time biological system simulations with particle dynamics',
    tags: ['WebGL', 'Simulation', 'Science'],
    live: '#',
    repo: '#',
    date: new Date(Date.now() - 432000000).toISOString(),
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&h=600&fit=crop',
    color: '#10b981',
  },
  {
    id: '7',
    title: 'DataFlow Studio',
    desc: 'Visual programming environment for data science workflows',
    tags: ['React', 'Data', 'Viz'],
    live: '#',
    repo: '#',
    date: new Date(Date.now() - 518400000).toISOString(),
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    color: '#3b82f6',
  },
  {
    id: '8',
    title: 'Sonic Explorer',
    desc: 'Interactive audio visualization with frequency analysis',
    tags: ['Audio', 'WebGL', 'Viz'],
    live: '#',
    repo: '#',
    date: new Date(Date.now() - 604800000).toISOString(),
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop',
    color: '#a855f7',
  },
  {
    id: '9',
    title: 'Climate Viz',
    desc: 'Real-time climate data visualization and prediction models',
    tags: ['Data', 'Science', 'Viz'],
    live: '#',
    repo: '#',
    date: new Date(Date.now() - 691200000).toISOString(),
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    color: '#14b8a6',
  },
];

const getAllTags = (projects: Project[]) => Array.from(new Set(projects.flatMap((p) => p.tags)));

const ProjectList: React.FC = () => {
  const [projects] = useState<Project[]>(sampleProjects);
  const [visible, setVisible] = useState(9);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState<'date' | 'featured'>('date');
  const [selected, setSelected] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tags = useMemo(() => getAllTags(projects), [projects]);

  const filtered = useMemo(() => {
    let out = projects.slice();
    if (activeTags.length) {
      out = out.filter((p) => activeTags.every((t) => p.tags.includes(t)));
    }
    if (sort === 'date') out.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    return out;
  }, [projects, activeTags, sort]);

  const visibleProjects = filtered.slice(0, visible);

  const onToggleTag = (t: string) => {
    setActiveTags((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  };

  const handleOpenProject = (project: Project) => {
    setSelected(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelected(null), 300); // Wait for animation
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setVisible((v) => Math.min(projects.length, v + 6));
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [projects.length]);

  return (
    <Container>
      <div className="py-8">
        {/* Filter and View Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <FilterBar tags={tags} active={activeTags} onToggle={onToggleTag} />
          
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <select 
                value={sort} 
                onChange={(e) => setSort(e.target.value as 'date' | 'featured')} 
                className="appearance-none bg-card text-ink px-4 py-2 pr-10 rounded-lg border-2 border-subtle focus:border-accent focus:outline-none transition-colors cursor-pointer"
              >
                <option value="date">Latest First</option>
                <option value="featured">Featured</option>
              </select>
              <svg 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* View Toggle */}
            <button 
              onClick={() => setView((v) => (v === 'grid' ? 'list' : 'grid'))} 
              className="p-2 rounded-lg bg-card hover:bg-pill transition-colors border-2 border-subtle"
              aria-label={`Switch to ${view === 'grid' ? 'list' : 'grid'} view`}
            >
              {view === 'grid' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted">
            Showing <span className="font-semibold text-ink">{visibleProjects.length}</span> of <span className="font-semibold text-ink">{filtered.length}</span> projects
            {activeTags.length > 0 && <span> (filtered)</span>}
          </p>
        </div>

        {/* Projects Grid/List */}
        <div className={view === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'flex flex-col gap-4'
        }>
          {visibleProjects.map((p, index) => (
            <ProjectCard 
              key={p.id} 
              project={p} 
              index={index}
              onOpen={handleOpenProject}
              view={view}
            />
          ))}
        </div>

        {/* Empty State */}
        {visibleProjects.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto mb-4 text-muted opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted mb-6">Try adjusting your filters</p>
            <Button as="button" onClick={() => setActiveTags([])}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {visible < filtered.length && (
          <div className="text-center mt-12">
            <Button 
              as="button" 
              onClick={() => setVisible((v) => Math.min(projects.length, v + 6))}
              className="group"
            >
              Load More Projects
              <svg 
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-y-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {selected && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
            isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={handleCloseModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div 
            className={`relative bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 ${
              isModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all hover:scale-110 flex items-center justify-center shadow-lg"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Project Image */}
            {selected.image && (
              <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selected.image})` }}
                />
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `linear-gradient(135deg, ${selected.color}60 0%, transparent 100%)`,
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Title and Badge */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ 
                      backgroundColor: `${selected.color}20`,
                      color: selected.color 
                    }}
                  >
                    {selected.tags[0]}
                  </span>
                  {selected.date && (
                    <span className="text-sm text-muted">
                      {new Date(selected.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                  )}
                </div>
                
                <h3 
                  className="text-3xl font-bold mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {selected.title}
                </h3>
                
                <p className="text-muted leading-relaxed text-lg">
                  {selected.desc}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-sm font-semibold mb-3 text-muted uppercase tracking-wide">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-4 py-2 rounded-full font-medium bg-pill"
                      style={{ color: 'var(--pill-ink)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button 
                  as="a" 
                  href={selected.live}
                  className="flex-1 sm:flex-initial group"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Live Demo
                </Button>
                
                <Button 
                  as="a" 
                  href={selected.repo}
                  variant="outline"
                  className="flex-1 sm:flex-initial"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  View Code
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProjectList;