import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParticlesBackground from '../components/ParticlesBackground';
import SubPageHeader from '../components/SubPageHeader';
import JourneyMap from '../components/JourneyMap';
import fanosImg from '/assets/fanos.png';
import hilalImg from '/assets/hilal.png';

const Calendar = () => {
    const navigate = useNavigate();
    const [currentDay, setCurrentDay] = useState(1);

    useEffect(() => {
        // Calculate current Ramadan day
        // Assuming Ramadan 2026 in Morocco starts on Feb 19, 2026
        const ramadanStart = new Date('2026-02-19');
        const today = new Date();

        // Calculate difference in days
        const diffTime = today - ramadanStart;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        // Set current day within 1-30 range
        setCurrentDay(Math.max(1, Math.min(30, diffDays)));
    }, []);

    return (
        <div className="min-h-screen relative flex flex-col items-center bg-[#0a0f0d] overflow-x-hidden" dir="rtl">
            <ParticlesBackground />

            {/* Bottom Matching Fanos */}
            <motion.img
                src={fanosImg}
                alt="Fanos Left"
                className="absolute bottom-4 left-4 w-14 md:w-20 z-20 pointer-events-none opacity-60"
                animate={{
                    y: [0, -10, 0],
                    rotate: [-3, 3, -3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
                src={fanosImg}
                alt="Fanos Right"
                className="absolute bottom-4 right-4 w-14 md:w-20 z-20 pointer-events-none opacity-60 scale-x-[-1]"
                animate={{
                    y: [-10, 0, -10],
                    rotate: [3, -3, 3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Side Hanging Hilals */}
            <motion.img
                src={hilalImg}
                alt="Hilal Left"
                className="absolute top-0 left-4 md:left-12 w-24 md:w-36 z-30 pointer-events-none"
                style={{ transformOrigin: "top center" }}
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
                src={hilalImg}
                alt="Hilal Right"
                className="absolute top-0 right-4 md:right-12 w-24 md:w-36 z-30 pointer-events-none scale-x-[-1]"
                style={{ transformOrigin: "top center" }}
                animate={{ rotate: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />


            {/* Standardized Header */}
            <SubPageHeader title="رحلة رمضان" transparent={true} />

            {/* Journey Map Content */}
            <div className="z-10 w-full overflow-y-auto pb-20">
                <JourneyMap currentDay={currentDay} />
            </div>
        </div>
    );
};

export default Calendar;
