import { ChevronLeftIcon, NavigateIcon } from '../icons';
import Button from '../ui/Button';

interface FloatingButtonsProps {
  drawerExpanded: boolean;
  onBack: () => void;
  onNavigate: () => void;
}

export default function FloatingButtons({
  drawerExpanded,
  onBack,
  onNavigate,
}: FloatingButtonsProps) {
  return (
    <div
      className={`md:hidden absolute left-0 right-0 flex items-center ${
        drawerExpanded ? 'justify-between' : 'justify-end'
      } px-4 z-30 transition-all duration-300 ${
        drawerExpanded ? 'bottom-[62%]' : 'bottom-14'
      } pb-3`}
    >
      {drawerExpanded && (
        <Button
          icon={<ChevronLeftIcon className="w-5 h-5" />}
          size="lg"
          variant="icon-elevated"
          onClick={onBack}
        />
      )}
      <Button
        icon={<NavigateIcon className="w-5 h-5" />}
        size="lg"
        variant="icon-elevated"
        onClick={onNavigate}
      />
    </div>
  );
}
