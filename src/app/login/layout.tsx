import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Iniciar Sesión | Umbrella',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
