import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

// Mock scrollTo
window.scrollTo = vi.fn();

// Mock Confetti
vi.mock('react-confetti', () => ({
    default: () => <div data-testid="confetti">Confetti!</div>
}));

// Mock Framer Motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }) => <div {...props}>{children}</div>,
        button: ({ children, ...props }) => <button {...props}>{children}</button>,
    },
    AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock Particles
vi.mock('../components/ParticlesBackground', () => ({
    default: () => <div data-testid="particles"></div>
}));

describe('App Flow Arabic', () => {
    beforeEach(() => {
        window.history.pushState({}, 'Home', '/');
        window.localStorage.clear();
    });

    it('validates name input before starting', async () => {
        render(<App />);

        expect(screen.getByText(/CMC/i)).toBeInTheDocument();

        const startButton = screen.getByText(/ابدأ التحدي/i);
        fireEvent.click(startButton);

        // Should show error validation
        expect(await screen.findByText(/المرجو إدخال الاسم/i)).toBeInTheDocument();
    });

    it('starts quiz after entering name', async () => {
        render(<App />);

        const input = screen.getByPlaceholderText(/أدخل اسمك الكامل/i);
        fireEvent.change(input, { target: { value: 'Test Player' } });

        const startButton = screen.getByText(/ابدأ التحدي/i);
        fireEvent.click(startButton);

        // Expect to navigate to quiz (check for lives/timer key elements or question)
        expect(await screen.findByText(/الوقت المتبقي/i)).toBeInTheDocument();
    });

    it('renders leaderboard', async () => {
        render(<App />);

        const lbBtn = screen.getByText(/لوحة المتصدرين/i);
        fireEvent.click(lbBtn);

        expect(await screen.findByText(/لوحة المتصدرين 🏆/i)).toBeInTheDocument();
    });
});
