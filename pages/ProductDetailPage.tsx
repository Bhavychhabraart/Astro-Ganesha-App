import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { StarIcon, PlusIcon, MinusIcon, ShoppingCartIcon } from '../components/Icons';
import { useCart } from '../hooks/useCart';

export const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const product = PRODUCTS.find(p => p.id === id);
    const { addItem } = useCart();

    const [mainImage, setMainImage] = useState(product?.images[0] || '');
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    if (!product) {
        return (
            <div className="p-4 text-center">
                <h2 className="text-2xl font-bold">Product not found</h2>
                <button onClick={() => navigate('/store')} className="mt-4 text-brand-primary">Back to Store</button>
            </div>
        );
    }
    
    const DetailSection: React.FC<{title: string, items?: string[], content?: string}> = ({title, items, content}) => (
        <div className="mt-8">
            <h3 className="font-serif text-xl font-bold text-brand-text-primary mb-3 border-b-2 border-brand-primary/20 pb-2">{title}</h3>
            {items && (
                <ul className="list-disc list-inside space-y-2 text-brand-text-secondary pl-2">
                    {items.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            )}
            {content && <p className="text-brand-text-secondary leading-relaxed">{content}</p>}
        </div>
    );
    
    const handleAddToCart = () => {
        addItem(product, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="pb-24">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                {/* Image Gallery */}
                <div>
                     <img src={mainImage} alt={product.name} className="w-full aspect-square object-cover rounded-xl mb-3 shadow-lg" />
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        {product.images.map(img => (
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

                {/* Product Info */}
                <div className="mt-6 lg:mt-0">
                    <p className="text-sm font-semibold text-brand-accent uppercase">{product.category}</p>
                    <h2 className="font-serif text-3xl font-bold text-brand-text-primary mt-1">{product.name}</h2>
                    
                    <div className="flex items-center mt-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-brand-accent' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <span className="ml-2 text-brand-text-secondary">({product.reviewCount} reviews)</span>
                    </div>

                    <p className="text-brand-text-secondary leading-relaxed mt-4">{product.description}</p>
                    
                    <div className="mt-6 flex items-center justify-between">
                        <p className="font-semibold text-brand-text-primary">Quantity:</p>
                         <div className="flex items-center border border-brand-card rounded-lg">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 text-brand-text-secondary hover:text-brand-primary"><MinusIcon className="w-5 h-5" /></button>
                            <span className="px-4 font-bold text-lg">{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)} className="p-3 text-brand-text-secondary hover:text-brand-primary"><PlusIcon className="w-5 h-5" /></button>
                        </div>
                    </div>

                </div>
            </div>
            
            <div className="bg-brand-card rounded-xl p-4 sm:p-6 mt-8 shadow-md">
                 <DetailSection title="Remedy For" items={product.remedyFor} />
                 <DetailSection title="How to Use" content={product.howToUse} />
            </div>

            {/* Sticky Add to Cart Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-brand-surface/80 backdrop-blur-sm border-t border-brand-card z-20">
                <div className="max-w-screen-lg mx-auto flex justify-between items-center">
                    <div>
                         <p className="text-sm text-brand-text-secondary">Total Price</p>
                         <p className="text-2xl font-bold text-brand-text-primary">₹{(product.price * quantity).toLocaleString('en-IN')}</p>
                    </div>
                    <button 
                        onClick={handleAddToCart}
                        className={`w-1/2 flex items-center justify-center py-3 px-4 font-bold rounded-lg transition-all duration-300 shadow-lg ${
                            isAdded ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-brand-secondary to-brand-primary text-white hover:opacity-90'
                        }`}
                        disabled={isAdded}
                    >
                        <ShoppingCartIcon className="w-5 h-5 mr-2"/>
                        <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};