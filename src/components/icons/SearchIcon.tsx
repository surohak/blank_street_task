interface Props {
  className?: string;
}

export default function SearchIcon({ className = 'w-4 h-4' }: Props) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path
        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
