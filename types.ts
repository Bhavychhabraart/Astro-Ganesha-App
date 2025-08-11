

export interface Bhajan {
  id: string;
  title: string;
  artist: string;
  coverArt: string;
  audioSrc: string;
  duration: number; // in seconds
}

export enum Deity {
    SHIVA = 'Shiva',
    VISHNU = 'Vishnu',
    DEVI = 'Devi',
    GANESHA = 'Ganesha',
    KRISHNA = 'Krishna',
    HANUMAN = 'Hanuman',
}

export interface Astrologer {
    id: string;
    name: string;
    avatarUrl: string;
    specialties: string[];
    rating: number;
    experience: number; // in years
    languages: string[];
    isOnline: boolean;
    bio: string;
    pricePerMinute: number;
}

export interface Pooja {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    images: string[];
    benefits: string[];
    inclusions: string[];
    price: number;
}

export enum ProductCategory {
    GEMSTONES = 'Gemstones',
    YANTRAS = 'Yantras',
    IDOLS = 'Idols',
    PUJA_ITEMS = 'Puja Items',
    RUDRAKSHA = 'Rudraksha',
}

export interface Product {
    id: string;
    name: string;
    category: ProductCategory;
    images: string[];
    price: number;
    description: string;
    remedyFor: string[];
    howToUse: string;
    rating: number;
    reviewCount: number;
}

export enum SpellCategory {
    LOVE = 'Love & Relationships',
    CAREER = 'Career & Success',
    FAMILY = 'Family & Harmony',
    PROTECTION = 'Protection & Cleansing',
}

export interface Spell {
    id: string;
    name: string;
    category: SpellCategory;
    description: string;
    longDescription: string;
    images: string[];
    benefits: string[];
    requirements: string[]; // e.g., "Your full name", "A recent photograph"
    price: number;
    requiresPhoto: boolean;
}

// --- Cart Types ---

export interface SpellBookingDetails {
    name: string;
    intention: string;
    fileName?: string;
}
export interface CartItemBase {
    id: string; // Composite key, e.g., `product-${productId}` or `spell-${spellId}-${timestamp}`
    price: number;
    name: string;
    image: string;
}

export interface CartItemProduct extends CartItemBase {
    type: 'product';
    productId: string;
    quantity: number;
}

export interface CartItemSpell extends CartItemBase {
    type: 'spell';
    spellId: string;
    bookingDetails: SpellBookingDetails;
    quantity: 1; // Spells always have a quantity of 1
}

export type CartItem = CartItemProduct | CartItemSpell;


// --- Kundli Report Types ---

export type Planet = 'Sun' | 'Moon' | 'Mars' | 'Mercury' | 'Jupiter' | 'Venus' | 'Saturn' | 'Rahu' | 'Ketu' | 'Ascendant';

export type Rashi = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface PlanetPosition {
    planet: Planet;
    rashi: Rashi;
    house: number;
    degrees: number;
    nakshatra: string;
    nakshatraPada: number;
    isRetrograde: boolean;
}

export interface DashaPeriod {
    planet: Planet;
    startDate: string;
    endDate: string;
    subPeriods: {
        planet: Planet;
        startDate: string;
        endDate: string;
    }[];
}

export interface Prediction {
    title: string;
    prediction: string;
}

export interface Remedy {
    title: string;
    description: string;
    type: 'gemstone' | 'mantra' | 'charity' | 'ritual';
}

export interface Yoga {
    name: string;
    description: string;
    isPresent: boolean;
}

export interface JaiminiAnalysis {
    atmakaraka: { planet: Planet, description: string };
    darakaraka: { planet: Planet, description: string };
}

export interface KundliData {
    basicDetails: {
        sunSign: Rashi;
        moonSign: Rashi;
        nakshatra: string;
        tithi: string;
        yog: string;
        karan: string;
        gan: 'Dev' | 'Manushya' | 'Rakshas';
        varna: 'Brahmin' | 'Kshatriya' | 'Vaisya' | 'Shudra';
        vashya: 'Dwipad' | 'Chatushpad' | 'Jalchar' | 'Vanachar' | 'Keet';
        nadi: 'Adi' | 'Madhya' | 'Antya';
        ayanamsa: string;
    };
    planetaryPositions: PlanetPosition[];
    navamsaPositions: PlanetPosition[];
    vimshottariDasha: DashaPeriod[];
    mangalDosha: {
        hasDosha: boolean;
        description: string;
        inWhichHouse: number | null;
    };
    predictions: {
        yearly: Prediction[];
        monthly: Prediction[];
    };
    lifePhases: Prediction[];
    remedies: Remedy[];
    yogas: Yoga[];
    sadeSati: {
        isUndergoing: boolean;
        description: string;
        currentPhase: string;
    };
    generalCharacteristics: string;
    jaiminiAnalysis: JaiminiAnalysis;
    risingSignAnalysis: string;
    rashiAnalysis: string;
    nakshatraAnalysis: string;
    dashaInterpretation: string;
}

export interface KundliFormInput {
    name: string;
    dob: string;
    tob: string;
    pob: string;
}

// --- Matchmaking Types ---

export interface MatchmakingFormInput {
    boy: KundliFormInput;
    girl: KundliFormInput;
}

export interface KootaResult {
    koota: 'Varna' | 'Vashya' | 'Tara' | 'Yoni' | 'Graha Maitri' | 'Gana' | 'Bhakoot' | 'Nadi';
    obtained: number;
    total: number;
    description: string;
}

export interface MatchmakingReportData {
    compatibilityScore: {
        obtained: number;
        total: number;
    };
    summary: string;
    ashtakoota: KootaResult[];
    mangalDoshaAnalysis: {
        title: string;
        description: string;
        isCompatible: boolean;
    };
    conclusion: string;
    boyChartSummary: {
        moonSign: Rashi;
        nakshatra: string;
    };
    girlChartSummary: {
        moonSign: Rashi;
        nakshatra: string;
    };
}

// --- Love Calculator Types ---

export interface LoveFormInput {
    name1: string;
    name2: string;
}

export interface LoveReportData {
    score: number; // 0-100
    summary: string;
    analysis: {
        compatibility: string;
        communication: string;
        passion: string;
        challenges: string;
    };
    conclusion: string;
}

// --- Money Calculator Types ---

export interface MoneyFormInput {
    name: string;
    dob: string;
}

export interface MoneyReportData {
    financialProfile: {
        title: string;
        description: string;
    };
    careerSuggestions: {
        title: string;
        suggestions: string[];
    };
    investmentGuidance: {
        title: string;
        guidance: string;
    };
    remedies: {
        title: string;
        remedies: string[];
    };
}

// --- Laal Kitab Types ---

export interface LaalKitabFormInput {
    name: string;
    dob: string;
    tob: string;
    pob: string;
}

export interface LaalKitabPlanetAnalysis {
    planet: Planet;
    house: number;
    effect: string;
    isGood: boolean;
}

export interface LaalKitabPlanetStatus {
    planet: Planet;
    status: 'Awake' | 'Sleeping';
    implication: string;
}

export interface LaalKitabDebt {
    name: string;
    description: string;
    isPresent: boolean;
}

export interface LaalKitabRemedy {
    title: string;
    description: string;
    category: 'general' | 'specific' | 'debt';
}

export interface LaalKitabReportData {
    introduction: string;
    kundliChakra: { [house: string]: Planet[] };
    planetaryAnalysis: LaalKitabPlanetAnalysis[];
    planetStatus: LaalKitabPlanetStatus[];
    ancestralDebts: LaalKitabDebt[];
    keyPlanets: {
        benefic: { planet: Planet; reason: string }[];
        malefic: { planet: Planet; reason: string }[];
    };
    varshphal: {
        currentYear: number;
        rulingPlanet: Planet;
        overall: string;
        career: string;
        health: string;
        relationships: string;
    };
    remedies: LaalKitabRemedy[];
    conclusion: string;
}

// --- Life Path Calculator Types ---

export interface LifePathFormInput {
    dob: string;
}

export interface LifePathReportData {
    lifePathNumber: number;
    title: string; // e.g., "The Leader"
    introduction: string;
    coreStrengths: string[];
    potentialChallenges: string[];
    careerPath: string;
    loveAndRelationships: string;
    famousPeople: string[];
    conclusion: string;
}

// --- Numerology Calculator Types ---
export interface NumerologyFormInput {
    name: string;
    dob: string;
}

export interface NumerologyNumberInfo {
    number: number;
    title: string;
    description: string;
}

export interface NumerologyReportData {
    lifePathNumber: NumerologyNumberInfo;
    expressionNumber: NumerologyNumberInfo;
    soulUrgeNumber: NumerologyNumberInfo;
    personalityNumber: NumerologyNumberInfo;
    birthdayNumber: NumerologyNumberInfo;
    overallSummary: string;
    luckyNumbers: number[];
    luckyColors: string[];
    challenges: string;
}

// --- Muhurat Teller Types ---
export type MuhuratActivity =
  | "Getting Married"
  | "Starting a New Business"
  | "Buying a Property"
  | "Buying a Vehicle"
  | "Griha Pravesh (House Warming)"
  | "Starting Education";

export interface MuhuratFormInput {
    activity: MuhuratActivity;
    startDate: string;
    endDate: string;
}

export interface Muhurat {
    date: string; // "YYYY-MM-DD"
    dayOfWeek: string;
    startTime: string; // "HH:MM"
    endTime: string; // "HH:MM"
    nakshatra: string;
    tithi: string;
    auspiciousness: 'Excellent' | 'Good' | 'Average';
    description: string;
}

export interface MuhuratReportData {
    activity: MuhuratActivity;
    muhurats: Muhurat[];
    summary: string;
}


// --- Daily Horoscope Types ---
export interface ZodiacSign {
    name: Rashi;
    dateRange: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface DailyHoroscopeData {
    summary: string;
    lucky_color: string;
    lucky_number: string;
    lucky_gemstone: string;
    love: string;
    career: string;
    health: string;
}

// --- Palm Reading Types ---
export interface LineAnalysis {
    lineName: 'Heart Line' | 'Head Line' | 'Life Line' | 'Fate Line';
    analysis: string;
}

export interface MountAnalysis {
    mountName: 'Jupiter' | 'Saturn' | 'Apollo' | 'Mercury' | 'Venus' | 'Mars' | 'Moon';
    analysis: string;
}

export interface PalmReadingReportData {
    handShape: {
        shape: 'Earth' | 'Air' | 'Fire' | 'Water';
        analysis: string;
    };
    lines: LineAnalysis[];
    mounts: MountAnalysis[];
    overallSummary: string;
}

// --- Face Reading Types ---
export interface FeatureAnalysis {
    featureName: 'Forehead' | 'Eyebrows' | 'Eyes' | 'Nose' | 'Lips' | 'Chin' | 'Cheeks';
    analysis: string;
}

export interface FaceReadingReportData {
    faceShape: {
        shape: 'Round' | 'Oval' | 'Square' | 'Heart' | 'Long' | 'Diamond';
        analysis: string;
    };
    features: FeatureAnalysis[];
    overallPersonality: string;
}

// --- Tarot Reading Types ---
export interface TarotCardData {
    name: string;
    arcana: 'Major';
    image: string;
}

export interface CardInterpretation {
    cardName: string;
    position: 'Past' | 'Present' | 'Future';
    interpretation: string;
}

export interface TarotReadingData {
    interpretations: CardInterpretation[];
    summary: string;
}

// --- Interactive Pooja Types ---
export interface InteractiveDeityInfo {
    name: Deity;
    image: string; // Large image for the pooja screen
    aartiId: string; // ID of the bhajan/aarti to play
}

// --- Mantra Chanting Types ---
export interface Mantra {
  id: string;
  name: string;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  audioSrc: string; // Short audio clip for each chant
}