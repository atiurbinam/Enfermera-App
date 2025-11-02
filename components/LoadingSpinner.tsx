import React from 'react';
import { SparklesIcon } from './Icons';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center text-gray-600 dark:text-gray-400 py-10">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-[#b0c4de]/30 dark:border-[#6a7b95]/30 rounded-full"></div>
                <div className="absolute inset-0 border-t-4 border-[#a3b899] dark:border-[#d1c4e9] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <SparklesIcon className="w-10 h-10 text-[#b0c4de] dark:text-[#a3b899] animate-pulse" />
                </div>
            </div>
            <p className="mt-4 text-lg font-semibold">Buscando en la web y generando resumen...</p>
        </div>
    );
};