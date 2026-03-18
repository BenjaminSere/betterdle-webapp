import { Inter, Cinzel } from 'next/font/google';
import Providers from '@/components/Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-serif' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" className={`${inter.variable} ${cinzel.variable}`}>
            <body className="antialiased overflow-x-hidden">
                <div className="fixed inset-0 noise-overlay h-full w-full" />
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}