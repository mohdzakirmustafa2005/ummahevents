'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import EventCard, { EventProps } from '@/components/EventCard';
import BookingModal from '@/components/BookingModal';
import AIAssistant from '@/components/AIAssistant';
import Logo from '@/components/Logo';
import { useState, useMemo } from 'react';
import { Search, Ticket, X } from 'lucide-react';

const MOCK_EVENTS: EventProps[] = [
  {
    id: '1',
    title: 'Hyderabad Islamic Heritage Walk',
    date: 'Oct 15, 2026',
    time: '07:00 AM - 10:00 AM',
    location: 'Charminar, Hyderabad, Telangana',
    price: 15,
    image: 'https://picsum.photos/seed/hyderabad/1200/800',
    category: 'Community',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Grand Andhra Iftar Meetup',
    date: 'Mar 22, 2026',
    time: '06:00 PM - 08:30 PM',
    location: 'Indira Gandhi Municipal Stadium, Vijayawada, AP',
    price: 'Free',
    image: 'https://picsum.photos/seed/vijayawada/1200/800',
    category: 'Community',
    rating: 4.9
  },
  {
    id: '3',
    title: 'Islamic Finance & Tech Summit',
    date: 'Nov 05, 2026',
    time: '10:00 AM - 05:00 PM',
    location: 'HICC Novotel, Hyderabad, Telangana',
    price: 120,
    image: 'https://picsum.photos/seed/tech/1200/800',
    category: 'Conference',
    rating: 4.7
  },
  {
    id: '4',
    title: 'Vizag Beachside Youth Retreat',
    date: 'Aug 12, 2026',
    time: '2 Days Event',
    location: 'RK Beach, Visakhapatnam, Andhra Pradesh',
    price: 80,
    image: 'https://picsum.photos/seed/vizag/1200/800',
    category: 'Retreat',
    rating: 4.6
  },
  {
    id: '5',
    title: 'Seerah Seminar: Life of the Prophet',
    date: 'Dec 20, 2026',
    time: '02:00 PM - 06:00 PM',
    location: 'Public Gardens, Nampally, Hyderabad',
    price: 'Free',
    image: 'https://picsum.photos/seed/seminar/1200/800',
    category: 'Education',
    rating: 5.0
  },
  {
    id: '6',
    title: 'Halal Food Festival Guntur',
    date: 'Sep 30, 2026',
    time: '11:00 AM - 11:00 PM',
    location: 'Guntur City Convention Centre, AP',
    price: 10,
    image: 'https://picsum.photos/seed/guntur/1200/800',
    category: 'Festival',
    rating: 4.5
  }
];

const CATEGORIES = ['All', 'Conference', 'Community', 'Workshop', 'Retreat', 'Education', 'Festival'];

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookedEvents, setBookedEvents] = useState<EventProps[]>([]);
  const [showMyTickets, setShowMyTickets] = useState(false);

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(event => {
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           event.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleBookClick = (event: EventProps) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleBookingSuccess = (event: EventProps) => {
    setBookedEvents(prev => [...prev, event]);
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a]">
      <Navbar />
      <Hero />
      
      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* Search & Filter Header */}
        <div className="flex flex-col gap-12 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">
                Explore <span className="text-[#d4af37]">Events</span>
              </h2>
              <p className="text-gray-500 text-lg font-medium leading-relaxed">Discover curated gatherings across the globe, handpicked for the community.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowMyTickets(true)}
                className="relative p-4 bg-white border border-gray-100 rounded-xl hover:border-[#d4af37] transition-all group shadow-sm"
              >
                <Ticket size={24} className="group-hover:text-[#d4af37] transition-colors" />
                {bookedEvents.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#d4af37] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                    {bookedEvents.length}
                  </span>
                )}
              </button>
              <div className="relative flex-grow lg:flex-grow-0">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type="text" 
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full lg:w-80 pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-xl focus:outline-none focus:border-[#d4af37] transition-all text-sm shadow-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all ${
                  selectedCategory === cat 
                    ? 'bg-[#1a1a1a] text-white shadow-md' 
                    : 'bg-white text-gray-400 border border-gray-100 hover:border-[#d4af37] hover:text-[#d4af37]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onBook={handleBookClick}
            />
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={24} className="text-gray-200" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">No events found</h3>
            <p className="text-gray-500 font-medium">Try adjusting your filters to find what you&apos;re looking for.</p>
          </div>
        )}
        {/* Best Event Places */}
        <div className="mt-32">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 tracking-tight text-gray-900">
            Best Event <span className="text-[#d4af37]">Venues</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'HICC Novotel', location: 'Hyderabad', image: 'https://picsum.photos/seed/hicc/400/300' },
              { name: 'Indira Gandhi Stadium', location: 'Vijayawada', image: 'https://picsum.photos/seed/stadium/400/300' },
              { name: 'Public Gardens', location: 'Hyderabad', image: 'https://picsum.photos/seed/garden/400/300' },
              { name: 'RK Beach Arena', location: 'Vizag', image: 'https://picsum.photos/seed/beach/400/300' },
            ].map((place, i) => (
              <div key={i} className="group relative h-64 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <Image src={place.image} alt={place.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h4 className="text-white font-bold text-lg">{place.name}</h4>
                  <p className="text-white/60 text-xs uppercase tracking-widest font-bold">{place.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-32">
          <div className="bg-white rounded-3xl p-10 md:p-16 border border-gray-100 shadow-sm">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight text-gray-900">
                Community <span className="text-[#d4af37]">Feedback</span>
              </h2>
              <p className="text-gray-500 mb-12 font-medium">Hear from our members who have experienced the magic of UmmahEvents.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {[
                  { name: 'Ahmed Khan', role: 'Attendee', text: 'The Hyderabad Heritage Walk was spiritually uplifting and perfectly organized. Highly recommend!' },
                  { name: 'Sara Ali', role: 'Organizer', text: 'UmmahEvents made ticketing for our Vizag retreat so simple. The interface is best-in-class.' }
                ].map((testimonial, i) => (
                  <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <p className="text-gray-600 italic mb-6 font-medium">&quot;{testimonial.text}&quot;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{testimonial.name}</h4>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal 
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleBookingSuccess}
      />

      <AIAssistant />

      {/* My Tickets Sidebar/Overlay */}
      {showMyTickets && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          <div
            onClick={() => setShowMyTickets(false)}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-display text-2xl font-bold">My Tickets</h3>
              <button onClick={() => setShowMyTickets(false)} className="p-2 hover:bg-gray-50 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto no-scrollbar space-y-4">
              {bookedEvents.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                  <Ticket size={48} className="mb-4" />
                  <p className="font-medium">No tickets yet.</p>
                </div>
              ) : (
                bookedEvents.map((event, idx) => (
                    <div 
                      key={`${event.id}-${idx}`} 
                      className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
                    >
                      <div className="flex gap-4 mb-4">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                          <Image 
                            src={event.image} 
                            alt={event.title} 
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm line-clamp-1">{event.title}</h4>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{event.date}</p>
                        </div>
                      </div>
                    <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-100">
                      <span className="text-[10px] font-bold text-[#d4af37] tracking-widest uppercase">Confirmed</span>
                      <button className="text-[10px] font-bold underline hover:text-[#d4af37] transition-colors">Download</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <button 
                onClick={() => setShowMyTickets(false)}
                className="btn-primary w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[#1a1a1a] text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Logo className="w-10 h-10" />
                <span className="font-display text-2xl font-bold tracking-tight">UmmahEvents</span>
              </div>
              <p className="text-gray-400 text-sm font-medium max-w-sm mb-8 leading-relaxed">
                The global platform for discovering and booking Islamic gatherings. Connecting the community through excellence.
              </p>
              <div className="flex gap-6">
                {['Instagram', 'Twitter', 'LinkedIn'].map(social => (
                  <a key={social} href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#d4af37] transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-6">Platform</h4>
              <ul className="space-y-3 text-gray-400 text-sm font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Browse Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Organizers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-6">Newsletter</h4>
              <p className="text-xs text-gray-400 mb-4 font-medium">Join 10,000+ members for weekly updates.</p>
              <div className="flex flex-col gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs w-full focus:outline-none focus:border-[#d4af37] transition-all"
                />
                <button className="bg-[#d4af37] text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#1a1a1a] transition-all">Subscribe</button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-600">
            <p>&copy; {new Date().getFullYear()} UmmahEvents. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
