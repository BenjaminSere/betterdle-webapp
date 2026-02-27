import Link from 'next/link';
import { GAMES } from '@/config/games';
import { clsx } from 'clsx';

export default function HomePage() {
    return (
        <main className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center p-4 text-[#f0e6d2]">
            <div className="max-w-4xl w-full text-center space-y-12">
                <header className="space-y-4">
                    <h1 className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#c8aa6e] via-[#f0e6d2] to-[#c8aa6e] uppercase tracking-[0.2em]">
                        BetterDLE
                    </h1>
                    <p className="text-[#a09b8c] text-xl tracking-widest uppercase font-light">
                        Sélectionnez votre jeu
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                    {GAMES.map((game) => {
                        const isActive = game.status === 'active';
                        const CardWrapper = isActive ? Link : 'div';

                        return (
                            <CardWrapper
                                key={game.id}
                                href={isActive ? `/game/${game.slug}` : undefined}
                                className={clsx(
                                    "group relative block aspect-[16/9] overflow-hidden rounded-lg border transition-all duration-500 shadow-2xl flex flex-col items-center justify-center text-center p-8",
                                    isActive
                                        ? "border-[#c8aa6e]/20 bg-[#121214] hover:border-[#c8aa6e]/60 cursor-pointer"
                                        : "border-white/5 bg-white/5 cursor-not-allowed opacity-40 grayscale"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#c8aa6e]/5 to-transparent group-hover:from-[#c8aa6e]/10 transition-colors duration-500" />
                                )}

                                <h2 className={clsx(
                                    "text-3xl font-serif uppercase tracking-wider transition-transform duration-500 relative z-10",
                                    isActive ? "text-[#f0e6d2] group-hover:scale-105" : "text-white/20"
                                )}>
                                    {game.name}
                                </h2>

                                <div className={clsx(
                                    "h-0.5 mt-4 transition-all duration-500 relative z-10",
                                    isActive ? "w-12 bg-[#c8aa6e] group-hover:w-24" : "w-8 bg-white/10"
                                )} />

                                {isActive ? (
                                    <p className="mt-4 text-[#a09b8c] text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 relative z-10">
                                        Entrer
                                    </p>
                                ) : (
                                    <p className="mt-4 text-white/10 text-xs uppercase tracking-[0.2em] relative z-10">
                                        Prochainement
                                    </p>
                                )}
                            </CardWrapper>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
