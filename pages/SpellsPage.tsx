import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SPELLS, SPELL_CATEGORIES } from '../constants';
import { Spell, SpellCategory } from '../types';

const SpellCard: React.FC<{ spell: Spell }> = ({ spell }) => (
    <Link to={`/spells/${spell.id}`} className="block bg-brand-card rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
        <div className="overflow-hidden">
            <img src={spell.images[0]} alt={spell.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-5">
            <p className="text-sm text-brand-accent font-semibold">{spell.category}</p>
            <h3 className="font-serif text-xl font-bold text-brand-text-primary mt-1">{spell.name}</h3>
            <p className="text-brand-text-secondary mt-2 text-sm h-10 line-clamp-2">{spell.description}</p>
            <p className="text-brand-primary font-bold text-lg mt-4 text-right">₹{spell.price.toLocaleString('en-IN')}</p>
        </div>
    </Link>
);

export const SpellsPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<SpellCategory | 'All'>('All');
    
    const filteredSpells = selectedCategory === 'All' 
        ? SPELLS 
        : SPELLS.filter(spell => spell.category === selectedCategory);
    
    const filterButtonStyle = (isActive: boolean) => 
        `px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
            isActive ? 'bg-brand-primary text-black shadow-sm' : 'bg-brand-card text-brand-text-secondary hover:bg-brand-surface'
        }`;

    return (
        <div>
            <header className="mb-8">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-text-primary mb-2">Spiritual Spells</h1>
                <p className="text-lg text-brand-text-secondary">Harness ancient energies for modern challenges like love, career, and protection.</p>
            </header>

            <div className="mb-6">
                <div className="flex space-x-3 overflow-x-auto pb-3 -mx-4 px-4">
                     <button
                        onClick={() => setSelectedCategory('All')}
                        className={filterButtonStyle(selectedCategory === 'All')}
                    >
                        All Spells
                    </button>
                    {SPELL_CATEGORIES.map(category => (
                        <button
                            key={category.name}
                            onClick={() => setSelectedCategory(category.name)}
                            className={filterButtonStyle(selectedCategory === category.name)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSpells.map(spell => (
                    <SpellCard key={spell.id} spell={spell} />
                ))}
            </div>
        </div>
    );
};