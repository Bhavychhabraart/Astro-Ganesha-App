import React, { useState, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { POOJAS } from '../constants';

export const PoojaBookingPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const pooja = POOJAS.find(p => p.id === id);

    const [formData, setFormData] = useState({
        date: '',
        time: '',
        name: '',
        gotra: '',
        sankalp: '',
    });
    const [submitted, setSubmitted] = useState(false);

    if (!pooja) {
        return <div className="p-4 text-center">Pooja not found.</div>;
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Pooja Booking Data:', { poojaId: pooja.id, ...formData });
        setSubmitted(true);
    };

    const inputStyle = "w-full p-3 bg-brand-surface border border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition";
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);

    return (
        <div>
            <header className="mb-6 text-center">
                <h1 className="font-serif text-3xl font-bold text-brand-text-primary">Book Pooja</h1>
                <p className="text-brand-text-secondary">{pooja.name}</p>
            </header>

            {!submitted ? (
                <div className="max-w-lg mx-auto bg-brand-card p-6 sm:p-8 rounded-xl shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h3 className="font-serif text-xl font-bold text-brand-primary mb-4 border-b border-brand-primary/20 pb-2">Booking Details</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                     <label htmlFor="date" className="block text-sm font-medium text-brand-text-secondary mb-2">Select Date</label>
                                    <input type="date" name="date" id="date" required className={inputStyle} value={formData.date} onChange={handleChange} min={minDate.toISOString().split("T")[0]} />
                                </div>
                                <div>
                                     <label htmlFor="time" className="block text-sm font-medium text-brand-text-secondary mb-2">Select Time Slot</label>
                                    <input type="time" name="time" id="time" required className={inputStyle} value={formData.time} onChange={handleChange} />
                                </div>
                            </div>
                             <div>
                                <label htmlFor="name" className="block text-sm font-medium text-brand-text-secondary mb-2">Full Name (for Sankalp)</label>
                                <input type="text" name="name" id="name" placeholder="Your Full Name" required className={inputStyle} value={formData.name} onChange={handleChange} />
                            </div>
                             <div>
                                <label htmlFor="gotra" className="block text-sm font-medium text-brand-text-secondary mb-2">Gotra (optional)</label>
                                <input type="text" name="gotra" id="gotra" placeholder="Your Gotra" className={inputStyle} value={formData.gotra} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="sankalp" className="block text-sm font-medium text-brand-text-secondary mb-2">Special Request or Sankalp (optional)</label>
                                <textarea name="sankalp" id="sankalp" rows={3} placeholder="e.g., for peace and prosperity in the family" className={`${inputStyle} resize-none`} value={formData.sankalp} onChange={handleChange}></textarea>
                            </div>
                        </div>
                        <div className="pt-4">
                            <button type="submit" className="w-full py-3 px-4 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent transition-colors shadow-lg">
                                Review & Proceed to Pay (₹{pooja.price.toLocaleString('en-IN')})
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="text-center max-w-lg mx-auto p-8 bg-brand-card rounded-xl shadow-md">
                    <h2 className="font-serif text-2xl font-bold text-brand-primary mb-4">Booking Confirmed!</h2>
                    <p className="text-brand-text-secondary mb-6">Thank you for your booking of the {pooja.name}. You will receive a confirmation email shortly. This is a mock confirmation.</p>
                    <button onClick={() => navigate('/')} className="py-2 px-6 bg-brand-primary/80 text-black font-bold rounded-lg hover:bg-brand-accent transition-colors">
                        Back to Home
                    </button>
                </div>
            )}
        </div>
    );
};