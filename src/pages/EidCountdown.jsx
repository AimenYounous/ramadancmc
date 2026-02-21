import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaClock } from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';
import SubPageHeader from '../components/SubPageHeader';

const EidCountdown = () => {
    const navigate = useNavigate();

    // Set Eid Date (Approximate for 2026)
    // Ramadan 2026 starts approx Feb 17/18. Eid approx March 20, 2026.
    const eidDate = new Date('2026-03-20T00:00:00').getTime();

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = eidDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                // Time passed
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Initial call

        return () => clearInterval(timer);
    }, [eidDate]);

    const TimeUnit = ({ label, value }) => (
        <div className="flex flex-col items-center mx-2 md:mx-4">
            <div className="relative group">
                <div className="w-20 h-24 md:w-32 md:h-40 bg-[rgba(20,30,25,0.8)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] 
                              rounded-xl flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]
                              group-hover:shadow-[0_0_30px_rgba(218,165,32,0.2)] group-hover:border-[var(--color-accent)] transition-all duration-300">
                    <span className="text-4xl md:text-7xl font-bold font-mono text-[var(--color-accent)] drop-shadow-[0_0_10px_rgba(218,165,32,0.5)]">
                        {String(value).padStart(2, '0')}
                    </span>

                    {/* Inner Top Highlight */}
                    <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-[rgba(255,255,255,0.05)] to-transparent rounded-t-xl pointer-events-none"></div>
                </div>
            </div>
            <span className="mt-4 text-sm md:text-lg text-gray-300 font-bold tracking-wide">{label}</span>
        </div>
    );

    return (
        <div className="min-h-screen relative flex flex-col items-center p-6 text-center overflow-hidden" dir="rtl">
            <ParticlesBackground />

            {/* Standardized Header */}
            <SubPageHeader title="كم باقي على العيد؟" />

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="z-10 flex flex-col items-center w-full max-w-4xl"
            >
                <div className="mb-12 relative mt-4">
                    <div className="absolute -inset-10 bg-[var(--color-accent)] opacity-10 blur-[60px] rounded-full"></div>
                    <p className="text-lg md:text-xl text-gray-300 font-light mt-4">
                        عد تنازلي للحظة الفرحة الكبرى لعيد الفطر المبارك
                    </p>
                </div>

                <div className="flex flex-wrap justify-center items-center mb-12">
                    <TimeUnit label="يوم" value={timeLeft.days} />
                    <div className="text-4xl md:text-6xl text-[rgba(255,255,255,0.1)] font-thin -mt-8">:</div>
                    <TimeUnit label="ساعة" value={timeLeft.hours} />
                    <div className="text-4xl md:text-6xl text-[rgba(255,255,255,0.1)] font-thin -mt-8">:</div>
                    <TimeUnit label="دقيقة" value={timeLeft.minutes} />
                    <div className="text-4xl md:text-6xl text-[rgba(255,255,255,0.1)] font-thin -mt-8">:</div>
                    <TimeUnit label="ثانية" value={timeLeft.seconds} />
                </div>

                <div className="mt-8 px-8 py-4 bg-[rgba(255,255,255,0.05)] rounded-2xl border border-[rgba(255,255,255,0.1)]">
                    <p className="text-gray-400 text-sm">
                        * الحساب يعتمد على التقديرات الفلكية وقد يختلف حسب رؤية الهلال.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default EidCountdown;
