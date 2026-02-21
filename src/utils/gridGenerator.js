/**
 * Generates a randomized word search grid.
 * Supports 8 directions: Horizontal, Vertical, and Diagonal.
 */

const DIRECTIONS = [
    [0, 1],   // Right
    [0, -1],  // Left
    [1, 0],   // Down
    [-1, 0],  // Up
    [1, 1],   // Diagonal Down-Right
    [1, -1],  // Diagonal Down-Left
    [-1, 1],  // Diagonal Up-Right
    [-1, -1]  // Diagonal Up-Left
];

const ARABIC_LETTERS = "أبتثجحخدذرزسشصضطظعغفقكلمنهـوي";

export const generateGrid = (size, words) => {
    // Initialize empty grid
    let grid = Array(size).fill().map(() => Array(size).fill(''));
    let placedWords = [];

    // Shuffle words to place them in random order
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);

    for (const word of shuffledWords) {
        let placed = false;
        let attempts = 0;
        const maxAttempts = 100;

        while (!placed && attempts < maxAttempts) {
            const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
            const startRow = Math.floor(Math.random() * size);
            const startCol = Math.floor(Math.random() * size);

            if (canPlaceWord(grid, word, startRow, startCol, direction, size)) {
                placeWord(grid, word, startRow, startCol, direction);
                placedWords.push({
                    word,
                    start: { r: startRow, c: startCol },
                    dir: direction
                });
                placed = true;
            }
            attempts++;
        }
    }

    // Fill empty cells with random Arabic letters
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (grid[r][c] === '') {
                grid[r][c] = ARABIC_LETTERS[Math.floor(Math.random() * ARABIC_LETTERS.length)];
            }
        }
    }

    return { grid, placedWords };
};

const canPlaceWord = (grid, word, row, col, direction, size) => {
    const [dr, dc] = direction;

    // Check boundaries
    const endRow = row + (word.length - 1) * dr;
    const endCol = col + (word.length - 1) * dc;

    if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) return false;

    // Check collisions
    for (let i = 0; i < word.length; i++) {
        const r = row + i * dr;
        const c = col + i * dc;
        const char = word[i].replace('_', ' '); // Support underscores for space if needed

        if (grid[r][c] !== '' && grid[r][c] !== char) {
            return false;
        }
    }

    return true;
};

const placeWord = (grid, word, row, col, direction) => {
    const [dr, dc] = direction;
    for (let i = 0; i < word.length; i++) {
        const r = row + i * dr;
        const c = col + i * dc;
        grid[r][c] = word[i].replace('_', ' ');
    }
};
