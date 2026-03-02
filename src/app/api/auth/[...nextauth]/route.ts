import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Nom d'utilisateur", type: "text" },
                password: { label: "Mot de passe", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                try {
                    // Call the Spring Boot API
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/v1/auth/login`, {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" }
                    });

                    const user = await res.json();

                    if (res.ok && user && user.token) {
                        return {
                            id: user.id.toString(),
                            name: user.username,
                            email: user.email,
                            token: user.token,
                            roles: user.roles
                        } as any;
                    }
                    return null;
                } catch (e) {
                    console.error("Auth error:", e);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = (user as any).token;
                token.roles = (user as any).roles;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                (session as any).accessToken = token.accessToken;
                (session.user as any).roles = token.roles;
                (session.user as any).id = token.id;
            }
            return session;
        },
    },
    session: { strategy: "jwt" },
    pages: {
        signIn: '/login', // We'll create a custom login page
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
