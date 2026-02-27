'use client';
import { useFindAll } from '@/api/generated/betterdle';
import { PageChampion, Champion } from '@/api/generated/model';

export default function HomePage() {
    const { data, isLoading, isError } = useFindAll(
        'lol',
        'fr_FR',
        {
            pageable: { page: 0, size: 20 }
        }
    );

    if (isLoading) return <p className="p-10">Chargement...</p>;
    if (isError) return <p className="p-10 text-red-500">Erreur de connexion à l'API</p>;

    const pageData = data?.data as PageChampion;
    const champions = pageData?.content;

    // On définit l'URL de base du backend
    const API_BASE_URL = 'http://localhost:8080';

    return (
        <main className="p-10">
            <h1 className="text-2xl font-bold mb-6">Champions</h1>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">a
                {champions?.map((champion: Champion) => (
                    <div key={champion.id} className="border p-4 rounded-lg shadow-sm">
                        <img
                            /* ICI : On ajoute le préfixe du backend devant l'URL relative */
                            src={`${API_BASE_URL}${champion.iconURL}`}
                            alt={champion.name}
                            className="w-full aspect-square object-cover rounded mb-2"
                        />
                        <p className="font-bold text-center">{champion.name}</p>
                        <p className="text-xs text-gray-500 text-center">{champion.championClass}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}