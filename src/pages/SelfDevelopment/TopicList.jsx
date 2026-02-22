import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import SubPageHeader from '../../components/SubPageHeader';
import { selfDevelopmentData } from '../../data/selfDevelopmentData';
import ParticlesBackground from '../../components/ParticlesBackground';

const TopicList = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [completedTopics, setCompletedTopics] = useState([]);

    const category = selfDevelopmentData.categories.find(c => c.id === categoryId);

    useEffect(() => {
        const completed = JSON.parse(localStorage.getItem('ramadan_sd_completed') || '[]');
        setCompletedTopics(completed);
    }, []);

    if (!category) {
        return <div className="text-white text-center mt-20">Category not found</div>;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)] overflow-x-hidden relative" dir="rtl">
            <ParticlesBackground />
            <SubPageHeader title={category.title} />

            <div className="flex-1 relative z-10 w-full flex justify-center items-center">
                <div className="w-full max-w-4xl px-6 py-12 flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-10 text-center"
                    >
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            اختر موضوعاً لبدء رحلة التطوير الخاصة بك في هذا القسم
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col gap-4"
                    >
                        {category.topics.map((topic) => {
                            const isCompleted = completedTopics.includes(topic.id);
                            return (
                                <motion.button
                                    key={topic.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.01, x: -5 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => navigate(`/self-development/${categoryId}/${topic.id}`)}
                                    className={`flex items-center justify-between p-6 rounded-2xl border transition-all duration-300
                                           ${isCompleted
                                            ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/30'
                                            : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                                                  ${isCompleted ? 'bg-[var(--color-accent)] text-black' : 'bg-white/10 text-gray-400'}`}>
                                            {isCompleted ? <FaCheckCircle className="text-xl" /> : <FaRegCircle className="text-xl" />}
                                        </div>
                                        <h3 className={`text-xl font-bold transition-colors ${isCompleted ? 'text-[var(--color-accent)]' : 'text-white group-hover:text-[var(--color-accent)]'}`}>
                                            {topic.title}
                                        </h3>
                                    </div>
                                    <div className="text-[var(--color-accent)] opacity-50 font-bold hidden md:block">
                                        اقرأ المزيد ←
                                    </div>
                                </motion.button>
                            );
                        })}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 text-center"
                    >
                        <button
                            onClick={() => navigate('/self-development')}
                            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
                        >
                            العودة للأقسام
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Background pattern */}
            <div className="fixed inset-0 islamic-pattern opacity-[0.03] pointer-events-none" />
        </div>
    );
};

export default TopicList;
