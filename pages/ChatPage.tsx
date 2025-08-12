import React, { useState, FormEvent, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ASTROLOGERS } from '../constants';
import { ChevronLeftIcon, SendIcon, PhoneIcon } from '../components/Icons';
import { GoogleGenAI, Chat } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    isStreaming?: boolean;
}

export const ChatPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const astrologer = ASTROLOGERS.find(a => a.id === id);
    
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [chat, setChat] = useState<Chat | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!astrologer) return;

        const initializeChat = async () => {
            const API_KEY_ERROR_MESSAGE = "I am unable to connect at this time. Please try again later.";
            try {
                if (!process.env.API_KEY) {
                    throw new Error("API_KEY_MISSING");
                }
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                
                const systemInstruction = `You are ${astrologer.name}, a famous astrologer with expertise in ${astrologer.specialties.join(' & ')}. Your bio is: "${astrologer.bio}". 
                You are talking to a user seeking guidance.
                Your personality is wise, empathetic, and friendly.
                YOU MUST CONVERSE ONLY IN HINGLISH (a mix of Hindi and English). For example: "Namaste! Mein ${astrologer.name} hoon. Aapki kya sewa kar sakta/sakti hoon?" or "Aapki problem aage bataye, I will try my best to help."
                Do not reveal you are an AI. You are the human astrologer, ${astrologer.name}.
                Keep your responses relatively short and conversational.
                If the user asks for a detailed reading, ask for their birth details (date, time, place) to proceed.`;

                const chatSession = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: { systemInstruction },
                });

                setChat(chatSession);

                // Send an initial message to get a greeting
                const initialAiMessageId = Date.now();
                setMessages([{ id: initialAiMessageId, text: '', sender: 'ai', isStreaming: true }]);
                
                const result = await chatSession.sendMessageStream({ message: "Start the conversation with a warm Hinglish greeting and ask how you can help." });
                
                let fullResponse = '';
                for await (const chunk of result) {
                    fullResponse += chunk.text;
                    setMessages(prev => prev.map(msg => 
                        msg.id === initialAiMessageId ? { ...msg, text: fullResponse } : msg
                    ));
                }

                setMessages(prev => prev.map(msg => 
                    msg.id === initialAiMessageId ? { ...msg, text: fullResponse, isStreaming: false } : msg
                ));
                
            } catch (err) {
                console.error("Chat initialization error:", err);
                const isApiKeyError = (err as Error).message === "API_KEY_MISSING";
                setMessages([{
                    id: Date.now(),
                    sender: 'ai',
                    text: isApiKeyError ? API_KEY_ERROR_MESSAGE : 'Sorry, I am unable to connect right now. Please try again later.'
                }]);
            } finally {
                setIsLoading(false);
            }
        };

        initializeChat();

    }, [astrologer]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chat) return;

        const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);
        
        const aiMessageId = Date.now() + 1;
        setMessages(prev => [...prev, { id: aiMessageId, text: '', sender: 'ai', isStreaming: true }]);

        try {
            const result = await chat.sendMessageStream({ message: currentInput });
            let fullResponse = '';
            for await (const chunk of result) {
                fullResponse += chunk.text;
                setMessages(prev => prev.map(msg => 
                    msg.id === aiMessageId ? { ...msg, text: fullResponse } : msg
                ));
            }
             setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId ? { ...msg, text: fullResponse, isStreaming: false } : msg
            ));
        } catch (err) {
            console.error("Error sending message:", err);
            const errorMessage = "My apologies, I am facing some disturbance in cosmic signals. Please repeat your question.";
             setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId ? { ...msg, text: errorMessage, isStreaming: false } : msg
            ));
        } finally {
            setIsLoading(false);
        }
    };

    if (!astrologer) {
        return (
            <div className="p-4 text-center">
                <h2 className="text-2xl font-bold">Astrologer not found</h2>
                <button onClick={() => navigate('/astrologers')} className="mt-4 text-brand-primary">Back to list</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-brand-background">
            <header className="flex-shrink-0 flex items-center p-3 bg-brand-card shadow-sm z-10 sticky top-0">
                <button onClick={() => navigate(-1)} className="p-2 mr-2 rounded-full hover:bg-brand-surface">
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <img src={astrologer.avatarUrl} alt={astrologer.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="ml-3">
                    <h1 className="font-bold text-brand-text-primary text-lg">{astrologer.name}</h1>
                    <p className={`text-sm font-semibold flex items-center gap-1.5 ${astrologer.isOnline ? 'text-green-500' : 'text-brand-text-secondary'}`}>
                        <span className={`h-2 w-2 rounded-full ${astrologer.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {astrologer.isOnline ? 'Online' : 'Offline'}
                    </p>
                </div>
                 <Link 
                    to={`/call/${astrologer.id}`} 
                    className="p-3 rounded-full bg-brand-green text-white hover:bg-green-600 transition-colors ml-auto"
                    aria-label={`Call ${astrologer.name}`}
                >
                    <PhoneIcon className="w-6 h-6" />
                </Link>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
                {messages.map(message => (
                    <div key={message.id} className={`flex items-end gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {message.sender === 'ai' && <img src={astrologer.avatarUrl} className="w-8 h-8 rounded-full self-start flex-shrink-0" />}
                        <div className={`prose max-w-lg px-4 py-3 rounded-t-2xl ${
                            message.sender === 'user' 
                                ? 'bg-brand-primary text-black rounded-l-2xl' 
                                : 'bg-brand-surface text-brand-text-primary rounded-r-2xl'
                        }`}>
                           {message.isStreaming && message.text.length === 0 
                                ? <div className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 bg-brand-text-light rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-brand-text-light rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-brand-text-light rounded-full animate-bounce"></span>
                                  </div>
                                : <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                           }
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </main>

            <footer className="flex-shrink-0 bg-brand-surface/90 backdrop-blur-sm p-3 border-t border-brand-card z-10 sticky bottom-0">
                 <form onSubmit={handleSendMessage} className="flex items-center space-x-3 max-w-screen-lg mx-auto">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-3 bg-brand-card border-none rounded-full focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
                        disabled={isLoading}
                    />
                    <button type="submit" className="p-3 bg-brand-primary text-black rounded-full hover:bg-brand-accent transition-colors shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed" disabled={!input.trim() || isLoading}>
                        <SendIcon className="w-6 h-6" />
                    </button>
                </form>
            </footer>
        </div>
    );
};
