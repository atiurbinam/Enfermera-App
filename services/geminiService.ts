import { GoogleGenAI } from "@google/genai";
import type { Article, GroundingChunk } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function findArticles(topic: string): Promise<{ summary: string; articles: Article[] }> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Actuando como un asistente de enfermería con IA con alcance global, realiza una búsqueda exhaustiva en la web sobre el tema de salud "${topic}", priorizando fuentes médicas y científicas de alta calidad de cualquier país y en cualquier idioma. Busca publicaciones entre 2020 y 2025.
Después de analizar las fuentes más relevantes a nivel mundial, proporciona un resumen bien estructurado y fácil de leer en español, utilizando el formato Markdown. El resumen debe sintetizar los hallazgos clave de las diversas fuentes internacionales.
El resumen debe incluir:
- Un encabezado principal (##).
- Puntos clave resaltados con viñetas (*).
- Texto importante en negrita (**texto**).
El objetivo es presentar una perspectiva global y actualizada sobre el tema, presentando la información de manera clara y concisa para una fácil comprensión.`,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const summary = response.text;
        
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
        
        const articles = groundingChunks
            .map((chunk: GroundingChunk) => chunk.web)
            .filter((webSource): webSource is { uri: string; title: string; } => 
                webSource && typeof webSource.uri === 'string' && typeof webSource.title === 'string' && webSource.uri.length > 0
            )
            // Fix: Explicitly type the accumulator `acc` to resolve the "Untyped function calls may not accept type arguments" error.
            .reduce((acc: Article[], current) => {
                if (!acc.some(item => item.uri === current.uri)) {
                    acc.push({ uri: current.uri, title: current.title || 'Sin título' });
                }
                return acc;
            }, []);

        return { summary, articles };

    } catch (error) {
        console.error("Error fetching articles from Gemini API:", error);
        throw new Error("No se pudo obtener una respuesta de la IA. Verifica tu conexión o la clave de API.");
    }
}