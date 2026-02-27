"use client"

import { useFindAll } from "@/api/generated/betterdle";
import { ChampionGrid } from "@/components/champions";
import { LoadingSpinner, ErrorDisplay, Header } from "@/components/ui";
import { Champion } from "@/api/generated/model/champion";
import { PageChampion } from "@/api/generated/model/pageChampion";
import { GAMES } from "@/config/games";
import { useParams, notFound } from "next/navigation";

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function GenericWikiPage() {
    const params = useParams<{ gameSlug: string }>();
    const game = GAMES.find(g => g.slug === params.gameSlug);

    if (!game) {
        return notFound();
    }

    const { data, isLoading, error } = useFindAll(game.id, "fr_FR", { size: 200 });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorDisplay message={`Erreur lors du chargement des données de ${game.name}`} />;

    const items = ((data?.data as unknown as PageChampion)?.content ?? []) as Champion[];

    return (
        <main className="min-h-screen bg-[#0a0a0c] pb-20 p-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href={`/game/${game.slug}`}
                    className="inline-flex items-center text-[#c8aa6e] hover:text-[#f0e6d2] transition-colors gap-2 mb-8 uppercase tracking-widest text-sm"
                >
                    <ChevronLeft size={20} />
                    Retour vers {game.name}
                </Link>

                <Header count={items.length} />

                <ChampionGrid champions={items} game={game.slug} />
            </div>
        </main>
    );
}
