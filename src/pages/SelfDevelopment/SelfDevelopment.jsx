import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserShield, FaRocket, FaUsers, FaLeaf } from 'react-icons/fa';
import SubPageHeader from '../../components/SubPageHeader';
import { selfDevelopmentData } from '../../data/selfDevelopmentData';
import ParticlesBackground from '../../components/ParticlesBackground';

const iconMap = {
    FaUserShield: FaUserShield,
    FaRocket: FaRocket,
    FaUsers: FaUsers,
    FaLeaf: FaLeaf
};

const SelfDevelopment = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const completed = JSON.parse(localStorage.getItem('ramadan_sd_completed') || '[]');
        const totalTopics = selfDevelopmentData.categories.reduce((acc, cat) => acc + cat.topics.length, 0);
        setProgress(Math.round((completed.length / totalTopics) * 100));
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)] perspective-container overflow-x-hidden relative flex flex-col" dir="rtl">
            <ParticlesBackground />
            <SubPageHeader title="التنمية البشرية في رمضان" />

            <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto px-6 py-20 relative z-10 w-full">
                {/* Progress Tracker */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-32 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-[var(--color-accent)]/20 shadow-xl w-full"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">تقدمك في التطوير الذاتي</h3>
                        <span className="text-[var(--color-accent)] font-bold text-2xl">{progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[#FFD700] shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                        />
                    </div>
                    <p className="text-gray-400 text-sm mt-3">استمر في التعلم وتطوير مهاراتك خلال هذا الشهر الكريم.</p>
                </motion.div>

                {/* Categories Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full"
                >
                    {selfDevelopmentData.categories.map((category) => {
                        const Icon = iconMap[category.icon] || FaLeaf;
                        return (
                            <motion.button
                                key={category.id}
                                variants={cardVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate(`/self-development/${category.id}`)}
                                className="group text-right p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 
                                           hover:border-[var(--color-accent)]/50 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[var(--color-accent)]/10 transition-colors" />

                                <div className="flex items-start gap-6 relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-transparent flex items-center justify-center 
                                                  group-hover:from-[var(--color-accent)] group-hover:to-[#FFD700] transition-all duration-500">
                                        <Icon className="text-3xl text-[var(--color-accent)] group-hover:text-black transition-colors" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                                            {category.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <span className="text-[var(--color-accent)] text-sm font-bold flex items-center gap-2">
                                        استكشف المواضيع
                                        <span className="group-hover:translate-x-[-5px] transition-transform">←</span>
                                    </span>
                                </div>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>

            {/* Background Decorative Element */}
            <div className="fixed bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none z-0 opacity-50" />
        </div>
    );
};

export default SelfDevelopment;
