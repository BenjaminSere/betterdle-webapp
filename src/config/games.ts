import { BookOpen, Gamepad2, Trophy, HelpCircle } from 'lucide-react';
import { ReactNode } from 'react';

export interface GameMode {
    id: string;
    title: string;
    description: string;
    path: string;
    icon: 'wiki' | 'play' | 'ranked' | 'unknown';
    status: 'active' | 'coming_soon';
}

export interface GameConfig {
    id: string;
    name: string;
    slug: string;
    modes: GameMode[];
    status: 'active' | 'coming_soon';
}

export const GAMES: GameConfig[] = [
    {
        id: 'lol',
        name: 'League of Legends',
        slug: 'lol',
        status: 'active',
        modes: [
            {
                id: 'wiki',
                title: 'Wiki',
                description: 'Explorez tous les champions et leurs statistiques détaillées.',
                path: '/wiki',
                icon: 'wiki',
                status: 'active',
            },
            {
                id: 'classic',
                title: 'Classic',
                description: 'Devinez le champion mystère avec des indices.',
                path: '/classic',
                icon: 'play',
                status: 'coming_soon',
            },
            {
                id: 'splash',
                title: 'Splash',
                description: 'Identifiez le champion à partir d\'un morceau d\'artwork.',
                path: '/splash',
                icon: 'play',
                status: 'coming_soon',
            }
        ]
    },
    {
        id: 'valorant',
        name: 'Valorant',
        slug: 'valorant',
        status: 'coming_soon',
        modes: []
    },
    {
        id: 'tft',
        name: 'Teamfight Tactics',
        slug: 'tft',
        status: 'coming_soon',
        modes: []
    }
];

export const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'wiki': return BookOpen;
        case 'play': return Gamepad2;
        case 'ranked': return Trophy;
        default: return HelpCircle;
    }
};
