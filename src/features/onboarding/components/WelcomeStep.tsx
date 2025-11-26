import React from 'react';
import { useOnboardingStore } from '../store/onboardingStore';

export const WelcomeStep = () => {
    const { nextStep } = useOnboardingStore();

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-6 text-center animate-in fade-in zoom-in duration-500">
            <h1 className="text-4xl font-bold text-primary">Welcome to Umbrella</h1>
            <p className="text-lg text-base-content/70 max-w-md">
                Your personal empathetic communication assistant. Let's get to know you better.
            </p>
            <button onClick={nextStep} className="btn btn-primary btn-lg">
                Get Started
            </button>
        </div>
    );
};
