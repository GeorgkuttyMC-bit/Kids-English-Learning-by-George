import { useState } from 'react';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Alphabet } from './components/games/Alphabet';
import { Flashcards } from './components/games/Flashcards';
import { Matching } from './components/games/Matching';
import type { ViewType } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans font-medium text-gray-900 selection:bg-yellow-200">
      <Header currentView={currentView} setView={setCurrentView} />
      
      <main className="w-full relative min-h-[calc(100vh-80px)] overflow-hidden">
        {currentView === 'home' && <Home setView={setCurrentView} />}
        {currentView === 'alphabet' && <Alphabet setView={setCurrentView} />}
        {currentView === 'flashcards' && <Flashcards setView={setCurrentView} />}
        {currentView === 'matching' && <Matching setView={setCurrentView} />}
      </main>
    </div>
  );
}
