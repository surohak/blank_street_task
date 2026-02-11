import { ChevronLeftIcon } from '../icons';
import Button from '../ui/Button';

interface DetailHeaderProps {
  title: string;
  onBack: () => void;
}

export default function DetailHeader({ title, onBack }: DetailHeaderProps) {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-border">
      <Button icon={<ChevronLeftIcon />} variant="icon" onClick={onBack} />
      <h2 className="text-base font-semibold truncate text-th-text">{title}</h2>
    </div>
  );
}
