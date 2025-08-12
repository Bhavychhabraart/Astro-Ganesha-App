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
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const API_KEY_ERROR_MESSAGE = "I am unable to connect. The 'VITE_API_KEY' environment variable is missing. Please configure it in your deployment settings to continue.";
        if (!process.env.VITE_API_KEY) {
            setMessages([
                { id: Date.now(), text: API_KEY_ERROR_MESSAGE, sender: 'ai' }
            ]);
            return;
        }

        setMessages([
            {
                id: Date.now(),
                text: "Hello! Welcome to AstroTalk24 Customer Support. I'm AstroHelper, your virtual assistant. How can I help you today?",
                sender: 'ai',
            }
        ]);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (prompt: string) => {
        if (!prompt.trim() || isLoading) return;
        const API_KEY_ERROR_MESSAGE = "I cannot respond. The 'VITE_API_KEY' environment variable is missing. Please configure it in your deployment settings to continue.";
        if (!process.env.VITE_API_KEY) {
             const userMessage: Message = { id: Date.now(), text: prompt, sender: 'user' };
             const errorMessage: Message = { id: Date.now() + 1, text: API_KEY_ERROR_MESSAGE, sender: 'ai' };
             setMessages(prev => [...prev, userMessage, errorMessage]);
             return;
        }

        const userMessage: Message = { id: Date.now(), text: prompt, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        const aiMessageId = Date.now() + 1;
        setMessages(prev => [...prev, { id: aiMessageId, text: '', sender: 'ai', isStreaming: true }]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });
            
            const systemInstruction = `You are 'AstroHelper', a friendly and efficient customer support agent for the AstroTalk24 app. Your goal is to help users with their questions about the app's services.
            Common topics include:
            - Order Status: Ask for the Order ID and tell them you are looking it up (you can't actually, so just say it's 'Shipped' or 'In Progress' and will arrive soon).
            - Payment Issues: Advise them to check their payment method or try again. Suggest contacting their bank if the problem persists.
            - How to use features: Explain how to chat with an astrologer, book a pooja, or find a product.
            - Refunds: Explain that you will create a support ticket for the finance team to review their request.

            Always be polite, patient, and clear in your responses. Keep answers concise. If you cannot answer a question, apologize and say you will escalate it to a human support agent who will contact them via email. Do not make up information you don't have.`;

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
            const errorMessage = "I'm sorry, our system is experiencing some technical difficulties. Please try again in a few moments.";
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
                        {message.sender === 'ai' && <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center self-start"><HeadphonesIcon className="w-5 h-5 text-blue-500"/></div>}
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
                        placeholder="Describe your issue..."
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