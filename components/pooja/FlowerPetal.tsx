
import React, { useEffect, useMemo } from 'react';

interface FlowerPetalProps {
    onComplete: () => void;
}

export const FlowerPetal: React.FC<FlowerPetalProps> = ({ onComplete }) => {
    const style = useMemo(() => ({
        left: `${Math.random() * 100}%`,
        animationDuration: `${5 + Math.random() * 5}s`,
        animationDelay: `${Math.random() * 2}s`,
        '--sway-amount': `${(Math.random() - 0.5) * 200}px`,
        '--rotation-amount': `${(Math.random() - 0.5) * 720}deg`,
    } as React.CSSProperties), []);

    useEffect(() => {
        const timer = setTimeout(onComplete, 10000); // Remove from DOM after 10s to prevent buildup
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="flower-petal pointer-events-none" style={style}>
            🌸
        </div>
    );
};
