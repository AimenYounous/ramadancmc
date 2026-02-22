import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
    // Persistent State
    const [userXP, setUserXP] = useLocalStorage('cmc-quiz-xp', 0);
    const [level, setLevel] = useLocalStorage('cmc-quiz-level', 1);
    const [matchHistory, setMatchHistory] = useLocalStorage('cmc-quiz-history', []);
    const [bestScore, setBestScore] = useLocalStorage('cmc-quiz-best-score', 0);
    const [registeredPlayers, setRegisteredPlayers] = useLocalStorage('cmc-quiz-players', []);

    // Session State
    const [playerName, setPlayerName] = useState('');
    const [gameState, setGameState] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        isGameOver: false,
        lives: 3
    });

    // Register Player Logic
    const registerPlayer = useCallback((name) => {
        if (!name || name.trim() === '') return;
        setPlayerName(name);
        setRegisteredPlayers(prev => {
            const exists = prev.find(p => p.name === name);
            if (exists) return prev;
            return [{ name, score: 0 }, ...prev].slice(0, 10);
        });
    }, [setPlayerName, setRegisteredPlayers]);

    // Level Up Logic
    useEffect(() => {
        const calculatedLevel = Math.floor(userXP / 100) + 1;
        if (calculatedLevel > level) {
            setLevel(calculatedLevel);
        }
    }, [userXP, level, setLevel]);

    const addXP = useCallback((amount) => {
        setUserXP(prev => prev + amount);
    }, [setUserXP]);

    const saveGameResult = useCallback((score, correct, wrong) => {
        const newEntry = {
            name: playerName || 'Anonymous',
            date: new Date().toISOString(),
            score,
            correct,
            wrong
        };

        // Update registered player score if better
        if (playerName) {
            setRegisteredPlayers(prev => prev.map(p => {
                if (p.name === playerName) {
                    return { ...p, score: Math.max(p.score, score) };
                }
                return p;
            }));
        }

        // Save to history
        setMatchHistory(prev => {
            const newHistory = [newEntry, ...prev];
            return newHistory.sort((a, b) => b.score - a.score).slice(0, 100);
        });

        if (score > bestScore) {
            setBestScore(score);
        }

        // Add XP
        addXP(score);
    }, [playerName, setRegisteredPlayers, setMatchHistory, bestScore, setBestScore, addXP]);

    const resetGame = useCallback(() => {
        setGameState({
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            isGameOver: false,
            lives: 3
        });
    }, [setGameState]);

    const updateGameState = useCallback((newScore, isCorrect) => {
        setGameState(prev => {
            const newLives = isCorrect ? prev.lives : prev.lives - 1;
            return {
                ...prev,
                score: newScore,
                correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
                wrongAnswers: !isCorrect ? prev.wrongAnswers + 1 : prev.wrongAnswers,
                lives: newLives,
                isGameOver: newLives <= 0
            };
        });
    }, [setGameState]);

    return (
        <QuizContext.Provider value={{
            playerName,
            setPlayerName,
            registeredPlayers,
            registerPlayer,
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
