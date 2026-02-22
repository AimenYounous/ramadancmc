import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import GameLobby from './pages/GameLobby';
import Calendar from './pages/Calendar';
import PrayerTimes from './pages/PrayerTimes';
import EidCountdown from './pages/EidCountdown';
import QuizIntro from './pages/QuizIntro';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';
import WordCrush from './pages/WordCrush';
import DayDetail from './pages/DayDetail';
import SelfDevelopment from './pages/SelfDevelopment/SelfDevelopment';
import TopicList from './pages/SelfDevelopment/TopicList';
import TopicDetail from './pages/SelfDevelopment/TopicDetail';
import { QuizProvider } from './context/QuizContext';

function App() {
    return (
        <QuizProvider>
            <Router>
                <div className="app-container font-body">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/games" element={<GameLobby />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/calendar/day/:dayNum" element={<DayDetail />} />
                        <Route path="/prayer-times" element={<PrayerTimes />} />
                        <Route path="/eid-countdown" element={<EidCountdown />} />
                        <Route path="/quiz-intro" element={<QuizIntro />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/games/word-crush" element={<WordCrush />} />
                        <Route path="/results" element={<Result />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/self-development" element={<SelfDevelopment />} />
                        <Route path="/self-development/:categoryId" element={<TopicList />} />
                        <Route path="/self-development/:categoryId/:topicId" element={<TopicDetail />} />
                    </Routes>
                </div>
            </Router>
        </QuizProvider>
    );
}

export default App;
