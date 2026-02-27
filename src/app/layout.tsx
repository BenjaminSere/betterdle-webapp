import Providers from '@/components/Providers';
// ... tes autres imports (globals.css, etc.)

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}