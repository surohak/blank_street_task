import { useEffect, useCallback } from 'react';

import { CloseIcon } from '../icons';
import Button from './Button';

interface ModalProps {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function Modal({ open, title, message, onClose }: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 p-6 animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-base font-bold text-brand-900">{title}</h2>
          <Button
            icon={<CloseIcon className="w-3.5 h-3.5 text-brand-400" />}
            size="sm"
            variant="icon"
            onClick={onClose}
          />
        </div>

        <p className="text-sm text-brand-500 leading-relaxed">{message}</p>

        <Button className="mt-5" onClick={onClose}>
          OK
        </Button>
      </div>
    </div>
  );
}
