interface IconProps {
  className?: string;
}

export default function ArrowLeftIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M19 12H5m0 0l7 7m-7-7l7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
