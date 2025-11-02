import React, { useState, useCallback, useEffect } from 'react';
import { marked } from 'marked';
import { findArticles } from './services/geminiService';
import type { Article } from './types';
import { SearchBar } from './components/SearchBar';
import { ArticleCard } from './components/ArticleCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { HospitalIcon, DocumentMagnifyingGlassIcon } from './components/Icons';
import { ThemeToggle } from './components/ThemeToggle';

const App: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
      setIsDarkMode(prevMode => {
        const newMode = !prevMode;
        if (newMode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
        return newMode;
      });
    };

    const handleSearch = useCallback(async () => {
        if (!query.trim()) {
            setError('Por favor, introduce un tema para buscar.');
            return;
        }
        
        setIsLoading(true);
        setError(null);
        setArticles([]);
        setSummary('');
        setHasSearched(true);

        try {
            const result = await findArticles(query);
            setSummary(result.summary);
            setArticles(result.articles);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    }, [query]);

    const renderContent = () => {
        if (isLoading) {
            return <LoadingSpinner />;
        }
        if (error) {
            return <ErrorMessage message={error} />;
        }
        if (hasSearched && articles.length === 0 && !isLoading) {
            return (
                <div className="text-center text-gray-600 dark:text-gray-400 mt-12 flex flex-col items-center">
                    <DocumentMagnifyingGlassIcon className="w-16 h-16 mb-4 text-gray-500" />
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No se encontraron resultados</h3>
                    <p>Intenta con un término de búsqueda diferente.</p>
                </div>
            );
        }
        if (articles.length > 0) {
            return (
                <div className="space-y-12">
                    <div>
                        <h2 className="text-3xl font-semibold text-[#2a3b4f] dark:text-[#d1c4e9] mb-4">Resumen IA</h2>
                        <div
                            className="prose prose-lg max-w-none p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl soft-glow dark:soft-glow-dark prose-headings:text-[#4a5568] prose-strong:text-[#2a3b4f] prose-li:marker:text-[#a3b899] dark:prose-invert dark:prose-headings:text-[#b0c4de] dark:prose-strong:text-gray-200 dark:prose-li:marker:text-[#a3b899]"
                            dangerouslySetInnerHTML={{ __html: marked.parse(summary) as string }}
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold text-[#2a3b4f] dark:text-[#d1c4e9] mb-4">Artículos Encontrados</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map((article, index) => (
                                <ArticleCard key={index} article={article} />
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="text-center text-gray-600 dark:text-gray-400 mt-12 flex flex-col items-center">
                <HospitalIcon className="w-16 h-16 mb-4 text-[#6a7b95] dark:text-[#b0c4de]" />
                <h3 className="text-2xl font-semibold text-[#2a3b4f] dark:text-gray-300">¿Qué tema de salud te gustaría consultar hoy?</h3>
            </div>
        );
    };

    return (
        <div className="min-h-screen monet-bg dark:monet-bg-dark text-gray-800 dark:text-gray-200 transition-colors duration-500">
            <main className="container mx-auto px-4 py-8 md:py-12">
                <header className="relative text-center mb-10">
                    <div className="flex justify-center items-center gap-3">
                        <HospitalIcon className="w-10 h-10 text-[#4a5568] dark:text-[#d1c4e9]" />
                        <h1 className="text-4xl md:text-5xl font-bold text-[#2a3b4f] dark:text-gray-100">
                            Enfermera App
                        </h1>
                    </div>
                    <div className="absolute top-0 right-0">
                      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                    </div>
                </header>

                <div className="max-w-3xl mx-auto mb-12">
                    <SearchBar 
                        query={query} 
                        setQuery={setQuery} 
                        onSearch={handleSearch} 
                        isLoading={isLoading} 
                    />
                </div>

                <div className="max-w-5xl mx-auto">
                   {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default App;