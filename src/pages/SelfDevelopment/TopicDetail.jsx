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
                    whileHover={{ y: -3 }}
                    className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[20px] p-8 md:p-12 shadow-[0_0_50px_rgba(212,175,55,0.1)] relative overflow-hidden group/card transition-all duration-300"
                >
                    {/* Subtle Top Glow Line */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent" />

                    {/* Top Section: Header */}
                    <div className="flex justify-between items-start mb-10">
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-black text-white gold-glow-text mb-3 leading-tight">
                                {topic.title}
                            </h1>
                            <p className="text-gray-400 text-lg font-medium opacity-80">
                                رحلة تطويرية في رحاب شهر رمضان المبارك
                            </p>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center border border-[var(--color-accent)]/20 shadow-inner group-hover/card:scale-110 transition-transform duration-500">
                            <FaLightbulb className="text-3xl text-[var(--color-accent)]" />
                        </div>
                    </div>

                    <div className="space-y-12">
                        {/* Section 1: الآية */}
                        <section className="relative group/section">
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

                        <div className="h-[1px] bg-[var(--color-accent)]/10 w-full" />

                        {/* Section 2: نصائح في رمضان */}
                        <section className="group/section">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                                <h3 className="text-white font-bold text-xl">خارطة العمل الرمضانية</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {(topic.ramadanTips || []).map((tip, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ x: -5 }}
                                        className="flex items-start gap-4 bg-white/5 p-5 rounded-xl border border-white/5 hover:border-[var(--color-accent)]/20 transition-all"
                                    >
                                        <div className="shrink-0 w-8 h-8 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
                                            <FaCheck className="text-[var(--color-accent)] text-xs" />
                                        </div>
                                        <span className="text-gray-300 leading-relaxed font-medium">{tip}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Section 3: تطبيق عملي اليوم */}
                        <section className="group/section">
                            <div className="bg-gradient-to-l from-[var(--color-accent)]/10 to-transparent border-r-4 border-[var(--color-accent)] p-8 rounded-xl shadow-inner relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <FaRocket className="text-6xl text-white" />
                                </div>
                                <h4 className="text-white font-bold text-2xl mb-4 flex items-center gap-3">
                                    <FaLightbulb className="text-[var(--color-accent)]" /> الخطوة العملية اليوم
                                </h4>
                                <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
                                    {topic.developmentExplanation || "ابدأ اليوم بتطبيق ما تعلمته لتحويل المعرفة إلى عادة مثمرة."}
                                </p>
                                <button
                                    onClick={handleToggleComplete}
                                    className={`flex items-center gap-3 px-8 py-4 rounded-xl font-black text-lg transition-all duration-500
                                               ${isCompleted
                                            ? 'bg-[var(--color-accent)] text-black'
                                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'}`}
                                >
                                    {isCompleted ? <FaCheckCircle /> : <FaRegCircle className="opacity-50" />}
                                    {isCompleted ? 'تم الإنجاز بنجاح' : 'أنجزت اليوم'}
                                </button>
                            </div>
                        </section>

                        <div className="h-[1px] bg-[var(--color-accent)]/10 w-full" />

                        {/* Section 4: التحدي اليومي */}
                        <section className="text-center group/section">
                            <h3 className="text-white font-bold text-2xl mb-3">تحدي اليوم</h3>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                {topic.dailyChallenge || "طبق ما تعلمته اليوم في موقف واحد على الأقل."}
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-4 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[#FFD700] text-black font-black text-xl shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] transition-all"
                            >
                                ابدأ التحدي الآن
                            </motion.button>
                        </section>
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
