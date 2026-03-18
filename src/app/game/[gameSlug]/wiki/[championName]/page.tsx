"use client"

import { useFindByName, getGetLoadingUrl } from "@/api/generated/betterdle";
import { Champion } from "@/api/generated/model/champion";
import { LoadingSpinner, ErrorDisplay } from "@/components/ui";
import { useParams, useRouter } from "next/navigation";
import Link from 'next/link';
import { ChevronLeft, Info, MapPin, Swords, Shield, Zap, Image as ImageIcon } from 'lucide-react';
import { clsx } from "clsx";

export default function ChampionDetailPage() {
    const params = useParams<{ gameSlug: string; championName: string }>();
    const router = useRouter();
    const game = params.gameSlug;
    const champNameRaw = params.championName;
    const decodedName = decodeURIComponent(champNameRaw);

    const { data, isLoading, error } = useFindByName(game, "fr_FR", decodedName);

    if (isLoading) return (
        <main className="min-h-screen bg-background flex items-center justify-center">
            <LoadingSpinner />
        </main>
    );

    if (error || !data?.data) return (
        <main className="min-h-screen bg-background flex items-center justify-center p-8">
            <ErrorDisplay message={`Impossible de trouver les données pour ${decodedName}`} />
        </main>
    );

    const champion = data.data as unknown as Champion;
    const loadingImageUrl = getGetLoadingUrl(game, "fr_FR", decodedName, { skinNum: 0 });

    return (
        <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-screen">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10" />
                <img 
                    src={loadingImageUrl} 
                    alt={champion.name} 
                    className="w-full h-full object-cover opacity-20 blur-sm scale-110"
                />
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 py-12">
                <nav className="mb-12 animate-fade-in">
                    <button
                        onClick={() => router.back()}
                        className="group inline-flex items-center text-[#a09b8c] hover:text-riot-gold-light transition-all gap-4 uppercase tracking-[0.3em] text-[10px] font-bold"
                    >
                        <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-riot-gold/40 transition-colors bg-white/5">
                            <ChevronLeft size={16} />
                        </div>
                        Retour aux Archives
                    </button>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* Left Column: Portrait & Card */}
                    <div className="lg:col-span-4 space-y-8 animate-slide-up">
                        <div className="relative aspect-[3/4.5] rounded-2xl overflow-hidden border border-riot-gold/20 shadow-[0_0_50px_rgba(200,170,110,0.15)] group">
                            <img 
                                src={loadingImageUrl} 
                                alt={champion.name} 
                                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 w-full p-8 text-center">
                                <h1 className="text-4xl md:text-5xl font-serif text-gradient uppercase tracking-widest drop-shadow-2xl">
                                    {champion.name}
                                </h1>
                                <div className="h-0.5 w-16 bg-riot-gold mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(200,170,110,0.8)]" />
                            </div>
                        </div>

                        {/* Quick Info Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <StatBox 
                                icon={<Swords size={16} />} 
                                label="Catégorie" 
                                value={champion.championClass ?? "Inconnue"} 
                                color="riot-gold"
                            />
                            <StatBox 
                                icon={<Zap size={16} />} 
                                label="Portée" 
                                value={champion.attackRangeType ?? "Inconnue"} 
                                color="riot-blue"
                            />
                        </div>
                    </div>

                    {/* Right Column: Narrative & Stats */}
                    <div className="lg:col-span-8 space-y-12 py-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        {/* Description Section */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-4 text-riot-gold/60 font-black tracking-[0.4em] text-[10px] uppercase">
                                <Info size={14} />
                                Profil Bio-Métallique
                            </div>
                            <h2 className="text-3xl font-serif text-riot-gold-light uppercase tracking-wider">Biographie</h2>
                            <p className="text-[#a09b8c] text-lg/relaxed font-medium tracking-wide max-w-3xl border-l border-riot-gold/20 pl-6 bg-white/[0.01] py-4 rounded-r-xl">
                                {champion.description || "Aucune description archivée pour ce sujet."}
                            </p>
                        </section>

                        {/* Tags Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Origins / Regions */}
                            <section className="space-y-6">
                                <h3 className="text-xs uppercase tracking-[0.4em] font-black text-riot-gold/40 flex items-center gap-3">
                                    <MapPin size={12} /> Localisation
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {champion.regions?.map((region, i) => (
                                        <span key={i} className="px-4 py-2 bg-riot-gold/5 border border-riot-gold/20 rounded-lg text-riot-gold-light text-xs font-bold uppercase tracking-widest hover:bg-riot-gold/10 transition-colors">
                                            {region}
                                        </span>
                                    )) || <span className="text-white/20 italic text-xs uppercase tracking-widest">Inconnue</span>}
                                </div>
                            </section>

                            {/* Species */}
                            <section className="space-y-6">
                                <h3 className="text-xs uppercase tracking-[0.4em] font-black text-riot-gold/40 flex items-center gap-3">
                                    <Shield size={12} /> Espèce
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {champion.species?.map((specie, i) => (
                                        <span key={i} className="px-4 py-2 bg-riot-blue/5 border border-riot-blue/20 rounded-lg text-riot-blue text-xs font-bold uppercase tracking-widest">
                                            {specie}
                                        </span>
                                    )) || <span className="text-white/20 italic text-xs uppercase tracking-widest">Inconnue</span>}
                                </div>
                            </section>
                        </div>

                        {/* Spells Preview Section (if data exists) */}
                        {champion.spells && champion.spells.length > 0 && (
                            <section className="space-y-8 pt-6 border-t border-white/5">
                                <h2 className="text-2xl font-serif text-riot-gold-light uppercase tracking-widest flex items-center gap-4">
                                    Compétences d'Archives
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6">
                                    {champion.spells.map((spell, i) => (
                                        <div key={i} className="group flex flex-col items-center gap-4 p-4 glass-card rounded-xl hover:border-riot-gold/40 transition-all duration-500">
                                            <div className="w-16 h-16 rounded-lg border border-white/10 overflow-hidden relative group-hover:scale-110 transition-transform">
                                                <img src={spell.imageUrl} alt={spell.name} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-riot-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#a09b8c] text-center line-clamp-1">
                                                {spell.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

function StatBox({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
    return (
        <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center gap-3 hover:border-riot-gold/30 group">
            <div className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform",
                color === 'riot-gold' ? "bg-riot-gold/10 text-riot-gold" : "bg-riot-blue/10 text-riot-blue"
            )}>
                {icon}
            </div>
            <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.2em] font-black opacity-40">{label}</span>
                <p className={clsx(
                    "text-xs font-bold uppercase tracking-widest",
                    color === 'riot-gold' ? "text-riot-gold-light" : "text-riot-blue"
                )}>{value}</p>
            </div>
        </div>
    );
}
