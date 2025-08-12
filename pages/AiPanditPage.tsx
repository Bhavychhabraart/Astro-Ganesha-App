import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SendIcon, AiPanditIcon } from '../components/Icons';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    isStreaming?: boolean;
}

const examplePrompts = [
    "Explain the concept of Karma in simple terms.",
    "What is the significance of the Gayatri Mantra?",
    "Suggest a simple meditation technique for a beginner.",
    "What is my lucky color today?",
];

export const AiPanditPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const API_KEY_ERROR_MESSAGE = "I am unable to connect. The API key is missing. Please ensure it is configured correctly.";
        if (!process.env.VITE_GEMINI_API_KEY) {
            setMessages([
                { id: Date.now(), text: API_KEY_ERROR_MESSAGE, sender: 'ai' }
            ]);
            return;
        }

        setMessages([
            {
                id: Date.now(),
                text: "Namaste! I am your AI Pandit, here to offer guidance from the sacred texts and ancient wisdom. How may I assist you on your spiritual journey today?",
                sender: 'ai',
            }
        ]);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (prompt: string) => {
        if (!prompt.trim() || isLoading) return;
        const API_KEY_ERROR_MESSAGE = "I cannot respond. The API key is missing. Please ensure it is configured correctly.";
        if (!process.env.VITE_GEMINI_API_KEY) {
             const userMessage: Message = { id: Date.now(), text: prompt, sender: 'user' };
             const errorMessage: Message = { id: Date.now() + 1, text: API_KEY_ERROR_MESSAGE, sender: 'ai' };
             setMessages(prev => [...prev, userMessage, errorMessage]);
             return;
        }

        const userMessage: Message = {
            id: Date.now(),
            text: prompt,
            sender: 'user',
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        const aiMessageId = Date.now() + 1;
        setMessages(prev => [...prev, { id: aiMessageId, text: '', sender: 'ai', isStreaming: true }]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });
            
            const systemInstruction = "You are 'AI Pandit Ganesha', a wise, compassionate, and knowledgeable digital sage. Your purpose is to provide guidance based on Hindu scriptures (Vedas, Upanishads, Puranas, Gita), astrology, and spiritual principles. Your tone should be calm, reassuring, and respectful. Always address the user with warmth, like 'My dear devotee' or 'Child'. Frame your answers in a simple, understandable way, often using analogies or stories. Do not give medical, legal, or financial advice. If asked about sensitive topics, respond with gentle wisdom and guide them towards seeking human experts. Your goal is to enlighten, not to dictate. Format your responses with markdown for better readability, using bolding for key terms and lists for clarity.";

            const responseStream = await ai.models.generateContentStream({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: systemInstruction,
                }
            });

            let fullResponse = '';
            for await (const chunk of responseStream) {
                const chunkText = chunk.text;
                fullResponse += chunkText;
                setMessages(prev => prev.map(msg => 
                    msg.id === aiMessageId ? { ...msg, text: fullResponse } : msg
                ));
            }

            setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId ? { ...msg, text: fullResponse, isStreaming: false } : msg
            ));

        } catch (err) {
            console.error("AI Pandit Error:", err);
            const errorMessage = "My apologies, I seem to be having trouble connecting with the cosmic energies right now. Please try again in a moment.";
            setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId ? { ...msg, text: errorMessage, isStreaming: false } : msg
            ));
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleSendMessage(input);
        setInput('');
    }

    return (
        <div className="flex flex-col h-full bg-brand-background">
            <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
                {messages.map(message => (
                    <div key={message.id} className={`flex items-end gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {message.sender === 'ai' && <div className="flex-shrink-0 w-8 h-8 bg-brand-primary/20 rounded-full flex items-center justify-center self-start"><AiPanditIcon className="w-5 h-5 text-brand-primary"/></div>}
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
                 {messages.length <= 1 && !isLoading && (
                    <div className="pt-8 flex flex-wrap gap-2 justify-center animate-fade-in">
                        {examplePrompts.map(prompt => (
                            <button
                                key={prompt}
                                onClick={() => handleSendMessage(prompt)}
                                className="px-3 py-1.5 bg-brand-card text-brand-text-secondary text-sm rounded-full hover:bg-brand-surface hover:text-brand-text-primary transition-colors"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>

            <footer className="flex-shrink-0 bg-brand-surface/90 backdrop-blur-sm p-3 border-t border-brand-card">
                 <form onSubmit={handleFormSubmit} className="flex items-center space-x-3 max-w-screen-lg mx-auto">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask the Pandit a question..."
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
