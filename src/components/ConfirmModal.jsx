import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaTimes, FaCheck } from 'react-icons/fa';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-sm bg-[#0d1512] border border-[var(--color-accent)]/30 rounded-[32px] p-8 shadow-[0_0_50px_rgba(218,165,32,0.1)] overflow-hidden text-center"
                        dir="rtl"
                    >
                        {/* Decorative Background Icon */}
                        <FaMoon className="absolute -top-6 -right-6 text-9xl opacity-5 text-[var(--color-accent)] -rotate-12" />

                        {/* Icon Header */}
                        <div className="w-16 h-16 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[var(--color-accent)]/20 shadow-[0_0_20px_rgba(218,165,32,0.1)]">
                            <FaMoon className="text-[var(--color-accent)] text-2xl" />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4">
                            {title || 'هل أنت متأكد؟'}
                        </h3>

                        <p className="text-gray-400 mb-8 leading-relaxed">
                            {message || 'سيتم احتساب 0 نقطة في حال مغادرتك الآن.'}
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={onConfirm}
                                className="flex-1 bg-gradient-to-r from-[var(--color-accent)] to-[#b8860b] text-[var(--color-bg)] font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-[var(--color-accent)]/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <FaCheck className="text-sm" /> تأكيد
                            </button>
                            <button
                                onClick={onClose}
                                className="flex-1 bg-[rgba(255,255,255,0.05)] text-white font-bold py-3 px-6 rounded-xl border border-white/10 hover:bg-[rgba(255,255,255,0.1)] transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <FaTimes className="text-sm" /> إلغاء
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;
