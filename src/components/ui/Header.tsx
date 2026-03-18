import { Database, ShieldCheck } from 'lucide-react';

export const Header = ({ count }: { count: number }) => {
  return (
    <header className="mb-24 animate-slide-up">
      <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between md:items-end gap-16 md:gap-24">
        {/* Content Section */}
        <div className="space-y-8 max-w-2xl text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3 text-riot-gold/80 font-black tracking-[0.5em] text-[10px] uppercase pl-1 animate-fade-in bg-riot-gold/5 border border-riot-gold/20 px-4 py-1.5 rounded-full shadow-inner">
              <Database size={14} className="animate-pulse" />
              Archive Numérique
              <div className="h-1.5 w-1.5 bg-riot-gold rounded-full shadow-[0_0_8px_rgba(200,170,110,1)]" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-serif text-gradient uppercase tracking-[0.18em] select-none leading-tight drop-shadow-[0_0_30px_rgba(200,170,110,0.2)]">
              Bibliothèque
            </h1>
            <div className="h-[2px] w-48 sm:w-64 bg-gradient-to-r from-transparent via-riot-gold to-transparent md:mx-0 mx-auto mt-6" />
          </div>

          <p className="text-foreground/70 text-sm/relaxed sm:text-md/relaxed max-w-lg tracking-wider font-medium opacity-80 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Base de données exhaustive des entités du Nexus. Explorez les statistiques, les types et les attributs uniques de chaque champion.
          </p>
        </div>

        {/* Info Counter Card */}
        <div className="glass-card px-12 py-10 rounded-2xl border-riot-gold/20 relative group overflow-hidden animate-fade-in w-full md:w-auto min-w-[240px]" style={{ animationDelay: '0.4s' }}>
          {/* Subtle interior glow & animations */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-riot-gold/60 to-transparent opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-riot-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10 flex flex-col items-center space-y-4">
            <div className="bg-riot-gold/10 p-4 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-700 shadow-lg group-hover:shadow-riot-gold/20 border border-riot-gold/20">
                <ShieldCheck size={32} className="text-riot-gold" />
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-riot-gold text-5xl md:text-6xl font-serif tracking-tighter group-hover:scale-110 transition-transform duration-700 drop-shadow-[0_0_15px_rgba(200,170,110,0.4)]">
                {count}
              </span>
              <span className="text-[10px] uppercase tracking-[.5em] text-[#a09b8c] font-black opacity-80 mt-2">
                Unités Détectées
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
