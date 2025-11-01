import React from 'react';

// Base container props with extended options
interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  center?: boolean;
  as?: React.ElementType;
  fluid?: boolean; // Disables max-width while keeping padding
  bleed?: boolean; // Full-width background with constrained content
}

// Modern responsive max-widths aligned with your design system
const sizes: Record<NonNullable<ContainerProps['size']>, string> = {
  xs: 'max-w-screen-sm',      // ~640px - Forms, narrow content
  sm: 'max-w-2xl',             // ~672px - Blog posts, articles
  md: 'max-w-4xl',             // ~896px - Standard content
  lg: 'max-w-6xl',             // ~1152px - Wide layouts
  xl: 'max-w-7xl',             // ~1280px - Dashboard, portfolio (default)
  '2xl': 'max-w-screen-2xl',   // ~1536px - Extra wide content
  full: 'max-w-full',          // No max-width constraint
};

// Progressive responsive padding system
const paddings: Record<NonNullable<ContainerProps['padding']>, string> = {
  none: 'px-0',
  xs: 'px-3 sm:px-4',                      // 12px mobile, 16px tablet+
  sm: 'px-4 sm:px-6',                      // 16px mobile, 24px tablet+
  md: 'px-6 sm:px-8 lg:px-12',             // 24px mobile, 32px tablet, 48px desktop
  lg: 'px-8 sm:px-12 lg:px-16 xl:px-20',   // 32px - 80px progressive
  xl: 'px-10 sm:px-16 lg:px-24 xl:px-32',  // 40px - 128px for hero sections
};

/**
 * Container Component
 * 
 * A flexible, responsive container component that manages max-width,
 * padding, and centering for consistent page layouts.
 * 
 * @example
 * ```tsx
 * <Container size="lg" padding="md">
 *   <h1>Content here</h1>
 * </Container>
 * ```
 */
const Container: React.FC<ContainerProps> = ({ 
  size = 'xl', 
  padding = 'md',
  center = true,
  fluid = false,
  bleed = false,
  as: Component = 'div',
  className = '', 
  children, 
  ...rest 
}) => {
  const baseClasses = 'w-full';
  const sizeClass = fluid ? 'max-w-none' : sizes[size];
  const paddingClass = paddings[padding];
  const centerClass = center ? 'mx-auto' : '';
  
  // Bleed mode: wrapper with full width background, inner content constrained
  if (bleed) {
    return (
      <Component
        className={`w-full ${className}`}
        {...rest}
      >
        <div className={`${baseClasses} ${sizeClass} ${paddingClass} ${centerClass}`}>
          {children}
        </div>
      </Component>
    );
  }

  return (
    <Component
      className={`${baseClasses} ${sizeClass} ${paddingClass} ${centerClass} ${className}`.trim().replace(/\s+/g, ' ')}
      {...rest}
    >
      {children}
    </Component>
  );
};

// ========== Specialized Container Variants ==========

/**
 * SectionContainer
 * Pre-configured for page sections with vertical spacing
 */
interface SectionContainerProps extends ContainerProps {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  spacing = 'md',
  className = '',
  as = 'section',
  ...props
}) => {
  const spacings: Record<NonNullable<SectionContainerProps['spacing']>, string> = {
    xs: 'py-8 sm:py-10',
    sm: 'py-12 sm:py-16',
    md: 'py-16 sm:py-20 lg:py-24',
    lg: 'py-20 sm:py-24 lg:py-32',
    xl: 'py-24 sm:py-32 lg:py-40',
  };

  return (
    <Container 
      as={as}
      className={`${spacings[spacing]} ${className}`}
      {...props}
    />
  );
};

/**
 * ArticleContainer
 * Optimized for long-form content with typography defaults
 */
export const ArticleContainer: React.FC<ContainerProps> = ({ 
  className = '',
  ...props 
}) => (
  <Container 
    as="article"
    size="sm"
    padding="md"
    className={`prose prose-lg max-w-none dark:prose-invert ${className}`}
    {...props}
  />
);

/**
 * HeroContainer
 * Full-viewport section for hero/splash content
 */
interface HeroContainerProps extends ContainerProps {
  minHeight?: 'screen' | 'half' | 'third' | 'auto';
  align?: 'start' | 'center' | 'end';
}

export const HeroContainer: React.FC<HeroContainerProps> = ({ 
  minHeight = 'screen',
  align = 'center',
  className = '',
  ...props 
}) => {
  const heights: Record<NonNullable<HeroContainerProps['minHeight']>, string> = {
    screen: 'min-h-screen',
    half: 'min-h-[50vh]',
    third: 'min-h-[33vh]',
    auto: '',
  };

  const alignments: Record<NonNullable<HeroContainerProps['align']>, string> = {
    start: 'items-start justify-start',
    center: 'items-center justify-center',
    end: 'items-end justify-end',
  };

  return (
    <Container 
      size="xl"
      padding="xl"
      className={`${heights[minHeight]} flex ${alignments[align]} ${className}`}
      {...props}
    />
  );
};

/**
 * GridContainer
 * Container with built-in grid layout support
 */
interface GridContainerProps extends ContainerProps {
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const GridContainer: React.FC<GridContainerProps> = ({
  cols = { default: 1, md: 2, lg: 3 },
  gap = 'md',
  className = '',
  ...props
}) => {
  const gaps: Record<NonNullable<GridContainerProps['gap']>, string> = {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  const gridCols = [
    cols.default && `grid-cols-${cols.default}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
  ].filter(Boolean).join(' ');

  return (
    <Container 
      className={`grid ${gridCols} ${gaps[gap]} ${className}`}
      {...props}
    />
  );
};

/**
 * FlexContainer
 * Container with flexbox utilities pre-configured
 */
interface FlexContainerProps extends ContainerProps {
  direction?: 'row' | 'col';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
}

export const FlexContainer: React.FC<FlexContainerProps> = ({
  direction = 'row',
  align = 'start',
  justify = 'start',
  gap = 'md',
  wrap = false,
  className = '',
  ...props
}) => {
  const directions: Record<NonNullable<FlexContainerProps['direction']>, string> = {
    row: 'flex-row',
    col: 'flex-col',
  };

  const aligns: Record<NonNullable<FlexContainerProps['align']>, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifies: Record<NonNullable<FlexContainerProps['justify']>, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const gaps: Record<NonNullable<FlexContainerProps['gap']>, string> = {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  return (
    <Container 
      className={`
        flex 
        ${directions[direction]} 
        ${aligns[align]} 
        ${justifies[justify]} 
        ${gaps[gap]}
        ${wrap ? 'flex-wrap' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    />
  );
};

/**
 * CardContainer
 * Container with card styling from your theme
 */
export const CardContainer: React.FC<ContainerProps> = ({ 
  className = '',
  padding = 'lg',
  ...props 
}) => (
  <Container 
    className={`card ${className}`}
    padding={padding}
    {...props}
  />
);

/**
 * BleedContainer
 * Full-width background with constrained inner content
 * Perfect for alternating background sections
 */
interface BleedContainerProps extends ContainerProps {
  background?: 'card' | 'subtle' | 'accent' | 'none';
}

export const BleedContainer: React.FC<BleedContainerProps> = ({
  background = 'card',
  className = '',
  ...props
}) => {
  const backgrounds: Record<NonNullable<BleedContainerProps['background']>, string> = {
    card: 'bg-card',
    subtle: 'bg-subtle',
    accent: 'bg-accent/5',
    none: '',
  };

  return (
    <Container 
      bleed
      className={`${backgrounds[background]} ${className}`}
      {...props}
    />
  );
};

export default Container;