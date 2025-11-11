"use client";

import React, { useRef, useEffect, useState } from 'react';

type Props = {
  tags: string[];
  active: string[];
  onToggle: (tag: string) => void;
};

const FilterBar: React.FC<Props> = ({ tags, active, onToggle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Initial mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = (tag: string) => {
    // Create ripple effect on click
    const button = document.querySelector(`[data-tag="${tag}"]`) as HTMLButtonElement;
    if (button) {
      const ripple = document.createElement('span');
      ripple.className = 'filter-ripple';
      
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
    
    onToggle(tag);
  };

  return (
    <div className="relative">
      {/* Label */}
      <div 
        className={`mb-3 transform transition-all duration-500 ${
          mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}
      >
        <span className="text-sm font-medium text-muted uppercase tracking-wide">
          Filter by Technology
        </span>
      </div>

      {/* Filter Buttons */}
      <div 
        ref={containerRef}
        className="flex flex-wrap gap-2"
      >
        {tags.map((tag, index) => {
          const isActive = active.includes(tag);
          
          return (
            <button
              key={tag}
              data-tag={tag}
              onClick={() => handleToggle(tag)}
              className={`
                filter-tag
                relative overflow-hidden
                px-4 py-2 rounded-full
                font-medium text-sm
                transition-all duration-300
                transform
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                ${isActive 
                  ? 'bg-pill-active text-pill-active-ink shadow-lg scale-105' 
                  : 'bg-pill text-pill-ink hover:shadow-md hover:scale-105'
                }
              `}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {/* Animated background gradient on hover */}
              <span 
                className={`
                  absolute inset-0 
                  bg-gradient-to-br from-accent/20 via-accent/10 to-transparent
                  opacity-0 transition-opacity duration-300
                  ${isActive ? 'opacity-100' : 'group-hover:opacity-100'}
                `}
                style={{
                  backgroundSize: '200% 100%',
                  animation: isActive ? 'shimmer 2s linear infinite' : 'none',
                }}
              />
              
              {/* Tag text */}
              <span className="relative z-10 flex items-center gap-2">
                {/* Active indicator */}
                {isActive && (
                  <svg 
                    className="w-4 h-4 animate-check"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={3} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                )}
                {tag}
                
                {/* Active count badge */}
                {isActive && (
                  <span 
                    className="w-2 h-2 rounded-full bg-current animate-pulse"
                  />
                )}
              </span>

              {/* Hover glow effect */}
              <span 
                className={`
                  absolute inset-0 rounded-full
                  transition-opacity duration-300
                  ${isActive ? 'opacity-30' : 'opacity-0 hover:opacity-20'}
                `}
                style={{
                  background: 'radial-gradient(circle at center, var(--accent) 0%, transparent 70%)',
                }}
              />
            </button>
          );
        })}

        {/* Clear All Button */}
        {active.length > 0 && (
          <button
            onClick={() => active.forEach(onToggle)}
            className="
              px-4 py-2 rounded-full
              font-medium text-sm
              text-muted hover:text-ink
              border-2 border-dashed border-muted hover:border-ink
              transition-all duration-300
              hover:scale-105 hover:shadow-md
              animate-fade-in
            "
            aria-label="Clear all filters"
          >
            <span className="flex items-center gap-2">
              <svg 
                className="w-4 h-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
              Clear ({active.length})
            </span>
          </button>
        )}
      </div>

      {/* Active filters count indicator */}
      {active.length > 0 && (
        <div 
          className="mt-3 flex items-center gap-2 text-sm text-muted animate-fade-in"
        >
          <svg 
            className="w-4 h-4 text-accent animate-pulse" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" 
              clipRule="evenodd" 
            />
          </svg>
          <span>
            <strong className="text-ink">{active.length}</strong> {active.length === 1 ? 'filter' : 'filters'} active
          </span>
        </div>
      )}

      <style>{`
        /* Ripple effect */
        .filter-ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple-animation 0.6s ease-out;
          pointer-events: none;
        }

        @keyframes ripple-animation {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }

        /* Shimmer effect */
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* Check animation */
        @keyframes check {
          0% {
            transform: scale(0) rotate(-45deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(0deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .animate-check {
          animation: check 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        /* Fade in animation */
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }

        /* Smooth transitions for filter tags */
        .filter-tag {
          will-change: transform;
        }

        .filter-tag:active {
          transform: scale(0.95) !important;
        }

        /* Custom scrollbar for when filters wrap */
        .filter-bar-scroll::-webkit-scrollbar {
          height: 6px;
        }

        .filter-bar-scroll::-webkit-scrollbar-track {
          background: var(--subtle);
          border-radius: 3px;
        }

        .filter-bar-scroll::-webkit-scrollbar-thumb {
          background: var(--muted);
          border-radius: 3px;
        }

        .filter-bar-scroll::-webkit-scrollbar-thumb:hover {
          background: var(--ink);
        }
      `}</style>
    </div>
  );
};

export default FilterBar;
