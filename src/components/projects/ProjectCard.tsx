"use client";

import React, { useEffect, useRef, useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

type Project = {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  live?: string;
  repo?: string;
  image?: string;
  color?: string;
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen?: (project: Project) => void;
  view?: 'grid' | 'list';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  index, 
  onOpen,
  view = 'grid' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const handleCardClick = () => {
    if (onOpen) {
      onOpen(project);
    }
  };

  if (view === 'list') {
    return (
      <div
        ref={cardRef}
        className={`transform transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
        }`}
        style={{ transitionDelay: `${index * 50}ms` }}
      >
        <Card 
          className="p-0 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
          onClick={handleCardClick}
        >
          <div className="flex flex-col sm:flex-row gap-0">
            {/* Image Section - List View */}
            <div className="relative sm:w-72 h-48 sm:h-auto overflow-hidden flex-shrink-0">
              <div
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: `linear-gradient(135deg, ${project.color}40 0%, transparent 100%)`,
                }}
              />
              
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-xs font-semibold" style={{ color: project.color }}>
                  {project.tags[0]}
                </span>
              </div>
            </div>

            {/* Content Section - List View */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h4 
                  className="text-2xl font-semibold mb-2 group-hover:text-accent transition-colors"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {project.title}
                </h4>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(1).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full font-medium bg-pill"
                      style={{ color: 'var(--pill-ink)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  as="button"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    if (onOpen) onOpen(project);
                  }}
                  className="flex-1"
                >
                  View Details
                </Button>
                <Button
                  as="a"
                  href={project.repo}
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  variant="outline"
                  className="flex-1"
                >
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Grid View (default)
  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card 
        className="p-0 overflow-hidden cursor-pointer group h-full flex flex-col"
        onClick={handleCardClick}
      >
        {/* Image Section - Grid View */}
        <div className="relative h-56 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          
          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0 opacity-40 group-hover:opacity-30 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, ${project.color}40 0%, transparent 100%)`,
            }}
          />

          {/* Floating Tag Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full transform transition-transform duration-300 group-hover:scale-110">
            <span className="text-xs font-semibold" style={{ color: project.color }}>
              {project.tags[0]}
            </span>
          </div>

          {/* Quick Action Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <a
              href={project.repo}
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a
              href={project.live}
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Live Demo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Content Section - Grid View */}
        <div className="p-6 space-y-4 flex-1 flex flex-col transform transition-transform duration-300 group-hover:-translate-y-1">
          <div className="flex-1">
            <h4 
              className="text-xl font-semibold mb-2 tracking-tight group-hover:text-accent transition-colors"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {project.title}
            </h4>
            <p className="text-sm text-muted leading-relaxed line-clamp-3">
              {project.desc}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full font-medium bg-pill transform transition-transform hover:scale-105"
                style={{ color: 'var(--pill-ink)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Button 
            as="button"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              if (onOpen) onOpen(project);
            }}
            className="w-full justify-center group/btn mt-auto"
          >
            <span>View Details</span>
            <svg 
              className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProjectCard;