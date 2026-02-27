"use client"

interface ErrorDisplayProps {
    message?: string
}

export const ErrorDisplay = ({ message = "Erreur lors du chargement" }: ErrorDisplayProps) => (
    <div className="flex justify-center items-center h-screen bg-[#0a0a0c]">
        <p className="text-red-500 text-2xl font-serif">
            {message}
        </p>
    </div>
)
