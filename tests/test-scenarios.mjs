
import fs from 'fs/promises';

async function runTests() {
    const url = 'http://localhost:3000/api/conversation/generate';
    const outputFile = 'output.txt';

    const scenarios = [
        {
            name: "1. Insulto/Ataque directo",
            payload: {
                message: "Eres una inútil, no sirves para nada. Ojalá nunca te hubiera conocido.",
                profileContext: "Ex-pareja abusiva. Contacto cero excepto emergencias."
            }
        },
        {
            name: "2. Manipulación emocional",
            payload: {
                message: "No puedo creer que me hagas esto con todo lo que yo te he querido. Estoy muy deprimido por tu culpa.",
                profileContext: "Relación tóxica pasada. El usuario quiere mantener distancia emocional."
            }
        },
        {
            name: "3. Solicitud de dato (Falta información)",
            payload: {
                message: "¿A qué hora paso a buscar las cosas mañana?",
                profileContext: "Divorcio conflictivo."
            }
        },
        {
            name: "4. Solicitud de dato (Información en contexto)",
            payload: {
                message: "¿A qué hora paso a buscar las cosas mañana?",
                profileContext: "Divorcio conflictivo. La entrega de cosas es siempre a las 18:00 en el parque."
            }
        },
        {
            name: "5. Intento de reabrir conversación",
            payload: {
                message: "Solo quería saber cómo estás, hace mucho que no hablamos bien. ¿Podemos tomar un café?",
                profileContext: "Acosador. Orden de alejamiento moral (no legal aún). No se desea contacto."
            }
        }
    ];

    let output = "RESULTADOS DE PRUEBAS DE GENERACIÓN DE RESPUESTAS\n";
    output += "=================================================\n\n";

    console.log("Iniciando pruebas...");

    for (const scenario of scenarios) {
        console.log(`Ejecutando: ${scenario.name}`);
        output += `ESCENARIO: ${scenario.name}\n`;
        output += `Mensaje Entrante: "${scenario.payload.message}"\n`;
        output += `Contexto: "${scenario.payload.profileContext}"\n`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(scenario.payload)
            });

            if (!response.ok) {
                output += `ERROR HTTP: ${response.status}\n`;
            } else {
                const data = await response.json();
                output += `RESPUESTA GENERADA: "${data.reply}"\n`;
            }
        } catch (error) {
            output += `ERROR DE CONEXIÓN: ${error.message}\n`;
        }

        output += "-".repeat(40) + "\n\n";
        // Small delay to be nice to the API
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    await fs.writeFile(outputFile, output, 'utf8');
    console.log(`Pruebas completadas. Resultados guardados en ${outputFile}`);
}

runTests();
