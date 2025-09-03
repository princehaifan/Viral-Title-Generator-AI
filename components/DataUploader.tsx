
import React, { useCallback, useState, useRef } from 'react';

interface DataUploaderProps {
  onDataUploaded: (data: string) => void;
  uploadedData: string | null;
  onClearData: () => void;
}

export const DataUploader: React.FC<DataUploaderProps> = ({ onDataUploaded, uploadedData, onClearData }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (file && (file.type === 'text/plain' || file.type === 'text/csv')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onDataUploaded(text);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a valid .txt or .csv file.');
    }
  }, [onDataUploaded]);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  }

  if (uploadedData) {
    return (
        <div className="bg-gray-800 p-6 rounded-lg border-2 border-dashed border-green-500 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-semibold text-green-300">Data successfully loaded!</p>
                <p className="text-sm text-gray-400">Your AI is now trained on your style.</p>
                <button
                    onClick={onClearData}
                    className="mt-4 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
                >
                    Remove Data
                </button>
            </div>
        </div>
    );
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`bg-gray-800 p-6 rounded-lg border-2 border-dashed transition-colors duration-200 cursor-pointer ${
        isDragging ? 'border-primary-500 bg-gray-700' : 'border-gray-600 hover:border-primary-500'
      }`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept=".txt,.csv"
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center space-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-4-4V6a4 4 0 014-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H12a4 4 0 014 4v1.586a1 1 0 01-.293.707l-1.414 1.414a1 1 0 00-.293.707V16m-7-2h2m5 0h2" />
        </svg>
        <p className="font-semibold">Drag & drop your titles file</p>
        <p className="text-sm text-gray-400">or click to browse (.txt or .csv)</p>
      </div>
    </div>
  );
};
