
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
        Automated Food Calorie Estimation
      </h1>
      <p className="text-slate-500 mt-2">Upload a picture of your meal to get started!</p>
    </header>
  );
};
