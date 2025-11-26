import React from 'react';
import { useOnboardingStore } from '../store/onboardingStore';

export const NameStep = () => {
    const { name, setName, nextStep, prevStep } = useOnboardingStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            nextStep();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-3xl font-bold">What should we call you?</h2>
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xs space-y-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="input input-bordered w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                />
                <div className="flex justify-between">
                    <button type="button" onClick={prevStep} className="btn btn-ghost">
                        Back
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={!name.trim()}>
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};
