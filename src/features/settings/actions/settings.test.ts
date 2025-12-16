import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSettings } from './get-settings';
import { updateSettings } from './update-settings';
import { Settings } from '@prisma/client';

// Mock dependnecies
vi.mock('@/shared/lib/db', () => ({
    prisma: {
        settings: {
            findUnique: vi.fn(),
            create: vi.fn(),
            upsert: vi.fn(),
        },
    },
}));

vi.mock('@/features/auth/config/auth', () => ({
    auth: vi.fn(),
}));

vi.mock('next/cache', () => ({
    revalidatePath: vi.fn(),
}));

import { prisma } from '@/shared/lib/db';
import { auth } from '@/features/auth/config/auth';
import { Mock } from 'vitest';

describe('Settings Actions', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getSettings', () => {
        it('should throw error if user is unauthenticated', async () => {
            (auth as unknown as Mock).mockResolvedValue(null);
            await expect(getSettings()).rejects.toThrow('Unauthorized');
        });

        it('should return existing settings if found', async () => {
            (auth as unknown as Mock).mockResolvedValue({ user: { id: 'user1' } });
            (prisma.settings.findUnique as unknown as Mock).mockResolvedValue({ userId: 'user1', theme: 'dark' } as unknown as Settings);

            const result = await getSettings();
            expect(result).toEqual({ userId: 'user1', theme: 'dark' });
            expect(prisma.settings.findUnique).toHaveBeenCalledWith({ where: { userId: 'user1' } });
        });

        it('should create default settings if not found', async () => {
            (auth as unknown as Mock).mockResolvedValue({ user: { id: 'user1' } });
            (prisma.settings.findUnique as unknown as Mock).mockResolvedValue(null);
            (prisma.settings.create as unknown as Mock).mockResolvedValue({ userId: 'user1', theme: 'light' } as unknown as Settings);

            const result = await getSettings();
            expect(result).toEqual({ userId: 'user1', theme: 'light' });
            expect(prisma.settings.create).toHaveBeenCalledWith({ data: { userId: 'user1' } });
        });
    });

    describe('updateSettings', () => {
        it('should return error if unauthorized', async () => {
            (auth as unknown as Mock).mockResolvedValue(null);
            const result = await updateSettings({});
            expect(result).toEqual({ error: 'Unauthorized' });
        });

        it('should update settings and return success', async () => {
            (auth as unknown as Mock).mockResolvedValue({ user: { id: 'user1' } });
            (prisma.settings.upsert as unknown as Mock).mockResolvedValue({} as unknown as Settings);

            const result = await updateSettings({ theme: 'dracula' });
            expect(result).toEqual({ success: true });
            expect(prisma.settings.upsert).toHaveBeenCalledWith({
                where: { userId: 'user1' },
                update: { theme: 'dracula' },
                create: { userId: 'user1', theme: 'dracula' },
            });
        });
    });
});
