import { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
    // Persistent State
    const [userXP, setUserXP] = useLocalStorage('cmc-quiz-xp', 0);
    const [level, setLevel] = useLocalStorage('cmc-quiz-level', 1);
    const [matchHistory, setMatchHistory] = useLocalStorage('cmc-quiz-history', []);
    const [bestScore, setBestScore] = useLocalStorage('cmc-quiz-best-score', 0);

    // Session State
    const [playerName, setPlayerName] = useState('');
    const [gameState, setGameState] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        isGameOver: false,
        lives: 3
    });

    // Level Up Logic
    useEffect(() => {
        const calculatedLevel = Math.floor(userXP / 100) + 1;
        if (calculatedLevel > level) {
            setLevel(calculatedLevel);
            // Could trigger a level up modal/toast here
        }
    }, [userXP, level, setLevel]);

    const addXP = (amount) => {
        setUserXP(prev => prev + amount);
    };

    const saveGameResult = (score, correct, wrong) => {
        const newEntry = {
            name: playerName || 'Anonymous',
            date: new Date().toISOString(),
            score,
            correct,
            wrong
        };

        // Save to history (Global Leaderboard Simulation)
        setMatchHistory(prev => {
            const newHistory = [...prev, newEntry];
            // Sort by score desc
            return newHistory.sort((a, b) => b.score - a.score).slice(0, 100);
        });

        if (score > bestScore) {
            setBestScore(score);
        }

        // Add XP based on score
        addXP(score);
    };

    const resetGame = () => {
        setGameState({
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            isGameOver: false,
            lives: 3
        });
    };

    const updateGameState = (newScore, isCorrect) => {
        setGameState(prev => ({
            ...prev,
            score: newScore,
            correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
            wrongAnswers: !isCorrect ? prev.wrongAnswers + 1 : prev.wrongAnswers,
            lives: !isCorrect ? prev.lives - 1 : prev.lives,
            isGameOver: !isCorrect && prev.lives - 1 <= 0
        }));
    };

    return (
        <QuizContext.Provider value={{
            playerName,
            setPlayerName,
            userXP,
            level,
            matchHistory,
            bestScore,
            gameState,
            setGameState,
            addXP,
            saveGameResult,
            resetGame,
            updateGameState
        }}>
            {children}
        </QuizContext.Provider>
    );
};
