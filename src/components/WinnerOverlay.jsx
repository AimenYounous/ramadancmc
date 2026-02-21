import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WinnerOverlay = ({ isVisible, onClose, autoCloseTime = 3000 }) => {
    useEffect(() => {
        if (isVisible && autoCloseTime > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, autoCloseTime);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose, autoCloseTime]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-auto"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
                        animate={{
                            scale: 1,
                            rotate: 0,
                            opacity: 1,
                            transition: { type: "spring", stiffness: 300, damping: 15 }
                        }}
                        exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
                        className="relative max-w-[90vw] max-h-[90vh]"
                    >
                        {/* Shimmer/Glow effect behind the image */}
                        <div className="absolute inset-0 bg-[var(--color-accent)] opacity-20 blur-[100px] rounded-full animate-pulse" />

                        <img
                            src="/assets/gagnant.png"
                            alt="Winner"
                            className="relative z-10 w-full max-w-[500px] h-auto object-contain drop-shadow-[0_0_30px_rgba(218,165,32,0.6)]"
                        />

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WinnerOverlay;
