import { useDarkMode } from '../../hooks/useDarkMode';
import { MoonIcon, SearchIcon, SunIcon } from '../icons';
import Button from '../ui/Button';

interface TabBarProps {
  activeTab: 'nearby' | 'previous';
  onTabChange: (tab: 'nearby' | 'previous') => void;
  onSearchToggle: () => void;
}

export default function TabBar({ activeTab, onTabChange, onSearchToggle }: TabBarProps) {
  const { isDark, toggle } = useDarkMode();

  return (
    <div className="flex items-center px-5 py-1">
      <button
        className={`relative py-3 text-sm font-bold mr-6 cursor-pointer transition-colors ${
          activeTab === 'nearby'
            ? 'text-tab-active'
            : 'text-tab-inactive hover:text-tab-inactive-hover'
        }`}
        onClick={() => onTabChange('nearby')}
      >
        Nearby
        {activeTab === 'nearby' && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-tab-underline rounded-full" />
        )}
      </button>
      <button
        className={`relative py-3 text-sm font-bold mr-6 cursor-pointer transition-colors ${
          activeTab === 'previous'
            ? 'text-tab-active'
            : 'text-tab-inactive hover:text-tab-inactive-hover'
        }`}
        onClick={() => onTabChange('previous')}
      >
        Previous
        {activeTab === 'previous' && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-tab-underline rounded-full" />
        )}
      </button>

      <div className="ml-auto flex items-center gap-1">
        <Button
          className="md:hidden text-th-text hover:bg-surface-hover"
          icon={isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          variant="icon"
          onClick={toggle}
        />
        <Button
          className="bg-surface-subtle hover:bg-surface-hover text-th-text"
          icon={<SearchIcon />}
          variant="icon"
          onClick={onSearchToggle}
        />
      </div>
    </div>
  );
}
