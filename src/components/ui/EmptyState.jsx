export const EmptyState = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
      <h3 className="text-lg font-semibold text-gray-700">{title || 'No Data Available'}</h3>
      <p className="text-sm text-gray-500">
        {description || 'There is no data for the selected period.'}
      </p>
    </div>
  );
};
