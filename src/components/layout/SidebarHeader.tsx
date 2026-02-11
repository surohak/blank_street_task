import { useDarkMode } from '../../hooks/useDarkMode';
import { MoonIcon, SunIcon } from '../icons';
import Button from '../ui/Button';

export default function SidebarHeader() {
  const { isDark, toggle } = useDarkMode();

  return (
    <header className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface-card">
      <div className="w-9 h-9 rounded-full bg-primary-bg flex items-center justify-center">
        <span className="text-primary-text text-xs font-bold">BS</span>
      </div>
      <h1 className="text-lg font-bold text-th-text">Blank Street</h1>

      <Button
        className="ml-auto text-th-text hover:bg-surface-hover"
        icon={isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
        variant="icon"
        onClick={toggle}
      />
    </header>
  );
}
