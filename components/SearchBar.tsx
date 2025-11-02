import React from 'react';
import { MagnifyingGlassIcon } from './Icons';

interface SearchBarProps {
    query: string;
    setQuery: (query: string) => void;
    onSearch: () => void;
    isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, onSearch, isLoading }) => {
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    };
    
    return (
        <div className="relative soft-glow dark:soft-glow-dark rounded-full">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe un tema de salud, por ej: 'síntomas de la gripe'"
                className="w-full pl-14 pr-36 py-4 text-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none rounded-full focus:ring-2 focus:ring-[#b0c4de] dark:focus:ring-[#6a7b95] transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                disabled={isLoading}
            />
            <button
                onClick={onSearch}
                disabled={isLoading}
                className="absolute inset-y-0 right-0 m-2 px-6 py-2 bg-[#a3b899] text-white font-semibold rounded-full hover:bg-[#8f9e8a] dark:bg-[#6a7b95] dark:hover:bg-[#526075] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a3b899] dark:focus:ring-[#6a7b95] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300"
            >
                {isLoading ? 'Buscando...' : 'Buscar'}
            </button>
        </div>
    );
};