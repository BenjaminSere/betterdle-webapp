"use client"

import { getGetLoadingUrl } from "@/api/generated/betterdle"
import { Champion } from "@/api/generated/model/champion"
import { Eye } from 'lucide-react';
import Link from 'next/link';

interface ChampionCardProps {
    champion: Champion
    game?: string
    locale?: string
}

export const ChampionCard = ({
    champion,
    game = "lol",
    locale = "fr_FR"
}: ChampionCardProps) => {
    const champName = champion.name || "";
    const imageUrl = getGetLoadingUrl(game, locale, champName, { skinNum: 0 });

    return (
        <Link 
            href={`/game/${game}/wiki/${champName}`}
            className="group relative block aspect-[3/4.5] overflow-hidden rounded-xl glass-card border-white/5 cursor-pointer shadow-2xl transition-all duration-700 animate-fade-in hover:border-riot-gold/40 hover:-translate-y-2 hover:shadow-riot-gold/20"
        >
            {/* Background Image with Ken Burns effect on hover */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                    src={imageUrl}
                    alt={champName}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0 opacity-40 group-hover:opacity-80"
                    loading="lazy"
                />
            </div>

            {/* Aesthetic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-br from-riot-gold/5 via-transparent to-riot-blue/5 opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
            
            {/* Scanline Effect on Hover */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                <div className="w-full h-[50%] bg-gradient-to-b from-transparent via-white/40 to-transparent animate-scan-line" />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="relative z-20 transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0 text-center">
                    <span className="text-[9px] uppercase tracking-[0.5em] font-black text-riot-gold/60 opacity-0 group-hover:opacity-100 transition-all duration-700 mb-2 block">
                        Dossier Confidentiel
                    </span>
                    
                    <h3 className="text-[#f0e6d2] font-serif text-2xl font-bold uppercase tracking-[0.1em] drop-shadow-2xl">
                        {champName}
                    </h3>

                    {/* Meta info revealed on hover */}
                    <div className="flex flex-col items-center mt-4 space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                        <div className="h-0.5 w-12 bg-riot-gold rounded-full" />
                        <div className="flex items-center gap-2 text-riot-gold-light/60 text-[10px] uppercase font-bold tracking-[.3em]">
                            Consulter la fiche <Eye size={12} />
                        </div>
                    </div>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/5 group-hover:border-riot-gold/40 transition-colors duration-700" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/5 group-hover:border-riot-gold/40 transition-colors duration-700" />
            </div>

            {/* Hover Frame Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-[1px] border border-riot-gold/10 rounded-xl" />
            </div>
        </Link>
    )
}
