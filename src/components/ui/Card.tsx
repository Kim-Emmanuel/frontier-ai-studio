import React from 'react';


// Enhanced Card Component
interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children?: React.ReactNode;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  as: Comp = 'div', 
  className = '', 
  children, 
  hoverable = false,
  ...rest 
}) => {
  const Element = Comp as React.ElementType;
  const hoverClass = hoverable ? 'transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl' : '';
  
  return (
    <Element 
      className={`card p-6 ${hoverClass} ${className}`} 
      {...rest}
    >
      {children}
    </Element>
  );
};

export default Card;
