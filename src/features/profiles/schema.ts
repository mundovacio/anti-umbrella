import { z } from 'zod';

export const profileSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').max(50, 'El nombre no puede exceder los 50 caracteres'),
    relation: z.string().min(1, 'La relación es obligatoria').max(50, 'La relación no puede exceder los 50 caracteres'),
    gender: z.string().min(1, 'El género es obligatorio').max(50, 'El género no puede exceder los 50 caracteres'),
    communicationFrequency: z.string().max(100, 'La frecuencia de comunicación no puede exceder los 100 caracteres').optional().or(z.literal('')),
    communicationChannel: z.string().min(1, 'El canal de comunicación es obligatorio').max(50, 'El canal de comunicación no puede exceder los 50 caracteres'),
    childrenInfo: z.string().min(1, 'La información de vinculación es obligatoria').max(500, 'La información de vinculación no puede exceder los 500 caracteres'),
    legalStatus: z.string().max(500, 'La información legal no puede exceder los 500 caracteres').optional().or(z.literal('')),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
