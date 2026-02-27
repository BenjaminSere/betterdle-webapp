"use client"

import { getGetLoadingUrl } from "@/api/generated/betterdle"
import { Champion } from "@/api/generated/model/champion"

interface ChampionCardProps {
    champion: Champion
    game?: string
    locale?: string
}

/**
 * ChampionCard component to display a champion's loading image and name.
 * Uses optimized direct URL for image loading.
 */
export const ChampionCard = ({
    champion,
    game = "lol",
    locale = "fr_FR"
}: ChampionCardProps) => {
    const imageUrl = getGetLoadingUrl(game, locale, champion.name ?? "", { skinNum: 0 });

    return (
        <div className="group relative rounded-xl h-[330px] overflow-hidden bg-[#1e2328] border border-[#3c3c41] transition-all duration-300 hover:scale-105 hover:border-[#c8aa6e] hover:shadow-[0_0_20px_rgba(200,170,110,0.3)] cursor-pointer shadow-lg">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={imageUrl}
                    alt={champion.name ?? 'Champion'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                />
            </div>

            {/* Aesthetic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                <h3 className="text-[#f0e6d2] font-serif text-xl font-bold uppercase tracking-wider text-center drop-shadow-md">
                    {champion.name}
                </h3>
                <div className="h-0 flex justify-center opacity-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300 pt-2">
                    <span className="w-8 h-1 bg-[#c8aa6e] rounded-full"></span>
                </div>
            </div>
        </div>
    )
}
