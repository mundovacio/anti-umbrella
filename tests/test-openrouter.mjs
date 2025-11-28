/**
 * Script de prueba para verificar la integración con OpenRouter
 * Ejecutar con: node --env-file=.env test-openrouter.mjs
 */

import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});

async function testOpenRouter() {
    console.log('🧪 Probando conexión con OpenRouter...\n');

    try {
        const response = await streamText({
            model: openrouter('x-ai/grok-4.1-fast:free'),
            messages: [
                {
                    role: 'system',
                    content: 'Eres un asistente empático y amigable.'
                },
                {
                    role: 'user',
                    content: 'Hola, ¿cómo estás?'
                }
            ],
        });

        const text = await response.text;

        console.log('✅ Respuesta recibida:');
        console.log('─'.repeat(50));
        console.log(text);
        console.log('─'.repeat(50));
        console.log('\n✨ ¡Integración exitosa con OpenRouter!');

    } catch (error) {
        console.error('❌ Error al conectar con OpenRouter:');
        console.error(error);
        process.exit(1);
    }
}

testOpenRouter();
