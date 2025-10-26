
import React from 'react';
import { FireIcon } from './icons';

interface DailySummaryProps {
  totalCalories: number;
}

export const DailySummary: React.FC<DailySummaryProps> = ({ totalCalories }) => {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-white p-3 rounded-full shadow-lg flex items-center space-x-3 border-2 border-green-500">
      <div className="bg-green-500 p-2 rounded-full">
        <FireIcon className="w-6 h-6 text-white" />
      </div>
      <div>
        <span className="text-sm text-slate-500">Today's Total</span>
        <p className="font-bold text-lg text-slate-800 -mt-1">{totalCalories.toFixed(0)} kcal</p>
      </div>
    </div>
  );
};
