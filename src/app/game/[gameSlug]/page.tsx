import Link from 'next/link';
import { ChevronLeft, ArrowRight, ShieldCheck, Trophy } from 'lucide-react';
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

    const isLoL = game.id === 'lol';

    return (
        <main className="relative min-h-screen flex flex-col items-center bg-background p-6 overflow-hidden">
            {/* Pulsating Glowing Accents - Custom per game */}
            <div className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] blur-[160px] rounded-full animate-glow-pulse ${isLoL ? 'bg-riot-gold/10' : 'bg-riot-red/10'}`} />
            <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] blur-[160px] rounded-full animate-glow-pulse ${isLoL ? 'bg-riot-blue/15' : 'bg-riot-gold/10'}`} style={{ animationDelay: '2s' }} />

            <div className="relative z-10 max-w-6xl w-full flex flex-col space-y-12 py-12 md:py-20 lg:py-24">
                <nav className="animate-fade-in px-4">
                    <Link
                        href="/"
                        className="group inline-flex items-center text-[#a09b8c] hover:text-[#f0e6d2] transition-all gap-4 uppercase tracking-[0.4em] text-[10px] font-black"
                    >
                        <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:border-riot-gold/60 group-hover:bg-riot-gold/5 transition-all group-hover:shadow-[0_0_10px_rgba(200,170,110,0.2)]">
                            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </div>
                        <span className="opacity-60 group-hover:opacity-100 group-hover:neon-text-gold transition-all">Retour au Hub</span>
                    </Link>
                </nav>

                <header className="text-center space-y-6 mb-12 px-4 animate-slide-up">
                    <div className="inline-flex items-center gap-2 mb-2 bg-riot-gold/10 border border-riot-gold/30 px-4 py-1.5 rounded-full text-riot-gold text-[9px] uppercase tracking-[0.5em] font-black shadow-inner shadow-riot-gold/5 animate-fade-in">
                        <Trophy size={14} className="animate-pulse" />
                        Prêt pour le combat ?
                    </div>
                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-gradient uppercase tracking-[0.18em] leading-tight select-none">
                        {game.name}
                    </h1>
                    <div className="h-[2px] w-48 sm:w-64 bg-gradient-to-r from-transparent via-riot-gold to-transparent mx-auto mt-6" />
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    {game.modes.map((mode, index) => {
                        const isActive = mode.status === 'active';
                        const ModeWrapper = isActive ? Link : 'div';
                        const Icon = getIcon(mode.icon);

                        return (
                            <ModeWrapper
                                key={mode.id}
                                href={isActive ? `/game/${game.slug}${mode.path}` : undefined}
                                className={clsx(
                                    "group relative flex flex-col aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-2xl border p-12 text-left transition-all duration-700",
                                    isActive
                                        ? "glass-card glass-card-hover border-white/10 cursor-pointer"
                                        : "bg-white/[0.01] border-white/5 opacity-40 grayscale pointer-events-none"
                                )}
                            >
                                <div className={clsx(
                                    "w-16 h-16 rounded-xl flex items-center justify-center mb-10 border transition-all duration-700",
                                    isActive
                                        ? "bg-riot-gold/10 border-riot-gold/30 text-riot-gold group-hover:scale-110 group-hover:border-riot-gold/60 group-hover:bg-riot-gold/20 shadow-lg group-hover:shadow-riot-gold/20"
                                        : "bg-white/5 border-white/10 text-white/10"
                                )}>
                                    <Icon size={28} className={isActive ? "animate-pulse" : ""} />
                                </div>

                                <div className="space-y-6 mb-auto relative z-10">
                                    <div className={clsx(
                                        "inline-block py-1.5 px-3.5 rounded-md text-[9px] uppercase tracking-[.4em] font-black mb-2 animate-fade-in",
                                        isActive ? "bg-riot-gold/20 text-riot-gold ring-1 ring-riot-gold/30" : "bg-white/5 text-white/30"
                                    )}>
                                        {isActive ? mode.id : 'Indisponible'}
                                    </div>
                                    
                                    <h2 className={clsx(
                                        "text-3xl sm:text-4xl lg:text-5xl font-serif uppercase tracking-wider transition-all duration-700",
                                        isActive ? "text-[#f0e6d2] group-hover:neon-text-gold group-hover:-translate-y-2" : "text-white/10"
                                    )}>
                                        {mode.title}
                                    </h2>

                                    <p className={clsx(
                                        "text-sm/relaxed lg:text-md/relaxed transition-all duration-500 font-medium tracking-wide",
                                        isActive ? "text-[#a09b8c] opacity-80 group-hover:opacity-100 group-hover:text-white/80" : "text-white/10"
                                    )}>
                                        {mode.description}
                                    </p>
                                </div>

                                {isActive && (
                                    <div className="flex items-center justify-between gap-4 text-riot-gold/60 text-[10px] uppercase font-black tracking-[0.4em] transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 mt-10">
                                        Entrer dans l'arène <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                                    </div>
                                )}

                                {/* Hover Border Shine */}
                                {isActive && (
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                        <div className="absolute top-0 left-0 p-6 opacity-40">
                                            <div className="w-16 h-16 border-t-[2px] border-l-[2px] border-riot-gold/30 rounded-tl-xl transition-all duration-1000 group-hover:w-20 group-hover:h-20" />
                                        </div>
                                        <div className="absolute bottom-6 right-6 p-6 opacity-0 group-hover:opacity-40 transition-opacity duration-1000">
                                            <ShieldCheck size={48} className="text-riot-gold/20" />
                                        </div>
                                    </div>
                                )}
                            </ModeWrapper>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
