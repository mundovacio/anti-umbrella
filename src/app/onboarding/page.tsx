'use client';

import React from 'react';
import { useOnboardingStore } from '@/features/onboarding/store/onboardingStore';
import { Slide1 } from '@/features/onboarding/components/Slide1';
import { Slide2 } from '@/features/onboarding/components/Slide2';
import { Slide3 } from '@/features/onboarding/components/Slide3';
import { Slide4 } from '@/features/onboarding/components/Slide4';
import { completeOnboarding } from '@/features/onboarding/useCases/completeOnboarding';

export default function OnboardingPage() {
    const { step } = useOnboardingStore();

    const handleComplete = async () => {
        await completeOnboarding();
    };

    return (
        <div className="bg-[var(--navy-dark)] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl h-[600px] flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                    {step === 1 && <Slide1 />}
                    {step === 2 && <Slide2 />}
                    {step === 3 && <Slide3 />}
                    {step === 4 && <Slide4 onComplete={handleComplete} />}
                </div>

                <div className="flex justify-center gap-2 py-8">
                    {[1, 2, 3, 4].map((dot) => (
                        <div
                            key={dot}
                            className={`w-2 h-2 rounded-full transition-all ${step >= dot ? 'bg-sky-blue w-8' : 'bg-navy-light'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
