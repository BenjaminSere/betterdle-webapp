import { AlertTriangle, RotateCcw } from 'lucide-react';

export const ErrorDisplay = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-12 text-center space-y-8 animate-fade-in">
      <div className="w-24 h-24 bg-riot-red/10 border border-riot-red/30 rounded-2xl flex items-center justify-center text-riot-red shadow-[0_0_30px_rgba(255,70,85,0.1)]">
        <AlertTriangle size={48} />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-3xl font-serif text-riot-red uppercase tracking-wider">Erreur de Flux</h2>
        <p className="text-[#a09b8c] max-w-md mx-auto leading-relaxed">{message}</p>
      </div>

      <button 
        onClick={() => window.location.reload()}
        className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-lg text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all uppercase tracking-[0.3em] font-black text-[10px]"
      >
        Réinitialiser le Nexus <RotateCcw size={14} />
      </button>
    </div>
  );
};
