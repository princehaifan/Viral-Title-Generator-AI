import React, { useState, useCallback } from 'react';
import type { GeneratedTitle } from '../types';
import { generateTitles } from '../services/geminiService';
import { TitleCard } from './TitleCard';

interface GeneratorProps {
  customData: string | null;
  onSaveTitle: (title: GeneratedTitle) => void;
}

export const Generator: React.FC<GeneratorProps> = ({ customData, onSaveTitle }) => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<GeneratedTitle[]>([]);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) {
      setError('Please enter a video topic.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults([]);
    try {
      const titles = await generateTitles(topic, customData);
      setResults(titles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [topic, customData]);
  
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">
            Video Topic / Keywords
        </label>
        <textarea
            id="topic"
            rows={3}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., 'AI tools for productivity', 'cooking pasta in 5 minutes'"
            className="w-full bg-gray-700 border-gray-600 rounded-md text-white placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
            </>
        ) : (
            'Generate Titles'
        )}
      </button>

      {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-md">{error}</div>}
      
      {results.length > 0 && (
        <div className="space-y-4 pt-4">
             <h3 className="text-xl font-semibold text-white">Generated Titles</h3>
            {results.map((title) => (
                <TitleCard key={title.id} title={title} onSave={onSaveTitle} />
            ))}
        </div>
      )}
    </div>
  );
};