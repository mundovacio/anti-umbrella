import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, type ModelMessage } from 'ai';

// Inicializar OpenRouter con la API key
const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});

// Modelo por defecto: x-ai/grok-4.1-fast:free
// Modelo por defecto: google/gemini-2.0-flash-exp:free
const DEFAULT_MODEL = 'tngtech/deepseek-r1t2-chimera:free';

/**
 * Obtiene una respuesta de OpenRouter usando el Vercel AI SDK
 * @param messages - Array de mensajes en formato OpenAI
 * @param modelName - Nombre del modelo a usar (opcional)
 * @returns Texto de respuesta completo
 */
export const getOpenRouterCompletion = async (
    messages: ModelMessage[],
    modelName: string = DEFAULT_MODEL
) => {
    const response = await streamText({
        model: openrouter(modelName),
        messages: messages,
    });

    // Obtener el texto completo del stream
    const text = await response.text;

    return {
        choices: [
            {
                message: {
                    role: 'assistant',
                    content: text,
                },
            },
        ],
    };
};
