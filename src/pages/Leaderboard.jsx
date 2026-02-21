import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCrown, FaUser } from 'react-icons/fa';
import { useQuiz } from '../context/QuizContext';
import ParticlesBackground from '../components/ParticlesBackground';

const Leaderboard = () => {
    const { matchHistory } = useQuiz();

    // Simulated fake data if empty + real history
    const defaultBoard = [
        { name: "كريم", score: 450, date: "" },
        { name: "سارة", score: 380, date: "" },
        { name: "عمر", score: 320, date: "" },
    ];

    // Combine and sort
    // Actually matchHistory has {name, score, ...}
    // If matchHistory is empty, show default for demo.
    const displayBoard = matchHistory.length > 0 ? matchHistory : defaultBoard;

    return (
        <div className="min-h-screen relative flex flex-col items-center p-4" dir="rtl">
            <ParticlesBackground />

            <div className="z-10 w-full max-w-2xl mt-8 mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-[var(--color-accent)] drop-shadow-md">لوحة المتصدرين</h1>
                <Link to="/">
                    <button className="p-3 bg-[rgba(255,255,255,0.1)] rounded-full hover:bg-[rgba(255,255,255,0.2)] transition-colors">
                        <FaArrowRight className="text-white" />
                    </button>
                </Link>
            </div>

            <div className="z-10 w-full max-w-2xl space-y-4 pb-12">
                {displayBoard.map((entry, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className={`
              card-3d p-4 flex items-center justify-between
              ${index === 0 ? 'border-[var(--color-accent)] bg-[rgba(218,165,32,0.1)]' : ''}
              ${index === 1 ? 'border-gray-400 bg-[rgba(200,200,200,0.1)]' : ''}
              ${index === 2 ? 'border-orange-700 bg-[rgba(160,82,45,0.1)]' : ''}
            `}>
                            <div className="flex items-center gap-4">
                                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                  ${index === 0 ? 'bg-[var(--color-accent)] text-black' :
                                        index === 1 ? 'bg-gray-400 text-black' :
                                            index === 2 ? 'bg-[#cd7f32] text-black' : 'bg-[rgba(255,255,255,0.1)] text-white'}
                `}>
                                    {index + 1}
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-bold text-lg text-white flex items-center gap-2">
                                        {index === 0 && <FaCrown className="text-yellow-400" />} {entry.name}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {entry.date ? new Date(entry.date).toLocaleDateString('ar-MA') : 'لاعب مميز'}
                                    </span>
                                </div>
                            </div>

                            <div className="text-2xl font-black text-[var(--color-primary-light)] font-mono">
                                {entry.score}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {displayBoard.length === 0 && (
                    <div className="text-center text-gray-500 py-12">
                        لا توجد نتائج حتى الآن. كن أول الفائزين!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
