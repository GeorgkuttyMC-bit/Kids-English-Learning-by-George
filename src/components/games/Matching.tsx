import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { words } from '../../data';
import { Button } from '../ui/Button';
import { Home as HomeIcon } from 'lucide-react';
import type { ViewType } from '../../types';

// Utility to shuffle arrays
const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

interface MatchingProps {
  setView: (view: ViewType) => void;
}

export function Matching({ setView }: MatchingProps) {
  const [level, setLevel] = useState(1);
  const [images, setImages] = useState<any[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [wrongMatch, setWrongMatch] = useState<string | null>(null);

  useEffect(() => {
    startNewLevel();
  }, [level]);

  const startNewLevel = () => {
    // Pick 4 random words for the level
    const levelWords = shuffle(words).slice(0, 4);
    
    setImages(shuffle([...levelWords]));
    setOptions(shuffle([...levelWords]));
    setMatchedPairs([]);
    setSelectedWord(null);
  };

  const handleWordClick = (word: string) => {
    if (matchedPairs.includes(word)) return;
    setSelectedWord(word);
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Normal speed
    window.speechSynthesis.speak(utterance);
  };

  const handleImageClick = (word: string) => {
    if (!selectedWord || matchedPairs.includes(word)) return;

    if (selectedWord === word) {
      // Match found!
      const newMatched = [...matchedPairs, word];
      setMatchedPairs(newMatched);
      setSelectedWord(null);
      
      confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#10b981', '#34d399']
      });

      if (newMatched.length === images.length) {
        // Level complete
        setTimeout(() => {
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 }
          });
        }, 500);
      }
    } else {
      // Wrong match
      setWrongMatch(word);
      setTimeout(() => setWrongMatch(null), 500);
    }
  };

  const isLevelComplete = matchedPairs.length === images.length && images.length > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 relative">
      <div className="w-full flex justify-between items-center mb-8 gap-4 flex-wrap">
        <button
          onClick={() => setView('home')}
          className="flex items-center gap-2 bg-white text-slate-600 px-4 py-2 rounded-full font-bold hover:bg-slate-50 transition-colors shadow-sm ring-1 ring-slate-200 active:scale-95"
        >
          <HomeIcon className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-600 tracking-tight flex-1 text-center">Match Game</h2>
        <div className="bg-purple-50 text-purple-600 px-4 py-2 rounded-full font-bold text-lg ring-1 ring-purple-100">
          Level {level}
        </div>
      </div>

      {isLevelComplete ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 p-12 ring-4 ring-offset-4 ring-offset-[#F8FAFC] ring-purple-100">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-8xl mb-8 drop-shadow-sm"
          >
            🏆
          </motion.div>
          <h3 className="text-4xl font-extrabold text-blue-600 mb-8 tracking-tight">Great Job!</h3>
          <Button variant="primary" size="xl" onClick={() => setLevel(l => l + 1)}>
            Next Level 🌟
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-12 min-h-[400px]">
          {/* Words Column */}
          <div className="flex flex-col gap-4 justify-center">
            <h3 className="text-xl font-bold text-gray-500 text-center mb-2">1. Tap a word</h3>
            {options.map((item) => {
              const isMatched = matchedPairs.includes(item.word);
              const isSelected = selectedWord === item.word;
              
              return (
                <button
                  key={`word-${item.word}`}
                  disabled={isMatched}
                  onClick={() => handleWordClick(item.word)}
                  className={`
                    px-6 py-5 rounded-2xl text-2xl font-extrabold transition-all border shadow-sm
                    ${isMatched ? 'opacity-30 bg-gray-50 border-gray-100 cursor-not-allowed scale-95' 
                      : isSelected ? 'bg-purple-500 border-purple-600 text-white scale-105 shadow-md ring-4 ring-purple-200' 
                      : 'bg-white border-gray-100 text-gray-700 hover:border-purple-300 hover:shadow-md'}
                  `}
                >
                  {item.word}
                </button>
              );
            })}
          </div>

          {/* Images Column */}
          <div className="flex flex-col gap-4 justify-center">
            <h3 className="text-xl font-bold text-gray-500 text-center mb-2">2. Match the picture</h3>
            <div className="grid grid-cols-2 gap-4">
              {images.map((item) => {
                const isMatched = matchedPairs.includes(item.word);
                const isWrong = wrongMatch === item.word;
                
                return (
                  <motion.button
                    key={`img-${item.word}`}
                    disabled={isMatched || !selectedWord}
                    onClick={() => handleImageClick(item.word)}
                    animate={isWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className={`
                      aspect-square flex items-center justify-center text-7xl bg-white border rounded-3xl transition-all shadow-sm
                      ${isMatched ? 'opacity-30 border-gray-100 cursor-not-allowed scale-95 bg-green-50' 
                        : isWrong ? 'border-red-300 bg-red-50 ring-4 ring-red-100'
                        : selectedWord ? 'border-purple-200 hover:border-purple-500 hover:shadow-md hover:scale-105 cursor-pointer bg-purple-50/30'
                        : 'border-gray-100 opacity-80 cursor-not-allowed hover:bg-gray-50'}
                    `}
                  >
                    {item.emoji}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
