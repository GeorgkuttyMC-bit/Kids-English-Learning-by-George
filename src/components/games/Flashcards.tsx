import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { words } from '../../data';
import { Button } from '../ui/Button';
import { Home as HomeIcon } from 'lucide-react';
import type { ViewType } from '../../types';

interface FlashcardsProps {
  setView: (view: ViewType) => void;
}

export function Flashcards({ setView }: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Shuffle flashcards on mount
  const shuffledWords = useMemo(() => {
    return [...words].sort(() => Math.random() - 0.5);
  }, []);

  const current = shuffledWords[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % shuffledWords.length);
    }, 150);
  };

  const handleFlip = () => {
    if (!isFlipped) {
      playSound(current.word);
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
    setIsFlipped(!isFlipped);
  };

  const playSound = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8 gap-4 flex-wrap">
        <button
          onClick={() => setView('home')}
          className="flex items-center gap-2 bg-white text-slate-600 px-4 py-2 rounded-full font-bold hover:bg-slate-50 transition-colors shadow-sm ring-1 ring-slate-200 active:scale-95"
        >
          <HomeIcon className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-600 tracking-tight flex-1 text-center">Flashcards</h2>
        <div className="bg-green-50 text-green-600 px-4 py-2 rounded-full font-bold text-lg ring-1 ring-green-100">
          {currentIndex + 1} / {shuffledWords.length}
        </div>
      </div>

      <div className="relative w-full max-w-md h-[450px] perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + (isFlipped ? '-flipped' : '')}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleFlip}
            className={`absolute inset-0 w-full h-full rounded-[3rem] p-8 shadow-xl shadow-gray-200/50 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-[1.02] ring-4 ring-offset-4 ring-offset-[#F8FAFC] ${
              isFlipped ? 'bg-green-50 ring-green-100' : 'bg-white ring-blue-100'
            }`}
          >
            {!isFlipped ? (
              <div className="text-[150px] leading-none mb-6">
                {current.emoji}
              </div>
            ) : (
              <>
                <div className="text-[80px] leading-none mb-8 opacity-50">
                  {current.emoji}
                </div>
                <div className="text-6xl font-extrabold text-green-600 uppercase tracking-wider text-center">
                  {current.word}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex gap-4">
        {isFlipped ? (
          <Button variant="primary" size="lg" onClick={handleNext}>
            Next Card ➡️
          </Button>
        ) : (
          <Button variant="success" size="lg" onClick={handleFlip}>
            Show Answer 🔍
          </Button>
        )}
      </div>
      
      <p className="mt-8 text-xl text-gray-400 font-medium text-center">
        What is this? Click the card to reveal the answer!
      </p>
    </div>
  );
}
