import { NextRequest, NextResponse } from 'next/server';
import { getOpenRouterCompletion } from '@/features/conversations/services/openRouterAIServices';

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

        // Construir el contexto del sistema basado en el perfil
        const baseInstructions =
            'Actúas como un "paraguas" protector para víctimas de maltrato psicológico. ' +
            'Tu objetivo es ayudar al usuario a responder a agresores (jefes autoritarios, ex-parejas, etc.) ' +
            'con los que está obligado a interactuar. ' +
            'Tus respuestas deben ser estrictamente: SECAS, CORTAS y NEUTRAS. ' +
            'Nunca busques continuar la conversación. El objetivo es cortar el flujo de interacción y proteger al usuario. ' +
            'Si el mensaje requiere definir un dato concreto (hora, lugar) y no lo tienes, PREGUNTA al usuario qué poner. ' +
            'No seas empático con el agresor, sé una barrera fría y educada.';

        const systemMessage = {
            role: 'system',
            content: profileContext
                ? `${baseInstructions}\n\nContexto adicional del caso: ${profileContext}`
                : baseInstructions
        };

        const userMessage = {
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
