
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 my-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      <p className="text-slate-500">Analyzing your food...</p>
    </div>
  );
};
