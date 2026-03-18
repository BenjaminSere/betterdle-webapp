"use client"

import { useFindAll } from "@/api/generated/betterdle";
import { ChampionGrid } from "@/components/champions";
import { LoadingSpinner, ErrorDisplay, Header } from "@/components/ui";
import { Champion } from "@/api/generated/model/champion";
import { PageChampion } from "@/api/generated/model/pageChampion";
import { GAMES } from "@/config/games";
import { useParams, notFound } from "next/navigation";

import Link from 'next/link';
import { ChevronLeft, Info } from 'lucide-react';

export default function GenericWikiPage() {
    const params = useParams<{ gameSlug: string }>();
    const game = GAMES.find(g => g.slug === params.gameSlug);

    if (!game) {
        return notFound();
    }

    const { data, isLoading, error } = useFindAll(game.id, "fr_FR", { size: 200 });

    if (isLoading) return (
        <main className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
            <LoadingSpinner />
        </main>
    );

    if (error) return (
        <main className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
            <ErrorDisplay message={`Erreur lors du chargement des données de ${game.name}`} />
        </main>
    );

    const items = ((data?.data as unknown as PageChampion)?.content ?? []) as Champion[];

    return (
        <main className="relative min-h-screen bg-background pb-32 overflow-hidden">
            {/* Ambient Background Glows - More visible for non-darkness */}
            <div className={`absolute -top-[10%] -left-[10%] w-[50%] h-[50%] blur-[160px] rounded-full animate-glow-pulse ${game.id === 'lol' ? 'bg-riot-gold/15' : 'bg-riot-red/15'}`} />
            <div className={`absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] blur-[160px] rounded-full animate-glow-pulse ${game.id === 'lol' ? 'bg-riot-blue/15' : 'bg-riot-gold/15'}`} style={{ animationDelay: '2s' }} />
            <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-riot-gold/5 blur-[120px] rounded-full animate-pulse" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 md:py-20">
                <nav className="mb-20 animate-fade-in">
                    <Link
                        href={`/game/${game.slug}`}
                        className="group inline-flex items-center text-[#a09b8c] hover:text-[#f0e6d2] transition-all gap-5 uppercase tracking-[0.4em] text-[10px] font-black"
                    >
                        <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:border-riot-gold/60 group-hover:bg-riot-gold/5 transition-all group-hover:shadow-[0_0_15px_rgba(200,170,110,0.2)]">
                            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </div>
                        <span className="opacity-60 group-hover:opacity-100 group-hover:neon-text-gold">Archive {game.name}</span>
                    </Link>
                </nav>

                <div className="relative mb-24 animate-slide-up">
                    <Header count={items.length} />
                    
                    {/* Floating decoration for non-dark feeling */}
                    <div className="hidden lg:flex absolute top-10 right-0 items-center gap-3 bg-white/[0.03] border border-white/10 p-4 rounded-xl backdrop-blur-md animate-float opacity-40 hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 bg-riot-gold/10 rounded-lg flex items-center justify-center">
                            <Info size={18} className="text-riot-gold" />
                        </div>
                        <div className="text-[9px] uppercase tracking-[0.3em] font-bold">
                            Données synchronisées <br/>
                            <span className="text-riot-gold-light opacity-60">Status: Opérationnel</span>
                        </div>
                    </div>
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    <ChampionGrid champions={items} game={game.slug} />
                </div>
            </div>
        </main>
    );
}
