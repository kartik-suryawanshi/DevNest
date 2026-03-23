import { motion } from 'framer-motion';
import { type ToastMessage } from '../../lib/ToastContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ToastProps {
  toast: ToastMessage;
  onRemove: () => void;
}

export default function Toast({ toast, onRemove }: ToastProps) {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-accent-amber" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-accent-cyan" />,
  };

  const borders = {
    success: 'border-l-accent-cyan',
    error: 'border-l-red-500',
    info: 'border-l-accent-cyan',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={cn(
        "bg-surface/90 backdrop-blur-md border border-border border-l-4 p-4 rounded-sm shadow-2xl flex items-start gap-3 w-80 pointer-events-auto cursor-pointer",
        borders[toast.type]
      )}
      onClick={onRemove}
    >
      <div className="mt-0.5 flex-shrink-0">{icons[toast.type]}</div>
      <p className="text-sm font-body text-text-primary mt-0.5">{toast.message}</p>
    </motion.div>
  );
}
