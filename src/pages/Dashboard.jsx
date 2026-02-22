import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMosque, FaClock, FaGamepad, FaBrain } from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';
import fanosImg from '/assets/fanos.png';
import hilalImg from '/assets/hilal.png';
import cmcImg from '/assets/cmc.png';
import cmcRamadanImg from '/assets/cmc_ramadan.png';
import diaImg from '/assets/dia.png';
import aigImg from '/assets/AIG.png';
import thrImg from '/assets/THR.png';

const Dashboard = () => {
    const navigate = useNavigate();

    const menuItems = [
        {
            title: 'التقويم الرمضاني',
            subtitle: 'عرض أيام رمضان',
            icon: FaCalendarAlt,
            path: '/calendar',
            delay: 0.1
        },
        {
            title: 'أوقات الصلاة',
            subtitle: 'مواقيت الصلاة اليومية',
            icon: FaMosque,
            path: '/prayer-times',
            delay: 0.2
        },
        {
            title: 'التنمية البشرية',
            subtitle: 'تطوير الذات في رمضان',
            icon: FaBrain,
            path: '/self-development',
            delay: 0.3
        },
        {
            title: 'التحديات',
            subtitle: 'اختبر معلوماتك',
            icon: FaGamepad,
            path: '/games',
            delay: 0.4
        }
    ];

    return (
        <div className="min-h-screen relative flex flex-col items-center p-6 md:p-10 overflow-hidden" dir="rtl">
            <ParticlesBackground />

            {/* Bottom Floating Fanos */}
            <motion.img
                src={fanosImg}
                alt="Fanos Left"
                className="absolute bottom-4 left-4 w-16 md:w-24 z-20 pointer-events-none opacity-80"
                animate={{
                    y: [0, -15, 0],
                    rotate: [-5, 5, -5]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.img
                src={fanosImg}
                alt="Fanos Right"
                className="absolute bottom-4 right-4 w-16 md:w-24 z-20 pointer-events-none opacity-80 scale-x-[-1]"
                animate={{
                    y: [-15, 0, -15],
                    rotate: [5, -5, 5]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />


            {/* Side Hanging Hilals - Extreme Edges */}
            <motion.img
                src={hilalImg}
                alt="Hilal Left"
                className="absolute top-0 left-0 w-24 md:w-40 z-30 pointer-events-none"
                style={{ transformOrigin: "top center" }}
                animate={{ rotate: [-6, 6, -6] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
                src={hilalImg}
                alt="Hilal Right"
                className="absolute top-0 right-0 w-24 md:w-40 z-30 pointer-events-none scale-x-[-1]"
                style={{ transformOrigin: "top center" }}
                animate={{ rotate: [6, -6, 6] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 1. TOP SECTION: Institutional Logos - Reversed and Resized */}
            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="z-10 w-full max-w-5xl flex flex-row items-center justify-center gap-6 md:gap-10 pt-4 md:pt-6 opacity-80 shrink-0"
            >
                <img src={thrImg} alt="THR" className="h-10 md:h-16 object-contain" />
                <div className="h-6 w-[1px] bg-white/20 mx-2"></div>
                <img src={aigImg} alt="AIG" className="h-10 md:h-16 object-contain" />
                <div className="h-6 w-[1px] bg-white/20 mx-2"></div>
                <img src={diaImg} alt="DIA" className="h-10 md:h-16 object-contain" />
                <div className="h-6 w-[1px] bg-white/20 mx-2"></div>
                <img src={cmcImg} alt="CMC" className="h-10 md:h-16 object-contain" />
            </motion.div>

            {/* MIDDLE & BOTTOM GROUP: Centered together */}
            <div className="flex-1 flex flex-col items-center justify-center w-full z-10 gap-2 md:gap-4 -mt-8">
                {/* 2. MIDDLE SECTION: Ramadan Theme */}
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <img
                        src={cmcRamadanImg}
                        alt="CMC Ramadan"
                        className="h-20 md:h-32 object-contain drop-shadow-[0_0_25px_rgba(218,165,32,0.4)]"
                    />
                    <div className="flex flex-col items-center md:items-start pt-1">
                        <h2 className="text-3xl md:text-5xl text-[var(--color-accent)] leading-tight drop-shadow-[0_0_15px_rgba(218,165,32,0.3)]" style={{ fontFamily: "'RamadanFonts', sans-serif" }}>
                            رمضان كريم
                        </h2>
                        <div className="w-full h-1 bg-gradient-to-l from-[var(--color-accent)] to-transparent opacity-40 mt-1"></div>
                    </div>
                </motion.div>

                {/* 3. BOTTOM SECTION: Grid Container */}
                <motion.div
                    className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 shrink-0"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {menuItems.map((item, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ y: -5, scale: 1.01 }}
                            onClick={() => navigate(item.path)}
                            className="group relative overflow-hidden rounded-[24px] p-6 md:p-8 text-center
                                       bg-[rgba(20,30,25,0.7)] backdrop-blur-2xl border border-[rgba(255,255,255,0.08)]
                                       shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]
                                       hover:shadow-[0_20px_40px_-5px_rgba(218,165,32,0.15)]
                                       transition-all duration-300 ease-out"
                        >
                            <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 flex items-center justify-center 
                                              group-hover:bg-[var(--color-accent)] group-hover:text-black transition-all duration-300">
                                    <item.icon className="text-2xl text-[var(--color-accent)] group-hover:text-[var(--color-bg)] transition-colors" />
                                </div>

                                <div className="flex flex-col items-center">
                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors m-0">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </motion.div>
            </div>



        </div>
    );
};

export default Dashboard;
