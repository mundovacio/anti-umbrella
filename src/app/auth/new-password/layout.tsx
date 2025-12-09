import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nueva Contraseña | Umbrella',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
