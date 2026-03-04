import { Calendar, MapPin, Star } from 'lucide-react';
import Image from 'next/image';

export interface EventProps {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number | string;
  image: string;
  category: string;
  time: string;
  rating: number;
}

export default function EventCard({ event, onBook }: { event: EventProps, onBook: (event: EventProps) => void }) {
  return (
    <div className="premium-card group">
      <div className="relative h-64 w-full overflow-hidden">
        <Image 
          src={event.image} 
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-[#1a1a1a] px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-gray-100">
            {event.category}
          </span>
          <span className="bg-white/90 backdrop-blur-sm text-[#d4af37] px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 border border-gray-100">
            <Star size={10} className="fill-current" />
            {event.rating}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-display text-xl font-bold mb-4 line-clamp-2 text-gray-900 group-hover:text-[#d4af37] transition-colors">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Calendar size={16} className="text-[#d4af37]" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <MapPin size={16} className="text-[#d4af37]" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Admission</span>
            <span className="text-xl font-display font-bold text-gray-900">
              {typeof event.price === 'number' ? `$${event.price}` : event.price}
            </span>
          </div>
          <button 
            onClick={() => onBook(event)}
            className="btn-primary !px-6 !py-2.5"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
