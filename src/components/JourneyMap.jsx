import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaCompass, FaLightbulb, FaLock } from 'react-icons/fa';

const JourneyMap = ({ currentDay = 5 }) => {
    const totalDays = 30;
    const navigate = useNavigate();

    // ... (rest of getPoints and generatePath stays same)

    // Grid-based snake path
    const getPoints = () => {
        const points = [];
        const width = 800;
        const height = 500;

        const cols = 6;
        const rows = 5;
        const paddingX = 100;
        const paddingY = 90;
        const spacingX = (width - paddingX * 2) / (cols - 1);
        const spacingY = (height - paddingY * 2) / (rows - 1);

        for (let i = 0; i < totalDays; i++) {
            const rowIndex = Math.floor(i / cols);
            const colIndex = i % cols;

            let x;
            if (rowIndex % 2 === 0) {
                x = paddingX + colIndex * spacingX;
            } else {
                x = paddingX + (cols - 1 - colIndex) * spacingX;
            }

            const wave = Math.sin(colIndex * 1.5) * 15;
            const y = paddingY + rowIndex * spacingY + wave;

            points.push({ x, y, day: i + 1 });
        }
        return points;
    };

    const nodes = getPoints();

    const generatePath = () => {
        if (nodes.length === 0) return "";
        let path = `M ${nodes[0].x} ${nodes[0].y}`;
        for (let i = 1; i < nodes.length; i++) {
            const prev = nodes[i - 1];
            const curr = nodes[i];
            const cp1x = prev.x + (curr.x - prev.x) / 1.5;
            const cp1y = prev.y;
            const cp2x = curr.x - (curr.x - prev.x) / 1.5;
            const cp2y = curr.y;
            path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
        }
        return path;
    };

    const pathData = generatePath();

    return (
        <div className="relative w-full h-[calc(100vh-140px)] flex items-center justify-center overflow-hidden p-4 perspective-1000">
            {/* 3D Depth Container */}
            <motion.div
                className="relative w-full h-full max-w-6xl aspect-[1.1/1] sm:aspect-[1.6/1] shrink-0 rounded-xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] ramadan-geometric-pattern emerald-silk"
                initial={{ rotateX: 20, y: 50, opacity: 0 }}
                animate={{ rotateX: window.innerWidth < 768 ? 2 : 5, y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ transformStyle: "preserve-3d" }}
            >

                {/* Subtle Animating Light Overlay */}
                <motion.div
                    className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,215,0,0.15)_0%,transparent_70%)]"
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Islamic Pattern Secondary Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-20 islamic-pattern bg-repeat" style={{ transform: "translateZ(1px)" }}></div>

                <div className="absolute top-10 right-14 opacity-20 text-[#FFD700]" style={{ transform: "translateZ(10px)" }}>
                    <FaCompass size={120} className="rotate-12 drop-shadow-2xl" />
                </div>

                <svg
                    viewBox="0 0 800 500"
                    className="w-full h-full z-10 p-4"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ transform: "translateZ(10px)" }}
                >
                    <defs>
                        <filter id="goldGlow">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#065f46" />
                            <stop offset="100%" stopColor="#064e3b" />
                        </linearGradient>
                        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FFF2AF" />
                            <stop offset="50%" stopColor="#DAA520" />
                            <stop offset="100%" stopColor="#B8860B" />
                        </linearGradient>
                    </defs>

                    {/* Mosque Silhouettes in Background */}
                    <path
                        d="M0 500 L0 450 Q50 400 100 450 T200 450 T300 450 T400 430 T500 450 T600 450 T700 420 T800 450 L800 500 Z"
                        fill="#064e3b"
                        opacity="0.1"
                    />

                    {/* Dotted Trail (Base) */}
                    <path
                        d={pathData}
                        fill="none"
                        stroke="rgba(218, 165, 32, 0.2)"
                        strokeWidth="3"
                        strokeDasharray="4 8"
                        strokeLinecap="round"
                    />

                    {/* Active Dotted Golden Trail */}
                    <motion.path
                        d={pathData}
                        fill="none"
                        stroke="#FFD700"
                        strokeWidth="4"
                        strokeDasharray="0 15"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 5000" }}
                        animate={{ strokeDasharray: `1 12` }}
                        style={{
                            pathLength: Math.min(currentDay / totalDays, 1),
                            filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))'
                        }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    />

                    {/* Ramadan Kareem Start Banner */}
                    <motion.g
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transform={`translate(${nodes[0].x - 65}, ${nodes[0].y - 35})`}
                        style={{ transform: "translateZ(20px)" }}
                    >
                        <path d="M-45 0 L45 0 L55 12 L45 24 L-45 24 L-55 12 Z" fill="url(#goldGrad)" stroke="#064e3b" strokeWidth="1" />
                        <text
                            x="0"
                            y="12"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize="8"
                            fontWeight="bold"
                            fill="#064e3b"
                            className="treasure-text"
                        >
                            Ramadan Kareem
                        </text>
                    </motion.g>


                    {/* Eid Al Fitr End Banner - Rendered BEFORE nodes to be underneath */}
                    <motion.g
                        initial={{ scale: 0, opacity: 0, x: nodes[29].x - 60, y: nodes[29].y + 35 }}
                        animate={{ scale: 1, opacity: 1, x: nodes[29].x - 60, y: nodes[29].y + 35 }}
                        transition={{ delay: 1 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <path d="M-60 0 L60 0 L70 15 L60 30 L-60 30 L-70 15 Z" fill="url(#goldGrad)" stroke="#064e3b" strokeWidth="1" />
                        <foreignObject x="-55" y="0" width="110" height="30">
                            <div className="flex flex-col items-center justify-center text-[#064e3b] h-full">
                                <span className="text-[9px] font-black whitespace-nowrap">Eid Al Fitr Mubarak</span>
                                <FaMoon size={8} className={currentDay >= 30 ? "animate-bounce text-[#FFD700]" : "opacity-60"} />
                            </div>
                        </foreignObject>
                    </motion.g>

                    {/* Nodes (Stations) */}
                    {nodes.map((node, index) => {
                        const dayNum = index + 1;
                        const isPassed = dayNum <= currentDay;
                        const isCurrent = dayNum === currentDay;
                        const isLocked = dayNum > currentDay;

                        return (
                            <motion.g
                                key={node.day}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.02 }}
                                className={`${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                style={{ transform: isCurrent ? "translateZ(30px)" : "translateZ(10px)" }}
                                onClick={() => {
                                    if (!isLocked) {
                                        navigate(`/calendar/day/${dayNum}`);
                                    }
                                }}
                            >
                                {/* 3D Medallion with Shadow */}
                                <circle
                                    cx={node.x}
                                    cy={node.y + 4}
                                    r="18"
                                    fill="rgba(0,0,0,0.4)"
                                    filter="blur(4px)"
                                />
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r="18"
                                    fill={isLocked ? "rgba(20,30,25,0.8)" : (isPassed ? "url(#goldGrad)" : "rgba(255,255,255,0.7)")}
                                    stroke={isLocked ? "rgba(255,255,255,0.1)" : (isPassed ? "#DAA520" : "rgba(255,255,255,0.2)")}
                                    strokeWidth="2"
                                    className="transition-all duration-500 shadow-2xl"
                                    style={{
                                        filter: isPassed ? 'drop-shadow(0 0 10px rgba(218, 165, 32, 0.6))' : 'none'
                                    }}
                                />

                                {isCurrent && (
                                    <motion.circle
                                        cx={node.x}
                                        cy={node.y}
                                        r="24"
                                        fill="none"
                                        stroke="#FFD700"
                                        strokeWidth="3"
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                )}

                                {isLocked ? (
                                    <g transform={`translate(${node.x - 5}, ${node.y - 5})`}>
                                        <FaLock size={10} className="fill-white/20" />
                                    </g>
                                ) : (
                                    <text
                                        x={node.x}
                                        y={node.y}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        fontSize="14"
                                        fontWeight="900"
                                        className={`treasure-text ${isPassed ? 'fill-[#064e3b]' : 'fill-[#065f46] opacity-80'}`}
                                        style={{ filter: "drop-shadow(0 1px 1px rgba(255,255,255,0.2))" }}
                                    >
                                        {dayNum}
                                    </text>
                                )}
                            </motion.g>
                        );
                    })}

                    {/* Mascot Marker */}
                    {nodes[currentDay - 1] && (
                        <motion.g
                            initial={false}
                            animate={{
                                x: nodes[currentDay - 1].x,
                                y: nodes[currentDay - 1].y - 45
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            style={{ transform: "translateZ(50px)" }}
                        >
                            <foreignObject x="-20" y="-20" width="40" height="40">
                                <motion.div
                                    className="w-full h-full flex items-center justify-center p-1 bg-[rgba(255,215,0,0.2)] rounded-full backdrop-blur-md border-2 border-[#FFD700] shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                                    animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <FaMoon size={24} className="text-[#FFD700] drop-shadow-lg" />
                                </motion.div>
                            </foreignObject>

                            <ellipse
                                cx="0"
                                cy="30"
                                rx="10"
                                ry="4"
                                fill="rgba(0, 0, 0, 0.4)"
                                filter="blur(4px)"
                            />
                        </motion.g>
                    )}

                </svg>

                {/* Islamic Pattern Border Overlay (Now more subtle edges) */}
                <div className="absolute inset-0 pointer-events-none opacity-5 islamic-pattern"></div>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.6)]"></div>
            </motion.div>
        </div>
    );
};

export default JourneyMap;
