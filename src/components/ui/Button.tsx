import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  accentColor?: { base: string; accent?: string };
  to?: string;
  href?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', accentColor, to, href, className = '', children, ...props }, ref) => {
    const base = `inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${className}`;

    let variantClass = '';
    if (variant === 'primary') {
      const bg = accentColor?.base ?? '#0B6B4A';
      variantClass = 'text-white hover:shadow-lg hover:-translate-y-0.5';
      return to ? (
        <Link to={to} className={`${base} ${variantClass}`} style={{ backgroundColor: bg }}>
          {children}
        </Link>
      ) : href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${variantClass}`} style={{ backgroundColor: bg }}>
          {children}
        </a>
      ) : (
        <button ref={ref} className={`${base} ${variantClass}`} style={{ backgroundColor: bg }} {...props}>
          {children}
        </button>
      );
    }

    if (variant === 'secondary') {
      const bg = accentColor?.accent ?? '#C9A227';
      variantClass = 'text-white hover:shadow-lg hover:-translate-y-0.5';
      return to ? (
        <Link to={to} className={`${base} ${variantClass}`} style={{ backgroundColor: bg }}>
          {children}
        </Link>
      ) : href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${variantClass}`} style={{ backgroundColor: bg }}>
          {children}
        </a>
      ) : (
        <button ref={ref} className={`${base} ${variantClass}`} style={{ backgroundColor: bg }} {...props}>
          {children}
        </button>
      );
    }

    if (variant === 'outline') {
      const color = accentColor?.base ?? '#0B6B4A';
      variantClass = 'border-2 bg-transparent hover:bg-opacity-5';
      return to ? (
        <Link
          to={to}
          className={`${base} ${variantClass}`}
          style={{ borderColor: color, color }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = color + '0D')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          {children}
        </Link>
      ) : (
        <button
          ref={ref}
          className={`${base} ${variantClass}`}
          style={{ borderColor: color, color }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = color + '0D')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          {...props}
        >
          {children}
        </button>
      );
    }

    // ghost
    variantClass = 'text-brand-ink hover:bg-brand-bg-alt';
    return to ? (
      <Link to={to} className={`${base} ${variantClass}`}>
        {children}
      </Link>
    ) : (
      <button ref={ref} className={`${base} ${variantClass}`} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
