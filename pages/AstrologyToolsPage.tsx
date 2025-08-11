

import React from 'react';
import { Link } from 'react-router-dom';
import { 
    CalendarIcon,
    KundliIcon, 
    LaalKitabIcon,
    KundliMatchingIcon, 
    CompassIcon, 
    HeartIcon, 
    MoneyCalculatorIcon, 
    ChatIcon,
    GemstoneIcon,
    HashIcon,
    SunIcon,
    MoonStarIcon,
    StarIcon,
    ShieldAlertIcon,
    UserIcon,
    ClockIcon,
    HandIcon,
    ScanFaceIcon,
    TarotIcon,
} from '../components/Icons';

const toolLinks = [
    { to: "/daily-horoscope", icon: CalendarIcon, title: "Daily Horoscope", description: "Personalized daily predictions for your sign." },
    { to: "/tarot-reading", icon: TarotIcon, title: "Interactive Tarot Reading", description: "Get a Past, Present, Future reading from an AI." },
    { to: "/palm-reader", icon: HandIcon, title: "AI Palm Reader", description: "Get a detailed palm reading using your camera." },
    { to: "/face-reader", icon: ScanFaceIcon, title: "AI Face Reader", description: "Analyze facial features for astrological insights." },
    { to: "/muhurat-teller", icon: ClockIcon, title: "Muhurat Teller", description: "Find auspicious timings for important events." },
    { to: "/kundli", icon: KundliIcon, title: "Generate Full Kundli", description: "Create a detailed birth chart for deep insights." },
    { to: "/numerology-calculator", icon: HashIcon, title: "Numerology Calculator", description: "Decode your life's purpose using numbers." },
    { to: "/sun-sign-calculator", icon: SunIcon, title: "Sun Sign Calculator", description: "Quickly find out your Western zodiac sign." },
    { to: "/rising-sign-calculator", icon: KundliIcon, title: "Rising Sign Calculator", description: "Discover your Ascendant and its influence." },
    { to: "/rashi-calculator", icon: MoonStarIcon, title: "Rashi Calculator", description: "Find your Moon sign for emotional insights." },
    { to: "/nakshatra-calculator", icon: StarIcon, title: "Nakshatra Calculator", description: "Learn about your unique birth star." },
    { to: "/mangal-dosha-calculator", icon: ShieldAlertIcon, title: "Mangal Dosha Calculator", description: "Check for Mars affliction in your chart." },
    { to: "/dasha-calculator", icon: CalendarIcon, title: "Dasha Calculator", description: "See your planetary periods and their impact." },
    { to: "/atmakaraka-calculator", icon: UserIcon, title: "Atmakaraka Calculator", description: "Find your soul planet in Jaimini astrology." },
    { to: "/laalkitab", icon: LaalKitabIcon, title: "Laal Kitab Report", description: "Get remedies from Laal Kitab astrology." },
    { to: "/matchmaking", icon: KundliMatchingIcon, title: "Kundli Matchmaking", description: "Check compatibility for marriage." },
    { to: "/gemstone-consultation", icon: GemstoneIcon, title: "Gemstone Guide", description: "Find your lucky gem with our AI expert." },
    { to: "/lifepath-calculator", icon: CompassIcon, title: "Life Path Number", description: "Discover your core purpose with numerology." },
    { to: "/love-calculator", icon: HeartIcon, title: "Love Calculator", description: "Check love compatibility based on names." },
    { to: "/money-calculator", icon: MoneyCalculatorIcon, title: "Money Calculator", description: "Get an AI-powered financial outlook." },
    { to: "/astrologers", icon: ChatIcon, title: "Live Astrologers", description: "Connect with experts for live consultations." },
];

const ToolCard: React.FC<typeof toolLinks[0]> = ({ to, icon: Icon, title, description }) => (
    <Link to={to} className="block p-6 rounded-xl bg-brand-card hover:bg-brand-surface transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1">
        <div className="flex items-center mb-3">
            <Icon className="w-8 h-8 text-brand-primary mr-4" />
            <h3 className="font-serif text-xl font-bold text-brand-text-primary">{title}</h3>
        </div>
        <p className="text-brand-text-secondary">{description}</p>
    </Link>
);

export const AstrologyToolsPage: React.FC = () => {
    return (
        <div>
            <header className="mb-8">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-text-primary mb-2">Astrology Readings