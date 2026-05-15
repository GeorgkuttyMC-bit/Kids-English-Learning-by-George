import { motion } from 'motion/react';
import { BookOpen, Brain, LayoutGrid, Star, CheckCircle, Heart, Shield, Volume2, Sparkles } from 'lucide-react';
import type { ViewType } from '../types';

interface HomeProps {
  setView: (view: ViewType) => void;
}

const games = [
  {
    id: 'alphabet',
    title: 'The Alphabet',
    description: 'Learn ABCs with fun animals!',
    color: 'bg-white',
    ring: 'ring-pink-100',
    titleColor: 'text-gray-800',
    icon: <BookOpen className="w-12 h-12 text-pink-500" />,
    iconBg: 'bg-pink-50',
    view: 'alphabet' as ViewType,
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    description: 'Guess the picture!',
    color: 'bg-white',
    ring: 'ring-green-100',
    titleColor: 'text-gray-800',
    icon: <Brain className="w-12 h-12 text-green-500" />,
    iconBg: 'bg-green-50',
    view: 'flashcards' as ViewType,
  },
  {
    id: 'matching',
    title: 'Matching Game',
    description: 'Match words to pictures!',
    color: 'bg-white',
    ring: 'ring-purple-100',
    titleColor: 'text-gray-800',
    icon: <LayoutGrid className="w-12 h-12 text-purple-500" />,
    iconBg: 'bg-purple-50',
    view: 'matching' as ViewType,
  },
];

export function Home({ setView }: HomeProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-700 mb-6 tracking-tight"
        >
          Let's Learn English! 🎈
        </motion.h2>
        <motion.p 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed mb-6"
        >
          Welcome to a magical world of words! Designed specially for small children, this interactive platform makes learning English vocabulary, pronunciation, and the alphabet an exciting adventure.
        </motion.p>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-100 text-orange-600 rounded-full font-bold text-lg"
        >
          <Sparkles className="w-5 h-5" /> Pick a fun game to start today! <Sparkles className="w-5 h-5" />
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {games.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setView(game.view)}
            className={`${game.color} rounded-[2rem] p-8 cursor-pointer ring-4 ring-opacity-50 ${game.ring} ring-offset-4 ring-offset-[#F8FAFC] shadow-xl shadow-gray-200/50 relative overflow-hidden group transition-all`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform duration-500 delay-100">
              {game.icon}
            </div>
            <div className={`${game.iconBg} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm rotate-3 group-hover:-rotate-3 transition-transform duration-300`}>
              {game.icon}
            </div>
            <h3 className={`text-2xl lg:text-3xl font-extrabold mb-3 ${game.titleColor} tracking-tight`}>
              {game.title}
            </h3>
            <p className="text-gray-500 text-lg font-medium">
              {game.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 grid md:grid-cols-2 gap-8 lg:gap-12">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 relative border-l-8 border-sky-400"
        >
          <div className="absolute -top-6 -left-6 bg-sky-100 p-4 rounded-2xl rotate-12 shadow-sm border border-sky-200">
            <CheckCircle className="w-8 h-8 text-sky-500" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-800 mb-6 ml-4">How to Play</h3>
          <ul className="space-y-4 text-gray-600 font-medium text-lg">
            <li className="flex items-start gap-4">
              <span className="bg-sky-50 p-2 rounded-full shrink-0"><Sparkles className="w-5 h-5 text-sky-500" /></span>
              <span className="mt-1"><strong>Pick a level:</strong> Start with the alphabet or dive straight into vocabulary.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-sky-50 p-2 rounded-full shrink-0"><Volume2 className="w-5 h-5 text-sky-500" /></span>
              <span className="mt-1"><strong>Listen closely:</strong> Tap any card or word to hear how it sounds in English.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-sky-50 p-2 rounded-full shrink-0"><LayoutGrid className="w-5 h-5 text-sky-500" /></span>
              <span className="mt-1"><strong>Practice matching:</strong> Connect words to pictures to test your memory.</span>
            </li>
          </ul>
        </motion.div>

        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 relative border-l-8 border-emerald-400"
        >
          <div className="absolute -top-6 -right-6 bg-emerald-100 p-4 rounded-2xl -rotate-12 shadow-sm border border-emerald-200">
            <Heart className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-800 mb-6">Why It's Great</h3>
          <ul className="space-y-4 text-gray-600 font-medium text-lg">
            <li className="flex items-start gap-4">
              <span className="bg-emerald-50 p-2 rounded-full shrink-0"><Brain className="w-5 h-5 text-emerald-500" /></span>
              <span className="mt-1"><strong>Builds Vocabulary:</strong> Pairs everyday words with vivid visual cues.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-emerald-50 p-2 rounded-full shrink-0"><Volume2 className="w-5 h-5 text-emerald-500" /></span>
              <span className="mt-1"><strong>Perfects Pronunciation:</strong> Uses native text-to-speech to demonstrate phrasing.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-emerald-50 p-2 rounded-full shrink-0"><Shield className="w-5 h-5 text-emerald-500" /></span>
              <span className="mt-1"><strong>Safe & Friendly:</strong> Encouraging feedback and bright colors keep kids engaged safely!</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
