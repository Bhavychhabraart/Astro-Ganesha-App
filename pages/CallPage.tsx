
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ASTROLOGERS } from '../constants';
import { PhoneOffIcon, MicIcon, MicOffIcon } from '../components/Icons';
import { GoogleGenAI, Chat } from "@google/genai";

// Cross-browser support for SpeechRecognition
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

type CallStatus = 'connecting' | 'connected' | 'listening' | 'speaking' | 'ended' | 'error';

export const CallPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const astrologer = ASTROLOGERS.find(a => a.id === id);

    const [status, setStatus] = useState<CallStatus>('connecting');
    const [isMuted, setIsMuted] = useState(false);
    const [timer, setTimer] = useState(0);
    const [userTranscript, setUserTranscript] = useState('');
    
    const chatRef = useRef<Chat | null>(null);
    const recognitionRef = useRef<any>(null);

    // Refs to manage state within event handlers and prevent race conditions
    const statusRef = useRef(status);
    useEffect(() => {
        statusRef.current = status;
    }, [status]);
    const callActiveRef = useRef(true);
    const recognitionIsActive = useRef(false);

    // Format timer to MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const startListening = () => {
        if (callActiveRef.current && !isMuted && recognitionRef.current && !recognitionIsActive.current) {
            setStatus('listening');
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error("Speech recognition start error (should not happen with flag):", e);
                recognitionIsActive.current = false; // Reset flag on error
            }
        }
    };
    
    // Function to speak text using Web Speech API
    const speak = (text: string) => {
        if (!text || !callActiveRef.current) return;
        setStatus('speaking');
        speechSynthesis.cancel(); // Cancel any ongoing speech
        
        const utterance = new SpeechSynthesisUtterance(text);

        // Try to find a Hinglish or Indian voice
        const voices = speechSynthesis.getVoices();
        const indianVoice = voices.find(v => v.lang === 'hi-IN') || voices.find(v => v.lang.startsWith('en-IN'));
        if (indianVoice) {
            utterance.voice = indianVoice;
        }
        
        utterance.onend = () => {
            if (callActiveRef.current) {
                startListening();
            }
        };
        speechSynthesis.speak(utterance);
    };

    // Initialize Gemini Chat and Speech Recognition
    useEffect(() => {
        callActiveRef.current = true;
        if (!astrologer || !process.env.API_KEY) {
            setStatus('error');
            return;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `You are ${astrologer.name}, a famous astrologer with expertise in ${astrologer.specialties.join(' & ')}. Your bio is: "${astrologer.bio}". You are on a voice call with a user seeking guidance. Your personality is wise, empathetic, and friendly. YOU MUST CONVERSE ONLY IN HINGLISH (a mix of Hindi and English). Do not reveal you are an AI. You are the human astrologer. Keep your responses conversational and of a length suitable for a phone call. After your initial greeting, wait for the user to speak.`;
        
        chatRef.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: { systemInstruction },
        });

        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognitionRef.current = recognition;
            recognition.continuous = false;
            recognition.lang = 'en-IN';
            recognition.interimResults = false;

            recognition.onstart = () => {
                recognitionIsActive.current = true;
            };

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setUserTranscript(transcript);
                setStatus('connected'); // Prevent onend from restarting listening
                
                chatRef.current?.sendMessage({ message: transcript }).then(response => {
                    speak(response.text);
                }).catch(err => {
                    console.error("Gemini Error:", err);
                    speak("Maaf kijiye, cosmic signals me kuch gadbad hai. Kripya apna prashna dohraayein.");
                });
            };

            recognition.onerror = (event: any) => {
                // Just log significant errors. 'no-speech' is handled by onend.
                if (event.error !== 'no-speech' && event.error !== 'aborted') {
                    console.error(`Speech recognition error: ${event.error}`);
                }
            };
            
            recognition.onend = () => {
                recognitionIsActive.current = false;
                // If status is still 'listening', it means we had an error like 'no-speech'. Restart.
                if (callActiveRef.current && statusRef.current === 'listening') {
                    setTimeout(() => startListening(), 100);
                }
            };
        } else {
            setStatus('error');
            console.error("Speech Recognition not supported by this browser.");
        }
        
        // Initial connection and greeting
        const connectCall = async () => {
            if (statusRef.current === 'connecting' && chatRef.current) {
                await new Promise(resolve => setTimeout(resolve, 1500));
                setStatus('connected');
                const result = await chatRef.current.sendMessage({ message: "Start the conversation with a warm Hinglish greeting for a voice call and ask how you can help." });
                speak(result.text);
            }
        };
        connectCall();

        // Cleanup
        return () => {
            callActiveRef.current = false;
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
            speechSynthesis.cancel();
        }

    }, [astrologer]);

    // Timer effect
    useEffect(() => {
        let interval: any;
        if (['connected', 'listening', 'speaking'].includes(status)) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [status]);

    // Handle end call
    const handleEndCall = () => {
        callActiveRef.current = false;
        setStatus('ended');
        if (recognitionRef.current) {
            recognitionRef.current.abort();
        }
        speechSynthesis.cancel();
        navigate(`/astrologers/${id}`);
    };
    
    // Handle mute toggle
    const handleToggleMute = () => {
        setIsMuted(prev => {
            const newMutedState = !prev;
            if (newMutedState) {
                recognitionRef.current?.abort();
                setStatus('connected');
            } else if (statusRef.current !== 'speaking') {
                startListening();
            }
            return newMutedState;
        });
    };

    if (!astrologer) return <div>Astrologer not found.</div>;

    const getStatusText = () => {
        switch (status) {
            case 'connecting': return 'Connecting...';
            case 'listening': return 'Listening...';
            case 'speaking': return 'Speaking...';
            case 'ended': return 'Call Ended';
            case 'error': return 'Call Error';
            default: return `Call Duration: ${formatTime(timer)}`;
        }
    };
    
    return (
        <div className="h-screen w-screen bg-gray-900 text-white flex flex-col items-center justify-between p-8">
            {/* Top Info */}
            <div className="text-center">
                <p className="font-semibold text-xl">{astrologer.name}</p>
                <p className="text-gray-400 text-lg">{getStatusText()}</p>
            </div>

            {/* Main Avatar & Status */}
            <div className="relative flex flex-col items-center">
                 <div className={`absolute -inset-4 border-4 rounded-full transition-colors duration-300 ${status === 'listening' ? 'border-green-500 animate-pulse' : 'border-transparent'} ${status === 'speaking' ? 'border-yellow-500' : 'border-transparent'}`}></div>
                <img src={astrologer.avatarUrl} alt={astrologer.name} className="w-48 h-48 rounded-full object-cover shadow-2xl ring-4 ring-gray-700" />
                <div className="h-10 mt-6">
                    {userTranscript && status !== 'listening' && <p className="text-lg text-center text-gray-300 italic animate-fade-in">"{userTranscript}"</p>}
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-8">
                <button onClick={handleToggleMute} className="flex flex-col items-center space-y-2 text-gray-300 hover:text-white transition-colors">
                     <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-gray-600' : 'bg-gray-700'}`}>
                        {isMuted ? <MicOffIcon className="w-8 h-8"/> : <MicIcon className="w-8 h-8"/>}
                    </div>
                    <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>
                 <button onClick={handleEndCall} className="flex flex-col items-center space-y-2 text-white transition-transform hover:scale-105">
                     <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                        <PhoneOffIcon className="w-10 h-10"/>
                    </div>
                    <span>End Call</span>
                </button>
                 <div className="w-16 h-16"></div> {/* Spacer to balance */}
            </div>
        </div>
    );
};
