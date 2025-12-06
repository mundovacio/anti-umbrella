import { NextRequest, NextResponse } from 'next/server';
import { getOpenRouterCompletion } from '@/features/conversations/services/openRouterAIServices';
import { type ModelMessage } from 'ai';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { message, profileContext } = body;

        if (!message) {
            return NextResponse.json(
                { error: 'El mensaje es requerido' },
                { status: 400 }
            );
        }

        const baseInstructions =
            'Actúas como un "paraguas" protector para víctimas de maltrato psicológico. Tú responderás por el usuario.' +
            'Tu objetivo es ayudar al usuario a responder a agresores (jefes autoritarios, ex-parejas, etc.) ' +
            'con los que está obligado a interactuar. ' +
            'Tus respuestas deben ser estrictamente: SECAS, CORTAS y NEUTRAS. ' +
            'Nunca busques continuar la conversación; el objetivo es cortar el flujo de interacción y proteger al usuario de forma clara y concisa. ' +
            'No entres nunca al debate ni a la provocación. ' +
            'El tono debe sonar razonable y ser una barrera fría pero educada, eligiendo siempre la versión más breve. ' +
            'Asegúrate de que las respuestas no puedan ser usadas en contra del usuario. ' +
            'Si aplica, deja siempre constancia de la preocupación por el bienestar de los niños. ' +
            'Si el mensaje requiere definir un dato concreto (hora, lugar) y no lo tienes, PREGUNTA al usuario qué poner.\n\n' +
            'IMPORTANTE: Tu respuesta debe contener ÚNICAMENTE el texto que el usuario debe enviar. ' +
            'NO incluyas comillas rodeando la respuesta. ' +
            'NO incluyas frases introductorias como "Aquí tienes la respuesta" o "Ok". ' +
            'NO incluyas explicaciones. SOLO EL TEXTO DE LA RESPUESTA.';

        const systemMessage: ModelMessage = {
            role: 'system',
            content: profileContext
                ? `${baseInstructions}\n\nContexto adicional del caso: ${profileContext}`
                : baseInstructions
        };

        const userMessage: ModelMessage = {
            role: 'user',
            content: `He recibido este mensaje del agresor:\n\n"${message}"\n\nGenera una respuesta que cumpla con el objetivo de ser seca, corta, neutra y de cierre.`
        };

        // Llamar a OpenRouter
        const completion = await getOpenRouterCompletion([
            systemMessage,
            userMessage
        ]);

        const reply = completion.choices[0]?.message?.content || 'No se pudo generar una respuesta.';

        return NextResponse.json({
            reply,
            success: true
        });

    } catch (error) {
        console.error('Error en la API de conversación:', error);
        return NextResponse.json(
            {
                error: 'Error al generar la respuesta',
                details: error instanceof Error ? error.message : 'Error desconocido'
            },
            { status: 500 }
        );
    }
}
