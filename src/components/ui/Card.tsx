import React from 'react';

// Enhanced Card Component
interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children?: React.ReactNode;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  as: Component = 'div', 
  className = '', 
  children, 
  hoverable = false,
  ...rest 
}) => {
  const hoverClass = hoverable ? 'transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl' : '';
  
  return React.createElement(
    Component,
    { 
      className: `card p-6 ${hoverClass} ${className}`,
      ...rest 
    },
    children
  );
};

export default Card;