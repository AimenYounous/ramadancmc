import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaTrophy, FaArrowRight } from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';
import { useQuiz } from '../context/QuizContext';
import '../styles/components.css';

const QuizIntro = () => {
    const { setPlayerName, playerName, resetGame } = useQuiz();
    const [nameInput, setNameInput] = useState(playerName || '');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleStart = (e) => {
        e.preventDefault();
        if (!nameInput.trim()) {
            setError('المرجو إدخال الاسم للبدء');
            return;
        }
        setPlayerName(nameInput);
        resetGame();
        navigate('/quiz');
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden text-center">
            <ParticlesBackground />

            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-6 left-6 z-20"
            >
                <button
                    onClick={() => navigate('/games')}
                    className="flex items-center gap-2 text-gray-400 hover:text-[var(--color-accent)] transition-colors"
                >
                    <FaArrowRight /> العودة للألعاب
                </button>
            </motion.div>

            {/* Logos Section */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="z-10 mb-8"
            >
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-accent)] drop-shadow-md tracking-wider mb-2">
                        تحدي المعلومات
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent mb-4"></div>
                </div>
            </motion.div>

            {/* Main Card */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="z-10 w-full max-w-lg"
            >
                <div className="card-3d p-8 md:p-12 relative overflow-hidden">
                    {/* Decorative Circle */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-primary)] rounded-full blur-3xl opacity-30"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[var(--color-accent)] rounded-full blur-3xl opacity-20"></div>

                    <h1 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-b from-[#FFF] to-[#CCC] drop-shadow-sm">
                        مرحباً بك 🌙
                    </h1>

                    <form onSubmit={handleStart} className="flex flex-col gap-6">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="أدخل اسمك الكامل"
                                value={nameInput}
                                onChange={(e) => {
                                    setNameInput(e.target.value);
                                    setError('');
                                }}
                                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl px-6 py-4 text-xl text-center text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                                dir="rtl"
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
                        </div>

                        {error && <p className="text-red-400 text-sm font-bold animate-pulse">{error}</p>}

                        <button
                            type="submit"
                            className="relative overflow-hidden group bg-gradient-to-r from-[var(--color-accent)] to-[#b8860b] text-[var(--color-bg)] font-bold text-xl py-4 rounded-xl shadow-[0_10px_20px_rgba(218,165,32,0.3)] hover:shadow-[0_15px_25px_rgba(218,165,32,0.5)] transition-all transform hover:-translate-y-1 active:translate-y-1 active:shadow-sm"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                <FaPlay className="text-sm" /> ابدأ التحدي
                            </span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </button>
                    </form>

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => navigate('/leaderboard')}
                            className="text-[var(--color-accent)] hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold"
                        >
                            <FaTrophy /> لوحة المتصدرين
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default QuizIntro;
