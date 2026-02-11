import { SearchIcon } from '../icons';
import Button from '../ui/Button';

interface TabBarProps {
  activeTab: 'nearby' | 'previous';
  onTabChange: (tab: 'nearby' | 'previous') => void;
  onSearchToggle: () => void;
}

export default function TabBar({ activeTab, onTabChange, onSearchToggle }: TabBarProps) {
  return (
    <div className="flex items-center px-5 py-1">
      <button
        className={`relative py-3 text-sm font-bold mr-6 cursor-pointer transition-colors ${
          activeTab === 'nearby' ? 'text-brand-700' : 'text-[#b5ada6] hover:text-[#7a7066]'
        }`}
        onClick={() => onTabChange('nearby')}
      >
        Nearby
        {activeTab === 'nearby' && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-full" />
        )}
      </button>
      <button
        className={`relative py-3 text-sm font-bold mr-6 cursor-pointer transition-colors ${
          activeTab === 'previous' ? 'text-brand-700' : 'text-[#b5ada6] hover:text-[#7a7066]'
        }`}
        onClick={() => onTabChange('previous')}
      >
        Previous
        {activeTab === 'previous' && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-full" />
        )}
      </button>

      {/* Search icon */}
      <Button
        className="ml-auto bg-surface-subtle hover:bg-surface-hover"
        icon={<SearchIcon />}
        variant="icon"
        onClick={onSearchToggle}
      />
    </div>
  );
}
