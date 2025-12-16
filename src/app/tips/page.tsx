import React from 'react';
import { Smartphone } from 'lucide-react';

export default function TipsPage() {
    return (
        <div className="min-h-screen p-4 pb-25">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <header className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-100 tracking-tight">
                        Guía de Seguridad
                    </h1>
                    <p className="text-xl text-gray-400 font-light leading-relaxed">
                        Recursos y estrategias para proteger tu bienestar y mantener la calma.
                    </p>
                </header>

                <div className="h-px bg-white/10 w-full" />

                {/* Main Content */}
                <article className="space-y-12">

                    {/* Section 1 */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold text-sky-200">
                            Comunicación Estratégica
                        </h2>
                        <div className="space-y-6 text-lg text-gray-300 leading-relaxed font-normal">
                            <p>
                                <span className="text-white font-medium">Responde, aunque sea brevemente.</span> Aunque tu instinto sea ignorar, legalmente suele ser más favorable mantener el flujo de comunicación, especialmente si hay menores implicados. No hace falta que te extiendas; una respuesta neutra y funcional es suficiente.
                            </p>
                            <p>
                                <span className="text-white font-medium">Usa &quot;Umbrella&quot;.</span> No temas que se note un cambio en tu tono. Apoyarte en herramientas que filtren tus emociones no tiene ninguna consecuencia negativa para ti; al contrario, demuestra tu voluntad de mantener una comunicación civilizada.
                            </p>
                            <p>
                                <span className="text-white font-medium">No te lo tomes como algo personal.</span> Sus reacciones agresivas o manipuladoras hablan de su estado interno, no de tu valía ni de tu realidad.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold text-purple-300">
                            Protección y Evidencia
                        </h2>
                        <ul className="space-y-4 text-lg text-gray-300 leading-relaxed list-disc list-outside ml-5 marker:text-purple-500">
                            <li>
                                <strong className="text-white font-medium">Documenta todo.</strong> Guarda capturas de pantalla de conversaciones y exporta los chats con sus fechas. Son tu mejor seguro en caso de disputas legales.
                            </li>
                            <li>
                                <strong className="text-white font-medium">Evita el aislamiento.</strong> En la medida de lo posible, evita situaciones en las que tengas que estar a solas físicamente con una persona narcisista o agresiva.
                            </li>
                        </ul>
                    </section>
                </article>

                <div className="h-px bg-white/10 w-full" />

                {/* Emergency Section - Kept distinct but integrated */}
                <section className="pt-4">
                    <h2 className="text-2xl font-semibold text-red-400 mb-6 flex items-center gap-2">
                        <Smartphone className="w-6 h-6" />
                        Teléfonos de Ayuda
                    </h2>

                    <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-4 sm:p-8 space-y-6">
                        <p className="text-lg text-red-200/90 leading-relaxed">
                            Si hay menores presentes y la situación se vuelve agresiva (entregas, visitas, etc.), <strong className="text-red-100 font-bold border-b-2 border-red-500/50">no dudes en llamar al 112</strong>. Recuerda: los gritos y las amenazas también son violencia.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ActionLink href="tel:112" variant="primary">
                                112 - Emergencias
                            </ActionLink>
                            <ActionLink href="tel:016" variant="secondary">
                                016 - Violencia de Género
                            </ActionLink>
                            <ActionLink href="tel:091" variant="outline">
                                091 - Policía Nacional
                            </ActionLink>
                            <ActionLink href="tel:062" variant="outline">
                                062 - Guardia Civil
                            </ActionLink>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

function ActionLink({ href, children, variant = "outline" }: { href: string, children: React.ReactNode, variant?: "primary" | "secondary" | "outline" }) {
    const baseStyle = "flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium transition-all duration-200";
    const variants = {
        primary: "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20",
        secondary: "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20",
        outline: "border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white bg-transparent"
    };

    return (
        <a href={href} className={`${baseStyle} ${variants[variant]}`}>
            {children}
        </a>
    );
}
