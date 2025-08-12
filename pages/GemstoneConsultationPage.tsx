import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SendIcon, GemstoneIcon } from '../components/Icons';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    isStreaming?: boolean;
}

const examplePrompts = [
    "Which gemstone can help with my career growth?",
    "I feel anxious, is there a stone for peace?",
    "My DOB is 1990-01-01, what gemstone is lucky for me?",
    "Suggest a gemstone for financial prosperity.",
];

export const GemstoneConsultationPage: React.FC = () => {
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
                text: "Greetings! I am RatnaRaj, your personal guide to the mystical world of gemstones. Tell me, what challenges are you facing, or share your date of birth, and I shall recommend a gemstone to align your energies.",
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
            
            const systemInstruction = `You are 'RatnaRaj', a world-renowned gemologist and astrologer with deep knowledge of gemstone therapy (Ratna Shastra). Your task is to recommend gemstones to users based on their problems or birth details.
1.  Start by warmly greeting the user and asking them about the specific problems they are facing (e.g., financial, career, relationship, health) OR for their date of birth.
2.  Based on their input, recommend one or two suitable gemstones.
3.  For EACH gemstone, you MUST provide the following details in a structured format using markdown:
    -   **Gemstone:** (e.g., Yellow Sapphire - Pukhraj)
    -   **For Planet:** (e.g., Jupiter - Brihaspati)
    -   **Key Benefits:** (A bulleted list of 3-4 main benefits)
    -   **How to Wear:** (Specify finger, metal, and ideal day to wear for the first time).
    -   **Mantra:** (Optional: a simple mantra to chant while wearing it).
4.  Conclude with an important disclaimer: 'Please remember, this is an AI-generated recommendation. It is highly advisable to consult with a qualified professional astrologer and have your full chart analyzed before wearing any gemstone, as they carry potent energy.'
Your tone is wise, trustworthy, and authoritative, yet caring.`;

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
            console.error("Gemstone AI Error:", err);
            const errorMessage = "My apologies. The cosmic energies are currently unclear. I am unable to provide a gemstone reading at this moment. Please try again later.";
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
                        {message.sender === 'ai' && <div className="flex-shrink-0 w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center self-start"><GemstoneIcon className="w-5 h-5 text-teal-500"/></div>}
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
                        placeholder="Ask for a gemstone recommendation..."
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