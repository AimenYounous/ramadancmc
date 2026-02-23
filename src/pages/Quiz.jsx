import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaCheck, FaTimes, FaQuestionCircle, FaHeart, FaDoorOpen } from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';
import SubPageHeader from '../components/SubPageHeader';
import { questions } from '../data/questions';
import WinnerOverlay from '../components/WinnerOverlay';
import ConfirmModal from '../components/ConfirmModal';
import { useQuiz } from '../context/QuizContext';

const Quiz = () => {
    const navigate = useNavigate();
    const { playerName, gameState, updateGameState, resetGame, saveGameResult } = useQuiz();
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isAnswered, setIsAnswered] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [showWinner, setShowWinner] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [lives, setLives] = useState(3);

    // Initial check for player name and randomize questions
    useEffect(() => {
        // Fallback check to localStorage if state hasn't updated yet
        const persistentName = localStorage.getItem('cmc-quiz-player-name');
        const finalName = playerName || (persistentName ? JSON.parse(persistentName) : '');

        if (!finalName) {
            navigate('/quiz-intro');
            return;
        }

        // Randomize and pick 15 questions
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        setSessionQuestions(shuffled.slice(0, 15));

        resetGame();
        const timer = setTimeout(() => setQuizStarted(true), 500);
        return () => clearTimeout(timer);
    }, [playerName, resetGame, navigate]);

    const currentQuestion = sessionQuestions[currentQuestionIndex];

    const finishQuiz = useCallback((status = 'completed') => {
        if (status === 'completed') {
            setShowWinner(true);
            saveGameResult(score, correctCount, wrongCount);
            setTimeout(() => {
                navigate('/results', { state: { score, correctCount, total: 15, status: 'win' } });
            }, 2500);
        } else if (status === 'lost') {
            saveGameResult(score, correctCount, wrongCount);
            navigate('/results', { state: { score, correctCount, total: 15, status: 'loss' } });
        } else {
            // Aborted/Left
            navigate('/games');
        }
    }, [score, correctCount, wrongCount, navigate, saveGameResult]);

    const handleNextQuestion = useCallback(() => {
        if (currentQuestionIndex < 14) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
            setTimeLeft(15);
        } else {
            finishQuiz('completed');
        }
    }, [currentQuestionIndex, finishQuiz]);

    const handleAnswer = useCallback((index) => {
        if (isAnswered) return;

        setSelectedAnswer(index);
        setIsAnswered(true);

        const isCorrect = index === currentQuestion.correctIndex;
        if (isCorrect) {
            const pointsGained = 10 + timeLeft;
            setScore(prev => prev + pointsGained);
            setCorrectCount(prev => prev + 1);
            updateGameState(score + pointsGained, true);
        } else {
            setWrongCount(prev => prev + 1);
            const newLives = lives - 1;
            setLives(newLives);
            updateGameState(score, false);

            if (newLives <= 0) {
                setTimeout(() => finishQuiz('lost'), 1500);
                return;
            }
        }

        // Delay before next question
        setTimeout(() => {
            handleNextQuestion();
        }, 1500);
    }, [isAnswered, currentQuestion, timeLeft, score, updateGameState, lives, finishQuiz, handleNextQuestion]);

    useEffect(() => {
        if (quizStarted && !isAnswered && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (quizStarted && timeLeft === 0 && !isAnswered) {
            handleAnswer(-1); // Time's up
        }
    }, [timeLeft, isAnswered, quizStarted, handleAnswer]);

    const handleLeave = () => {
        setShowConfirm(true);
    };

    if (!currentQuestion) return null;

    const progress = ((currentQuestionIndex + 1) / 15) * 100;

    return (
        <div className="min-h-screen relative flex flex-col items-center bg-[#0a0f0d]" dir="rtl">
            <SubPageHeader title="تحدي المعلومات" showHome={false} className="z-[60]" />
            <ParticlesBackground />

            {/* Leave Button */}
            <div className="absolute top-6 left-6 z-[70]">
                <button
                    onClick={handleLeave}
                    className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 px-4 py-2 rounded-xl border border-red-500/20 transition-all font-bold text-sm shadow-lg backdrop-blur-md"
                >
                    <FaDoorOpen /> مغادرة
                </button>
            </div>

            <div className="z-10 w-full max-w-2xl px-4 py-8 mt-12">
                {/* Header Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 text-white bg-[rgba(255,255,255,0.03)] backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-[rgba(255,255,255,0.1)] shadow-xl mt-4 md:mt-0">
                    <div className="flex flex-col">
                        <span className="text-[10px] md:text-xs text-gray-400">السؤال</span>
                        <span className="text-base md:text-xl font-bold font-mono">
                            {currentQuestionIndex + 1} / 15
                        </span>
                    </div>

                    <div className="flex flex-col items-center">
                        <FaClock className={`mb-1 ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-[var(--color-accent)]'}`} />
                        <div className={`text-xl md:text-2xl font-black font-mono ${timeLeft <= 5 ? 'text-red-500' : 'text-white'}`}>
                            {timeLeft}
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-[10px] md:text-xs text-gray-400">النقاط</span>
                        <span className="text-xl md:text-2xl font-black text-[var(--color-accent)]">
                            {score}
                        </span>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-[10px] md:text-xs text-gray-400">المحاولات</span>
                        <div className="flex gap-1 mt-1">
                            {[...Array(3)].map((_, i) => (
                                <FaHeart
                                    key={i}
                                    className={`text-sm md:text-base ${i < lives ? 'text-red-500' : 'text-gray-700'} transition-colors duration-300`}
                                />
                            ))}
                        </div>
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
                        className="bg-[rgba(20,30,25,0.8)] backdrop-blur-2xl p-8 md:p-10 rounded-[32px] border border-[rgba(255,255,255,0.1)] shadow-2xl relative"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <FaQuestionCircle className="text-[var(--color-accent)] text-xl" />
                            <span className="text-[var(--color-accent)] text-sm font-bold tracking-widest uppercase">
                                {currentQuestion.category}
                            </span>
                        </div>

                        <h2 className="text-xl md:text-3xl font-bold text-white mb-6 md:mb-10 leading-relaxed text-center md:text-right">
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
            {/* Overlays */}
            <WinnerOverlay isVisible={showWinner} onClose={() => setShowWinner(false)} />
            <ConfirmModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={() => finishQuiz('aborted')}
                title="هل أنت متأكد من المغادرة؟"
                message="سيتم احتساب 0 نقطة لهذا التحدي."
            />
        </div>
    );
};

export default Quiz;
