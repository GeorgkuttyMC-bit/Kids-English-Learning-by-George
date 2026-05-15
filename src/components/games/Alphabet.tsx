import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { alphabet } from '../../data';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';

export function Alphabet() {
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
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600">The Alphabet</h2>
        <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-bold text-lg">
          {currentIndex + 1} / 26
        </div>
      </div>

      <div className="w-full relative flex items-center justify-center min-h-[400px]">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-0 z-10 p-4 bg-white border-4 border-gray-200 rounded-full shadow-lg disabled:opacity-50 hover:bg-gray-50 active:scale-95 transition-all text-gray-500 hover:border-blue-300"
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
            className="bg-white border-8 border-pink-300 rounded-[3rem] p-12 shadow-2xl flex flex-col items-center max-w-sm w-full mx-16 text-center cursor-pointer"
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
              <Volume2 className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>
        </AnimatePresence>

        <button 
          onClick={handleNext}
          className="absolute right-0 z-10 p-4 bg-white border-4 border-gray-200 rounded-full shadow-lg hover:bg-gray-50 active:scale-95 transition-all text-gray-500 hover:border-blue-300 pointer-events-auto"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      <p className="mt-12 text-xl text-gray-500 font-medium text-center">
        Tip: Tap the card to hear the sound! 🔊
      </p>
    </div>
  );
}
