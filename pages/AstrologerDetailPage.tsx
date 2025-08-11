import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ASTROLOGERS } from '../constants';
import { StarIcon, PhoneIcon, ChatIcon } from '../components/Icons';

export const AstrologerDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const astrologer = ASTROLOGERS.find(a => a.id === id);

    if (!astrologer) {
        return (
            <div className="p-4 text-center">
                <h2 className="text-2xl font-bold">Astrologer not found</h2>
                <button onClick={() => navigate('/astrologers')} className="mt-4 text-brand-primary">Back to list</button>
            </div>
        );
    }

    const DetailItem: React.FC<{ label: string, value: string }> = ({ label, value }) => (
        <div className="text-center">
            <p className="text-sm text-brand-text-secondary">{label}</p>
            <p className="font-semibold text-brand-text-primary text-lg">{value}</p>
        </div>
    );

    return (
        <div className="pb-24">
            <div className="bg-brand-card rounded-xl p-6 shadow-md">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left sm:space-x-6 mb-6">
                    <div className="relative mb-4 sm:mb-0 flex-shrink-0">
                        <img src={astrologer.avatarUrl} alt={astrologer.name} className="w-28 h-28 rounded-full object-cover ring-4 ring-brand-primary/50" />
                        {astrologer.isOnline && (
                             <span className="absolute bottom-1 right-1 block h-5 w-5 rounded-full bg-green-500 border-2 border-brand-card" title="Online"></span>
                        )}
                    </div>
                    <div className="flex-1">
                        <h2 className="font-serif text-3xl font-bold text-brand-text-primary">{astrologer.name}</h2>
                        <p className="text-brand-accent font-semibold">{astrologer.specialties.join(' | ')}</p>
                        <div className="flex items-center justify-center sm:justify-start mt-2 space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} className={`w-5 h-5 ${i < Math.round(astrologer.rating) ? 'text-brand-accent' : 'text-gray-300'}`} />
                            ))}
                            <span className="ml-2 text-brand-text-primary font-bold">{astrologer.rating} / 5.0</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 my-6 py-4 border-y border-brand-surface">
                    <DetailItem label="Experience" value={`${astrologer.experience} Years`} />
                    <DetailItem label="Languages" value={astrologer.languages.join(', ')} />
                </div>
                
                <div>
                    <h3 className="font-serif text-xl font-bold text-brand-text-primary mb-2">About</h3>
                    <p className="text-brand-text-secondary leading-relaxed">{astrologer.bio}</p>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-brand-surface/80 backdrop-blur-sm border-t border-brand-card">
                 <div className="max-w-screen-lg mx-auto flex items-center gap-4">
                     <Link to={`/chat/${astrologer.id}`} className="flex-1 text-center py-3.5 px-4 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-secondary transition-opacity shadow-lg flex items-center justify-center gap-2">
                        <ChatIcon className="w-5 h-5" strokeWidth="2.5" />
                        <span>Start Chat</span>
                    </Link>
                    <Link to={`/call/${astrologer.id}`} className="flex-1 text-center py-3.5 px-4 bg-brand-green text-white font-bold rounded-lg hover:bg-green-600 transition-opacity shadow-lg flex items-center justify-center gap-2">
                        <PhoneIcon className="w-5 h-5" />
                        <span>Start Call (₹{astrologer.pricePerMinute}/min)</span>
                    </Link>
                 </div>
            </div>
        </div>
    );
};