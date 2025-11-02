import React from 'react';
import { ExclamationTriangleIcon } from './Icons';

interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="bg-rose-100/70 dark:bg-rose-900/40 backdrop-blur-sm border border-rose-300/50 dark:border-rose-500/30 text-rose-800 dark:text-rose-200 px-4 py-3 rounded-xl relative flex items-center space-x-3 soft-glow" role="alert">
            <ExclamationTriangleIcon className="w-6 h-6 flex-shrink-0 text-rose-500 dark:text-rose-400" />
            <div>
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{message}</span>
            </div>
        </div>
    );
};