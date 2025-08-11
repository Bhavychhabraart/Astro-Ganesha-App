import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { MatchmakingFormInput } from '../types';
import { MatchmakingReport } from '../components/matchmaking/MatchmakingReport';

const UserDetailsForm = ({ title, userPrefix, formData, handleChange }) => {
    const inputStyle = "w-full p-3 bg-brand-surface border border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition";
    const maxDate = new Date().toISOString().split("T")[0];

    return (
        <div className="p-6 bg-brand-card rounded-xl shadow-md space-y-4">
            <h3 className="font-serif text-xl font-bold text-brand-primary">{title}</h3>
            <div>
                <label htmlFor={`${userPrefix}_name`} className="block text-sm font-medium text-brand-text-secondary mb-2">Full Name</label>
                <input type="text" name="name" id={`${userPrefix}_name`} required className={inputStyle} value={formData.name} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor={`${userPrefix}_dob`} className="block text-sm font-medium text-brand-text-secondary mb-2">Date of Birth</label>
                    <input type="date" name="dob" id={`${userPrefix}_dob`} required className={inputStyle} value={formData.dob} onChange={handleChange} max={maxDate} />
                </div>
                <div>
                    <label htmlFor={`${userPrefix}_tob`} className="block text-sm font-medium text-brand-text-secondary mb-2">Time of Birth</label>
                    <input type="time" name="tob" id={`${userPrefix}_tob`} required className={inputStyle} value={formData.tob} onChange={handleChange} />
                </div>
            </div>
            <div>
                <label htmlFor={`${userPrefix}_pob`} className="block text-sm font-medium text-brand-text-secondary mb-2">Place of Birth</label>
                <input type="text" name="pob" id={`${userPrefix}_pob`} placeholder="e.g. Mumbai, India" required className={inputStyle} value={formData.pob} onChange={handleChange} />
            </div>
        </div>
    );
};

const MatchmakingForm = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<MatchmakingFormInput>({
        boy: { name: 'Ram', dob: '1992-05-10', tob: '06:30', pob: 'Ayodhya, India' },
        girl: { name: 'Sita', dob: '1994-08-25', tob: '14:00', pob: 'Janakpur, Nepal' }
    });

    const handleChange = (userType: 'boy' | 'girl') => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [userType]: {
                ...prev[userType],
                [e.target.name]: e.target.value
            }
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div>
            <header className="mb-6 text-center">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text-primary">Kundli Matchmaking</h1>
                <p className="text-brand-text-secondary mt-1 max-w-2xl mx-auto">Analyze the compatibility between two individuals for a strong and harmonious bond.</p>
            </header>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <UserDetailsForm title="Boy's Details" userPrefix="boy" formData={formData.boy} handleChange={handleChange('boy')} />
                    <UserDetailsForm title="Girl's Details" userPrefix="girl" formData={formData.girl} handleChange={handleChange('girl')} />
                </div>
                <div>
                    <button type="submit" className="w-full py-3 px-4 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-accent transition-colors shadow-lg mt-2">
                        Check Compatibility
                    </button>
                </div>
            </form>
        </div>
    );
}

export const MatchmakingPage: React.FC = () => {
    const [matchRequest, setMatchRequest] = useState<MatchmakingFormInput | null>(null);

    if (matchRequest) {
        return <MatchmakingReport formData={matchRequest} onReset={() => setMatchRequest(null)} />;
    }

    return <MatchmakingForm onSubmit={setMatchRequest} />;
};