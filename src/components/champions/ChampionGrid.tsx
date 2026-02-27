"use client"

import { Champion } from "@/api/generated/model/champion"
import { ChampionCard } from "./ChampionCard"

interface ChampionGridProps {
    champions: Champion[]
    game?: string
    locale?: string
}

/**
 * ChampionGrid component to render a responsive grid of champion cards.
 */
export const ChampionGrid = ({
    champions,
    game = "lol",
    locale = "fr_FR"
}: ChampionGridProps) => {
    if (!champions || champions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <p className="text-gray-500 font-serif text-xl uppercase tracking-widest">
                    Aucun champion trouvé
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {champions.map((champion) => (
                <ChampionCard
                    key={champion.id}
                    champion={champion}
                    game={game}
                    locale={locale}
                />
            ))}
        </div>
    )
}
