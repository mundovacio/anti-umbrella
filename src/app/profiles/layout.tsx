import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Perfiles | Umbrella',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
