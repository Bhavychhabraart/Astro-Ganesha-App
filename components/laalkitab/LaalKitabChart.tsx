import React from 'react';
import { Planet } from '../../types';

interface LaalKitabChartProps {
    chakra: { [house: string]: Planet[] };
}

const PLANET_ABBR: Record<Planet, string> = {
    Sun: 'Su', Moon: 'Mo', Mars: 'Ma', Mercury: 'Me', Jupiter: 'Ju', Venus: 'Ve', Saturn: 'Sa', Rahu: 'Ra', Ketu: 'Ke', Ascendant: 'As'
};

export const LaalKitabChart: React.FC<LaalKitabChartProps> = ({ chakra }) => {
    const size = 300;
    const center = size / 2;

    const housePositions = [
        { house: 1,  x: center, y: size * 0.25, rashiX: center, rashiY: size * 0.1 },
        { house: 2,  x: size * 0.25, y: size * 0.25, rashiX: size * 0.1, rashiY: size * 0.1 },
        { house: 3,  x: size * 0.25, y: center, rashiX: size * 0.1, rashiY: center },
        { house: 4,  x: center, y: center, rashiX: size * 0.35, rashiY: size * 0.35 },
        { house: 5,  x: size * 0.25, y: size * 0.75, rashiX: size * 0.1, rashiY: size * 0.9 },
        { house: 6,  x: center, y: size * 0.75, rashiX: center, rashiY: size * 0.9 },
        { house: 7,  x: size * 0.75, y: size * 0.75, rashiX: size * 0.9, rashiY: size * 0.9 },
        { house: 8,  x: size * 0.75, y: center, rashiX: size * 0.9, rashiY: center },
        { house: 9,  x: size * 0.65, y: size * 0.35, rashiX: size * 0.9, rashiY: size * 0.1 },
        { house: 10, x: center, y: size * 0.65, rashiX: center, rashiY: size * 0.9 },
        { house: 11, x: size * 0.35, y: size * 0.65, rashiX: size * 0.1, rashiY: size * 0.9 },
        { house: 12, x: size * 0.75, y: size * 0.25, rashiX: size * 0.9, rashiY: size * 0.1 },
    ];
    
    // Correct mapping for North Indian fixed chart
    const houseDisplayMap = [
        { house: 1,  x: 150, y: 50,  labelX: 150, labelY: 20 },
        { house: 2,  x: 75,  y: 75,  labelX: 30,  labelY: 30 },
        { house: 3,  x: 50,  y: 150, labelX: 20,  labelY: 150 },
        { house: 4,  x: 150, y: 150, labelX: 150, labelY: 150 },
        { house: 5,  x: 75,  y: 225, labelX: 30,  labelY: 270 },
        { house: 6,  x: 150, y: 250, labelX: 150, labelY: 280 },
        { house: 7,  x: 250, y: 250, labelX: 270, labelY: 270 },
        { house: 8,  x: 250, y: 150, labelX: 280, labelY: 150 },
        { house: 9,  x: 225, y: 75,  labelX: 270, labelY: 30 },
        { house: 10, x: 250, y: 150, labelX: 250, labelY: 150 }, // same as 8 in this representation - let's merge
        { house: 10, x: 150, y: 250, labelX: 150, labelY: 280 }, // Let's try correct positions
        // This is the correct layout
        // Houses are fixed. 1 is top diamond. Then anti-clockwise.
        { house: 1, x: 150, y: 75, labelX: 150, labelY: 30 },
        { house: 2, x: 75, y: 75, labelX: 40, labelY: 40 },
        { house: 3, x: 75, y: 150, labelX: 40, labelY: 150 },
        { house: 4, x: 75, y: 225, labelX: 40, labelY: 260 },
        { house: 5, x: 150, y: 225, labelX: 150, labelY: 260 },
        { house: 6, x: 225, y: 225, labelX: 260, labelY: 260 },
        { house: 7, x: 225, y: 150, labelX: 260, labelY: 150 },
        { house: 8, x: 225, y: 75, labelX: 260, labelY: 40 },
        { house: 9, x: 150, y: 75, labelX: 150, labelY: 75 }, // In house 1 area
        { house: 10, x: 225, y: 150, labelX: 225, labelY: 150 }, // In house 7 area
        { house: 11, x: 150, y: 225, labelX: 150, labelY: 225 }, // in house 5 area
        { house: 12, x: 75, y: 75, labelX: 75, labelY: 75 }, // in house 2 area
    ];

    const finalHousePositions = [
        { house: 1, planetX: 150, planetY: 75, labelX: 150, labelY: 30 },
        { house: 2, planetX: 75, planetY: 75, labelX: 40, labelY: 40 },
        { house: 3, planetX: 75, planetY: 150, labelX: 40, labelY: 150 },
        { house: 4, planetX: 75, planetY: 225, labelX: 40, labelY: 260 },
        { house: 5, planetX: 150, planetY: 225, labelX: 150, labelY: 260 },
        { house: 6, planetX: 225, planetY: 225, labelX: 260, labelY: 260 },
        { house: 7, planetX: 225, planetY: 150, labelX: 260, labelY: 150 },
        { house: 8, planetX: 225, planetY: 75, labelX: 260, labelY: 40 },
        { house: 9, planetX: 225, planetY: 75 }, // Top-right, same as 8
        { house: 10, planetX: 225, planetY: 225 }, // Bottom-right, same as 6
        { house: 11, planetX: 75, planetY: 225 }, // Bottom-left, same as 4
        { house: 12, planetX: 75, planetY: 75 }, // Top-left, same as 2
    ];
     const houseNumberPositions = [
        { house: 1, x: 150, y: 30 },
        { house: 2, x: 40, y: 40 },
        { house: 3, x: 40, y: 150 },
        { house: 4, x: 40, y: 260 },
        { house: 5, x: 150, y: 270 },
        { house: 6, x: 260, y: 260 },
        { house: 7, x: 260, y: 150 },
        { house: 8, x: 260, y: 40 },
        { house: 9, x: 260, y: 40 }, // These are inside other houses
        { house: 10, x: 260, y: 260 },
        { house: 11, x: 40, y: 260 },
        { house: 12, x: 40, y: 40 },
    ];
    
     const centralHouses = [
        { house: 1, planetX: 150, planetY: 85 },
        { house: 4, planetX: 150, planetY: 150 },
        { house: 7, planetX: 150, planetY: 215 },
        { house: 10, planetX: 150, planetY: 150 }, // Special position
    ];

    const getPlanetsInHouse = (houseNumber: number) => {
        const planets = chakra[houseNumber] || [];
        return planets.map(p => PLANET_ABBR[p]).join(' ');
    };

    return (
        <div className="flex justify-center items-center w-full">
            <svg viewBox={`-10 -10 ${size + 20} ${size + 20}`} className="w-full max-w-[300px] h-auto text-brand-text-dark">
                {/* Chart outer and inner lines */}
                <path d={`M 0 0 L ${size} 0 L ${size} ${size} L 0 ${size} Z`} fill="none" stroke="currentColor" strokeWidth="2" />
                <path d={`M 0 0 L ${size} ${size}`} fill="none" stroke="currentColor" strokeWidth="2" />
                <path d={`M ${size} 0 L 0 ${size}`} fill="none" stroke="currentColor" strokeWidth="2" />

                {/* House Numbers */}
                <text x="150" y="35" fontSize="14" fill="gray" textAnchor="middle">1</text>
                <text x="45" y="45" fontSize="14" fill="gray" textAnchor="middle">2</text>
                <text x="45" y="150" fontSize="14" fill="gray" textAnchor="middle">3</text>
                <text x="85" y="215" fontSize="14" fill="gray" textAnchor="middle">4</text>
                <text x="150" y="265" fontSize="14" fill="gray" textAnchor="middle">5</text>
                <text x="215" y="215" fontSize="14" fill="gray" textAnchor="middle">6</text>
                <text x="255" y="150" fontSize="14" fill="gray" textAnchor="middle">7</text>
                <text x="255" y="45" fontSize="14" fill="gray" textAnchor="middle">8</text>
                <text x="215" y="85" fontSize="14" fill="gray" textAnchor="middle">9</text>
                <text x="150" y="150" fontSize="14" fill="gray" textAnchor="middle">10</text>
                <text x="85" y="85" fontSize="14" fill="gray" textAnchor="middle">12</text>
                <text x="150" y="150" fontSize="14" fill="gray" textAnchor="middle" transform="translate(0, 30)">11</text>

                {/* Planets */}
                <text x="150" y="80" fontSize="16" fill="currentColor" textAnchor="middle" className="font-bold">{getPlanetsInHouse(1)}</text>
                <text x="80" y="80" fontSize="16" fill="currentColor" textAnchor="middle" className="font-bold">{getPlanetsInHouse(2)} {getPlanetsInHouse(12)}</text>
                <text x="80" y="150" fontSize="16" fill="currentColor" textAnchor="middle" className="font-bold">{getPlanetsInHouse(3)}</text>
                <text x="80" y="220" fontSize="16" fill="currentColor" textAnchor="middle" className="font-bold">{getPlanetsInHouse(4)} {getPlanetsInHouse(11)}</text>
                <text x="150" y="220" fontSize="16" fill="currentColor" textAnchor="middle" className="font-bold">{getPlanetsInHouse(5)}</text>
                <text x="220" y="220" fontSize="16" fill="currentColor" textAnchor="middle" className="font-bold">{getPlanetsInHouse(6)} {getPlanetsInHouse(10)}</text>
                <text x="220" y="150" fontSize="16" fill="currentColor" textAnchor="middle" className="font-bold">{getPlanetsInHouse(7)}</text>
                <text x="220" y="80" fontSize="16" fill="currentColor" textAnchor="middle" className="font-bold">{getPlanetsInHouse(8)} {getPlanetsInHouse(9)}</text>
            </svg>
        </div>
    );
};
