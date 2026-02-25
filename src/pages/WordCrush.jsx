import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaUndo, FaTrophy, FaLightbulb, FaStar, FaBrain } from 'react-icons/fa';
import Confetti from 'react-confetti';
import ParticlesBackground from '../components/ParticlesBackground';
import { wordGames } from '../data/wordGames';
import { generateGrid } from '../utils/gridGenerator';

const WordCrush = () => {
    const navigate = useNavigate();
    const [currentLevel, setCurrentLevel] = useState(0);
    const [gridData, setGridData] = useState({ grid: [], placedWords: [] });
    const [selection, setSelection] = useState([]);
    const [foundWords, setFoundWords] = useState([]);
    const [foundCells, setFoundCells] = useState([]);
    const [foundWordInstances, setFoundWordInstances] = useState([]); // Array of { word, cells }
    const [hintsAvailable, setHintsAvailable] = useState(5); // Start at 5
    const [hintedCells, setHintedCells] = useState([]); // Array of "r-c"
    const [isLevelComplete, setIsLevelComplete] = useState(false);
    const [message, setMessage] = useState('');
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    const level = wordGames.levels[currentLevel];

    // Calculate dynamic font size based on grid size
    const dynamicFontSize = useMemo(() => {
        // Base reference: for gridSize 8, we want approx 1.8rem on desktop
        // For gridSize 16, we want approx 0.9rem
        const scaleFactor = 15;
        const size = scaleFactor / level.gridSize;
        return `${Math.max(0.7, Math.min(size, 2.5))}rem`;
    }, [level.gridSize]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Initialize Level
    const initLevel = useCallback(() => {
        const data = generateGrid(level.gridSize, level.words);
        setGridData(data);
        setFoundWords([]);
        setFoundCells([]);
        setFoundWordInstances([]);
        setSelection([]);
        setHintedCells([]);
        setIsLevelComplete(false);
    }, [level]);

    // Handle hint accumulation per level
    useEffect(() => {
        if (currentLevel > 0) {
            setHintsAvailable(prev => Math.min(prev + 1, 15));
        }
    }, [currentLevel]);

    useEffect(() => {
        initLevel();
    }, [currentLevel, initLevel]);

    const handleCellAction = (row, col, letter) => {
        if (isLevelComplete) return;
        const cellId = `${row}-${col}`;
        // Allow selection even if cell is found to handle overlaps correctly


        if (selection.length === 0) {
            setSelection([{ row, col, letter }]);
        } else {
            const last = selection[selection.length - 1];
            if (last.row === row && last.col === col) {
                setSelection(prev => prev.slice(0, -1));
                return;
            }

            if (selection.some(s => s.row === row && s.col === col)) {
                setSelection([]);
                return;
            }

            const dr = Math.abs(row - last.row);
            const dc = Math.abs(col - last.col);

            if (dr <= 1 && dc <= 1) {
                const newSelection = [...selection, { row, col, letter }];
                setSelection(newSelection);

                const currentString = newSelection.map(s => s.letter).join('');
                const wordsToFind = gridData.placedWords.map(pw => pw.word);
                if (wordsToFind.includes(currentString) && !foundWords.includes(currentString)) {
                    setFoundWords(prev => [...prev, currentString]);
                    setFoundCells(prev => [...prev, ...newSelection.map(s => `${s.row}-${s.col}`)]);
                    setFoundWordInstances(prev => [...prev, { word: currentString, cells: [...newSelection] }]);
                    setSelection([]);
                    setMessage(`ممتاز! وجدت كلمة: ${currentString}`);
                    setTimeout(() => setMessage(''), 2000);
                } else if (newSelection.length > Math.max(...wordsToFind.map(w => w.length), 0)) {
                    setSelection([]);
                }
            } else {
                setSelection([{ row, col, letter }]);
            }
        }
    };

    const handleHint = () => {
        if (hintsAvailable <= 0 || isLevelComplete) return;

        // Find a word not yet found
        const wordsToFind = gridData.placedWords.map(pw => pw.word);
        const remainingWords = wordsToFind.filter(w => !foundWords.includes(w));
        if (remainingWords.length === 0) return;

        const targetWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
        const wordInfo = gridData.placedWords.find(pw => pw.word === targetWord);

        if (wordInfo) {
            // Pick a letter index that hasn't been hinted yet for this word
            // For simplicity, find the first letter of this word that is NOT found
            const [dr, dc] = wordInfo.dir;
            for (let i = 0; i < targetWord.length; i++) {
                const r = wordInfo.start.r + i * dr;
                const c = wordInfo.start.c + i * dc;
                const cellId = `${r}-${c}`;

                if (!foundCells.includes(cellId) && !hintedCells.includes(cellId)) {
                    setHintedCells(prev => [...prev, cellId]);
                    setHintsAvailable(prev => prev - 1);
                    setMessage(`تلميح: انظر إلى الحرف المضيء!`);
                    setTimeout(() => setMessage(''), 2000);
                    return;
                }
            }
        }
    };

    useEffect(() => {
        const wordsToFind = gridData.placedWords.map(pw => pw.word);
        if (foundWords.length === wordsToFind.length && wordsToFind.length > 0) {
            setTimeout(() => setIsLevelComplete(true), 500);
        }
    }, [foundWords, gridData.placedWords]);

    const nextLevel = () => {
        if (currentLevel < wordGames.levels.length - 1) {
            setCurrentLevel(prev => prev + 1);
        } else {
            navigate('/games');
        }
    };

    if (gridData.grid.length === 0) return null;

    return (
        <div className="min-h-screen w-full relative flex flex-col p-4 md:p-6 bg-[#0a0f0d] overflow-x-hidden" dir="rtl">
            <ParticlesBackground />
            {isLevelComplete && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={600} />}

            {/* Top Bar - Very Minimal */}
            <div className="z-20 w-full flex justify-between items-center mb-3 shrink-0 px-2 lg:px-6">
                <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    onClick={() => navigate('/games')}
                    className="flex items-center gap-2 text-white/60 hover:text-[var(--color-accent)] transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-xl text-xs font-bold"
                >
                    <FaArrowRight /> عودة للتحديات
                </motion.button>
                <div className="text-[var(--color-accent)] opacity-20"><FaStar /></div>
            </div>

            {/* Main Application Area */}
            <div className="z-10 flex-1 flex flex-col lg:flex-row gap-4 px-2 lg:px-6 mb-6">

                {/* Left Panel: Modular Cards */}
                <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-3 shrink-0 h-full overflow-hidden">

                    {/* Card 1: Level Indicator */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[rgba(20,30,25,0.7)] backdrop-blur-3xl p-3 rounded-2xl border border-white/10 shadow-xl flex flex-col items-center justify-center shrink-0"
                    >
                        <span className="text-[10px] text-[var(--color-accent)] font-black tracking-[0.4em] uppercase opacity-70 mb-1">المستوى</span>
                        <div className="text-xl font-black text-white flex items-center gap-2">
                            <span className="text-[var(--color-accent)]">{currentLevel + 1}</span>
                            <span className="text-white/20">/</span>
                            <span className="text-white/40 text-sm italic">10</span>
                        </div>
                    </motion.div>

                    {/* Card 2: Level Title */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-[rgba(218,165,32,0.05)] backdrop-blur-3xl p-4 rounded-3xl border border-[var(--color-accent)]/20 shadow-2xl flex flex-col items-center text-center shrink-0"
                    >
                        <h1 className="text-2xl md:text-3xl font-black text-white drop-shadow-glow">
                            {level.title}
                        </h1>
                        <div className="w-12 h-1 bg-[var(--color-accent)] rounded-full mt-3 opacity-30"></div>
                    </motion.div>

                    {/* Card 3: Word List - Maximized height in sidebar */}
                    <div className="flex-1 bg-[rgba(20,30,25,0.8)] backdrop-blur-3xl p-5 rounded-[32px] border border-white/5 shadow-2xl overflow-hidden flex flex-col min-h-0">
                        <div className="flex flex-col items-center gap-1 mb-4 shrink-0">
                            <h3 className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase">الكلمات المطلوبة</h3>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar px-1">
                            <div className="grid grid-cols-1 gap-2.5">
                                {level.words.filter(w => gridData.placedWords.some(pw => pw.word === w)).map((word, i) => {
                                    const isFound = foundWords.includes(word);
                                    return (
                                        <motion.div
                                            key={i}
                                            className={`p-3 rounded-2xl border flex flex-col items-center justify-center transition-all duration-500 relative overflow-hidden ${isFound
                                                ? 'bg-green-500/10 border-green-500/40 text-green-400'
                                                : 'bg-white/5 border-white/5 text-gray-400'
                                                }`}
                                        >
                                            <div className="flex gap-1 mb-1.5" dir="ltr">
                                                {word.split('').map((_, idx) => (
                                                    <div key={idx} className={`w-2.5 h-2.5 rounded-[2px] transition-all duration-700 ${isFound ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] scale-110' : 'bg-white/10'}`}></div>
                                                ))}
                                            </div>
                                            <span className={`text-sm md:text-base font-black tracking-widest ${isFound ? 'line-through opacity-20 italic' : ''}`}>
                                                {isFound ? word : '⬜'.repeat(word.length)}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action Cards: Hints & Reset */}
                    <div className="grid grid-cols-2 gap-3 shrink-0">
                        {/* Hint Card */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleHint}
                            disabled={hintsAvailable <= 0}
                            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-[28px] font-bold transition-all border shadow-xl ${hintsAvailable > 0
                                ? 'bg-yellow-500/10 border-yellow-500/40 text-yellow-500 hover:bg-yellow-500/20'
                                : 'bg-white/5 border-white/10 text-gray-600 opacity-50'
                                }`}
                        >
                            <FaLightbulb className={`text-2xl ${hintsAvailable > 0 ? "animate-pulse" : ""}`} />
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] uppercase tracking-tighter opacity-70">المساعد</span>
                                <span className="text-sm">تلميح ({hintsAvailable})</span>
                            </div>
                        </motion.button>

                        {/* Reset Selection Card */}
                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelection([])}
                            className="flex flex-col items-center justify-center gap-2 p-4 rounded-[28px] bg-red-500/5 border border-red-500/10 text-red-400/60 hover:text-red-400 transition-all shadow-xl"
                        >
                            <FaUndo className="text-xl" />
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] uppercase tracking-tighter opacity-70">مسح</span>
                                <span className="text-sm">تحديد</span>
                            </div>
                        </motion.button>
                    </div>
                </div>

                {/* Right Panel: Game Grid - MAXIMIZED */}
                <div className="flex-1 flex items-center justify-center relative min-h-[400px] md:min-h-0">
                    <div
                        className="bg-[rgba(20,30,25,0.85)] backdrop-blur-3xl p-2 md:p-6 rounded-2xl md:rounded-3xl border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.6)] relative overflow-hidden flex items-center justify-center w-full max-w-[min(100%,82vh)] aspect-square"
                    >
                        {/* Interactive Message Overlay */}
                        <AnimatePresence>
                            {message && (
                                <motion.div
                                    initial={{ y: 15, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -15, opacity: 0 }}
                                    className="absolute top-10 left-1/2 -translate-x-1/2 z-30 bg-white/5 backdrop-blur-2xl border border-white/20 text-white px-8 py-3 rounded-full font-bold shadow-[0_10px_40px_rgba(0,0,0,0.5)] pointer-events-none text-sm border-t-white/30"
                                >
                                    {message}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div
                            className="grid gap-1.5 md:gap-2.5 w-full h-full"
                            style={{
                                gridTemplateColumns: `repeat(${level.gridSize}, minmax(0, 1fr))`,
                                gridTemplateRows: `repeat(${level.gridSize}, minmax(0, 1fr))`,
                            }}
                        >
                            {gridData.grid.map((row, rowIndex) =>
                                row.map((letter, colIndex) => {
                                    const cellId = `${rowIndex}-${colIndex}`;
                                    const isSelected = selection.some(s => s.row === rowIndex && s.col === colIndex);
                                    const isFound = foundCells.includes(cellId);
                                    const isHinted = hintedCells.includes(cellId);

                                    return (
                                        <motion.button
                                            key={cellId}
                                            whileHover={!isFound ? { scale: 1.04, zIndex: 10 } : {}}
                                            whileTap={!isFound ? { scale: 0.96 } : {}}
                                            onClick={() => handleCellAction(rowIndex, colIndex, letter)}
                                            className={`aspect-square flex items-center justify-center font-black rounded-md border transition-all duration-300 relative ${isSelected
                                                ? 'bg-[var(--color-accent)] text-black border-[var(--color-accent)] z-10 shadow-[0_0_30px_rgba(218,165,32,0.6)] scale-105'
                                                : isFound
                                                    ? 'bg-transparent text-[var(--color-accent)] drop-shadow-[0_0_8px_rgba(218,165,32,0.4)]'
                                                    : isHinted
                                                        ? 'bg-yellow-500/20 border-yellow-500/80 text-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.5)] animate-bounce-slow z-10'
                                                        : 'bg-white/[0.03] border-white/10 text-white/90'
                                                }`}
                                            style={{ fontSize: dynamicFontSize }}
                                        >
                                            <span className="relative z-10 leading-none">{letter}</span>
                                            {isFound && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="absolute inset-0 rounded-md bg-[var(--color-accent)] opacity-10 pointer-events-none"
                                                />
                                            )}
                                        </motion.button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Level Complete Modal */}
            <AnimatePresence>
                {isLevelComplete && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }}
                            className="bg-gradient-to-br from-[#1a2520] to-[#0a0f0d] p-10 rounded-[50px] border border-[var(--color-accent)] max-w-md w-full flex flex-col items-center text-center relative shadow-[0_0_50px_rgba(218,165,32,0.2)]"
                        >
                            <img
                                src="/assets/gagnant.png"
                                alt="Winner"
                                className="w-64 h-auto block mx-auto mb-8 drop-shadow-glow"
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                onClick={nextLevel}
                                className="w-full bg-[var(--color-accent)] hover:bg-[#b8860b] text-black font-black py-5 rounded-3xl transition-all shadow-2xl flex items-center justify-center gap-3 text-xl"
                            >
                                {currentLevel < wordGames.levels.length - 1 ? 'المستوى التالي' : 'العودة للمنصة'}
                                <FaArrowRight className="rotate-180" />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>
                {`
                    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(218, 165, 32, 0.3); border-radius: 10px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(218, 165, 32, 0.5); }
                `}
            </style>
        </div>
    );
};

export default WordCrush;
