import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nueva Conversación | Umbrella',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
