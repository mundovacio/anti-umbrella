import React from 'react';
import { getProfiles } from '@/features/profiles/actions/get-profiles';
import { ProfileManager } from '@/features/profiles/components/profile-manager';
import { Profile } from '@/features/profiles/types';

export default async function ProfilesPage() {
    const profiles = await getProfiles();

    return (
        <div className="min-h-screen p-4 pb-25">
            <div className="max-w-4xl mx-auto">
                <ProfileManager initialProfiles={profiles as Profile[]} />
            </div>
        </div>
    );
}
