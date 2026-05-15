import { Home, Star, PlayCircle, Library } from 'lucide-react';
import type { ViewType } from '../../types';

interface HeaderProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

export function Header({ currentView, setView }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b-4 border-yellow-300 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setView('home')}
        >
          <div className="bg-orange-400 text-white p-2 rounded-xl rotate-3 group-hover:-rotate-3 transition-transform shadow-sm border-2 border-orange-500">
            <Star className="w-8 h-8 fill-yellow-200 text-yellow-200" />
          </div>
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-extrabold tracking-tight flex items-baseline whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-orange-500 drop-shadow-sm">English Learning for Kids</span>
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent ml-[1ch] text-xs sm:text-sm md:text-base lg:text-xl">By George</span>
          </h1>
        </div>

        {currentView !== 'home' && (
          <button
            onClick={() => setView('home')}
            className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-bold hover:bg-blue-200 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline">Home</span>
          </button>
        )}
      </div>
    </header>
  );
}
