import React from 'react';
import { useOnboardingStore } from '../store/onboardingStore';

export const Slide2 = () => {
    const { nextStep, prevStep } = useOnboardingStore();

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-center px-6 animate-in slide-in-from-right duration-300">
            <div className="w-20 h-20 rounded-full bg-sky-blue/20 flex items-center justify-center">
                <svg className="w-10 h-10 text-sky-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </div>
            <h2 className="text-2xl font-medium text-gray-lighter leading-relaxed">
                Sentimos que estés en la situación de tener que comunicarte con una persona difícil.
            </h2>
            <div className="flex gap-4">
                <button onClick={prevStep} className="btn btn-ghost">
                    Atrás
                </button>
                <button onClick={nextStep} className="btn btn-primary px-8">
                    Continuar
                </button>
            </div>
        </div>
    );
};
