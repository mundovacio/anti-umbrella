export interface Profile {
    id: string;
    userId: string;
    name: string;
    relation: string;
    gender: string | null;
    communicationFrequency: string | null;
    communicationChannel: string | null;
    childrenInfo: string | null;
    legalStatus: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProfileFormState {
    message?: string;
    errors?: {
        [key: string]: string[];
    };
}
