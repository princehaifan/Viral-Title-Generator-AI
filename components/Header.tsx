
import React from 'react';

interface HeaderProps {
    currentView: 'generator' | 'saved';
    setCurrentView: (view: 'generator' | 'saved') => void;
    savedCount: number;
}

const NavLink: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            active ? 'bg-primary-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
        }`}
    >
        {children}
    </button>
);

export const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, savedCount }) => {
    return (
        <header className="bg-gray-800 shadow-md sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                        </svg>
                        <h1 className="text-xl font-bold text-white">HeadlineForge AI</h1>
                    </div>
                    <nav className="flex items-center space-x-2 bg-gray-700 p-1 rounded-lg">
                        <NavLink active={currentView === 'generator'} onClick={() => setCurrentView('generator')}>
                            Generator
                        </NavLink>
                        <NavLink active={currentView === 'saved'} onClick={() => setCurrentView('saved')}>
                            <div className="flex items-center space-x-2">
                                <span>Saved Titles</span>
                                {savedCount > 0 && (
                                    <span className="bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {savedCount}
                                    </span>
                                )}
                            </div>
                        </NavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
};
