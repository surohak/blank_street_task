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
  primary: 'w-full bg-brand-900 text-white font-semibold rounded-lg hover:bg-brand-800',
  pill: 'px-5 py-2 text-xs font-bold tracking-widest uppercase rounded-full bg-button text-brand-800 hover:bg-button-hover active:bg-button-active',
  ghost: 'gap-2 text-xs font-medium text-brand-500 hover:text-brand-900',
  icon: 'rounded-full hover:bg-surface-input text-brand-800',
  'icon-elevated': 'rounded-full bg-white shadow-md hover:bg-gray-50 text-brand-900',
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
