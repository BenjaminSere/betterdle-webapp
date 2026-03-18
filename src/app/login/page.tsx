"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { ChevronLeft, Lock, User, LogIn, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (res && res.error) {
                setError("Identifiant ou mot de passe incorrect");
                setIsLoading(false);
            } else {
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            setError("Une erreur est survenue lors de la connexion");
            setIsLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center bg-background p-6 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-riot-gold/5 blur-[120px] rounded-full animate-glow-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-riot-blue/5 blur-[120px] rounded-full animate-glow-pulse" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 w-full max-w-lg flex flex-col space-y-8 animate-fade-in">
                <nav>
                    <Link
                        href="/"
                        className="group inline-flex items-center text-[#a09b8c] hover:text-riot-gold-light transition-all gap-4 uppercase tracking-[0.3em] text-[10px] font-bold"
                    >
                        <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-riot-gold/40 transition-colors">
                            <ChevronLeft size={16} />
                        </div>
                        Retour au Hub
                    </Link>
                </nav>

                <div className="glass-card p-10 rounded-2xl border-riot-gold/10 relative overflow-hidden">
                    {/* Interior glow */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-riot-gold/30 to-transparent" />
                    
                    <header className="text-center space-y-4 mb-10">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-riot-gold/60 font-black">
                            Authentification
                        </span>
                        <h1 className="text-4xl font-serif text-gradient uppercase tracking-[0.2em]">
                            Connexion
                        </h1>
                        <p className="text-sm text-[#a09b8c] tracking-widest uppercase opacity-60">
                            Entrez vos identifiants
                        </p>
                    </header>

                    {error && (
                        <div className="flex items-center gap-3 bg-riot-red/10 border border-riot-red/30 px-4 py-3 rounded-lg text-riot-red text-xs uppercase tracking-widest font-bold mb-8 animate-shake">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-riot-gold/40 pl-1">
                                Utilisateur / Email
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-riot-gold/60 transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    placeholder="Champion64"
                                    className="w-full bg-white/[0.03] border border-white/5 rounded-lg py-4 pl-12 pr-4 outline-none focus:border-riot-gold/40 focus:bg-white/[0.06] transition-all text-[#f0e6d2] placeholder:text-white/10 tracking-widest"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-riot-gold/40 pl-1">
                                Mot de passe
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-riot-gold/60 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-white/[0.03] border border-white/5 rounded-lg py-4 pl-12 pr-4 outline-none focus:border-riot-gold/40 focus:bg-white/[0.06] transition-all text-[#f0e6d2] placeholder:text-white/10 tracking-widest"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={clsx(
                                "w-full py-5 rounded-lg uppercase tracking-[0.4em] font-black text-xs transition-all flex items-center justify-center gap-3",
                                isLoading 
                                    ? "bg-white/5 text-white/30 cursor-wait" 
                                    : "bg-riot-gold/10 border border-riot-gold/30 text-riot-gold hover:bg-riot-gold/20 hover:border-riot-gold/60 shadow-[0_0_20px_rgba(200,170,110,0.1)] hover:shadow-[0_0_30px_rgba(200,170,110,0.2)]"
                            )}
                        >
                            {isLoading ? "Identification..." : "Accéder au Nexus"}
                            {!isLoading && <LogIn size={14} />}
                        </button>
                    </form>

                    <footer className="mt-8 text-center">
                        <p className="text-[#444] text-[9px] uppercase tracking-[.3em]">
                            Accès restreint • Système de sécurité Beta
                        </p>
                    </footer>
                </div>
            </div>
        </main>
    );
}
