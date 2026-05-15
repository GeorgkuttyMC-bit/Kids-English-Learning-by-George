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
    <div className="min-h-screen bg-sky-50 font-sans font-medium text-gray-900 selection:bg-yellow-200">
      <Header currentView={currentView} setView={setCurrentView} />
      
      <main className="w-full relative min-h-[calc(100vh-80px)]">
        {currentView === 'home' && <Home setView={setCurrentView} />}
        {currentView === 'alphabet' && <Alphabet />}
        {currentView === 'flashcards' && <Flashcards />}
        {currentView === 'matching' && <Matching />}
      </main>

      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-sky-50 to-white">
        <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
        <div className="absolute top-[40%] right-[10%] w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-[40%] w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}
