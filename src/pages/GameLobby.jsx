import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaQuestionCircle, FaTh, FaMosque, FaStar } from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';
import SubPageHeader from '../components/SubPageHeader';

const GameLobby = () => {
    const navigate = useNavigate();

    const games = [
        {
            id: 1,
            title: "تحدي المعلومات",
            subtitle: "مسابقة الأسئلة الإسلامية",
            description: "اختبر معلوماتك الدينية في شهر رمضان المبارك مع 15 سؤالاً متنوعاً.",
            icon: FaQuestionCircle,
            path: "/quiz-intro",
            color: "var(--color-accent)",
            difficulty: "متوسط",
            delay: 0.1
        },
        {
            id: 2,
            title: "كلمات وكنوز",
            subtitle: "لعبة كلمات كراش",
            description: "ابحث عن الكلمات الإسلامية المفقودة في شبكة الحروف. تحدى ذكاءك!",
            icon: FaTh,
            path: "/games/word-crush",
            color: "#4ade80",
            difficulty: "سهل",
            delay: 0.2
        }
    ];

    return (
        <div className="min-h-screen relative flex flex-col items-center p-6 text-center overflow-hidden" dir="rtl">
            <ParticlesBackground />

            {/* Standardized Header */}
            <SubPageHeader title="التحديات" />

            <div className="flex-1 w-full flex flex-col items-center justify-center relative z-10 px-6">
                {/* Games Grid */}
                <div className="z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
                    {games.map((game) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: game.delay, duration: 0.5 }}
                            onClick={() => navigate(game.path)}
                            className="group relative cursor-pointer"
                        >
                            {/* 3D Card Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-transparent rounded-[32px] blur-sm group-hover:blur-md transition-all"></div>

                            <div className="relative bg-[rgba(20,30,25,0.7)] backdrop-blur-2xl p-8 rounded-[32px] border border-[rgba(255,255,255,0.1)] shadow-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:border-[rgba(218,165,32,0.3)]">
                                {/* Decorative Background Icon */}
                                <game.icon className="absolute -bottom-8 -left-8 text-9xl opacity-5 text-white transition-transform group-hover:scale-110" />

                                <div className="relative z-10 flex flex-col items-center">
                                    <div
                                        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-colors"
                                        style={{ backgroundColor: `${game.color}15`, border: `1px solid ${game.color}30` }}
                                    >
                                        <game.icon className="text-4xl" style={{ color: game.color }} />
                                    </div>

                                    <div className="space-y-1 mb-4">
                                        <h2 className="text-2xl font-black text-white transition-colors group-hover:text-[var(--color-accent)]">
                                            {game.title}
                                        </h2>
                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-8 h-10 overflow-hidden">
                                        {game.description}
                                    </p>

                                    <div className="w-full flex items-center justify-center pt-6 border-t border-[rgba(255,255,255,0.05)]">
                                        <div className="text-[var(--color-accent)] font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                            ابدأ الآن <FaArrowRight className="text-xs rotate-180" />
                                        </div>
                                    </div>
                                </div>

                                {/* Glow Effect */}
                                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full blur-[50px] transition-opacity group-hover:opacity-20 pointer-events-none" style={{ backgroundColor: game.color }}></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom Mosque Silhouette Decor */}
            <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10 pointer-events-none flex items-end justify-center">
                <FaMosque className="text-[200px] text-white" />
            </div>
        </div>
    );
};

export default GameLobby;
