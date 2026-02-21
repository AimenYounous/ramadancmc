import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaArrowRight, FaQuestionCircle, FaLightbulb, FaBookOpen, FaCheckCircle, FaRegCircle, FaRocket } from 'react-icons/fa';
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
        <div className="min-h-screen bg-gradient-to-br from-[#0c2410] via-[#041108] to-[#0c2410] overflow-x-hidden relative flex items-center justify-center py-12 md:py-20" dir="rtl">
            <ParticlesBackground />

            {/* Minimal Back Button */}
            <div className="absolute top-8 right-8 z-20">
                <button
                    onClick={() => navigate(`/self-development/${categoryId}`)}
                    className="flex items-center gap-2 text-[var(--color-accent)] opacity-70 hover:opacity-100 transition-all font-bold group"
                >
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    العودة للمواضيع
                </button>
            </div>

            <div className="max-w-[850px] w-full px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[20px] p-8 md:p-12 shadow-[0_0_50px_rgba(212,175,55,0.1)] relative overflow-hidden transition-all duration-300"
                >
                    {/* Subtle Top Glow Line */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent" />

                    {/* Top Section: Header */}
                    <div className="flex justify-between items-start mb-12">
                        <div className="flex-1 text-right">
                            <h1 className="text-4xl md:text-5xl font-black text-white gold-glow-text mb-3 leading-tight">
                                {topic.title}
                            </h1>
                            <p className="text-gray-400 text-lg font-medium opacity-80">
                                رحلة تطويرية في رحاب شهر رمضان المبارك
                            </p>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center border border-[var(--color-accent)]/20 shadow-inner">
                            <FaBookOpen className="text-3xl text-[var(--color-accent)]" />
                        </div>
                    </div>

                    <div className="space-y-[32px]">
                        {/* Section 1: الآية */}
                        <section className="relative">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
                                <h3 className="text-[var(--color-accent)] font-bold text-lg uppercase tracking-wider opacity-80">المنطلق الرباني</h3>
                            </div>
                            <div className="bg-black/20 p-8 rounded-2xl border border-white/5 relative">
                                <p className="text-3xl md:text-4xl text-center font-serif text-[var(--color-accent)] leading-relaxed mb-6" style={{ fontFamily: "'Reem Kufi', serif" }}>
                                    " {topic.verse} "
                                </p>
                                <div className="w-12 h-[1px] bg-[var(--color-accent)]/20 mx-auto mb-6" />
                                <p className="text-gray-300 text-center text-lg leading-relaxed max-w-2xl mx-auto italic">
                                    {topic.verseExplanation}
                                </p>
                            </div>
                        </section>

                        <div className="h-[1px] bg-white/5 w-full" />

                        {/* Section 2: منهاج الارتقاء النفسي */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                                <h3 className="text-white font-bold text-xl">منهاج الارتقاء النفسي</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {(topic.ramadanTips || []).map((tip, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col gap-2 bg-white/[0.03] p-6 rounded-xl border-r-2 border-[var(--color-accent)]/30 hover:bg-white/[0.05] transition-all text-right"
                                    >
                                        <h4 className="text-[var(--color-accent)] font-bold text-lg">
                                            {typeof tip === 'string' ? `نصيحة ${idx + 1}` : tip.title}
                                        </h4>
                                        <p className="text-gray-400 leading-relaxed font-medium">
                                            {typeof tip === 'string' ? tip : tip.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 3: التطبيق العملي لليوم */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                                <h3 className="text-white font-bold text-xl">التطبيق العملي لليوم</h3>
                            </div>
                            <div className="bg-gradient-to-l from-[var(--color-accent)]/5 to-transparent border-r-4 border-[var(--color-accent)]/50 p-8 rounded-xl shadow-inner text-right">
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    {topic.developmentExplanation || "ابدأ اليوم بتطبيق ما تعلمته لتحويل المعرفة إلى عادة مثمرة."}
                                </p>
                            </div>
                        </section>

                        <div className="h-[1px] bg-white/5 w-full" />

                        {/* Section 4: التحدي اليومي */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]/50 shadow-[0_0_10px_rgba(212,175,55,0.2)]" />
                                <h3 className="text-white font-bold text-xl">تحدي اليوم</h3>
                            </div>
                            <div className="p-8 rounded-2xl bg-[var(--color-accent)]/[0.02] border border-[var(--color-accent)]/10 text-right shadow-[inset_0_0_20px_rgba(212,175,55,0.02)]">
                                <p className="text-gray-300 text-xl leading-relaxed italic">
                                    {topic.dailyChallenge || "طبق ما تعلمته اليوم في موقف واحد على الأقل."}
                                </p>
                            </div>
                        </section>

                        {/* Minimal Toggle: أنجزت اليوم */}
                        <div className="flex justify-start pt-10 border-t border-white/5">
                            <button
                                onClick={handleToggleComplete}
                                className="flex items-center gap-4 group/toggle relative"
                            >
                                <span className={`text-sm font-bold tracking-wide transition-all duration-300 ${isCompleted ? 'text-[var(--color-accent)] opacity-100' : 'text-gray-500 opacity-60'}`}>
                                    {isCompleted ? 'تم إنجاز تطبيق اليوم' : 'تحديد كمنجز لليوم'}
                                </span>
                                <div className={`w-14 h-7 rounded-full transition-all duration-500 relative flex items-center px-1 
                                               ${isCompleted ? 'bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/50 shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'bg-white/10 border border-white/10'}`}>
                                    <motion.div
                                        animate={{ x: isCompleted ? -28 : 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        className={`w-5 h-5 rounded-full shadow-lg ${isCompleted ? 'bg-[var(--color-accent)]' : 'bg-gray-400'}`}
                                    />
                                    {isCompleted && (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1.5, opacity: 0 }}
                                            transition={{ duration: 0.8, repeat: Infinity }}
                                            className="absolute inset-0 bg-[var(--color-accent)]/20 rounded-full"
                                        />
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Bottom Pattern Decors */}
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none" />
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

        </div>
    );
};

export default TopicDetail;
