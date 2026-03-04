import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden bg-white border-b border-gray-100">
      <div className="absolute inset-0 islamic-pattern z-0 opacity-5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-[#d4af37] mb-8">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">The Global Ummah Network</span>
          </div>
          
          <h1 className="font-display text-6xl md:text-8xl font-bold leading-[1.1] mb-8 tracking-tight text-gray-900">
            Discover Islamic <br />
            <span className="text-[#d4af37]">Gatherings</span> Everywhere.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 max-w-xl mb-10 leading-relaxed font-medium">
            The world&apos;s premier platform for discovering and booking Islamic events. Designed for speed, built for community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary flex items-center justify-center gap-2">
              Explore Events 
              <ArrowRight size={18} />
            </button>
            <button className="btn-outline">
              List Your Event
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
