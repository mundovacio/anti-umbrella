import { create } from 'zustand';

interface OnboardingState {
    step: number;
    name: string;
    theme: string;
    setStep: (step: number) => void;
    setName: (name: string) => void;
    setTheme: (theme: string) => void;
    nextStep: () => void;
    prevStep: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
    step: 1,
    name: '',
    theme: 'light',
    setStep: (step) => set({ step }),
    setName: (name) => set({ name }),
    setTheme: (theme) => set({ theme }),
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
}));
