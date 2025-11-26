'use client';

import React, { useEffect } from 'react';
import { useOnboardingStore } from '@/features/onboarding/store/onboardingStore';
import { WelcomeStep } from '@/features/onboarding/components/WelcomeStep';
import { NameStep } from '@/features/onboarding/components/NameStep';
import { ThemeStep } from '@/features/onboarding/components/ThemeStep';
import { completeOnboarding } from '@/features/onboarding/useCases/completeOnboarding';

export default function OnboardingPage() {
    const { step, name, theme } = useOnboardingStore();

    const handleComplete = async () => {
        await completeOnboarding({ name, theme });
    };

    // Apply theme dynamically
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="card w-full max-w-lg bg-base-100 shadow-xl h-[500px]">
                <div className="card-body">
                    {step === 1 && <WelcomeStep />}
                    {step === 2 && <NameStep />}
                    {step === 3 && <ThemeStep onComplete={handleComplete} />}

                    <div className="flex justify-center mt-4">
                        <ul className="steps">
                            <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>Welcome</li>
                            <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>Name</li>
                            <li className={`step ${step >= 3 ? 'step-primary' : ''}`}>Theme</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
