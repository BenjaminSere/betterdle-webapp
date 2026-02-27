"use client"

interface HeaderProps {
    count: number
}

export const Header = ({ count }: HeaderProps) => (
    <header className="text-center py-16">
        <h1 className="text-5xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#c8aa6e] to-[#f0e6d2] uppercase tracking-widest mb-4">
            Champions
        </h1>
        <p className="text-gray-400 text-lg font-light tracking-wide">
            {count} champion{count > 1 ? "s" : ""}
        </p>
    </header>
)
