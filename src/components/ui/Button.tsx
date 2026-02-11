import type { ReactNode, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'pill' | 'ghost' | 'icon' | 'icon-elevated';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children?: ReactNode;
}

const base = 'inline-flex items-center justify-center transition-colors cursor-pointer';

const variants: Record<Variant, string> = {
  primary: 'w-full bg-primary-bg text-primary-text font-semibold rounded-lg hover:bg-primary-hover',
  pill: 'px-5 py-2 text-xs font-bold tracking-widest uppercase rounded-full bg-button text-th-secondary hover:bg-button-hover active:bg-button-active',
  ghost: 'gap-2 text-xs font-medium text-th-faint hover:text-th-text',
  icon: 'rounded-full hover:bg-surface-input text-th-secondary',
  'icon-elevated': 'rounded-full bg-surface-card shadow-md hover:bg-surface-hover text-th-text',
};

const sizes: Record<Variant, Record<Size, string>> = {
  primary: {
    sm: 'py-2 text-xs',
    md: 'py-2.5 text-sm',
    lg: 'py-3 text-base',
  },
  pill: {
    sm: 'px-4 py-1.5 text-[11px]',
    md: 'px-5 py-2 text-xs',
    lg: 'px-6 py-2.5 text-sm',
  },
  ghost: {
    sm: 'text-[11px]',
    md: 'text-xs',
    lg: 'text-sm',
  },
  icon: {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  },
  'icon-elevated': {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[variant][size]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
