import React from 'react';
import { Link } from 'react-router-dom';
import { POOJAS } from '../constants';
import { Pooja } from '../types';

const PoojaCard: React.FC<{ pooja: Pooja }> = ({ pooja }) => (
    <Link to={`/poojas/${pooja.id}`} className="block bg-brand-card rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
        <div className="overflow-hidden">
            <img src={pooja.images[0]} alt={pooja.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-5">
            <h3 className="font-serif text-xl font-bold text-brand-primary">{pooja.name}</h3>
            <p className="text-brand-text-secondary mt-2 text-sm h-10 line-clamp-2">{pooja.description}</p>
            <div className="mt-4 text-right">
                 <span className="text-lg font-bold text-brand-text-primary">₹{pooja.price.toLocaleString('en-IN')}</span>
            </div>
        </div>
    </Link>
);

export const PoojasPage: React.FC = () => {
    return (
        <div>
            <header className="mb-8">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-text-primary mb-2">Pooja Services</h1>
                <p className="text-lg text-brand-text-secondary">Book sacred rituals for peace, prosperity, and spiritual well-being.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {POOJAS.map(pooja => (
                    <PoojaCard key={pooja.id} pooja={pooja} />
                ))}
            </div>
        </div>
    );
};