'use client';

import React from 'react';
import { useOnboardingStore } from '@/features/onboarding/store/onboardingStore';
import { Slide1 } from '@/features/onboarding/components/Slide1';
import { Slide2 } from '@/features/onboarding/components/Slide2';
import { Slide3 } from '@/features/onboarding/components/Slide3';
import { Slide4 } from '@/features/onboarding/components/Slide4';
import { completeOnboarding } from '@/features/onboarding/useCases/completeOnboarding';

import { motion, AnimatePresence } from 'framer-motion';



export default function OnboardingPage() {
    const { step, setStep } = useOnboardingStore();
    // Track [previous, current] step to calculate direction
    const [[prevStep, currentStep], setSteps] = React.useState([step, step]);

    if (currentStep !== step) {
        setSteps([currentStep, step]);
    }

    const direction = step > prevStep ? 1 : step < prevStep ? -1 : 0;



    const handleComplete = async () => {
        await completeOnboarding();
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
        }),
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 overflow-hidden">
            <div className="w-full max-w-2xl h-[600px] flex flex-col relative">
                {/* Main Content Area with Glass Effect */}
                <div className="flex-1 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-sky-blue/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={step}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="absolute w-full h-full"
                            >
                                {step === 1 && <Slide1 />}
                                {step === 2 && <Slide2 />}
                                {step === 3 && <Slide3 />}
                                {step === 4 && <Slide4 onComplete={handleComplete} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-4 py-8">
                    {[1, 2, 3, 4].map((dot) => (
                        <button
                            key={dot}
                            onClick={() => setStep(dot)}
                            className={`group relative h-3 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-sky-blue/50 ${step === dot
                                ? 'w-12 bg-sky-blue shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                                : 'w-3 bg-white/20 hover:bg-white/40'
                                }`}
                            aria-label={`Go to step ${dot}`}
                        >
                            {/* Hover glow effect */}
                            <span className={`absolute inset-0 rounded-full transition-opacity duration-300 ${step === dot ? 'opacity-0' : 'opacity-0 group-hover:opacity-100 bg-white/20 blur-sm'
                                }`} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
