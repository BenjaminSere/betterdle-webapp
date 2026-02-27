import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { GAMES, getIcon } from '@/config/games';
import { notFound } from 'next/navigation';
import { clsx } from 'clsx';

interface PageProps {
    params: Promise<{ gameSlug: string }>;
}

export default async function GamePage({ params }: PageProps) {
    const { gameSlug } = await params;
    const game = GAMES.find((g) => g.slug === gameSlug);

    if (!game) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#0a0a0c] flex flex-col items-center p-8 text-[#f0e6d2]">
            <div className="max-w-6xl w-full">
                <Link
                    href="/"
                    className="inline-flex items-center text-[#c8aa6e] hover:text-[#f0e6d2] transition-colors gap-2 mb-12 uppercase tracking-widest text-sm"
                >
                    <ChevronLeft size={20} />
                    Retour à l'accueil
                </Link>

                <header className="text-center space-y-4 mb-20">
                    <h1 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#c8aa6e] to-[#f0e6d2] uppercase tracking-[0.15em]">
                        {game.name}
                    </h1>
                    <div className="h-px w-32 bg-[#c8aa6e]/20 mx-auto" />
                    <p className="text-[#a09b8c] text-lg tracking-widest uppercase font-light">
                        Choix du mode
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {game.modes.map((mode) => {
                        const isActive = mode.status === 'active';
                        const ModeWrapper = isActive ? Link : 'div';
                        const Icon = getIcon(mode.icon);

                        return (
                            <ModeWrapper
                                key={mode.id}
                                href={isActive ? `/game/${game.slug}${mode.path}` : undefined}
                                className={clsx(
                                    "group relative block aspect-[3/4] overflow-hidden rounded-lg border transition-all duration-700 shadow-2xl flex flex-col items-center justify-center p-8 text-center",
                                    isActive
                                        ? "border-[#c8aa6e]/20 bg-[#121214] hover:border-[#c8aa6e]/60 cursor-pointer"
                                        : "border-white/5 bg-white/5 cursor-not-allowed opacity-40 grayscale"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#c8aa6e]/5 to-transparent group-hover:from-[#c8aa6e]/10 transition-colors duration-500" />
                                )}

                                <div className={clsx(
                                    "w-16 h-16 rounded-full border flex items-center justify-center mb-6 transition-all duration-500",
                                    isActive
                                        ? "border-[#c8aa6e]/20 text-[#c8aa6e] group-hover:border-[#c8aa6e]/60 group-hover:scale-110"
                                        : "border-white/10 text-white/10"
                                )}>
                                    <Icon size={32} />
                                </div>

                                <span className={clsx(
                                    "mb-2 text-xs uppercase tracking-[0.3em] font-bold transition-all duration-500",
                                    isActive ? "text-[#c8aa6e]" : "text-white/10"
                                )}>
                                    {isActive ? mode.id : 'Prochainement'}
                                </span>

                                <h2 className={clsx(
                                    "text-4xl font-serif uppercase tracking-wider mb-4",
                                    isActive ? "text-[#f0e6d2]" : "text-white/20"
                                )}>
                                    {mode.title}
                                </h2>

                                <p className={clsx(
                                    "text-sm leading-relaxed transition-opacity duration-500",
                                    isActive ? "text-[#a09b8c] opacity-60 group-hover:opacity-100" : "text-white/10"
                                )}>
                                    {mode.description}
                                </p>

                                <div className={clsx(
                                    "h-0.5 mx-auto transition-all duration-700 mt-8",
                                    isActive ? "w-8 bg-[#c8aa6e] group-hover:w-full" : "w-4 bg-white/5"
                                )} />
                            </ModeWrapper>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
