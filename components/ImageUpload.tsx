
import React, { useCallback } from 'react';
import { CameraIcon } from './icons';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const onDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const onDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="w-full">
      <label 
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <CameraIcon className="w-10 h-10 mb-4 text-slate-500" />
          <p className="mb-2 text-sm text-slate-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-slate-500">PNG, JPG, or WEBP (MAX. 4MB)</p>
        </div>
        <input 
          id="dropzone-file" 
          type="file" 
          className="hidden" 
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
        />
      </label>
    </div>
  );
};
