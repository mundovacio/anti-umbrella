import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Consejos y Ayuda | Umbrella',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
