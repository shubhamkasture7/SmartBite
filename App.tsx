
import React, { useState, useEffect, useCallback } from 'react';
import { getNutritionalInfoFromImage } from './services/geminiService';
import type { NutritionalInfo } from './types';
import { Header } from './components/Header';
import { ImageUpload } from './components/ImageUpload';
import { CalorieDisplay } from './components/CalorieDisplay';
import { DailySummary } from './components/DailySummary';
import { Spinner } from './components/Spinner';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [nutritionalInfo, setNutritionalInfo] = useState<NutritionalInfo | null>(null);
  const [portionSize, setPortionSize] = useState<number>(100);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dailyCalories, setDailyCalories] = useState<number>(0);

  useEffect(() => {
    const savedCalories = localStorage.getItem('dailyCalories');
    const savedDate = localStorage.getItem('calorieDate');
    const today = new Date().toLocaleDateString();

    if (savedCalories && savedDate === today) {
      setDailyCalories(parseFloat(savedCalories));
    } else {
      // Reset if it's a new day
      localStorage.setItem('dailyCalories', '0');
      localStorage.setItem('calorieDate', today);
    }
  }, []);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setNutritionalInfo(null);
    setError(null);
    setPortionSize(100);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const analyzeImage = useCallback(async () => {
    if (!imageDataUrl) return;

    setIsLoading(true);
    setError(null);
    setNutritionalInfo(null);
    
    try {
      // Extract base64 data and mimeType from data URL
      const parts = imageDataUrl.split(',');
      const mimeType = parts[0].match(/:(.*?);/)?.[1];
      const base64Data = parts[1];

      if (!mimeType || !base64Data) {
        throw new Error("Invalid image data URL.");
      }
      
      const data = await getNutritionalInfoFromImage(base64Data, mimeType);
      setNutritionalInfo(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred while analyzing the image.");
    } finally {
      setIsLoading(false);
    }
  }, [imageDataUrl]);


  useEffect(() => {
    if (imageDataUrl) {
      analyzeImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageDataUrl]);


  const handleAddToDailyTotal = (caloriesToAdd: number) => {
    const newTotal = dailyCalories + caloriesToAdd;
    setDailyCalories(newTotal);
    localStorage.setItem('dailyCalories', newTotal.toString());
    const today = new Date().toLocaleDateString();
    localStorage.setItem('calorieDate', today);
  };
  
  const resetApp = () => {
    setImageFile(null);
    setImageDataUrl(null);
    setNutritionalInfo(null);
    setError(null);
    setIsLoading(false);
    setPortionSize(100);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-slate-800">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
          {!imageDataUrl ? (
            <ImageUpload onImageSelect={handleImageSelect} />
          ) : (
            <div className="flex flex-col items-center">
              <img src={imageDataUrl} alt="Food" className="rounded-lg max-h-80 shadow-md mb-6" />
              {isLoading && <Spinner />}
              {error && <div className="text-red-600 bg-red-100 p-4 rounded-lg w-full text-center">Error: {error}</div>}
              {nutritionalInfo && (
                <CalorieDisplay
                  info={nutritionalInfo}
                  portionSize={portionSize}
                  onPortionChange={setPortionSize}
                  onAdd={handleAddToDailyTotal}
                />
              )}
              <button
                onClick={resetApp}
                className="mt-6 bg-slate-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                Analyze Another Food
              </button>
            </div>
          )}
        </main>
      </div>
      <DailySummary totalCalories={dailyCalories} />
    </div>
  );
};

export default App;
