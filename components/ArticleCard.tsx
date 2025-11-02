import React from 'react';
import type { Article } from '../types';
import { ArrowTopRightOnSquareIcon } from './Icons';

interface ArticleCardProps {
    article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    
    const getFaviconUrl = (url: string) => {
        try {
            const domain = new URL(url).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
        } catch (error) {
            console.error("Invalid URL for favicon:", url);
            return ''; // Return empty string for invalid URLs
        }
    };

    return (
        <a
            href={article.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-xl soft-glow dark:soft-glow-dark transition-all duration-300 group"
        >
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1 p-1 bg-gray-100/70 dark:bg-gray-700/70 rounded-md ring-1 ring-gray-200 dark:ring-gray-600">
                    <img 
                      src={getFaviconUrl(article.uri)} 
                      alt="favicon" 
                      className="w-6 h-6"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h5 className="mb-1 text-base font-bold tracking-tight text-[#2a3b4f] dark:text-gray-200 group-hover:text-[#6a7b95] dark:group-hover:text-[#d1c4e9] transition-colors duration-300 truncate">
                        {article.title}
                    </h5>
                    <p className="font-normal text-sm text-gray-500 dark:text-gray-400 break-all">
                        {new URL(article.uri).hostname}
                    </p>
                </div>
                <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-400 ml-auto flex-shrink-0 group-hover:text-[#6a7b95] dark:group-hover:text-[#d1c4e9] transition-all duration-300" />
            </div>
        </a>
    );
};