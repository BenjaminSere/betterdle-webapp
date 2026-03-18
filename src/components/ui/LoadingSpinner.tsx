export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      <div className="relative w-20 h-20">
        {/* Exterior ring */}
        <div className="absolute inset-0 border-2 border-riot-gold/10 rounded-full" />
        {/* Animated ring */}
        <div className="absolute inset-0 border-t-2 border-riot-gold rounded-full animate-spin" />
        {/* Inner pulse */}
        <div className="absolute inset-4 bg-riot-gold/20 rounded-full animate-glow-pulse" />
      </div>
      <p className="text-riot-gold/60 text-[10px] uppercase tracking-[0.5em] font-black animate-pulse">
        Synchronisation avec le Nexus...
      </p>
    </div>
  );
};
