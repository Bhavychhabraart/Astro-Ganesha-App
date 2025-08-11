
import React from 'react';
import { Planet, PlanetPosition, Rashi } from '../../types';

interface BirthChartProps {
    title: string;
    planetaryPositions: PlanetPosition[];
    ascendantRashi: Rashi;
}

const RASHIS: Rashi[] = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const PLANET_ABBR: Record<Planet, string> = {
    Sun: 'Su', Moon: 'Mo', Mars: 'Ma', Mercury: 'Me', Jupiter: 'Ju', Venus: 'Ve', Saturn: 'Sa', Rahu: 'Ra', Ketu: 'Ke', Ascendant: 'As'
};

const getRashiNumber = (rashi: Rashi): number => RASHIS.indexOf(rashi) + 1;

export const BirthChart: React.FC<BirthChartProps> = ({ title, planetaryPositions, ascendantRashi }) => {
    const size = 300;
    const center = size / 2;
    const houseCoords = [
        { x: center, y: size * 0.25 },     // House 1
        { x: size * 0.25, y: center },     // House 2
        { x: center, y: size * 0.75 },     // House 3
        { x: size * 0.75, y: center },     // House 4
    ];

    const rashiForHouse: Record<number, Rashi> = {};
    const planetsInHouse: Record<number, PlanetPosition[]> = {};

    const ascendantIndex = RASHIS.indexOf(ascendantRashi);

    for (let i = 0; i < 12; i++) {
        const houseNumber = i + 1;
        const rashiIndex = (ascendantIndex + i) % 12;
        rashiForHouse[houseNumber] = RASHIS[rashiIndex];
        planetsInHouse[houseNumber] = [];
    }
    
    planetaryPositions.forEach(p => {
        if (planetsInHouse[p.house]) {
            planetsInHouse[p.house].push(p);
        }
    });

    const housePaths = [
        `M ${center},${center} L 0,0 L ${size},0 Z`,         // House 1
        `M ${center},${center} L 0,0 L 0,${size} Z`,         // House 2, 3
        `M ${center},${center} L 0,${size} L ${size},${size} Z`, // House 4, 5, 6
        `M ${center},${center} L ${size},${size} L ${size},0 Z`, // House 7, 8, 9
    ];
    
    const houseLayout = [
        { house: 1, pos: { x: center, y: size * 0.18 } },
        { house: 2, pos: { x: size * 0.18, y: size * 0.18 } },
        { house: 3, pos: { x: size * 0.18, y: center } },
        { house: 4, pos: { x: size * 0.18, y: size * 0.82 } },
        { house: 5, pos: { x: center, y: size * 0.82 } },
        { house: 6, pos: { x: size * 0.82, y: size * 0.82 } },
        { house: 7, pos: { x: size * 0.82, y: center } },
        { house: 8, pos: { x: size * 0.82, y: size * 0.18 } },
        { house: 9, pos: { x: center, y: size * 0.05 } }, // Not a house, but 9th rashi from 1st
        { house: 10, pos: { x: size * 0.05, y: size * 0.05 } },
        { house: 11, pos: { x: size * 0.05, y: center } },
        { house: 12, pos: { x: size * 0.05, y: size * 0.95 } },
    ];
    
    // Correct mapping for North Indian chart
    const housePositions = [
        { house: 1,  x: 150, y: 50  },
        { house: 2,  x: 75,  y: 75  },
        { house: 3,  x: 50,  y: 150 },
        { house: 4,  x: 75,  y: 225 },
        { house: 5,  x: 150, y: 250 },
        { house: 6,  x: 225, y: 225 },
        { house: 7,  x: 250, y: 150 },
        { house: 8,  x: 225, y: 75  },
        // These are the corner houses
        { house: 9,  x: 250, y: 50 },
        { house: 12, x: 50,  y: 50 },
        { house: 11, x: 50,  y: 250 },
        { house: 10, x: 250, y: 250 },
    ];
    
    // This mapping seems more accurate
    const rashiPositions = [
      { house: 1,  x: 150, y: 40  },
      { house: 2,  x: 80, y: 80  },
      { house: 3,  x: 40, y: 150  },
      { house: 4,  x: 80, y: 220  },
      { house: 5,  x: 150, y: 260  },
      { house: 6,  x: 220, y: 220  },
      { house: 7,  x: 260, y: 150  },
      { house: 8,  x: 220, y: 80  },
      { house: 9,  x: 250, y: 50 }, //corner
      { house: 10,  x: 250, y: 250 }, //corner
      { house: 11,  x: 50, y: 250 }, //corner
      { house: 12,  x: 50, y: 50 }, //corner
    ];
    
     const planetDisplayPositions = [
      { house: 1,  x: 150, y: 75 },
      { house: 2,  x: 100, y: 100 },
      { house: 3,  x: 75, y: 150 },
      { house: 4,  x: 100, y: 200 },
      { house: 5,  x: 150, y: 225 },
      { house: 6,  x: 200, y: 200 },
      { house: 7,  x: 225, y: 150 },
      { house: 8,  x: 200, y: 100 },
      // Corner houses
      { house: 9,  x: 225, y: 75 },
      { house: 10, x: 225, y: 225 },
      { house: 11, x: 75,  y: 225 },
      { house: 12, x: 75,  y: 75 },
    ];


    return (
        <div className="bg-brand-surface p-4 rounded-lg shadow-inner">
            <h3 className="font-serif text-lg font-bold text-center text-brand-primary mb-2">{title}</h3>
            <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
                {/* Chart outer and inner lines */}
                <path d={`M 0 0 L ${size} 0 L ${size} ${size} L 0 ${size} Z`} fill="none" stroke="currentColor" strokeWidth="1" />
                <path d={`M 0 0 L ${size} ${size}`} fill="none" stroke="currentColor" strokeWidth="1" />
                <path d={`M ${size} 0 L 0 ${size}`} fill="none" stroke="currentColor" strokeWidth="1" />
                <path d={`M ${center} 0 L ${center} ${size}`} fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d={`M 0 ${center} L ${size} ${center}`} fill="none" stroke="currentColor" strokeWidth="0.5" />


                {rashiPositions.map(({ house, x, y }) => (
                    <text key={`rashi-${house}`} x={x} y={y} fontSize="12" fill="gray" textAnchor="middle" dominantBaseline="middle">
                        {getRashiNumber(rashiForHouse[house])}
                    </text>
                ))}
                
                 {planetDisplayPositions.map(({ house, x, y }) => (
                    <text key={`planets-${house}`} x={x} y={y} fontSize="14" fill="currentColor" textAnchor="middle" dominantBaseline="middle" className="font-semibold">
                         {planetsInHouse[house]
                            .map(p => (
                                <tspan key={p.planet} fill={p.isRetrograde ? 'red' : 'currentColor'}>
                                    {`${PLANET_ABBR[p.planet]}${p.isRetrograde ? '(R)' : ''} `}
                                </tspan>
                            ))}
                    </text>
                ))}

            </svg>
        </div>
    );
};
