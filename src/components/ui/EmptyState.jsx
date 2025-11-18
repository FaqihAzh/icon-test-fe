import { FileQuestion } from 'lucide-react';

export const EmptyState = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
      <div className="text-gray-400">
        {icon || <FileQuestion className="w-16 h-16" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-700">
        {title || 'Data Tidak Tersedia'}
      </h3>
      <p className="text-sm text-gray-500 max-w-md">
        {description || 'Tidak ada data untuk ditampilkan para periode ini.'}
      </p>
    </div>
  );
};