import React, { useState, FormEvent, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SPELLS } from '../constants';
import { UploadIcon } from '../components/Icons';
import { useCart } from '../hooks/useCart';
import { SpellBookingDetails } from '../types';

export const SpellBookingPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const spell = SPELLS.find(s => s.id === id);
    const { addItem } = useCart();
    
    const [formData, setFormData] = useState({
        name: '',
        intention: '',
    });
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!spell) {
        return <div className="p-4 text-center">Spell not found.</div>;
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const bookingDetails: SpellBookingDetails = {
            name: formData.name,
            intention: formData.intention,
            fileName: fileName || undefined,
        };
        addItem(spell, bookingDetails);
        navigate('/cart');
    };

    const inputStyle = "w-full p-3 bg-brand-surface border border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition";

    return (
        <div>
            <header className="mb-6 text-center">
                <h1 className="font-serif text-3xl font-bold text-brand-text-primary">Book Spell</h1>
                <p className="text-brand-text-secondary">{spell.name}</p>
            </header>

            <div className="max-w-lg mx-auto bg-brand-card p-6 sm:p-8 rounded-xl shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="font-serif text-xl font-bold text-brand-primary mb-4 border-b border-brand-primary/20 pb-2">Your Information</h3>
                    <div className="space-y-4">
                         <div>
                            <label htmlFor="name" className="block text-sm font-medium text-brand-text-secondary mb-2">Full Name (for ritual)</label>
                            <input type="text" name="name" id="name" placeholder="Your Full Name" required className={inputStyle} value={formData.name} onChange={handleChange} />
                        </div>
                        
                        {spell.requiresPhoto && (
                            <div>
                                <label htmlFor="photo" className="block text-sm font-medium text-brand-text-secondary mb-2">Upload Photograph</label>
                                <input 
                                    type="file" 
                                    name="photo" 
                                    id="photo" 
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/png, image/jpeg, image/webp"
                                    className="hidden" 
                                    required
                                />
                                <button 
                                    type="button" 
                                    onClick={() => fileInputRef.current?.click()} 
                                    className={`${inputStyle} text-left flex items-center justify-between cursor-pointer hover:bg-brand-surface`}
                                >
                                    <span className={`truncate pr-2 ${fileName ? "text-brand-text-primary" : "text-brand-text-secondary"}`}>
                                        {fileName || "Select a file..."}
                                    </span>
                                    <UploadIcon className="w-5 h-5 text-brand-primary flex-shrink-0"/>
                                </button>
                                 <p className="text-xs text-brand-text-secondary mt-1">Required for this spell. Your photo will be kept confidential.</p>
                            </div>
                        )}

                        <div>
                            <label htmlFor="intention" className="block text-sm font-medium text-brand-text-secondary mb-2">Your Intention or Goal</label>
                            <textarea name="intention" id="intention" rows={3} placeholder="e.g., to attract my soulmate, for a promotion at work..." required className={`${inputStyle} resize-none`} value={formData.intention} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className="pt-4">
                        <button type="submit" className="w-full py-3 px-4 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent transition-colors shadow-lg">
                            Add to Cart (₹{spell.price.toLocaleString('en-IN')})
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};