"use client";

import React from 'react';

type Variant = 'primary' | 'ghost' | 'outline';

type PolymorphicButtonProps<E extends React.ElementType = 'button'> = {
  as?: E;
  variant?: Variant;
  className?: string; // ✅ explicitly type className
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'children' | 'variant' | 'className'>;
// ^ also omit 'className' from rest to avoid type clash

const base =
  'inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius)] transition-transform active:scale-[0.99]';

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
  const Comp = as || ('button' as React.ElementType);
  const cls = `${base} ${variants[variant]} ${className}`;

  return (
    <Comp className={cls} {...rest}>
      {children}
    </Comp>
  );
};

export default Button;
