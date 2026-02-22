import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaTrophy, FaArrowRight } from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';
import { useQuiz } from '../context/QuizContext';
import '../styles/components.css';

const QuizIntro = () => {
    const { registerPlayer, playerName, resetGame, registeredPlayers } = useQuiz();
    const [nameInput, setNameInput] = useState(playerName || '');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleStart = (e) => {
        e.preventDefault();
        if (!nameInput.trim()) {
            setError('المرجو إدخال الاسم للبدء');
            return;
        }
        registerPlayer(nameInput);
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
                <div className="flex flex-col items-center max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-accent)] drop-shadow-md tracking-wider mb-4">
                        تحدي المعلومات 🌙
                    </h2>
                    <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent mb-8"></div>
                </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start px-4">

                {/* Right Side: Registration Form */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, x: 50 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-full"
                >
                    <div className="card-3d p-8 md:p-12 relative overflow-hidden h-full">
                        {/* Decorative Circle */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-primary)] rounded-full blur-3xl opacity-30"></div>

                        <h1 className="text-4xl md:text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-b from-[#FFF] to-[#CCC] drop-shadow-sm">
                            تسجيل الدخول 🌙
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
                                className="relative overflow-hidden group bg-gradient-to-r from-[var(--color-accent)] to-[#b8860b] text-[var(--color-bg)] font-bold text-xl py-4 rounded-xl shadow-[0_10px_20px_rgba(218,165,32,0.3)] hover:shadow-[0_15px_25px_rgba(218,165,32,0.5)] transition-all transform hover:-translate-y-1"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    <FaPlay className="text-sm" /> ابدأ التحدي
                                </span>
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* Left Side: Registered Players List */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, x: -50 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="w-full"
                >
                    <div className="bg-[rgba(20,30,25,0.4)] backdrop-blur-xl p-8 rounded-[32px] border border-[rgba(255,255,255,0.05)] shadow-2xl h-full min-h-[400px]">
                        <h3 className="text-xl font-bold text-gray-300 mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
                            <FaTrophy className="text-[var(--color-accent)]" /> لوحة المتصدرين
                        </h3>

                        <div className="space-y-3 pr-2 max-h-[450px] overflow-y-auto custom-scrollbar">
                            {registeredPlayers && registeredPlayers.length > 0 ? (
                                [...registeredPlayers]
                                    .sort((a, b) => b.score - a.score)
                                    .map((player, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                            onClick={() => setNameInput(player.name)}
                                            className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer border border-transparent hover:border-[var(--color-accent)]/30 transition-all group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] font-bold border border-[var(--color-accent)]/20">
                                                    {player.name ? player.name[0].toUpperCase() : '؟'}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-white font-medium group-hover:text-[var(--color-accent)] transition-colors">
                                                        {player.name}
                                                    </span>
                                                    <span className="text-[var(--color-accent)] text-xs font-bold">
                                                        {player.score || 0} نقطة
                                                    </span>
                                                </div>
                                            </div>
                                            <FaPlay className="text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </motion.div>
                                    ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-gray-500 italic">
                                    <p>لا يوجد لاعبون مسجلون حالياً</p>
                                    <p className="text-xs mt-2">كن أول من يسجل للبدء!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default QuizIntro;
