import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { words } from '../../data';
import { Button } from '../ui/Button';

// Utility to shuffle arrays
const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export function Matching() {
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
    
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="w-full flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-600">Match Game</h2>
        <div className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full font-bold text-lg">
          Level {level}
        </div>
      </div>

      {isLevelComplete ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-8xl mb-8"
          >
            🏆
          </motion.div>
          <h3 className="text-4xl font-extrabold text-blue-600 mb-8">Great Job!</h3>
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
                    px-6 py-4 rounded-2xl text-2xl font-extrabold transition-all border-4 shadow-sm
                    ${isMatched ? 'opacity-30 bg-gray-100 border-gray-200 cursor-not-allowed scale-95' 
                      : isSelected ? 'bg-purple-100 border-purple-500 text-purple-700 scale-105 shadow-md' 
                      : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50'}
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
                      aspect-square flex items-center justify-center text-7xl bg-white border-4 rounded-3xl transition-all shadow-sm
                      ${isMatched ? 'opacity-30 border-gray-200 cursor-not-allowed scale-95 bg-green-50' 
                        : isWrong ? 'border-red-400 bg-red-50'
                        : selectedWord ? 'border-blue-200 hover:border-blue-500 hover:shadow-md hover:scale-105 cursor-pointer bg-blue-50/30'
                        : 'border-gray-200 opacity-80 cursor-not-allowed'}
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
