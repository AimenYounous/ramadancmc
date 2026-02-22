import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { FaRedo, FaHome, FaTrophy, FaCheckCircle, FaPercentage } from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';

const Result = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!state) {
        useEffect(() => navigate('/games'), [navigate]);
        return null;
    }

    const { score, correctCount, total, status } = state;
    const isWin = status === 'win';
    const percentage = Math.round((correctCount / total) * 100);

    const getMotivationalMessage = () => {
        if (!isWin) return "للأسف، لقد استنفدت جميع محاولاتك. لا تيأس، حاول مرة أخرى!";
        if (percentage === 100) return "ما شاء الله! إجابات مثالية. بارك الله في علمك.";
        if (percentage >= 80) return "أحسنت! أداء رائع جداً. بارك الله فيك.";
        if (percentage >= 50) return "أداء جيد، استمر في طلب العلم زادك الله نوراً.";
        return "محاولة جيدة، يمكنك دائماً المحاولة مرة أخرى لزيادة معلوماتك.";
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center p-4 bg-[#0a0f0d]" dir="rtl">
            {isWin && percentage >= 70 && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />}
            <ParticlesBackground />

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="z-10 w-full max-w-lg"
            >
                <div className="bg-[rgba(20,30,25,0.85)] backdrop-blur-2xl p-8 md:p-12 text-center rounded-[40px] border border-[rgba(255,255,255,0.1)] shadow-2xl relative overflow-hidden">
                    {/* Glow Background */}
                    <div className={`absolute -top-24 -left-24 w-64 h-64 ${isWin ? 'bg-[var(--color-accent)]' : 'bg-red-500'} opacity-10 rounded-full blur-[80px]`}></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-green-500 opacity-5 rounded-full blur-[80px]"></div>

                    <div className="relative z-10">
                        <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
                            className="relative mb-8 flex justify-center"
                        >
                            <img
                                src={isWin ? "/assets/gagnant.png" : "/assets/defaite.png"}
                                alt={isWin ? "Winner" : "Defeat"}
                                className="w-48 h-auto drop-shadow-[0_0_20px_rgba(218,165,32,0.5)]"
                            />
                        </motion.div>

                        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
                            {isWin ? "تم إكمال التحدي!" : "انتهت المحاولات"}
                        </h1>

                        <p className="text-gray-400 mb-8 font-medium">
                            {getMotivationalMessage()}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-[rgba(255,255,255,0.03)] p-6 rounded-[24px] border border-[rgba(255,255,255,0.05)]">
                                <span className="block text-sm text-gray-400 mb-1 flex items-center justify-center gap-2">
                                    <FaCheckCircle className="text-green-500" /> النقاط
                                </span>
                                <span className="text-4xl font-black text-white">{score}</span>
                            </div>
                            <div className="bg-[rgba(255,255,255,0.03)] p-6 rounded-[24px] border border-[rgba(255,255,255,0.05)]">
                                <span className="block text-sm text-gray-400 mb-1 flex items-center justify-center gap-2">
                                    <FaPercentage className="text-blue-500" /> النسبة
                                </span>
                                <span className="text-4xl font-black text-white">{percentage}%</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/quiz')}
                                className="w-full bg-[var(--color-accent)] hover:bg-[#b8860b] text-black font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                            >
                                <FaRedo /> خوض التحدي من جديد
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/games')}
                                className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-2"
                            >
                                <FaHome /> العودة لقائمة التحديات
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Result;
