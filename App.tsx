
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { DataUploader } from './components/DataUploader';
import { Generator } from './components/Generator';
import { SavedTitles } from './components/SavedTitles';
import type { GeneratedTitle } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

type View = 'generator' | 'saved';

export default function App() {
  const [uploadedData, setUploadedData] = useState<string | null>(null);
  const [savedTitles, setSavedTitles] = useLocalStorage<GeneratedTitle[]>('savedTitles', []);
  const [currentView, setCurrentView] = useState<View>('generator');

  const handleDataUploaded = useCallback((data: string) => {
    setUploadedData(data);
  }, []);

  const handleSaveTitle = useCallback((title: GeneratedTitle) => {
    setSavedTitles(prev => {
      if (prev.find(t => t.text === title.text)) {
        return prev;
      }
      return [{ ...title, id: `saved-${Date.now()}` }, ...prev];
    });
  }, [setSavedTitles]);

  const handleDeleteTitle = useCallback((id: string) => {
    setSavedTitles(prev => prev.filter(t => t.id !== id));
  }, [setSavedTitles]);
  
  const handleEditTitle = useCallback((id: string, newText: string) => {
    setSavedTitles(prev => 
      prev.map(t => 
        t.id === id ? { ...t, text: newText } : t
      )
    );
  }, [setSavedTitles]);

  const handleClearData = useCallback(() => {
    setUploadedData(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header currentView={currentView} setCurrentView={setCurrentView} savedCount={savedTitles.length} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-2xl font-bold text-white">1. Train Your AI (Optional)</h2>
              <DataUploader onDataUploaded={handleDataUploaded} uploadedData={uploadedData} onClearData={handleClearData}/>
            </div>
            <div className="lg:col-span-2 space-y-6">
               <h2 className="text-2xl font-bold text-white">2. Generate Titles</h2>
              <Generator customData={uploadedData} onSaveTitle={handleSaveTitle} />
            </div>
          </div>
        )}
        {currentView === 'saved' && (
          <SavedTitles savedTitles={savedTitles} onDeleteTitle={handleDeleteTitle} onEditTitle={handleEditTitle} />
        )}
      </main>
    </div>
  );
}