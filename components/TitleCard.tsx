
import React, { useState, useEffect } from 'react';
import type { GeneratedTitle } from '../types';
import { TIER_STYLES } from '../constants';

interface TitleCardProps {
  title: GeneratedTitle;
  onSave?: (title: GeneratedTitle) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, newText: string) => void;
}

const CopyIcon: React.FC<{ copied: boolean }> = ({ copied }) => {
    if (copied) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        );
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
    );
};

const SaveIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);

const DeleteIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const EditIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

const ConfirmIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const CancelIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const TitleCard: React.FC<TitleCardProps> = ({ title, onSave, onDelete, onEdit }) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(title.text);
  const styles = TIER_STYLES[title.tier];
  
  useEffect(() => {
    setEditedText(title.text);
  }, [title.text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(title.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditedText(title.text);
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    if (onEdit && editedText.trim()) {
      onEdit(title.id, editedText.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className={`bg-gray-700/50 border-l-4 p-4 rounded-r-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${styles.border}`}>
      <div className="flex-1 w-full">
        <div className="flex items-center space-x-3 mb-2">
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${styles.badge}`}>{title.tier}</span>
        </div>
        {isEditing ? (
            <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full bg-gray-600 border-gray-500 rounded-md text-white placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500 text-base p-2"
                rows={3}
                autoFocus
            />
        ) : (
             <p className="text-gray-200">{title.text}</p>
        )}
      </div>
      {isEditing ? (
        <div className="flex items-center space-x-2">
            <button onClick={handleSaveEdit} className="p-2 rounded-full text-green-400 hover:bg-green-900/50 transition-colors" aria-label="Confirm edit">
                <ConfirmIcon />
            </button>
             <button onClick={handleCancelEdit} className="p-2 rounded-full text-red-500 hover:bg-red-900/50 transition-colors" aria-label="Cancel edit">
                <CancelIcon />
            </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2 self-end sm:self-center">
            <button onClick={handleCopy} className="p-2 rounded-full text-gray-400 hover:bg-gray-600 hover:text-white transition-colors" aria-label="Copy title">
                <CopyIcon copied={copied} />
            </button>
            {onEdit && (
                 <button onClick={handleEdit} className="p-2 rounded-full text-gray-400 hover:bg-gray-600 hover:text-white transition-colors" aria-label="Edit title">
                    <EditIcon />
                </button>
            )}
            {onSave && (
                <button onClick={() => onSave(title)} className="p-2 rounded-full text-gray-400 hover:bg-gray-600 hover:text-white transition-colors" aria-label="Save title">
                    <SaveIcon />
                </button>
            )}
            {onDelete && (
                 <button onClick={() => onDelete(title.id)} className="p-2 rounded-full text-red-500 hover:bg-red-900/50 transition-colors" aria-label="Delete title">
                    <DeleteIcon />
                </button>
            )}
        </div>
      )}
    </div>
  );
};