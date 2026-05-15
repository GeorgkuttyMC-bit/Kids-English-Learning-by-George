import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { words } from '../../data';
import { Button } from '../ui/Button';

export function Flashcards() {
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
      <div className="w-full flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-600">Flashcards</h2>
        <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full font-bold text-lg">
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
            className={`absolute inset-0 w-full h-full rounded-[3rem] p-8 shadow-2xl flex flex-col items-center justify-center cursor-pointer border-8 ${
              isFlipped ? 'bg-green-50 border-green-300' : 'bg-white border-blue-200'
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
                <div className="text-6xl font-extrabold text-green-600 uppercase tracking-wider">
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
      
      <p className="mt-8 text-xl text-gray-500 font-medium text-center">
        What is this? Click the card to reveal the answer!
      </p>
    </div>
  );
}
