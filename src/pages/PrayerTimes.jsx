import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaMosque, FaSun, FaMoon, FaCloudSun } from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';
import SubPageHeader from '../components/SubPageHeader';

const PrayerTimes = () => {
    const navigate = useNavigate();

    const prayers = [
        { name: "الفجر", time: "05:30 AM", icon: FaMoon }, // Dawn/Fajr
        { name: "الشروق", time: "07:00 AM", icon: FaSun }, // Sunrise
        { name: "الظهر", time: "12:45 PM", icon: FaSun }, // Noon/Dhuhr
        { name: "العصر", time: "04:15 PM", icon: FaCloudSun }, // Afternoon/Asr
        { name: "المغرب", time: "06:50 PM", icon: FaCloudSun }, // Sunset/Maghrib
        { name: "العشاء", time: "08:15 PM", icon: FaMoon }, // Night/Isha
    ];

    return (
        <div className="min-h-screen relative flex flex-col items-center p-6 md:p-10 overflow-hidden" dir="rtl">
            <ParticlesBackground />

            {/* Standardized Header */}
            <SubPageHeader title="مواقيت الصلاة" />

            <div className="z-10 w-full flex flex-col items-center mb-8 max-w-2xl relative mt-8">
                <p className="text-gray-400 m-0">بتوقيت الرباط - المغرب</p>
            </div>

            {/* Prayer Cards Container */}
            <motion.div
                className="z-10 w-full max-w-2xl flex flex-col gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
            >
                {prayers.map((prayer, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            hidden: { opacity: 0, x: 20 },
                            visible: { opacity: 1, x: 0 }
                        }}
                        className="flex items-center justify-between p-5 rounded-2xl bg-[rgba(20,30,25,0.6)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] 
                                   hover:bg-[rgba(255,255,255,0.1)] hover:border-[var(--color-accent)] hover:translate-x-2 transition-all duration-300 group shadow-lg"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center text-[var(--color-accent)] text-xl group-hover:bg-[var(--color-accent)] group-hover:text-black transition-colors">
                                <prayer.icon />
                            </div>
                            <span className="text-xl md:text-2xl font-bold text-white tracking-wide">{prayer.name}</span>
                        </div>

                        <div className="bg-[rgba(0,0,0,0.3)] px-6 py-2 rounded-lg border border-[rgba(255,255,255,0.05)] group-hover:border-[var(--color-accent)] transition-colors">
                            <span className="text-xl md:text-2xl font-mono text-[var(--color-accent)] font-bold ltr" dir="ltr">{prayer.time}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Quote */}
            <div className="z-10 mt-12 text-center max-w-lg">
                <p className="text-gray-300 italic text-sm md:text-base border-t border-[rgba(255,255,255,0.1)] pt-6">
                    "إن الصلاة كانت على المؤمنين كتاباً موقوتاً"
                </p>
            </div>
        </div>
    );
};

export default PrayerTimes;
