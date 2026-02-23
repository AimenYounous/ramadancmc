import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import cmcRamadanImg from '/assets/cmc_ramadan.png';

const SubPageHeader = ({
    title,
    showHome = true,
    backLabel = "الرئيسية",
    backPath = "/",
    onBack = null,
    subBackLabel = null,
    subBackPath = null,
    onSubBack = null,
    transparent = false
}) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(backPath);
        }
    };

    const handleSubBack = () => {
        if (onSubBack) {
            onSubBack();
        } else {
            navigate(subBackPath);
        }
    };

    return (
        <div className={`z-[60] w-full flex justify-center items-center p-4 md:p-10 sticky top-0 bg-transparent ${!transparent ? 'backdrop-blur-md border-b border-white/5' : ''}`}>
            <div className="absolute right-4 md:right-10 flex flex-col md:flex-row items-end md:items-center gap-1.5 md:gap-3">
                {subBackLabel && (
                    <motion.button
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        onClick={handleSubBack}
                        className="flex items-center gap-1.5 md:gap-2 text-[var(--color-accent)] hover:text-white transition-colors bg-[rgba(218,165,32,0.1)] px-3 py-1 md:px-4 md:py-2 rounded-full backdrop-blur-md border border-[rgba(218,165,32,0.2)] group shadow-lg text-[10px] md:text-sm whitespace-nowrap"
                    >
                        <FaArrowRight className="text-[10px] md:text-sm group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold">{subBackLabel}</span>
                    </motion.button>
                )}

                {showHome && (
                    <motion.button
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        onClick={handleBack}
                        className="flex items-center gap-1.5 md:gap-2 text-white hover:text-[var(--color-accent)] transition-colors bg-[rgba(255,255,255,0.05)] px-3 py-1 md:px-4 md:py-2 rounded-full backdrop-blur-md border border-[rgba(255,255,255,0.1)] group shadow-lg text-[10px] md:text-sm whitespace-nowrap"
                    >
                        <FaArrowRight className="text-[10px] md:text-sm group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold">{backLabel}</span>
                    </motion.button>
                )}
            </div>

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
                <div className="flex flex-col items-center md:items-start max-w-[150px] sm:max-w-none">
                    <h1 className="text-lg md:text-3xl font-bold text-[var(--color-accent)] drop-shadow-glow m-0 leading-none truncate" style={{ fontFamily: "'RamadanFonts', sans-serif" }}>
                        {title}
                    </h1>
                </div>
            </motion.div>
        </div>
    );
};

export default SubPageHeader;
