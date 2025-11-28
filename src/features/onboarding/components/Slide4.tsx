import React from 'react';
import { useOnboardingStore } from '../store/onboardingStore';

export const Slide4 = ({ onComplete }: { onComplete: () => void }) => {
    const { prevStep } = useOnboardingStore();

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-center px-6 animate-in slide-in-from-right duration-300">
            <div className="w-20 h-20 rounded-full bg-sky-blue/20 flex items-center justify-center">
                <svg className="w-10 h-10 text-sky-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-lighter leading-relaxed">
                Estás listo/a.<br /> Nuestro objetivo es ayudarte a mantener el control.
            </h2>
            <p className="text-xl text-sky-blue font-medium">Tú, vive.</p>
            <div className="flex flex-wrap justify-center gap-4">
                <button onClick={prevStep} className="btn btn-ghost">
                    Atrás
                </button>
                <button onClick={onComplete} className="btn btn-primary btn-lg px-8">
                    Comenzar a usar Umbrella
                </button>
            </div>
        </div>
    );
};
