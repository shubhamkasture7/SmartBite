
import React, { useState, useMemo } from 'react';
import type { NutritionalInfo } from '../types';
import { FireIcon, PlusIcon } from './icons';

interface CalorieDisplayProps {
  info: NutritionalInfo;
  portionSize: number;
  onPortionChange: (size: number) => void;
  onAdd: (calories: number) => void;
}

export const CalorieDisplay: React.FC<CalorieDisplayProps> = ({ info, portionSize, onPortionChange, onAdd }) => {
  const [isAdded, setIsAdded] = useState(false);
  
  const totalCalories = useMemo(() => {
    return (info.caloriesPer100g / 100) * portionSize;
  }, [info.caloriesPer100g, portionSize]);

  const handleAddClick = () => {
    onAdd(totalCalories);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); // Reset button state after 2 seconds
  };
  
  const NutrientItem: React.FC<{ label: string; value: number; unit: string; color: string }> = ({ label, value, unit, color }) => (
    <div className={`flex flex-col items-center p-3 rounded-lg ${color}`}>
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <span className="text-lg font-bold text-slate-800">{value.toFixed(1)}{unit}</span>
    </div>
  );

  return (
    <div className="w-full bg-slate-50 p-6 rounded-lg shadow-inner space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold capitalize text-green-700">{info.foodName}</h2>
        <p className="text-slate-500">{info.caloriesPer100g.toFixed(0)} kcal per 100g</p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
         <NutrientItem label="Protein" value={info.proteinPer100g} unit="g" color="bg-sky-100" />
         <NutrientItem label="Carbs" value={info.carbsPer100g} unit="g" color="bg-orange-100" />
         <NutrientItem label="Fat" value={info.fatPer100g} unit="g" color="bg-yellow-100" />
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="portion" className="block text-sm font-medium text-slate-700 mb-1">
            Your Portion (grams)
          </label>
          <input
            type="number"
            id="portion"
            value={portionSize}
            onChange={(e) => onPortionChange(Number(e.target.value))}
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            min="1"
          />
        </div>

        <div className="bg-green-100 p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FireIcon className="w-6 h-6 text-green-600"/>
            <span className="text-lg font-medium text-slate-700">Estimated Total:</span>
          </div>
          <span className="text-2xl font-bold text-green-700">{totalCalories.toFixed(0)} kcal</span>
        </div>
      </div>
      
      <button
        onClick={handleAddClick}
        disabled={isAdded}
        className={`w-full flex items-center justify-center font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isAdded
            ? 'bg-green-200 text-green-800 cursor-not-allowed'
            : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
        }`}
      >
        <PlusIcon className="w-5 h-5 mr-2" />
        {isAdded ? 'Added to Daily Total!' : 'Add to Daily Total'}
      </button>
    </div>
  );
};
