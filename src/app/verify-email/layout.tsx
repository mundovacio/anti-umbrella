import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Verificar Email | Umbrella',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
