import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { POOJAS } from '../constants';

export const PoojaDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const pooja = POOJAS.find(p => p.id === id);
    const [mainImage, setMainImage] = useState(pooja?.images[0] || '');

    if (!pooja) {
        return (
            <div className="p-4 text-center">
                <h2 className="text-2xl font-bold">Pooja not found</h2>
                <button onClick={() => navigate('/poojas')} className="mt-4 text-brand-primary">Back to list</button>
            </div>
        );
    }

    const DetailSection: React.FC<{title: string, items: string[]}> = ({title, items}) => (
        <div className="mt-8">
            <h3 className="font-serif text-xl font-bold text-brand-text-primary mb-3 border-b-2 border-brand-primary/20 pb-2">{title}</h3>
            <ul className="list-disc list-inside space-y-2 text-brand-text-secondary pl-2">
                {items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    );

    return (
        <div className="pb-24">
            <div className="bg-brand-card rounded-xl p-4 sm:p-6 shadow-md">
                {/* Image Gallery */}
                <div className="mb-6">
                    <img src={mainImage} alt={pooja.name} className="w-full h-64 object-cover rounded-lg mb-3 shadow-lg" />
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        {pooja.images.map(img => (
                            <img 
                                key={img}
                                src={img}
                                alt="thumbnail"
                                onClick={() => setMainImage(img)}
                                className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition-all ${mainImage === img ? 'border-brand-primary scale-105 shadow' : 'border-transparent opacity-70 hover:opacity-100'}`}
                            />
                        ))}
                    </div>
                </div>

                <h2 className="font-serif text-3xl font-bold text-brand-primary">{pooja.name}</h2>
                <p className="text-brand-text-secondary mt-4 leading-relaxed">{pooja.longDescription}</p>

                <DetailSection title="Benefits of this Pooja" items={pooja.benefits} />
                <DetailSection title="What's Included" items={pooja.inclusions} />
            </div>
            
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-brand-surface/80 backdrop-blur-sm border-t border-brand-card z-20">
                <div className="max-w-screen-lg mx-auto flex justify-between items-center">
                    <div>
                         <p className="text-sm text-brand-text-secondary">Price</p>
                         <p className="text-2xl font-bold text-brand-text-primary">₹{pooja.price.toLocaleString('en-IN')}</p>
                    </div>
                    <Link to={`/poojas/${pooja.id}/book`} className="w-1/2 text-center py-3 px-4 bg-gradient-to-r from-brand-secondary to-brand-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg">
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
};