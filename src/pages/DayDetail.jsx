import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBookOpen, FaPray, FaHistory, FaLightbulb, FaArrowRight } from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';
import SubPageHeader from '../components/SubPageHeader';
import { getDayData } from '../data/ramadanData';

const DayDetail = () => {
    const { dayNum } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        const dayContent = getDayData(dayNum);
        if (dayContent) {
            setData(dayContent);
        } else {
            // If data for the day doesn't exist yet, show a placeholder or redirect
            // For now, let's keep it simple
            setData({
                day: dayNum,
                title: "محتوى قادم",
                ayah: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
                explanation: "هذا المحتوى سيتم إضافته قريباً.",
                dua: "اللهم بارك لنا في رمضان.",
                story: "قصة اليوم لم تضاف بعد.",
                softSkill: "التطوير المستمر"
            });
        }
        window.scrollTo(0, 0);
    }, [dayNum]);

    if (!data) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen relative flex flex-col bg-[#0a0f0d] text-white pb-20" dir="rtl">
            <ParticlesBackground />
            <SubPageHeader
                title={`اليوم ${data.day}: ${data.title}`}
                subBackLabel="العودة لخريطة الرحلة"
                subBackPath="/calendar"
            />

            <div className="flex-1 flex flex-col items-center justify-center py-4 md:py-8">
                <motion.div
                    className="z-10 w-full max-w-4xl mx-auto px-6 flex flex-col gap-3 md:gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* 1. Ayah Card */}
                    <motion.div
                        variants={cardVariants}
                        className="bg-[rgba(20,30,25,0.85)] backdrop-blur-3xl p-5 md:p-6 rounded-[24px] border border-emerald-500/30 shadow-xl relative overflow-hidden text-center group flex flex-col items-center justify-center min-h-[120px]"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-[30px] -mr-12 -mt-12"></div>
                        <h2 className="text-xl md:text-3xl font-black text-[var(--color-accent)] leading-relaxed mb-2 drop-shadow-glow" style={{ fontFamily: "'ArabicFont', 'Cairo', serif" }}>
                            {data.ayah}
                        </h2>
                        {data.surah && (
                            <div className="flex items-center gap-2 mb-4 text-emerald-400/80 font-bold text-sm md:text-base border-t border-emerald-500/10 pt-2 px-4 rounded-full bg-emerald-500/5">
                                <span>سورة {data.surah}</span>
                                <span className="opacity-40">|</span>
                                <span>الآية {data.ayahNum}</span>
                            </div>
                        )}
                        <p className="text-base md:text-lg text-gray-300 font-medium opacity-80">
                            {data.explanation}
                        </p>
                    </motion.div>

                    {/* 2. Dua Card */}
                    <motion.div
                        variants={cardVariants}
                        className="bg-[rgba(20,30,25,0.8)] backdrop-blur-3xl p-4 md:p-5 rounded-[24px] border border-amber-500/20 shadow-lg group flex flex-col items-center text-center"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <FaPray className="text-amber-400 text-lg opacity-60" />
                            <h3 className="text-base font-bold text-amber-100 mb-0">دعاء اليوم</h3>
                        </div>
                        <p className="text-lg md:text-xl text-amber-50 leading-relaxed font-bold">
                            {data.dua}
                        </p>
                    </motion.div>

                    {/* 3. Story Card */}
                    <motion.div
                        variants={cardVariants}
                        className="bg-[rgba(20,30,25,0.85)] backdrop-blur-3xl p-5 md:p-6 rounded-[24px] border border-white/10 shadow-lg relative overflow-hidden group"
                    >
                        <div className="flex items-center gap-3 mb-3 justify-center">
                            <FaHistory className="text-white/40 text-xl" />
                            <h3 className="text-lg font-black text-gray-50 m-0">قصة وعبرة</h3>
                        </div>
                        <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light text-center">
                            {data.story}
                        </p>
                    </motion.div>

                    {/* 4. Soft Skill Card */}
                    <motion.div
                        variants={cardVariants}
                        className="bg-[rgba(20,30,25,0.8)] backdrop-blur-3xl p-4 md:p-5 rounded-[24px] border border-blue-500/20 shadow-lg group flex flex-col items-center text-center"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <FaLightbulb className="text-blue-400 text-lg opacity-60" />
                            <h3 className="text-base font-bold text-blue-100 mb-0">مهارة حياتية</h3>
                        </div>
                        <p className="text-base md:text-lg text-blue-50 font-semibold">
                            {data.softSkill}
                        </p>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
};

export default DayDetail;

