"use client";

import React from 'react';

type Variant = 'primary' | 'ghost' | 'outline';

type PolymorphicButtonProps<E extends React.ElementType = 'button'> = {
  as?: E;
  variant?: Variant;
  children?: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'variant' | 'className' | 'children'>;

const base =
  'btn inline-flex items-center gap-2 transition-transform active:scale-[0.99]';

const variants: Record<Variant, string> = {
  primary: 'btn-primary',
  ghost: 'bg-transparent text-current',
  outline: 'border border-current bg-transparent',
};

const Button = <E extends React.ElementType = 'button'>({
  as,
  variant = 'primary',
  className = '',
  children,
  ...rest
}: PolymorphicButtonProps<E>) => {
  const Comp = as || 'button';
  const cls = `${base} ${variants[variant]} ${className}`;

  return React.createElement(Comp, { className: cls, ...rest }, children);
};

export default Button;