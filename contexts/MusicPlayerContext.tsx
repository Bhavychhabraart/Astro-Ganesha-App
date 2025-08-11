
import React, { createContext, useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { Bhajan } from '../types';

interface MusicPlayerContextType {
    isPlaying: boolean;
    currentTrack: Bhajan | null;
    progress: number;
    duration: number;
    playPlaylist: (playlist: Bhajan[], startIndex: number) => void;
    togglePlayPause: () => void;
    playNext: () => void;
    playPrev: () => void;
    seek: (time: number) => void;
    closePlayer: () => void;
}

export const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

interface MusicPlayerProviderProps {
    children: ReactNode;
}

export const MusicPlayerProvider: React.FC<MusicPlayerProviderProps> = ({ children }) => {
    const [playlist, setPlaylist] = useState<Bhajan[]>([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(null);

    const currentTrack = currentTrackIndex !== null ? playlist[currentTrackIndex] : null;

    const playPlaylist = useCallback((newPlaylist: Bhajan[], startIndex: number) => {
        setPlaylist(newPlaylist);
        setCurrentTrackIndex(startIndex);
        setIsPlaying(true);
    }, []);
    
    const playNext = useCallback(() => {
        if (playlist.length > 0) {
            setCurrentTrackIndex(prevIndex => (prevIndex === null ? 0 : (prevIndex + 1) % playlist.length));
            setIsPlaying(true);
        }
    }, [playlist.length]);

    const playPrev = useCallback(() => {
        if (playlist.length > 0) {
            setCurrentTrackIndex(prevIndex => (prevIndex === null ? 0 : (prevIndex - 1 + playlist.length) % playlist.length));
             setIsPlaying(true);
        }
    }, [playlist.length]);

    const togglePlayPause = useCallback(() => {
        if (currentTrack) {
            setIsPlaying(prev => !prev);
        }
    }, [currentTrack]);
    
    const seek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    const closePlayer = () => {
        setIsPlaying(false);
        setCurrentTrackIndex(null);
        setPlaylist([]);
        setProgress(0);
        setDuration(0);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    // This single useEffect handles all audio state changes to prevent race conditions.
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const controlAudio = async () => {
            if (currentTrack) {
                // If the track is different from the current audio source, update it.
                if (audio.src !== currentTrack.audioSrc) {
                    audio.src = currentTrack.audioSrc;
                }

                // Handle play/pause state
                if (isPlaying) {
                    try {
                        // The play() method returns a promise that resolves when playback starts.
                        // Awaiting it ensures we don't try to play again while it's loading.
                        await audio.play();
                    } catch (error) {
                        // A new track loading will interrupt the previous play() call,
                        // which is expected and results in an AbortError. We can ignore it.
                        if (error.name !== 'AbortError') {
                            console.error("Audio play failed:", error);
                            // If autoplay is blocked or another error occurs, update UI state.
                            setIsPlaying(false);
                        }
                    }
                } else {
                    audio.pause();
                }
            } else {
                // No track is selected, so pause and clear the source.
                audio.pause();
                audio.src = '';
            }
        };

        controlAudio();

    }, [currentTrack, isPlaying]); // Reruns whenever track or play state changes


    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => setProgress(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => playNext();

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [playNext]);

    return (
        <MusicPlayerContext.Provider value={{ isPlaying, currentTrack, progress, duration, playPlaylist, togglePlayPause, playNext, playPrev, seek, closePlayer }}>
            {children}
            <audio ref={audioRef} />
        </MusicPlayerContext.Provider>
    );
};
