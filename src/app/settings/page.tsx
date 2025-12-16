import { getSettings } from '@/features/settings/actions/get-settings';
import { SettingsForm } from '@/features/settings/components/SettingsForm';
import { redirect } from 'next/navigation';
import { auth } from '@/features/auth/config/auth';

export default async function SettingsPage() {
    const session = await auth();

    if (!session?.user) {
        redirect('/login');
    }

    const settings = await getSettings();

    return (
        <SettingsForm
            initialSettings={{
                showOriginalText: settings.showOriginalText,
                showFriendlyTranslation: settings.showFriendlyTranslation,
                showGeneratedReply: settings.showGeneratedReply,
                denyAppointments: settings.denyAppointments,
                theme: settings.theme,
                inputType: settings.inputType,
            }}
        />
    );
}
