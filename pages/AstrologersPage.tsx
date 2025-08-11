import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ASTROLOGERS } from '../constants';
import { Astrologer } from '../types';
import { StarIcon, ChatIcon, PhoneIcon } from '../components/Icons';

const AstrologerCard: React.FC<{ astrologer: Astrologer }> = ({ astrologer }) => {
    return (
        <div className="bg-brand-card rounded-xl shadow-md p-4 group">
            <div className="flex items-center space-x-4 mb-4">
                <Link to={`/astrologers/${astrologer.id}`} className="relative flex-shrink-0">
                    <img src={astrologer.avatarUrl} alt={astrologer.name} className="w-20 h-20 rounded-full object-cover ring-2 ring-brand-surface group-hover:ring-brand-primary/50 transition-all" />
                    {astrologer.isOnline && (
                        <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-green-500 border-2 border-brand-card"></span>
                    )}
                </Link>
                <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg font-bold text-brand-text-primary truncate">{astrologer.name}</h3>
                    <p className="text-sm text-brand-text-secondary line-clamp-1">{astrologer.specialties.join(', ')}</p>
                    <div className="flex items-center mt-2">
                        <StarIcon className="w-5 h-5 text-brand-accent mr-1" />
                        <span className="text-brand-text-primary font-semibold">{astrologer.rating}</span>
                        <span className="text-brand-text-secondary ml-2 text-xs">({astrologer.experience} yrs)</span>
                    </div>
                </div>
            </div>
             <div className="flex items-center gap-2">
                <Link to={`/chat/${astrologer.id}`} className="flex-1 py-2 px-3 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-secondary transition-colors text-sm flex items-center justify-center gap-2">
                    <ChatIcon className="w-4 h-4" strokeWidth="2.5" />
                    <span>Chat</span>
                </Link>
                 <Link to={`/call/${astrologer.id}`} className="flex-1 py-2 px-3 bg-brand-green text-white font-bold rounded-lg hover:bg-green-600 transition-colors text-sm flex items-center justify-center gap-2">
                    <PhoneIcon className="w-4 h-4" strokeWidth="2.5" />
                    <span>Call</span>
                </Link>
            </div>
        </div>
    );
};

export const AstrologersPage: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'online'>('all');

    const filteredAstrologers = useMemo(() => {
        if (filter === 'online') {
            return ASTROLOGERS.filter(a => a.isOnline);
        }
        return ASTROLOGERS;
    }, [filter]);

    const buttonStyle = (isActive: boolean) => 
        `px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
            isActive ? 'bg-brand-primary text-black shadow-sm' : 'bg-brand-card text-brand-text-secondary hover:bg-brand-surface'
        }`;

    return (
        <div>
            <header className="mb-6">
                <h1 className="font-serif text-4xl font-bold text-brand-text-primary">Live Astrologers</h1>
                <p className="text-brand-text-secondary mt-1 text-lg">Connect with an expert for instant guidance.</p>
            </header>

            <div className="flex space-x-3 mb-6">
                <button onClick={() => setFilter('all')} className={buttonStyle(filter === 'all')}>All Experts</button>
                <button onClick={() => setFilter('online')} className={buttonStyle(filter === 'online')}>Available Now</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAstrologers.map(astrologer => (
                    <AstrologerCard key={astrologer.id} astrologer={astrologer} />
                ))}
            </div>
        </div>
    );
};