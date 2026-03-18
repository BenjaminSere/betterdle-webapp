"use client"

import { Champion } from "@/api/generated/model/champion"
import { ChampionCard } from "./ChampionCard"
import { Search } from 'lucide-react';
import { useState } from 'react';

interface ChampionGridProps {
    champions: Champion[]
    game?: string
    locale?: string
}

export const ChampionGrid = ({
    champions,
    game = "lol",
    locale = "fr_FR"
}: ChampionGridProps) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredChampions = champions.filter(c => 
        (c.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {/* Search Bar - Premium Style */}
            <div className="max-w-md mx-auto md:mx-0">
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-riot-gold transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Rechercher une unité..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-lg py-4 pl-12 pr-4 outline-none focus:border-riot-gold/40 focus:bg-white/[0.06] transition-all text-[#f0e6d2] placeholder:text-white/10 tracking-[.15em] text-sm uppercase font-bold"
                    />
                    {/* Shadow & Glow */}
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-riot-gold/0 to-transparent group-focus-within:via-riot-gold/40 transition-all duration-700" />
                </div>
            </div>

            {filteredChampions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 glass-card rounded-2xl border-dashed border-white/5">
                    <div className="text-riot-gold/20 mb-4">
                        <Search size={48} strokeWidth={1} />
                    </div>
                    <p className="text-[#a09b8c] font-serif text-xl uppercase tracking-[.2em] opacity-40">
                        Aucune correspondance trouvée
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                    {filteredChampions.map((champion, index) => (
                        <div key={champion.id} className="animate-slide-up" style={{ animationDelay: `${0.1 * (index % 10)}s` }}>
                            <ChampionCard
                                champion={champion}
                                game={game}
                                locale={locale}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
