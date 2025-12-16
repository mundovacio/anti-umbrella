import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cuenta | Umbrella',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
