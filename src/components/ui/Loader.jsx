import { cn } from '../../lib/utils';

export const Spinner = ({ size = 'md', className }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-primary-500 border-t-transparent',
        sizes[size],
        className
      )}
    />
  );
};

export const Loader = ({ text = 'Memuat...', size = 'md' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Spinner size={size} />
      {text && <p className="text-sm text-gray-600 font-medium">{text}</p>}
    </div>
  );
};

export const PageLoader = ({ text = 'Memuat data...' }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader text={text} size="lg" />
    </div>
  );
};