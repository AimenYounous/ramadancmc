import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white shadow-lg hover:shadow-[var(--color-primary)]/50",
        secondary: "bg-[var(--color-accent)] text-[var(--color-bg)] shadow-md hover:bg-[var(--color-accent-hover)]",
        outline: "border-2 border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)]",
        ghost: "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
    };

    // We'll use inline styles/classes logic here or CSS modules. 
    // Since we are using standard CSS in index.css, I will apply styles via classNames 
    // but for simplicity and "modern" feel I'll use inline styles mapped to our CSS vars/classes logic
    // or just use the className prop mainly. 

    // Wait, I don't have Tailwind installed (I'm using vanilla CSS + CSS vars as per plan).
    // So I should write a CSS file for this or use styled-components logic via inline styles.
    // Let's create a specific CSS file for components or use inline styled objects for simplicity in this artifact?
    // Actually, let's Stick to standard CSS classes. I will create a components.css file later or assume global classes.
    // BETTER: I'll use CSS modules or a common CSS file. Let's create `src/styles/components.css` later.
    // For now, I'll attach a className that I will define.

    return (
        <button
            className={`btn btn-${variant} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
