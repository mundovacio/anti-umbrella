import React from 'react';
import { useOnboardingStore } from '../store/onboardingStore';

export const ThemeStep = ({ onComplete }: { onComplete: () => void }) => {
    const { theme, setTheme, prevStep } = useOnboardingStore();

    const themes = ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset'];

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-3xl font-bold">Choose a vibe</h2>
            <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto w-full max-w-md p-2">
                {themes.map((t) => (
                    <button
                        key={t}
                        className={`btn ${theme === t ? 'btn-primary' : 'btn-outline'} capitalize`}
                        onClick={() => setTheme(t)}
                    >
                        {t}
                    </button>
                ))}
            </div>
            <div className="flex justify-between w-full max-w-xs">
                <button onClick={prevStep} className="btn btn-ghost">
                    Back
                </button>
                <button onClick={onComplete} className="btn btn-primary">
                    Complete
                </button>
            </div>
        </div>
    );
};
