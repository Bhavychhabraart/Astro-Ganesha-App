import React, { useState } from 'react';

const orders = [
    { id: 'ORD12345', date: '2023-10-22', total: 7500, status: 'Completed', type: 'Pooja', items: [{ name: 'Griha Shanti Pooja', image: 'https://picsum.photos/seed/pooja2-1/100' }] },
    { id: 'ORD12346', date: '2023-10-20', total: 1500, status: 'Delivered', type: 'Product', items: [{ name: '5 Mukhi Rudraksha Mala', image: 'https://picsum.photos/seed/prod1-1/100' }] },
    { id: 'ORD12347', date: '2023-10-18', total: 4500, status: 'Completed', type: 'Spell', items: [{ name: 'Love Attraction Spell', image: 'https://picsum.photos/seed/spell-love1/100' }] },
    { id: 'ORD12348', date: '2023-10-15', total: 12500, status: 'Shipped', type: 'Product', items: [{ name: 'Natural Yellow Sapphire', image: 'https://picsum.photos/seed/prod2-1/100' }] },
    { id: 'ORD12349', date: '2023-10-12', total: 11000, status: 'In Progress', type: 'Pooja', items: [{ name: 'Maha Mrityunjaya Jaap', image: 'https://picsum.photos/seed/pooja3-1/100' }] },
];

type OrderFilter = 'All' | 'Product' | 'Pooja' | 'Spell' | 'Report';

export const OrderHistoryPage: React.FC = () => {
    const [filter, setFilter] = useState<OrderFilter>('All');
    const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.type === filter);
    
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Delivered':
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Shipped':
            case 'In Progress':
                return 'bg-blue-100 text-blue-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };
    
    const TabButton: React.FC<{label: OrderFilter}> = ({label}) => (
        <button
            onClick={() => setFilter(label)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${filter === label ? 'bg-brand-primary text-black shadow-sm' : 'bg-brand-card text-brand-text-secondary hover:bg-brand-surface'}`}
        >
            {label}s
        </button>
    );

    return (
        <div>
            <header className="mb-8">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-text-primary mb-2">Order History</h1>
                <p className="text-lg text-brand-text-secondary">Track your past pooja bookings, product purchases, and reports.</p>
            </header>
            
            <div className="flex space-x-3 overflow-x-auto pb-4 -mx-4 px-4 mb-6">
                <TabButton label="All" />
                <TabButton label="Product" />
                <TabButton label="Pooja" />
                <TabButton label="Spell" />
                <TabButton label="Report" />
            </div>

            <div className="space-y-4">
                {filteredOrders.length > 0 ? filteredOrders.map(order => (
                    <div key={order.id} className="bg-brand-card rounded-xl shadow-md p-4 sm:p-6">
                        <div className="flex flex-wrap justify-between items-center gap-2 border-b border-brand-surface pb-3 mb-3">
                            <div>
                                <p className="font-bold text-brand-text-primary">Order ID: {order.id}</p>
                                <p className="text-sm text-brand-text-secondary">Date: {order.date}</p>
                            </div>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getStatusClass(order.status)}`}>{order.status}</span>
                        </div>
                        <div className="space-y-3 mb-4">
                            {order.items.map(item => (
                                <div key={item.name} className="flex items-center gap-4">
                                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover"/>
                                    <p className="font-semibold text-brand-text-primary">{item.name}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-brand-surface">
                            <p className="text-brand-text-secondary">Total: <span className="font-bold text-lg text-brand-text-primary">₹{order.total.toLocaleString('en-IN')}</span></p>
                             <button className="py-1.5 px-4 bg-brand-primary/80 text-black font-bold rounded-lg hover:bg-brand-accent transition-colors text-sm">
                                View Details
                            </button>
                        </div>
                    </div>
                )) : (
                     <div className="text-center py-16 bg-brand-card rounded-xl">
                        <p className="font-semibold text-brand-text-primary">No orders found</p>
                        <p className="text-brand-text-secondary mt-1">You haven't placed any orders in this category yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
