import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_CATEGORIES, PRODUCTS } from '../constants';
import { Product } from '../types';
import { StarIcon } from '../components/Icons';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <Link to={`/products/${product.id}`} className="block bg-brand-card rounded-xl shadow-md overflow-hidden group transition-transform duration-300 ease-in-out hover:-translate-y-1">
        <div className="overflow-hidden">
            <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-4">
            <p className="text-sm text-brand-text-secondary">{product.category}</p>
            <h3 className="font-serif text-lg font-bold text-brand-text-primary mt-1 truncate">{product.name}</h3>
            <div className="flex items-center justify-between mt-3">
                <p className="text-brand-primary font-bold text-lg">₹{product.price.toLocaleString('en-IN')}</p>
                <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-brand-accent" />
                    <span className="text-sm text-brand-text-secondary ml-1">{product.rating}</span>
                </div>
            </div>
        </div>
    </Link>
);


export const StorePage: React.FC = () => {
    return (
        <div>
            <header className="mb-8">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-text-primary mb-2">Remedies & Store</h1>
                <p className="text-lg text-brand-text-secondary max-w-2xl">Discover authentic spiritual products to enhance your well-being.</p>
            </header>

            <section className="mb-12">
                <h2 className="text-2xl font-bold font-serif mb-4 text-brand-text-primary">Shop by Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {PRODUCT_CATEGORIES.map(category => (
                        <Link to="#" key={category.name} className="block group text-center">
                            <div className="aspect-square bg-brand-card rounded-xl overflow-hidden mb-2 shadow-sm">
                                <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <p className="font-semibold text-brand-text-primary group-hover:text-brand-primary transition-colors">{category.name}</p>
                        </Link>
                    ))}
                </div>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold font-serif mb-4 text-brand-text-primary">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {PRODUCTS.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};