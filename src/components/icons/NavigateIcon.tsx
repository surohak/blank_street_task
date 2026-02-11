interface Props {
  className?: string;
}

export default function NavigateIcon({ className = 'w-5 h-5' }: Props) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M3 11l19-9-9 19-2-8-8-2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
