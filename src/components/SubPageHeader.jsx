import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import cmcRamadanImg from '/assets/cmc_ramadan.png';

const SubPageHeader = ({ title, showHome = true, backLabel = "الرئيسية", backPath = "/", onBack = null }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(backPath);
        }
    };

    return (
        <div className="z-[60] w-full flex justify-center items-center p-6 md:p-10 sticky top-0 bg-transparent backdrop-blur-md border-b border-white/5">
            {showHome && (
                <motion.button
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    onClick={handleBack}
                    className="absolute right-6 md:right-10 flex items-center gap-2 text-white hover:text-[var(--color-accent)] transition-colors bg-[rgba(255,255,255,0.05)] px-4 py-2 rounded-full backdrop-blur-md border border-[rgba(255,255,255,0.1)] group shadow-lg"
                >
                    <FaArrowRight className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold">{backLabel}</span>
                </motion.button>
            )}

            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-3 md:gap-5"
            >
                <img
                    src={cmcRamadanImg}
                    alt="CMC Ramadan"
                    className="h-10 md:h-14 object-contain drop-shadow-[0_0_15px_rgba(218,165,32,0.3)]"
                />
                <div className="h-8 md:h-12 w-[1px] bg-white/10 mx-1 md:mx-2 hidden md:block"></div>
                <div className="flex flex-col items-center md:items-start">
                    <h1 className="text-xl md:text-3xl font-bold text-[var(--color-accent)] drop-shadow-glow m-0 leading-none" style={{ fontFamily: "'RamadanFonts', sans-serif" }}>
                        {title}
                    </h1>
                </div>
            </motion.div>
        </div>
    );
};

export default SubPageHeader;
