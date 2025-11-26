import { create } from 'zustand';

interface OnboardingState {
    step: number;
    name: string;
    setStep: (step: number) => void;
    setName: (name: string) => void;
    nextStep: () => void;
    prevStep: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
    step: 1,
    name: '',
    setStep: (step) => set({ step }),
    setName: (name) => set({ name }),
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
}));
