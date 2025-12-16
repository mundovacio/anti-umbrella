import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SettingsForm } from './SettingsForm';

// Mock server actions
vi.mock('@/features/settings/actions/update-settings', () => ({
    updateSettings: vi.fn(),
}));

vi.mock('@/features/auth/actions/delete-account', () => ({
    deleteAccount: vi.fn(),
}));

describe('SettingsForm', () => {
    const defaultSettings = {
        showOriginalText: false,
        showFriendlyTranslation: true,
        showGeneratedReply: true,
        denyAppointments: false,
        theme: 'nord',
    };

    it('should render all settings sections', () => {
        render(<SettingsForm initialSettings={defaultSettings} />);

        expect(screen.getByText('Ajustes')).toBeInTheDocument();
        expect(screen.getByText('Preferencias de Visualización')).toBeInTheDocument();
        expect(screen.getByText('Apariencia')).toBeInTheDocument();
        expect(screen.getByText('Zona de Peligro')).toBeInTheDocument();
    });

    it('should render toggles with correct initial state', () => {
        render(<SettingsForm initialSettings={defaultSettings} />);

        expect(screen.getByText('Mostrar texto original')).toBeInTheDocument();

        const checkboxes = screen.getAllByRole('checkbox');
        // We expect 5 checkboxes: 4 toggles + 1 theme toggle
        // showOriginalText is false (index 0)
        expect(checkboxes[0]).not.toBeChecked();

        // showFriendlyTranslation is true (index 1)
        expect(checkboxes[1]).toBeChecked();

        // showGeneratedReply is true (index 2)
        expect(checkboxes[2]).toBeChecked();

        // denyAppointments is false (index 3)
        expect(checkboxes[3]).not.toBeChecked();

        // theme is 'nord' so not 'sunset' (false) (index 4)
        expect(checkboxes[4]).not.toBeChecked();
    });
});
