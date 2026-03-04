import { User, Globe, ChevronDown, Menu } from 'lucide-react';
import Logo from './Logo';
import { useState } from 'react';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export default function Navbar() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10" />
          <span className="font-display text-2xl font-bold tracking-tight text-[#1a1a1a]">
            Ummah<span className="text-[#d4af37]">Events</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#d4af37] transition-colors"
            >
              <Globe size={16} />
              <span>{currentLang.name}</span>
              <ChevronDown size={14} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl p-2 z-[110]">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                      currentLang.code === lang.code 
                        ? 'bg-gray-50 text-[#d4af37]' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span>{lang.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-4 w-[1px] bg-gray-100" />
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs font-semibold text-gray-500 hover:text-[#d4af37] transition-colors">Browse</a>
            <a href="#" className="text-xs font-semibold text-gray-500 hover:text-[#d4af37] transition-colors">Organizers</a>
          </div>

          <button className="flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#d4af37] transition-all">
            <User size={16} />
            <span>Sign In</span>
          </button>
        </div>

        <button className="lg:hidden p-2 text-gray-900">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}
