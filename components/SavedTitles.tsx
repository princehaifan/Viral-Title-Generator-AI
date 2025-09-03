
import React from 'react';
import type { GeneratedTitle } from '../types';
import { TitleCard } from './TitleCard';

interface SavedTitlesProps {
    savedTitles: GeneratedTitle[];
    onDeleteTitle: (id: string) => void;
    onEditTitle: (id: string, newText: string) => void;
}

export const SavedTitles: React.FC<SavedTitlesProps> = ({ savedTitles, onDeleteTitle, onEditTitle }) => {
    if (savedTitles.length === 0) {
        return (
            <div className="text-center py-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <h3 className="mt-2 text-2xl font-semibold text-white">No Saved Titles</h3>
                <p className="mt-1 text-lg text-gray-400">Generate some titles and save your favorites here.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Your Saved Titles</h2>
            <div className="space-y-4">
                {savedTitles.map((title) => (
                    <TitleCard 
                        key={title.id} 
                        title={title} 
                        onDelete={onDeleteTitle}
                        onEdit={onEditTitle} 
                    />
                ))}
            </div>
        </div>
    )
};