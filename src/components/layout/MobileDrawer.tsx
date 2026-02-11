import type { ReactNode } from 'react';

interface MobileDrawerProps {
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export default function MobileDrawer({ expanded, onToggle, children }: MobileDrawerProps) {
  return (
    <div
      className={`md:hidden absolute bottom-0 left-0 right-0 bg-surface rounded-t-2xl shadow-sheet flex flex-col transition-all duration-300 ease-out z-20 ${
        expanded ? 'h-[62%]' : 'h-14'
      }`}
    >
      <button
        className="flex items-center justify-center py-3 cursor-pointer shrink-0"
        onClick={onToggle}
      >
        <div className="w-10 h-1 rounded-full bg-surface-hover" />
      </button>

      {expanded && <div className="flex flex-col flex-1 min-h-0">{children}</div>}
    </div>
  );
}
