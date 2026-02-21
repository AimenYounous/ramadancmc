import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaCheck, FaTimes, FaQuestionCircle } from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';
import { questions } from '../data/questions';

const Quiz = () => {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isAnswered, setIsAnswered] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);

    // Initial delay for smooth transition
    useEffect(() => {
        const timer = setTimeout(() => setQuizStarted(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const currentQuestion = questions[currentQuestionIndex];

    const handleNextQuestion = useCallback(() => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
            setTimeLeft(15);
        } else {
            // Finish Quiz
            navigate('/results', { state: { score, correctCount, total: questions.length } });
        }
    }, [currentQuestionIndex, score, correctCount, navigate]);

    useEffect(() => {
        if (quizStarted && !isAnswered && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !isAnswered) {
            handleAnswer(-1); // Time's up
        }
    }, [timeLeft, isAnswered, quizStarted]);

    const handleAnswer = (index) => {
        if (isAnswered) return;

        setSelectedAnswer(index);
        setIsAnswered(true);

        const isCorrect = index === currentQuestion.correctIndex;
        if (isCorrect) {
            setScore(prev => prev + 10 + timeLeft);
            setCorrectCount(prev => prev + 1);
        }

        // Delay before next question
        setTimeout(() => {
            handleNextQuestion();
        }, 1500);
    };

    if (!currentQuestion) return null;

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen relative flex flex-col items-center bg-[#0a0f0d]" dir="rtl">
            <SubPageHeader title="تحدي المعلومات" />
            <ParticlesBackground />

            <div className="z-10 w-full max-w-2xl px-4 py-8">
                {/* Header Info */}
                <div className="flex justify-between items-center mb-6 text-white bg-[rgba(255,255,255,0.03)] backdrop-blur-xl p-4 rounded-2xl border border-[rgba(255,255,255,0.1)]">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">السؤال</span>
                        <span className="text-xl font-bold font-mono">
                            {currentQuestionIndex + 1} / {questions.length}
                        </span>
                    </div>

                    <div className="flex flex-col items-center">
                        <FaClock className={`mb-1 ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-[var(--color-accent)]'}`} />
                        <div className={`text-2xl font-black font-mono ${timeLeft <= 5 ? 'text-red-500' : 'text-white'}`}>
                            {timeLeft}
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-400">النقاط</span>
                        <span className="text-xl font-bold text-[var(--color-accent)]">{score}</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-[rgba(255,255,255,0.05)] rounded-full mb-8 overflow-hidden border border-[rgba(255,255,255,0.05)]">
                    <motion.div
                        className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[#b8860b] shadow-[0_0_10px_rgba(218,165,32,0.3)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="bg-[rgba(20,30,25,0.8)] backdrop-blur-2xl p-8 md:p-10 rounded-[32px] border border-[rgba(255,255,255,0.1)] shadow-2xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <FaQuestionCircle className="text-[var(--color-accent)] text-xl" />
                            <span className="text-[var(--color-accent)] text-sm font-bold tracking-widest uppercase">
                                {currentQuestion.category}
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-relaxed">
                            {currentQuestion.question}
                        </h2>

                        <div className="grid gap-4">
                            {currentQuestion.options.map((option, idx) => {
                                const isSelected = selectedAnswer === idx;
                                const isCorrect = idx === currentQuestion.correctIndex;

                                let stateStyles = "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)] text-gray-300";

                                if (isAnswered) {
                                    if (isCorrect) {
                                        stateStyles = "bg-green-600/20 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.1)]";
                                    } else if (isSelected) {
                                        stateStyles = "bg-red-600/20 border-red-500 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)]";
                                    } else {
                                        stateStyles = "bg-[rgba(255,255,255,0.01)] border-[rgba(255,255,255,0.02)] text-gray-600 grayscale";
                                    }
                                }

                                return (
                                    <motion.button
                                        key={idx}
                                        whileHover={!isAnswered ? { scale: 1.01, x: -5 } : {}}
                                        whileTap={!isAnswered ? { scale: 0.99 } : {}}
                                        disabled={isAnswered}
                                        onClick={() => handleAnswer(idx)}
                                        className={`w-full p-5 rounded-2xl border text-right font-bold transition-all duration-300 flex items-center justify-between group ${stateStyles}`}
                                    >
                                        <span className="text-lg">{option}</span>
                                        <div className="flex items-center">
                                            {isAnswered && isCorrect && <FaCheck className="text-green-500" />}
                                            {isAnswered && isSelected && !isCorrect && <FaTimes className="text-red-500" />}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Quiz;
