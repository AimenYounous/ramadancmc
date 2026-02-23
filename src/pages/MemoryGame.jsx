import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaBrain } from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';

const MemoryGame = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white relative p-6 text-center">
            <ParticlesBackground />
            <button
                onClick={() => navigate('/games')}
                className="absolute top-6 right-6 z-20 flex items-center gap-2 text-[var(--color-accent)] hover:underline"
            >
                <FaArrowRight /> العودة للألعاب
            </button>
            <div className="z-10 text-center glass-card p-6 md:p-10 max-w-lg w-full">
                <FaBrain className="mx-auto text-4xl md:text-6xl text-[var(--color-accent)] mb-6" />
                <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white">لعبة الذاكرة</h1>
                <p className="text-lg md:text-xl text-gray-300">هذه اللعبة قيد التطوير...</p>
            </div>
        </div>
    );
};
export default MemoryGame;
