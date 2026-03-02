"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Call the generated next-auth provider
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (res && res.error) {
            setError("Identifiant ou mot de passe incorrect");
        } else {
            router.push("/");
            router.refresh();
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10%' }}>
            <h1>Connexion</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
                <div>
                    <label>Utilisateur / Email</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <button type="submit" style={{ padding: '0.5rem', cursor: 'pointer' }}>Se connecter</button>
            </form>
        </div>
    );
}
