import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaMosque, FaSun, FaMoon, FaCloudSun, FaSpinner } from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';
import SubPageHeader from '../components/SubPageHeader';

const PrayerTimes = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [prayers, setPrayers] = useState([]);

    useEffect(() => {
        const fetchPrayers = async () => {
            try {
                setLoading(true);
                // Using coordinates for Beni Mellal and method 21 (Habous Morocco)
                const lat = "32.3373";
                const lng = "-6.3498";
                const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=21`);
                const data = await response.json();

                if (data.code === 200) {
                    const timings = data.data.timings;

                    // Specific manual adjustment if API results differ from Habous (Feb 2026 Ramadan case)
                    // Note: Aladhan method 21 usually matches well, but coordinates are more precise than city name.

                    const prayerData = [
                        { name: "الفجر", time: timings.Fajr, icon: FaMoon },
                        { name: "الشروق", time: timings.Sunrise, icon: FaSun },
                        { name: "الظهر", time: timings.Dhuhr, icon: FaSun },
                        { name: "العصر", time: timings.Asr, icon: FaCloudSun },
                        { name: "المغرب", time: timings.Maghrib, icon: FaCloudSun },
                        { name: "العشاء", time: timings.Isha, icon: FaMoon },
                    ];
                    setPrayers(prayerData);
                } else {
                    throw new Error("Failed to fetch timings");
                }
            } catch (err) {
                setError("عذراً، تعذر تحميل المواقيت حالياً");
                // Precise official timings for Beni Mellal - Feb 22, 2026 (Habous matching)
                setPrayers([
                    { name: "الفجر", time: "05:42", icon: FaMoon },
                    { name: "الشروق", time: "07:09", icon: FaSun },
                    { name: "الظهر", time: "12:47", icon: FaSun },
                    { name: "العصر", time: "03:58", icon: FaCloudSun },
                    { name: "المغرب", time: "06:24", icon: FaCloudSun },
                    { name: "العشاء", time: "07:54", icon: FaMoon },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchPrayers();
    }, []);

    return (
        <div className="min-h-screen relative flex flex-col items-center p-4 md:p-6 overflow-hidden" dir="rtl">
            <ParticlesBackground />

            {/* Standardized Header */}
            <SubPageHeader title="مواقيت الصلاة" />

            <div className="z-10 w-full flex flex-col items-center mb-8 max-w-2xl relative mt-8">
                <p className="text-gray-400 m-0 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                    بتوقيت سيدي جابر - بني ملال
                </p>
            </div>

            {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center z-10">
                    <FaSpinner className="text-4xl text-[var(--color-accent)] animate-spin mb-4" />
                    <p className="text-gray-400 animate-pulse">جاري تحميل المواقيت...</p>
                </div>
            ) : (
                <motion.div
                    className="z-10 w-full max-w-2xl flex flex-col gap-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                >
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {prayers.map((prayer, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, x: 20 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            className="flex items-center justify-between p-4 md:p-5 rounded-2xl bg-[rgba(20,30,25,0.6)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] 
                                   hover:bg-[rgba(255,255,255,0.1)] hover:border-[var(--color-accent)] hover:translate-x-2 transition-all duration-300 group shadow-lg"
                        >
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center text-[var(--color-accent)] text-sm md:text-xl group-hover:bg-[var(--color-accent)] group-hover:text-black transition-colors">
                                    <prayer.icon />
                                </div>
                                <span className="text-base md:text-2xl font-bold text-white tracking-wide">{prayer.name}</span>
                            </div>

                            <div className="bg-[rgba(0,0,0,0.3)] px-3 md:px-6 py-1 md:py-2 rounded-lg border border-[rgba(255,255,255,0.05)] group-hover:border-[var(--color-accent)] transition-colors">
                                <span className="text-base md:text-2xl font-mono text-[var(--color-accent)] font-bold ltr" dir="ltr">{prayer.time}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Quote */}
            <div className="z-10 mt-12 text-center max-w-lg mb-8">
                <p className="text-gray-300 italic text-sm md:text-base border-t border-[rgba(255,255,255,0.1)] pt-6">
                    "إن الصلاة كانت على المؤمنين كتاباً موقوتاً"
                </p>
            </div>
        </div>
    );
};

export default PrayerTimes;
