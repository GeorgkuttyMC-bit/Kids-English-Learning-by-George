import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { alphabet } from '../../data';
import { ChevronLeft, ChevronRight, Volume2, Home } from 'lucide-react';
import type { ViewType } from '../../types';

interface AlphabetProps {
  setView: (view: ViewType) => void;
}

export function Alphabet({ setView }: AlphabetProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = alphabet[currentIndex];

  const handleNext = () => {
    if (currentIndex < alphabet.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      triggerConfetti();
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b']
    });
  };

  const playSound = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8; // Slower for kids
    speechSynthesis.speak(utterance);
    triggerConfetti();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col items-center relative">
      <div className="w-full flex justify-between items-center mb-8 gap-4 flex-wrap">
        <button
          onClick={() => setView('home')}
          className="flex items-center gap-2 bg-white text-slate-600 px-4 py-2 rounded-full font-bold hover:bg-slate-50 transition-colors shadow-sm ring-1 ring-slate-200 active:scale-95"
        >
          <Home className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 tracking-tight flex-1 text-center">The Alphabet</h2>
        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-bold text-lg ring-1 ring-blue-100">
          {currentIndex + 1} / 26
        </div>
      </div>

      <div className="w-full relative flex items-center justify-center min-h-[400px]">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-0 z-10 p-4 bg-white border border-gray-100 rounded-full shadow-lg disabled:opacity-50 hover:bg-gray-50 active:scale-95 transition-all text-gray-500 hover:text-blue-500"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white ring-4 ring-pink-100 ring-offset-4 ring-offset-[#F8FAFC] rounded-[3rem] p-12 shadow-xl shadow-gray-200/50 flex flex-col items-center max-w-sm w-full mx-16 text-center cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => playSound(`${current.letter} is for ${current.word}`)}
          >
            <div className="text-[120px] leading-none mb-6 font-extrabold text-pink-500 drop-shadow-sm">
              {current.letter}
            </div>
            <div className="text-[100px] leading-none mb-6">
              {current.emoji}
            </div>
            <div className="text-4xl font-extrabold text-gray-800 capitalize flex items-center gap-3">
              {current.word}
              <Volume2 className="w-8 h-8 text-blue-500 opacity-60" />
            </div>
          </motion.div>
        </AnimatePresence>

        <button 
          onClick={handleNext}
          className="absolute right-0 z-10 p-4 bg-white border border-gray-100 rounded-full shadow-lg hover:bg-gray-50 active:scale-95 transition-all text-gray-500 hover:text-blue-500"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      <p className="mt-12 text-xl text-gray-400 font-medium text-center">
        Tip: Tap the card to hear the sound! 🔊
      </p>
    </div>
  );
}
