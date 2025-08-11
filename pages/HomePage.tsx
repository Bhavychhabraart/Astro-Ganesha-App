
import React from 'react';
import { Link } from 'react-router-dom';
import { ASTROLOGERS, PRODUCTS, POOJAS, SPELLS, BHAJANS } from '../constants';
import { Astrologer, Product, Pooja, Spell, Bhajan } from '../types';
import { useMusicPlayer } from '../hooks/useMusicPlayer';
import {
    KundliIcon,
    KundliMatchingIcon,
    MoneyCalculatorIcon,
    HeartIcon,
    GemstoneIcon,
    ChatSpecialIcon,
    StarIcon,
    ChatIcon,
    PlayIcon,
    LaalKitabIcon,
    CompassIcon,
    ChevronRightIcon,
    DiyaIcon,
    SparkleIcon,
    AiPanditIcon,
    PoojaThaliIcon
} from '../components/Icons';

const TopLink: React.FC<{ icon: React.FC<any>, label: string, to: string }> = ({ icon: Icon, label, to }) => (
    <Link to={to} className="flex flex-col items-center justify-start space-y-2 text-center group">
        <div className="w-16 h-16 bg-brand-card rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-brand-yellow transition-colors duration-200 group-hover:shadow-lg">
            <Icon className="w-8 h-8 text-brand-gold group-hover:text-black" strokeWidth="1.5" />
        </div>
        <span className="text-xs font-semibold text-brand-text-dark leading-tight" dangerouslySetInnerHTML={{ __html: label }} />
    </Link>
);

const HomePageAstrologerCard: React.FC<{ astrologer: Astrologer }> = ({ astrologer }) => (
    <div className="flex-shrink-0 w-56 bg-brand-card rounded-xl shadow-md overflow-hidden snap-start p-4">
        <div className="flex items-center space-x-4">
            <div className="relative flex-shrink-0">
                <img src={astrologer.avatarUrl} alt={astrologer.name} className="w-20 h-20 rounded-full object-cover ring-2 ring-brand-surface"/>
                {astrologer.isOnline && <span className="absolute bottom-1 right-1 block h-3 w-3 rounded-full bg-brand-green border-2 border-white"></span>}
            </div>
            <div className="flex-1 min-w-0">
                 <h3 className="text-base font-bold text-brand-text-dark truncate">{astrologer.name}</h3>
                 <p className="text-xs text-brand-text-light truncate">{astrologer.specialties.join(', ')}</p>
                <div className="flex items-center my-0.5">
                    <StarIcon className="w-4 h-4 text-brand-yellow" />
                    <span className="ml-1.5 font-semibold text-brand-text-light text-sm">{astrologer.rating}</span>
                </div>
            </div>
        </div>
        <div className="mt-4">
            <Link to={`/chat/${astrologer.id}`} className="w-full py-2 flex items-center justify-center space-x-2 bg-brand-green text-white font-bold rounded-lg hover:bg-green-600 transition-colors text-sm">
                <ChatIcon className="w-4 h-4" strokeWidth="2.5"/>
                <span>Chat Now (₹{astrologer.pricePerMinute}/min)</span>
            </Link>
        </div>
    </div>
);

const CarouselSection: React.FC<{ title: string, viewAllLink: string, children: React.ReactNode }> = ({ title, viewAllLink, children }) => (
    <section>
        <div className="flex justify-between items-center mb-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text-dark">{title}</h2>
            <Link to={viewAllLink} className="text-sm font-semibold text-brand-gold flex items-center">
                View All <ChevronRightIcon className="w-4 h-4 ml-1" />
            </Link>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
            {children}
        </div>
    </section>
);

const HomePageProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <Link to={`/products/${product.id}`} className="flex-shrink-0 w-44 bg-brand-card rounded-xl shadow-md overflow-hidden snap-start group">
        <img src={product.images[0]} alt={product.name} className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="p-3">
            <h3 className="font-semibold text-sm text-brand-text-dark truncate">{product.name}</h3>
            <p className="font-bold text-brand-text-dark mt-1">₹{product.price.toLocaleString('en-IN')}</p>
        </div>
    </Link>
);

const HomePagePoojaCard: React.FC<{ pooja: Pooja }> = ({ pooja }) => (
    <Link to={`/poojas/${pooja.id}`} className="flex-shrink-0 w-64 h-44 bg-brand-card rounded-xl shadow-md overflow-hidden snap-start group relative">
        <img src={pooja.images[0]} alt={pooja.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
            <h3 className="font-serif font-bold text-lg text-white">{pooja.name}</h3>
        </div>
    </Link>
);

const HomePageSpellCard: React.FC<{ spell: Spell }> = ({ spell }) => (
     <Link to={`/spells/${spell.id}`} className="flex-shrink-0 w-64 h-44 bg-brand-card rounded-xl shadow-md overflow-hidden snap-start group relative">
        <img src={spell.images[0]} alt={spell.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
            <p className="text-xs font-semibold text-brand-yellow uppercase tracking-wider">{spell.category}</p>
            <h3 className="font-serif font-bold text-md text-white mt-1 truncate">{spell.name}</h3>
        </div>
    </Link>
);

const HomePageBhajanCard: React.FC<{ bhajan: Bhajan, onPlay: () => void }> = ({ bhajan, onPlay }) => (
    <div onClick={onPlay} className="flex-shrink-0 w-40 snap-start group cursor-pointer">
        <div className="relative">
            <img src={bhajan.coverArt} alt={bhajan.title} className="w-full h-40 object-cover rounded-xl shadow-md" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayIcon className="w-10 h-10 text-white" />
            </div>
        </div>
        <div className="mt-2 px-1">
            <h3 className="font-semibold text-sm text-brand-text-dark truncate">{bhajan.title}</h3>
            <p className="text-xs text-brand-text-light truncate">{bhajan.artist}</p>
        </div>
    </div>
);

const ServiceCard: React.FC<{icon: React.FC<any>, title: string, desc: string, to: string, color: string, bgColor: string}> = ({icon: Icon, title, desc, to, color, bgColor}) => (
     <Link to={to} className={`p-4 rounded-xl flex items-center justify-between ${bgColor} border ${color}/20`}>
        <div className="flex items-center space-x-4">
            <Icon className={`w-10 h-10 ${color}`}/>
            <div>
                <h3 className="font-bold text-base text-brand-text-dark">{title}</h3>
                <p className="text-xs text-brand-text-light">{desc}</p>
            </div>
        </div>
        <ChevronRightIcon className={`w-5 h-5 ${color}`} />
    </Link>
);

export const HomePage: React.FC = () => {
    const topLinks = [
        { icon: KundliIcon, label: 'Kundli', to: '/kundli' },
        { icon: KundliMatchingIcon, label: 'Matching', to: '/matchmaking' },
        { icon: CompassIcon, label: 'Life Path', to: '/lifepath-calculator' },
        { icon: MoneyCalculatorIcon, label: 'Finance', to: '/money-calculator' },
        { icon: HeartIcon, label: 'Love Calc', to: '/love-calculator' }
    ];

    const onlineAstrologers = ASTROLOGERS.filter(a => a.isOnline);
    const featuredProducts = PRODUCTS.slice(0, 6);
    const featuredPoojas = POOJAS.slice(0, 4);
    const featuredSpells = SPELLS.slice(0, 4);
    const featuredBhajans = BHAJANS.slice(0, 6);

    const { playPlaylist } = useMusicPlayer();

    const handlePlayBhajan = (bhajanId: string) => {
        const bhajanIndex = BHAJANS.findIndex(b => b.id === bhajanId);
        if (bhajanIndex !== -1) {
            playPlaylist(BHAJANS, bhajanIndex);
        }
    };

    return (
        <div className="space-y-10">
            <section className="grid grid-cols-5 gap-2 mt-4">
                {topLinks.map((link, index) => (
                    <TopLink key={index} {...link} />
                ))}
            </section>
            
            <div className="space-y-4">
                 <ServiceCard 
                    icon={AiPanditIcon}
                    title="Ask AI Pandit"
                    desc="Get instant spiritual guidance"
                    to="/ai-pandit"
                    color="text-indigo-600"
                    bgColor="bg-indigo-50"
                />
                 <ServiceCard 
                    icon={GemstoneIcon}
                    title="Gemstone Guide"
                    desc="Find your lucky gemstone with AI"
                    to="/gemstone-consultation"
                    color="text-teal-600"
                    bgColor="bg-teal-50"
                />
                <ServiceCard 
                    icon={DiyaIcon}
                    title="Book a Pooja"
                    desc="Online rituals for your needs"
                    to="/poojas"
                    color="text-yellow-600"
                    bgColor="bg-yellow-50"
                />
                 <ServiceCard 
                    icon={LaalKitabIcon}
                    title="Laal Kitab Report"
                    desc="Unlock remedies for life's problems"
                    to="/laalkitab"
                    color="text-brand-red"
                    bgColor="bg-brand-pink-light"
                />
                 <ServiceCard 
                    icon={SparkleIcon}
                    title="Spiritual Spells"
                    desc="Harness ancient energies"
                    to="/spells"
                    color="text-brand-gold"
                    bgColor="bg-brand-yellow-light"
                />
                <ServiceCard 
                    icon={PoojaThaliIcon}
                    title="Interactive Pooja"
                    desc="Perform a virtual aarti"
                    to="/interactive-pooja"
                    color="text-orange-600"
                    bgColor="bg-orange-50"
                />
            </div>
            
            <CarouselSection title="Live Astrologers" viewAllLink="/astrologers">
                {onlineAstrologers.map(astrologer => (
                   <HomePageAstrologerCard key={astrologer.id} astrologer={astrologer} />
                ))}
            </CarouselSection>

            <CarouselSection title="Shop Our Store" viewAllLink="/store">
                {featuredProducts.map(product => (
                    <HomePageProductCard key={product.id} product={product} />
                ))}
            </CarouselSection>

            <CarouselSection title="Featured Poojas" viewAllLink="/poojas">
                {featuredPoojas.map(pooja => (
                    <HomePagePoojaCard key={pooja.id} pooja={pooja} />
                ))}
            </CarouselSection>
            
            <CarouselSection title="Popular Spells" viewAllLink="/spells">
                {featuredSpells.map(spell => (
                    <HomePageSpellCard key={spell.id} spell={spell} />
                ))}
            </CarouselSection>

            <CarouselSection title="Devotional Music" viewAllLink="/bhajans">
                {featuredBhajans.map((bhajan) => (
                    <HomePageBhajanCard key={bhajan.id} bhajan={bhajan} onPlay={() => handlePlayBhajan(bhajan.id)} />
                ))}
            </CarouselSection>

        </div>
    );
};
