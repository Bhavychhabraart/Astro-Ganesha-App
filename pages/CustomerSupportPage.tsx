import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SendIcon, HeadphonesIcon } from '../components/Icons';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    isStreaming?: boolean;
}

const examplePrompts = [
    "How can I track my order?",
    "I have a problem with my payment.",
    "How do I chat with an astrologer?",
    "How do I book a pooja?",
];

export const CustomerSupportPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessages([
            {
                id: Date.now(),
                text: "Namaste! I'm Seva, your customer support assistant from Astro Ganesha. How can I help you today?",
                sender: 'ai',
            }
        ]);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (prompt: string) => {
        if (!prompt.trim() || isLoading) return;

        const userMessage: Message = { id: Date.now(), text: prompt, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        const aiMessageId = Date.now() + 1;
        setMessages(prev => [...prev, { id: aiMessageId, text: '', sender: 'ai', isStreaming: true }]);

        try {
            if (!process.env.API_KEY) throw new Error("API_KEY is not configured.");
            
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const systemInstruction = `You are 'Seva', a friendly and efficient customer support agent for the spiritual guidance app 'Astro Ganesha'. Your goal is to help users with their questions about the app. Be polite, patient, and clear. You can answer questions about orders, payments, pooja bookings, spells, astrologer chats, and how to navigate the app. If you cannot answer a question or if the user is very frustrated, politely state that you will escalate the issue to a human support member and that they will be contacted via email within 24 hours. Keep responses concise and helpful.`;

            const responseStream = await ai.models.generateContentStream({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { systemInstruction }
            });

            let fullResponse = '';
            for await (const chunk of responseStream) {
                fullResponse += chunk.text;
                setMessages(prev => prev.map(msg => 
                    msg.id === aiMessageId ? { ...msg, text: fullResponse } : msg
                ));
            }
            setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId ? { ...msg, isStreaming: false } : msg
            ));

        } catch (err) {
            console.error("Customer Support AI Error:", err);
            const errorMessage = "I apologize, but I'm having trouble connecting to my systems right now. Please try again in a moment.";
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
                        {message.sender === 'ai' && <div className="flex-shrink-0 w-8 h-8 bg-brand-primary/20 rounded-full flex items-center justify-center self-start"><HeadphonesIcon className="w-5 h-5 text-brand-primary"/></div>}
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
                        placeholder="Ask for help..."
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