import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaArrowRight, FaQuestionCircle, FaLightbulb, FaBookOpen } from 'react-icons/fa';
import SubPageHeader from '../../components/SubPageHeader';
import { selfDevelopmentData } from '../../data/selfDevelopmentData';
import ParticlesBackground from '../../components/ParticlesBackground';

const TopicDetail = () => {
    const { categoryId, topicId } = useParams();
    const navigate = useNavigate();
    const [isCompleted, setIsCompleted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const category = selfDevelopmentData.categories.find(c => c.id === categoryId);
    const topic = category?.topics.find(t => t.id === topicId);

    useEffect(() => {
        const completed = JSON.parse(localStorage.getItem('ramadan_sd_completed') || '[]');
        setIsCompleted(completed.includes(topicId));
        window.scrollTo(0, 0);
    }, [topicId]);

    const handleToggleComplete = () => {
        const completed = JSON.parse(localStorage.getItem('ramadan_sd_completed') || '[]');
        let newCompleted;
        if (isCompleted) {
            newCompleted = completed.filter(id => id !== topicId);
        } else {
            newCompleted = [...completed, topicId];
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }
        localStorage.setItem('ramadan_sd_completed', JSON.stringify(newCompleted));
        setIsCompleted(!isCompleted);
    };

    if (!topic) {
        return <div className="text-white text-center mt-20">Topic not found</div>;
    }

    return (
        <div className="min-h-screen bg-[var(--color-bg)] overflow-x-hidden relative pb-20" dir="rtl">
            <ParticlesBackground />
            <SubPageHeader title={topic.title} />

            <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
                {/* Topic Header Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="p-10 rounded-3xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden mb-12"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50" />

                    <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-10 gold-glow-text leading-tight">
                        {topic.title}
                    </h2>

                    {/* Verses Container */}
                    <div className="relative p-8 rounded-2xl bg-black/40 border border-[var(--color-accent)]/20 islamic-pattern mb-8 text-right">
                        <div className="absolute -top-4 right-8 bg-[var(--color-accent)] text-black px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                            <FaBookOpen /> آية قرآنية
                        </div>
                        <p className="text-2xl md:text-3xl text-center font-serif text-[var(--color-accent)] leading-loose mb-6 italic" style={{ fontFamily: "'Reem Kufi', serif" }}>
                            " {topic.verse} "
                        </p>
                        <div className="w-20 h-[1px] bg-[var(--color-accent)]/30 mx-auto mb-6" />
                        <p className="text-gray-300 text-center leading-relaxed md:text-lg">
                            {topic.verseExplanation}
                        </p>
                    </div>

                    {/* Content Sections */}
                    <div className="grid grid-cols-1 gap-8 text-right">
                        <motion.section
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-4"
                        >
                            <h3 className="text-2xl font-bold flex items-center gap-3 text-white">
                                <FaLightbulb className="text-[var(--color-accent)]" /> مفهوم التطوير الذاتي
                            </h3>
                            <p className="text-gray-400 bg-white/5 p-6 rounded-xl border border-white/5 leading-relaxed text-lg">
                                {topic.developmentExplanation || "تحسين النفس والارتقاء بها هو أساس النجاح في الدارين."}
                            </p>
                        </motion.section>

                        <motion.section
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-4"
                        >
                            <h3 className="text-2xl font-bold flex items-center gap-3 text-white">
                                <FaCheck className="text-[var(--color-accent)]" /> نصائح عملية في رمضان
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(topic.ramadanTips || []).map((tip, idx) => (
                                    <li key={idx} className="flex items-start gap-4 bg-[var(--color-accent)]/5 p-4 rounded-xl border border-[var(--color-accent)]/10">
                                        <div className="w-6 h-6 rounded-full bg-[var(--color-accent)] text-black flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                                            {idx + 1}
                                        </div>
                                        <span className="text-gray-300">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="bg-[#ffd700]/10 border border-[#ffd700]/20 p-6 rounded-2xl relative"
                            >
                                <h4 className="font-bold text-[#ffd700] mb-3 flex items-center gap-2">
                                    <FaRocket /> تحدي اليوم
                                </h4>
                                <p className="text-gray-300">
                                    {topic.dailyChallenge || "طبق ما تعلمته اليوم في موقف واحد على الأقل."}
                                </p>
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#ffd700]/5 to-transparent pointer-events-none" />
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/30 p-6 rounded-2xl"
                            >
                                <h4 className="font-bold text-[var(--color-accent)] mb-3 flex items-center gap-2">
                                    <FaQuestionCircle /> سؤال للتأمل
                                </h4>
                                <p className="text-gray-300">
                                    {topic.reflectionQuestion || "كيف يمكنك جعل هذا الخلق عادة دائمة في حياتك؟"}
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-12 flex flex-col items-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleToggleComplete}
                            className={`px-12 py-4 rounded-full font-black text-xl shadow-xl transition-all duration-300 border-2
                                       ${isCompleted
                                    ? 'bg-transparent border-[var(--color-accent)] text-[var(--color-accent)]'
                                    : 'bg-[var(--color-accent)] border-[var(--color-accent)] text-black'}`}
                        >
                            {isCompleted ? '✓ اكتملت القراءة' : 'تحديد كمكتمل'}
                        </motion.button>

                        <button
                            onClick={() => navigate(`/self-development/${categoryId}`)}
                            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
                        >
                            <FaArrowRight /> العودة للقائمة
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Confetti Animation Placeholder Effect */}
            <AnimatePresence>
                {showConfetti && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl">🌟</div>
                        <motion.div
                            animate={{ scale: [1, 1.5, 0], opacity: [1, 1, 0] }}
                            className="absolute bg-[var(--color-accent)] w-full h-full opacity-10 rounded-full"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="fixed inset-0 islamic-pattern opacity-[0.02] pointer-events-none" />
        </div>
    );
};

export default TopicDetail;
