
import React, { useState, useEffect, useRef } from 'react';
import { InteractiveDeityInfo } from '../../types';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';
import { BHAJANS } from '../../constants';
import { XIcon } from '../Icons';
import { FlowerPetal } from './FlowerPetal';

interface PoojaScreenProps {
    deity: InteractiveDeityInfo;
    onExit: () => void;
}

export const PoojaScreen: React.FC<PoojaScreenProps> = ({ deity, onExit }) => {
    const { playPlaylist, closePlayer } = useMusicPlayer();
    const [thaliPosition, setThaliPosition] = useState({ x: '50%', y: '80%' });
    const [isMoving, setIsMoving] = useState(false);
    const [petals, setPetals] = useState<number[]>([]);
    
    const bellAudioRef = useRef<HTMLAudioElement>(null);
    const movementTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastBellPlayTimeRef = useRef(0);

    useEffect(() => {
        const aarti = BHAJANS.find(b => b.id === deity.aartiId);
        if (aarti) {
            playPlaylist([aarti], 0);
        }
        return () => {
            closePlayer();
        };
    }, [deity, playPlaylist, closePlayer]);

    const playBellSound = () => {
        const now = Date.now();
        if (bellAudioRef.current && now - lastBellPlayTimeRef.current > 200) { // Throttle bell sound
            bellAudioRef.current.currentTime = 0;
            bellAudioRef.current.play().catch(e => console.error("Error playing sound:", e));
            lastBellPlayTimeRef.current = now;
        }
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
        if (!isMoving) setIsMoving(true);
        setThaliPosition({ x: `${clientX}px`, y: `${clientY}px` });
        playBellSound();

        if (movementTimeoutRef.current) clearTimeout(movementTimeoutRef.current);
        movementTimeoutRef.current = setTimeout(() => setIsMoving(false), 200);
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        handlePointerMove(e.clientX, e.clientY);
    };
    
    const handleTouchMove = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        handlePointerMove(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = () => {
        setIsMoving(false);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isMoving) {
            interval = setInterval(() => {
                setPetals(prev => [...prev, Date.now() + Math.random()]);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isMoving]);

    return (
        <div 
            className="fixed inset-0 bg-black w-screen h-screen cursor-none overflow-hidden"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Background Temple */}
            <img 
                src="https://images.unsplash.com/photo-1621992129088-265349f7188f?q=80&w=2070&auto=format&fit=crop" 
                alt="Temple background"
                className="w-full h-full object-cover opacity-30 animate-fade-in"
            />

            {/* Deity */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4 flex flex-col items-center">
                <div className="relative">
                    <img src={deity.image} alt={deity.name} className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-2xl animate-fade-in" style={{boxShadow: '0 0 50px 15px rgba(255, 199, 0, 0.4)'}}/>
                    <div className="absolute inset-0 rounded-full" style={{boxShadow: 'inset 0 0 30px 10px rgba(0,0,0,0.5)'}}></div>
                </div>
                <h1 className="font-serif text-4xl text-white mt-4" style={{textShadow: '0 0 10px #ffc700'}}>{deity.name}</h1>
            </div>

            {/* Flower Petals */}
            {petals.map(id => <FlowerPetal key={id} onComplete={() => setPetals(p => p.filter(pid => pid !== id))} />)}
            
            {/* Pooja Thali */}
            <div 
                className="absolute w-48 h-48 md:w-64 md:h-64 transition-transform duration-100 ease-out"
                style={{
                    left: thaliPosition.x,
                    top: thaliPosition.y,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none'
                }}
            >
                <img 
                    src="https://i.ibb.co/6y40F6P/pooja-thali-transparent.png"
                    alt="Pooja Thali" 
                    className="w-full h-full object-contain filter drop-shadow-lg"
                />
            </div>
            
            {/* Exit Button */}
            <button onClick={onExit} className="absolute top-4 right-4 p-3 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors z-10 cursor-pointer">
                <XIcon className="w-6 h-6" />
                <span className="sr-only">Exit Pooja</span>
            </button>
            
            <audio ref={bellAudioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-small-bell-and-ding-580.mp3" preload="auto"></audio>
        </div>
    );
};
