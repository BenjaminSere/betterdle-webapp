import Link from 'next/link';
import { GAMES } from '@/config/games';
import { clsx } from 'clsx';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden bg-background">
            {/* Pulsating Glow Gradients - Enhanced for visibility */}
            <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-riot-gold/10 blur-[150px] rounded-full animate-glow-pulse" />
            <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-riot-blue/15 blur-[150px] rounded-full animate-glow-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[30%] -right-[5%] w-[40%] h-[40%] bg-riot-red/5 blur-[150px] rounded-full animate-glow-pulse" style={{ animationDelay: '1s' }} />

            {/* Content Container */}
            <div className="relative z-10 max-w-6xl w-full flex flex-col items-center space-y-16 py-12">
                <header className="text-center space-y-8 animate-fade-in px-4">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-3 mb-6 bg-white/[0.04] border border-white/10 px-5 py-2 rounded-full animate-float">
                            <Sparkles size={14} className="text-riot-gold" />
                            <span className="text-riot-gold-light text-[10px] sm:text-[11px] uppercase tracking-[0.5em] font-black">
                                Bienvenue sur le Nexus
                            </span>
                        </div>
                        
                        <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-serif leading-[0.85] uppercase tracking-[0.12em] text-gradient select-none drop-shadow-[0_0_30px_rgba(200,170,110,0.3)] filter contrast-125">
                            BetterDLE
                        </h1>
                        
                        <div className="flex items-center gap-6 mt-10">
                            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-riot-gold to-transparent" />
                            <p className="text-[#a09b8c] text-xs sm:text-sm tracking-[0.4em] uppercase font-bold opacity-80">
                                Dominez l'archive
                            </p>
                            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-riot-gold to-transparent" />
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    {GAMES.map((game) => {
                        const isActive = game.status === 'active';
                        const CardWrapper = isActive ? Link : 'div';

                        return (
                            <CardWrapper
                                key={game.id}
                                href={isActive ? `/game/${game.slug}` : undefined}
                                className={clsx(
                                    "group relative flex flex-col justify-end aspect-[4/5] sm:aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl border p-10 transition-all duration-700",
                                    isActive
                                        ? "glass-card glass-card-hover border-white/10 cursor-pointer"
                                        : "bg-white/[0.01] border-white/5 opacity-40 grayscale pointer-events-none"
                                )}
                            >
                                {/* Active Game Background Fill */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-riot-gold/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                )}

                                <div className="relative z-20 space-y-5">
                                    <div className={clsx(
                                        "inline-flex items-center gap-2 py-1.5 px-3.5 rounded-md text-[9px] uppercase tracking-[.4em] font-black shadow-inner",
                                        isActive ? "bg-riot-gold/20 text-riot-gold ring-1 ring-riot-gold/30" : "bg-white/5 text-white/30"
                                    )}>
                                        <div className={clsx("w-1.5 h-1.5 rounded-full", isActive ? "bg-riot-gold animate-pulse shadow-[0_0_8px_rgba(200,170,110,1)]" : "bg-white/20")} />
                                        {isActive ? "Disponible" : "Archives"}
                                    </div>
                                    
                                    <h2 className={clsx(
                                        "text-3xl sm:text-4xl lg:text-5xl font-serif uppercase tracking-wider transition-all duration-700",
                                        isActive ? "text-[#f0e6d2] group-hover:neon-text-gold group-hover:-translate-y-2" : "text-white/10"
                                    )}>
                                        {game.name}
                                    </h2>

                                    {isActive && (
                                        <div className="flex items-center gap-3 text-riot-gold/60 text-[10px] uppercase font-black tracking-[0.4em] translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                            S'aventurer <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    )}
                                </div>

                                {/* Custom mobile decoration */}
                                <div className={clsx(
                                    "absolute bottom-0 left-0 h-[2px] transition-all duration-1000 ease-in-out",
                                    isActive ? "bg-gradient-to-r from-riot-gold to-white/20 w-0 group-hover:w-full" : "bg-white/10 w-4"
                                )} />
                            </CardWrapper>
                        );
                    })}
                </div>
                
                <footer className="w-full text-center pt-24 pb-8 animate-fade-in px-4" style={{ animationDelay: '1s' }}>
                    <div className="inline-flex flex-col items-center gap-6">
                        <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <p className="text-[#a09b8c]/40 text-[9px] sm:text-[10px] uppercase tracking-[.5em] font-medium leading-loose max-w-sm">
                            Non affilié à Riot Games Inc. <br className="sm:hidden" />
                            Projet communautaire & pédagogique
                        </p>
                    </div>
                </footer>
            </div>
        </main>
    );
}
