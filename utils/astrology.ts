

import { GoogleGenAI, Type } from "@google/genai";
import { KundliData, Planet, Rashi, PlanetPosition, KundliFormInput, Yoga, Prediction, Remedy, MatchmakingFormInput, MatchmakingReportData, LoveFormInput, LoveReportData, MoneyFormInput, MoneyReportData, LaalKitabFormInput, LaalKitabReportData, LaalKitabPlanetAnalysis, LifePathFormInput, LifePathReportData, DailyHoroscopeData, NumerologyFormInput, NumerologyReportData, JaiminiAnalysis, MuhuratFormInput, MuhuratReportData, MuhuratActivity, PalmReadingReportData, FaceReadingReportData, TarotCardData, TarotReadingData } from '../types';

const RASHIS: Rashi[] = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const PLANETS: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
const NAKSHATRAS = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'];
const TITHIS = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima', 'Amavasya'];
const YOGAS = ['Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarman', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyana', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'];
const KARANAS = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Garaja', 'Vanija', 'Visti (Bhadra)', 'Shakuni', 'Chatushpada', 'Naga', 'Kintughna'];
const GANS = ['Dev', 'Manushya', 'Rakshas'] as const;
const VARNAS = ['Brahmin', 'Kshatriya', 'Vaisya', 'Shudra'] as const;
const VASHYAS = ['Dwipad', 'Chatushpad', 'Jalchar', 'Vanachar', 'Keet'] as const;
const NADIS = ['Adi', 'Madhya', 'Antya'] as const;
const AYANAMSA = ['Lahiri', 'Raman', 'KP'];

const API_KEY_ERROR_MESSAGE = "The 'VITE_API_KEY' environment variable was not found. Please ensure it is configured in your deployment environment (e.g., in your Vercel project settings) and has the 'VITE_' prefix to be accessible.";


const randomElement = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generatePlanetaryPositions = (ascendantRashi: Rashi): PlanetPosition[] => {
    const ascendantIndex = RASHIS.indexOf(ascendantRashi);
    const usedRashis: Set<Rashi> = new Set();
    
    const ascendantPosition: PlanetPosition = {
        planet: 'Ascendant',
        rashi: ascendantRashi,
        house: 1,
        degrees: parseFloat((Math.random() * 30).toFixed(2)),
        nakshatra: randomElement(NAKSHATRAS),
        nakshatraPada: Math.floor(Math.random() * 4) + 1,
        isRetrograde: false,
    };
    usedRashis.add(ascendantRashi);

    const positions: PlanetPosition[] = PLANETS.map(planet => {
        let rashi: Rashi;
        do {
            rashi = randomElement(RASHIS);
        } while (usedRashis.has(rashi) && planet !== 'Rahu' && planet !== 'Ketu');

        if (planet !== 'Rahu' && planet !== 'Ketu') {
          usedRashis.add(rashi);
        }
        
        const rashiIndex = RASHIS.indexOf(rashi);
        let house = rashiIndex - ascendantIndex + 1;
        if (house <= 0) house += 12;

        return {
            planet,
            rashi,
            house,
            degrees: parseFloat((Math.random() * 30).toFixed(2)),
            nakshatra: randomElement(NAKSHATRAS),
            nakshatraPada: Math.floor(Math.random() * 4) + 1,
            isRetrograde: planet !== 'Sun' && planet !== 'Moon' && Math.random() < 0.2,
        };
    });

    return [ascendantPosition, ...positions];
};

const generateDasha = (startDate: Date) => {
    let currentDate = new Date(startDate);
    return PLANETS.map(planet => {
        const dashaYears = Math.floor(Math.random() * 5) + 5;
        const dashaStartDate = new Date(currentDate);
        currentDate.setFullYear(currentDate.getFullYear() + dashaYears);
        const dashaEndDate = new Date(currentDate);

        let subPeriodStartDate = new Date(dashaStartDate);
        const subPeriods = PLANETS.map(subPlanet => {
            const subPeriodMonths = Math.floor(dashaYears * 12 / PLANETS.length);
            const subStartDate = new Date(subPeriodStartDate);
            subPeriodStartDate.setMonth(subPeriodStartDate.getMonth() + subPeriodMonths);
            const subEndDate = new Date(subPeriodStartDate);
            return {
                planet: subPlanet,
                startDate: subStartDate.toISOString().split('T')[0],
                endDate: subEndDate.toISOString().split('T')[0],
            };
        });

        return {
            planet,
            startDate: dashaStartDate.toISOString().split('T')[0],
            endDate: dashaEndDate.toISOString().split('T')[0],
            subPeriods,
        };
    });
};

const checkMangalDosha = (planetaryPositions: PlanetPosition[]) => {
    const mars = planetaryPositions.find(p => p.planet === 'Mars');
    if (!mars) return { hasDosha: false, description: "Mars not found.", inWhichHouse: null };

    const doshaHouses = [1, 4, 7, 8, 12];
    if (doshaHouses.includes(mars.house)) {
        return {
            hasDosha: true,
            description: `Mangal Dosha is present as Mars is in the ${mars.house}th house from the Ascendant. This can indicate potential challenges in marital life, which can be mitigated through remedies.`,
            inWhichHouse: mars.house
        };
    }
    return { hasDosha: false, description: "No Mangal Dosha found in the chart from the ascendant.", inWhichHouse: null };
};

const checkSadeSati = (planetaryPositions: PlanetPosition[]) => {
    const moon = planetaryPositions.find(p => p.planet === 'Moon');
    if (!moon) return { isUndergoing: false, description: 'Moon position not available.', currentPhase: 'N/A' };

    // This is a mock check. A real implementation would need Saturn's current transit position.
    const isUndergoing = Math.random() < 0.2; // 20% chance of undergoing Sade Sati
    if (isUndergoing) {
        const phase = randomElement(['First Phase', 'Second Phase', 'Third Phase']);
        return {
            isUndergoing: true,
            description: `You are currently undergoing Sade Sati, the 7.5-year transit of Saturn over your natal Moon. This is a period of significant life lessons and karmic balancing.`,
            currentPhase: phase
        };
    }
    return { isUndergoing: false, description: 'You are not currently undergoing Sade Sati.', currentPhase: 'N/A' };
};

const generateYogas = (planetaryPositions: PlanetPosition[]): Yoga[] => {
    // Mock yoga generation
    return [
        { name: 'Gajakesari Yoga', description: 'Formed by the conjunction or mutual aspect of Jupiter and Moon. It bestows wealth, fame, and intelligence.', isPresent: Math.random() > 0.7 },
        { name: 'Raja Yoga', description: 'A "Royal" combination that indicates success, high status, and leadership qualities. Various combinations form this yoga.', isPresent: Math.random() > 0.6 },
        { name: 'Dhana Yoga', description: 'A "Wealth" combination involving the lords of wealth-giving houses (2nd, 5th, 9th, 11th). Indicates financial prosperity.', isPresent: Math.random() > 0.5 }
    ].filter(y => y.isPresent);
};

const getAiInsights = async (baseData: KundliData, formData: KundliFormInput): Promise<Partial<KundliData>> => {
    if (!process.env.VITE_API_KEY) {
        console.error("VITE_API_KEY environment variable not set.");
        return {
            generalCharacteristics: `AI insights could not be generated. ${API_KEY_ERROR_MESSAGE}`,
            predictions: { yearly: [], monthly: [] },
            lifePhases: [],
            remedies: [],
        };
    }

    const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });
    const model = 'gemini-2.5-flash';
    const currentYear = new Date().getFullYear();
    const currentDasha = baseData.vimshottariDasha[0]; // Mock current dasha

    const prompt = `
        You are 'Astro Ganesha', a wise and compassionate Vedic astrologer with decades of experience. Your readings are not just predictions, but stories of potential and pathways to growth.
        The user, ${formData.name}, has come to you seeking clarity. Address them directly and warmly. Explain the 'why' behind astrological concepts in simple terms. Your tone should be deeply personal, insightful, and empowering. Frame challenges as opportunities.

        User's Details:
        - Name: ${formData.name}
        - Date of Birth: ${formData.dob}

        Astrological Summary for Analysis:
        - Ascendant (Lagna): ${baseData.planetaryPositions.find(p => p.planet === 'Ascendant')?.rashi}
        - Sun Sign (Surya Rashi): ${baseData.basicDetails.sunSign}
        - Moon Sign (Chandra Rashi): ${baseData.basicDetails.moonSign}
        - Birth Star (Nakshatra): ${baseData.basicDetails.nakshatra}
        - Current Dasha (mock): ${currentDasha.planet}
        - Mangal Dosha: ${baseData.mangalDosha.hasDosha ? `Yes, in house ${baseData.mangalDosha.inWhichHouse}` : 'No'}
        - Sade Sati Status: ${baseData.sadeSati.isUndergoing ? 'Undergoing' : 'Not Undergoing'}

        Now, craft a detailed Kundli reading in JSON format as if you were sitting with ${formData.name}, guiding them through their life's cosmic map. Your predictions should be for the current year (${currentYear}). The JSON object must follow the provided schema. For each analysis (rising sign, rashi, etc.), provide a detailed, personal paragraph.
    `;
    
    const predictionSchema = {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING },
            prediction: { type: Type.STRING },
        }
    };

    const remedySchema = {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            type: { type: Type.STRING, enum: ['gemstone', 'mantra', 'charity', 'ritual'] },
        }
    };

    const jaiminiPlanetSchema = {
        type: Type.OBJECT,
        properties: {
            planet: { type: Type.STRING, enum: PLANETS as string[] },
            description: { type: Type.STRING, description: "A detailed paragraph on the significance of this Karaka planet for the user."}
        },
        required: ["planet", "description"]
    };
    
    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            generalCharacteristics: { type: Type.STRING, description: "A warm, personal analysis of the user's core nature based on their chart." },
            predictions: {
                type: Type.OBJECT,
                properties: {
                    yearly: { type: Type.ARRAY, items: predictionSchema, description: "Detailed predictions for key areas like career, love, finance for the current year." },
                    monthly: { type: Type.ARRAY, items: predictionSchema, description: "Month-by-month brief predictions for the next 3 months." },
                },
            },
            lifePhases: { type: Type.ARRAY, items: predictionSchema, description: "Predictions about different phases of life (e.g., Early Life, Career Phase, Later Life)." },
            remedies: { type: Type.ARRAY, items: remedySchema, description: "Provide empowering and practical remedies, explaining why each is suggested." },
            jaiminiAnalysis: {
                type: Type.OBJECT,
                properties: {
                    atmakaraka: { ...jaiminiPlanetSchema, description: "Analysis of the Atmakaraka (soul planet)." },
                    darakaraka: { ...jaiminiPlanetSchema, description: "Analysis of the Darakaraka (spouse planet)." }
                },
                required: ["atmakaraka", "darakaraka"]
            },
            risingSignAnalysis: { type: Type.STRING, description: "Detailed analysis of the user's Ascendant/Lagna and its impact on their personality and life path." },
            rashiAnalysis: { type: Type.STRING, description: "Detailed analysis of the user's Moon Sign/Rashi and its impact on their mind and emotions." },
            nakshatraAnalysis: { type: Type.STRING, description: "Detailed analysis of the user's Birth Star/Nakshatra and its unique influence." },
            dashaInterpretation: { type: Type.STRING, description: "A detailed interpretation of the user's current (mock) Dasha period and what it signifies for them now." }
        },
    };

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const aiData = JSON.parse(jsonText);

        return aiData;

    } catch (error) {
        console.error("Error fetching AI insights:", error);
        return {
            generalCharacteristics: "There was an error generating AI insights. The model may be unavailable or the request was invalid.",
            predictions: { yearly: [], monthly: [] },
            lifePhases: [],
            remedies: [],
            jaiminiAnalysis: { atmakaraka: { planet: 'Sun', description: 'AI Error' }, darakaraka: { planet: 'Sun', description: 'AI Error' } },
            risingSignAnalysis: "AI Error",
            rashiAnalysis: "AI Error",
            nakshatraAnalysis: "AI Error",
            dashaInterpretation: "AI Error",
        };
    }
};


export const generateKundliData = async (formData: KundliFormInput): Promise<KundliData> => {
    // Step 1: Generate base astrological data
    const ascendantRashi = randomElement(RASHIS);
    const planetaryPositions = generatePlanetaryPositions(ascendantRashi);
    const navamsaPositions = generatePlanetaryPositions(randomElement(RASHIS));
    const moonPosition = planetaryPositions.find(p => p.planet === 'Moon');
    const sunPosition = planetaryPositions.find(p => p.planet === 'Sun');
    
    let baseData: KundliData = {
        basicDetails: {
            sunSign: sunPosition?.rashi || randomElement(RASHIS),
            moonSign: moonPosition?.rashi || randomElement(RASHIS),
            nakshatra: moonPosition?.nakshatra || randomElement(NAKSHATRAS),
            tithi: randomElement(TITHIS),
            yog: randomElement(YOGAS),
            karan: randomElement(KARANAS),
            gan: randomElement(GANS),
            varna: randomElement(VARNAS),
            vashya: randomElement(VASHYAS),
            nadi: randomElement(NADIS),
            ayanamsa: `${randomElement(AYANAMSA)}: ${parseFloat((23 + Math.random()).toFixed(4))}`,
        },
        planetaryPositions,
        navamsaPositions,
        vimshottariDasha: generateDasha(new Date(formData.dob)),
        mangalDosha: checkMangalDosha(planetaryPositions),
        yogas: generateYogas(planetaryPositions),
        sadeSati: checkSadeSati(planetaryPositions),
        // Placeholders for AI data
        generalCharacteristics: "Loading AI insights...",
        predictions: { yearly: [], monthly: [] },
        lifePhases: [],
        remedies: [],
        jaiminiAnalysis: { atmakaraka: { planet: 'Sun', description: 'Loading...' }, darakaraka: { planet: 'Venus', description: 'Loading...' } },
        risingSignAnalysis: 'Loading...',
        rashiAnalysis: 'Loading...',
        nakshatraAnalysis: 'Loading...',
        dashaInterpretation: 'Loading...',
    };

    // Step 2: Get AI-powered insights
    const aiInsights = await getAiInsights(baseData, formData);
    
    // Step 3: Merge AI data with base data
    return { ...baseData, ...aiInsights };
};

// --- Matchmaking Functions ---

const generateBasicKundliInfo = (formData: KundliFormInput) => {
    const ascendantRashi = randomElement(RASHIS);
    const planetaryPositions = generatePlanetaryPositions(ascendantRashi);
    const moonPosition = planetaryPositions.find(p => p.planet === 'Moon');
    const mangalDosha = checkMangalDosha(planetaryPositions);
    return {
        moonSign: moonPosition?.rashi || randomElement(RASHIS),
        nakshatra: moonPosition?.nakshatra || randomElement(NAKSHATRAS),
        mangalDosha: mangalDosha,
    };
};

export const generateMatchmakingReport = async (formData: MatchmakingFormInput): Promise<MatchmakingReportData> => {
    if (!process.env.VITE_API_KEY) {
        throw new Error(API_KEY_ERROR_MESSAGE);
    }
    
    const boyInfo = generateBasicKundliInfo(formData.boy);
    const girlInfo = generateBasicKundliInfo(formData.girl);

    const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });
    const model = 'gemini-2.5-flash';

    const prompt = `
        You are 'Astro Ganesha', a trusted family astrologer known for your wisdom in marital compatibility. You have been asked to assess the sacred bond between ${formData.boy.name} and ${formData.girl.name}. 
        Your analysis should go beyond mere scores. Weave a narrative about their combined energies, their strengths as a couple, and the areas where they can grow together. Address them as a potential couple, offering gentle guidance and practical advice. Your tone should be warm, responsible, and full of blessings for their future.

        Boy's Astrological Details:
        - Name: ${formData.boy.name}
        - Moon Sign (Rashi): ${boyInfo.moonSign}
        - Birth Star (Nakshatra): ${boyInfo.nakshatra}
        - Mangal Dosha: ${boyInfo.mangalDosha.hasDosha ? 'Present' : 'Absent'}

        Girl's Astrological Details:
        - Name: ${formData.girl.name}
        - Moon Sign (Rashi): ${girlInfo.moonSign}
        - Birth Star (Nakshatra): ${girlInfo.nakshatra}
        - Mangal Dosha: ${girlInfo.mangalDosha.hasDosha ? 'Present' : 'Absent'}

        Provide a detailed compatibility report in JSON format. The report must follow the provided schema exactly.
        - For each of the 8 Kootas, provide the score and a brief, insightful description of what that koota represents and the compatibility level for this couple.
        - For the Mangal Dosha analysis, state if the dosha is nullified or not and its impact.
        - The summary and conclusion should be encouraging, balanced, and offer a clear verdict on the match, written in a personal and guiding tone.
    `;

    const kootaSchema = {
        type: Type.OBJECT,
        properties: {
            koota: { type: Type.STRING, enum: ['Varna', 'Vashya', 'Tara', 'Yoni', 'Graha Maitri', 'Gana', 'Bhakoot', 'Nadi'] },
            obtained: { type: Type.NUMBER },
            total: { type: Type.NUMBER },
            description: { type: Type.STRING },
        }
    };

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            compatibilityScore: {
                type: Type.OBJECT,
                properties: {
                    obtained: { type: Type.NUMBER },
                    total: { type: Type.NUMBER, description: "Should always be 36" },
                },
                required: ['obtained', 'total']
            },
            summary: { type: Type.STRING, description: "A brief, warm summary of the match, e.g., 'A Harmonious and Promising Union'." },
            ashtakoota: { type: Type.ARRAY, items: kootaSchema },
            mangalDoshaAnalysis: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    isCompatible: { type: Type.BOOLEAN },
                },
                required: ['title', 'description', 'isCompatible']
            },
            conclusion: { type: Type.STRING, description: "A final, detailed conclusion about the match, written as if you are personally advising the couple." },
        },
        required: ['compatibilityScore', 'summary', 'ashtakoota', 'mangalDoshaAnalysis', 'conclusion']
    };

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const aiData = JSON.parse(jsonText);

        return {
            ...aiData,
            boyChartSummary: { moonSign: boyInfo.moonSign, nakshatra: boyInfo.nakshatra },
            girlChartSummary: { moonSign: girlInfo.moonSign, nakshatra: girlInfo.nakshatra },
        };

    } catch (error) {
        console.error("Error fetching AI matchmaking report:", error);
        throw new Error("Failed to generate matchmaking report from AI.");
    }
};

// --- Love Calculator Functions ---

export const generateLoveReport = async (formData: LoveFormInput): Promise<LoveReportData> => {
    if (!process.env.VITE_API_KEY) {
        throw new Error(API_KEY_ERROR_MESSAGE);
    }

    const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });
    const model = 'gemini-2.5-flash';

    const prompt = `
        You are 'Prem', the ultimate love guru with a playful yet surprisingly deep understanding of relationships. Forget dry calculations; you see the sparks and the soul connection. 
        For ${formData.name1} and ${formData.name2}, tap into the vibrational energy of their names. 
        Create a fun, flirtatious, and insightful report that feels like a friend giving them the inside scoop on their connection. Use vibrant language, be encouraging, and offer a juicy tidbit of advice that makes them smile.
        
        Your response must be in JSON format and follow the provided schema exactly.
    `;
    
    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            score: { type: Type.NUMBER, description: "A percentage from 40 to 100." },
            summary: { type: Type.STRING, description: "A catchy one-liner summary, e.g., 'A Cosmic Connection!' or 'Sparks are Flying!'." },
            analysis: {
                type: Type.OBJECT,
                properties: {
                    compatibility: { type: Type.STRING, description: "Describe their overall emotional and intellectual compatibility in a fun way." },
                    communication: { type: Type.STRING, description: "Analyze their communication styles with a playful twist." },
                    passion: { type: Type.STRING, description: "Describe the romantic and passionate energy between them using vivid language." },
                    challenges: { type: Type.STRING, description: "Mention potential minor challenges and how to overcome them playfully." }
                },
                required: ['compatibility', 'communication', 'passion', 'challenges']
            },
            conclusion: { type: Type.STRING, description: "A final, encouraging paragraph about their potential as a couple, with a fun sign-off." },
        },
        required: ['score', 'summary', 'analysis', 'conclusion']
    };

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error fetching AI love report:", error);
        throw new Error("Failed to generate love report from AI.");
    }
};


// --- Money Calculator Functions ---

export const generateMoneyReport = async (formData: MoneyFormInput): Promise<MoneyReportData> => {
    if (!process.env.VITE_API_KEY) {
        throw new Error(API_KEY_ERROR_MESSAGE);
    }

    const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });
    const model = 'gemini-2.5-flash';

    const prompt = `
        You are 'Dhanvantari', a seasoned financial astrologer who sees wealth not just as money, but as holistic prosperity. The user, ${formData.name}, seeks your guidance on their financial journey based on their name and date of birth (${formData.dob}).
        Analyze their astrological blueprint for wealth. Provide a report that is not just predictive but strategic. Offer practical, empowering financial advice, suggest career paths that align with their cosmic strengths, and provide simple, powerful remedies to unlock blockages. Your tone is that of a trusted, savvy mentor.

        Your response must be in JSON format and adhere strictly to the provided schema.
    `;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            financialProfile: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "e.g., 'The Ambitious Builder' or 'The Cautious Strategist'" },
                    description: { type: Type.STRING, description: "A detailed paragraph about the user's natural financial tendencies, strengths, and weaknesses, as if advising them directly." }
                },
                required: ['title', 'description']
            },
            careerSuggestions: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "e.g., 'Your Paths to Prosperity'" },
                    suggestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 3-4 career fields or types of roles, explaining WHY they are suitable for wealth creation for this person." }
                },
                required: ['title', 'suggestions']
            },
            investmentGuidance: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "e.g., 'Your Wealth Growth Blueprint'" },
                    guidance: { type: Type.STRING, description: "A paragraph with actionable advice on investment styles, risk tolerance, and potential lucky sectors, framed as personal guidance." }
                },
                required: ['title', 'guidance']
            },
            remedies: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "e.g., 'Unlocking Your Financial Luck'" },
                    remedies: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 2-3 simple but powerful astrological or practical remedies to improve financial luck." }
                },
                required: ['title', 'remedies']
            }
        },
        required: ['financialProfile', 'careerSuggestions', 'investmentGuidance', 'remedies']
    };

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error fetching AI money report:", error);
        throw new Error("Failed to generate money report from AI.");
    }
};

// --- Laal Kitab Functions ---

export const generateLaalKitabReport = async (formData: LaalKitabFormInput): Promise<LaalKitabReportData> => {
    if (!process.env.VITE_API_KEY) {
        const currentYear = new Date().getFullYear();
        const houses = Array.from({length: 12}, (_, i) => i + 1);
        const kundliChakra: { [key: string]: Planet[] } = {};
        for (let i = 1; i <= 12; i++) kundliChakra[i] = [];
        return {
            introduction: `AI report could not be generated. ${API_KEY_ERROR_MESSAGE}`,
            kundliChakra,
            planetaryAnalysis: [],
            planetStatus: [],
            ancestralDebts: [],
            keyPlanets: { benefic: [], malefic: [] },
            varshphal: { currentYear: currentYear, rulingPlanet: 'Sun', overall: 'Could not generate forecast.', career: '', health: '', relationships: ''},
            remedies: [],
            conclusion: "Please configure your API key to proceed."
        };
    }
    
    // Mock planet distribution for the prompt
    const houses = Array.from({length: 12}, (_, i) => i + 1);
    const shuffledHouses = houses.sort(() => 0.5 - Math.random());
    const kundliChakra: { [key: string]: Planet[] } = {};
    for (let i = 1; i <= 12; i++) kundliChakra[i] = [];
    
    const planetPositions = PLANETS.map((planet, index) => {
        const house = shuffledHouses[index % 12];
        kundliChakra[house].push(planet);
        return { planet, house };
    });


    const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });
    const model = 'gemini-2.5-flash';
    const currentYear = new Date().getFullYear();

    const prompt = `
        You are 'Lal Shastri', a direct, no-nonsense Laal Kitab master. You don't sugarcoat, but you always provide a path forward. The user, ${formData.name}, needs practical solutions to their life's problems.
        Analyze their Laal Kitab chart with precision based on their details (Name: ${formData.name}, DOB: ${formData.dob}) and the provided planetary placements. Explain concepts like 'sleeping' planets and 'ancestral debts' in a way that is easy to grasp. Your remedies ('upay') must be the star of the show – simple, actionable, and powerful. Your tone is authoritative, deeply knowledgeable, and ultimately, aimed at providing tangible relief.

        Laal Kitab Chart (Planet Placements): ${JSON.stringify(planetPositions)}

        Your response MUST be in JSON format and strictly follow the provided schema. Be insightful, authentic to Laal Kitab principles, and easy to understand.
        - **remedies**: This is the most critical part. Provide at least 7-10 powerful and clear remedies.
        - **varshphal**: Provide a detailed annual forecast for ${currentYear}.
    `;
    
    const planetAnalysisSchema = {
        type: Type.OBJECT,
        properties: {
            planet: { type: Type.STRING, enum: PLANETS as string[] },
            house: { type: Type.NUMBER },
            effect: { type: Type.STRING, description: "Detailed analysis of the planet in its house." },
            isGood: { type: Type.BOOLEAN }
        },
        required: ["planet", "house", "effect", "isGood"]
    };
    
    const planetStatusSchema = {
        type: Type.OBJECT,
        properties: {
            planet: { type: Type.STRING, enum: PLANETS as string[] },
            status: { type: Type.STRING, enum: ['Awake', 'Sleeping'] },
            implication: { type: Type.STRING }
        },
        required: ["planet", "status", "implication"]
    };

    const debtSchema = {
        type: Type.OBJECT,
        properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            isPresent: { type: Type.BOOLEAN }
        },
        required: ["name", "description", "isPresent"]
    };
    
    const remedySchema = {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { type: Type.STRING, enum: ['general', 'specific', 'debt'] }
        },
        required: ["title", "description", "category"]
    };
    
    const keyPlanetSchema = {
        type: Type.OBJECT,
        properties: {
            planet: { type: Type.STRING, enum: PLANETS as string[] },
            reason: { type: Type.STRING }
        },
        required: ["planet", "reason"]
    };

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            introduction: { type: Type.STRING },
            kundliChakra: {
                type: Type.OBJECT,
                properties: {
                    "1": { type: Type.ARRAY, items: { type: Type.STRING, enum: PLANETS as string[] } }, "2": { type: Type.ARRAY, items: { type: Type.STRING, enum: PLANETS as string[] } }, "3": { type: Type.ARRAY, items: { type: Type.STRING, enum: PLANETS as string[] } }, "4": { type: Type.ARRAY, items: { type: Type.STRING, enum: PLANETS as string[] } }, "5": { type: Type.ARRAY, items: { type: Type.STRING, enum: PLANETS as string[] } }, "6": { type: Type.ARRAY, items: { type: Type.STRING, enum: PLANETS as string[] } }, "7": { type: Type.ARRAY, items: { type: Type.STRING, enum: PLANETS as string[] } }, "8": { type: Type.ARRAY, items: { type: Type.STRING, enum: PLANETS as string[] } }, "9": { type: Type.ARRAY, items: { type: Type.STRING, enum: PLANETS as string[] } }, "10": { type: Type.ARRAY, items: { type: Type.STRING, enum: PLANETS as string[] } }, "11": { type: Type.ARRAY, items: { type: Type.STRING, enum: PLANETS as string[] } }, "12": { type: Type.ARRAY, items: { type: Type.STRING, enum: PLANETS as string[] } }
                }
            },
            planetaryAnalysis: { type: Type.ARRAY, items: planetAnalysisSchema },
            planetStatus: { type: Type.ARRAY, items: planetStatusSchema },
            ancestralDebts: { type: Type.ARRAY, items: debtSchema },
            keyPlanets: { type: Type.OBJECT, properties: { benefic: { type: Type.ARRAY, items: keyPlanetSchema }, malefic: { type: Type.ARRAY, items: keyPlanetSchema } }, required: ["benefic", "malefic"] },
            varshphal: { type: Type.OBJECT, properties: { currentYear: { type: Type.NUMBER }, rulingPlanet: { type: Type.STRING, enum: PLANETS as string[] }, overall: { type: Type.STRING }, career: { type: Type.STRING }, health: { type: Type.STRING }, relationships: { type: Type.STRING } }, required: ["currentYear", "rulingPlanet", "overall", "career", "health", "relationships"] },
            remedies: { type: Type.ARRAY, items: remedySchema },
            conclusion: { type: Type.STRING }
        },
        required: ["introduction", "kundliChakra", "planetaryAnalysis", "planetStatus", "ancestralDebts", "keyPlanets", "varshphal", "remedies", "conclusion"]
    };

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        
        if (!parsedJson.kundliChakra) {
            parsedJson.kundliChakra = kundliChakra;
        }

        return parsedJson;

    } catch (error) {
        console.error("Error fetching AI Laal Kitab report:", error);
        return {
            introduction: "Failed to generate AI report.",
            kundliChakra: kundliChakra,
            planetaryAnalysis: [],
            planetStatus: [],
            ancestralDebts: [],
            keyPlanets: { benefic: [], malefic: [] },
            varshphal: { currentYear: currentYear, rulingPlanet: 'Sun', overall: 'Could not generate forecast.', career: '', health: '', relationships: ''},
            remedies: [],
            conclusion: "Please try again later."
        };
    }
};

// Helper function for Life Path calculation
const calculateLifePathNumber = (dob: string): number => {
    const sumDigits = (numStr: string): number => {
        let sum = 0;
        for (const char of numStr) {
            sum += parseInt(char, 10);
        }
        return sum;
    };

    const reduceToSingleDigit = (num: number): number => {
        if (num === 11 || num === 22 || num === 33) {
            return num;
        }
        let sum = num;
        while (sum > 9) {
            sum = sumDigits(sum.toString());
            if (sum === 11 || num === 22 || num === 33) {
                return sum;
            }
        }
        return sum;
    };
    
    const [year, month, day] = dob.split('-').map(part => parseInt(part, 10));
    const dayReduced = reduceToSingleDigit(day);
    const monthReduced = reduceToSingleDigit(month);
    const yearReduced = reduceToSingleDigit(year);
    let finalSum = dayReduced + monthReduced + yearReduced;
    return reduceToSingleDigit(finalSum);
};

// --- Life Path Calculator ---

export const generateLifePathReport = async (formData: LifePathFormInput): Promise<LifePathReportData> => {
    if (!process.env.VITE_API_KEY) {
        throw new Error(API_KEY_ERROR_MESSAGE);
    }
    
    const lifePathNumber = calculateLifePathNumber(formData.dob);

    const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });
    const model = 'gemini-2.5-flash';

    const prompt = `
        You are 'Numero', a wise and inspiring numerologist who believes numbers are the language of the universe. The user wants to understand their life's purpose through their Life Path Number of ${lifePathNumber}, calculated from their DOB: ${formData.dob}.
        Craft a report that is a journey of self-discovery. Go deep into the essence of their number, illuminating their innate gifts, their soul's challenges, and how they can best navigate their path in love and career. Your tone is uplifting, profound, and deeply personal.
        Your response must be in JSON format and strictly follow the provided schema.
    `;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            lifePathNumber: { type: Type.NUMBER, description: "The calculated Life Path Number." },
            title: { type: Type.STRING, description: "A catchy title for the number, e.g., 'The Leader', 'The Master Builder', 'The Nurturer'." },
            introduction: { type: Type.STRING, description: "A one-paragraph introduction to the meaning and essence of this Life Path Number." },
            coreStrengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 3-5 key positive traits and strengths." },
            potentialChallenges: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 3-5 potential challenges or areas for growth, framed constructively." },
            careerPath: { type: Type.STRING, description: "A paragraph suggesting suitable career paths and work environments." },
            loveAndRelationships: { type: Type.STRING, description: "A paragraph describing how this number influences romantic relationships and partnerships." },
            famousPeople: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 3-5 famous individuals who share this Life Path Number." },
            conclusion: { type: Type.STRING, description: "A final summary paragraph with an empowering message or piece of advice." }
        },
        required: ["lifePathNumber", "title", "introduction", "coreStrengths", "potentialChallenges", "careerPath", "loveAndRelationships", "famousPeople", "conclusion"]
    };

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        parsedJson.lifePathNumber = lifePathNumber; 
        return parsedJson;

    } catch (error) {
        console.error("Error fetching AI Life Path report:", error);
        throw new Error("Failed to generate Life Path report from AI.");
    }
};

// --- Daily Horoscope Functions ---

export const generateDailyHoroscope = async (sign: Rashi): Promise<DailyHoroscopeData> => {
    if (!process.env.VITE_API_KEY) {
        throw new Error(API_KEY_ERROR_MESSAGE);
    }

    const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });
    const model = 'gemini-2.5-flash';

    const prompt = `
        You are 'Astro Ganesha', a warm and wise friend who delivers daily cosmic wisdom. Today, you're guiding ${sign}. Speak to them directly.
        What is the key energy of their day? Offer a short, punchy summary, then give them practical, heartfelt advice for their love life, career, and well-being. Your tone is encouraging, personal, and feels like a supportive message to start their day right.
        Provide the horoscope in JSON format, strictly following the provided schema.
    `;
    
    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            summary: { type: Type.STRING, description: "A brief, catchy summary of the day's energy for the sign. (2-3 sentences)" },
            lucky_color: { type: Type.STRING, description: "A lucky color for the day." },
            lucky_number: { type: Type.STRING, description: "A lucky number for the day." },
            lucky_gemstone: { type: Type.STRING, description: "A lucky gemstone for the day." },
            love: { type: Type.STRING, description: "A detailed prediction for love and relationships. (3-4 sentences)" },
            career: { type: Type.STRING, description: "A detailed prediction for career, work, and finance. (3-4 sentences)" },
            health: { type: Type.STRING, description: "A detailed prediction for health and wellness. (3-4 sentences)" },
        },
        required: ["summary", "lucky_color", "lucky_number", "lucky_gemstone", "love", "career", "health"]
    };

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error(`Error fetching AI horoscope for ${sign}:`, error);
        throw new Error(`Failed to generate horoscope for ${sign} from AI.`);
    }
};

// --- Numerology Functions ---
export const generateNumerologyReport = async (formData: NumerologyFormInput): Promise<NumerologyReportData> => {
    if (!process.env.VITE_API_KEY) {
        throw new Error(API_KEY_ERROR_MESSAGE);
    }

    const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });
    const model = 'gemini-2.5-flash';

    const prompt = `
        You are 'Ank Jyotish', a master numerologist with profound insight into the vibrations of numbers. The user, '${formData.name}', born on ${formData.dob}, seeks to understand their life's blueprint through the sacred science of numerology.

        Your task is to provide a comprehensive and inspiring numerology report. Based on the user's FULL NAME and DATE OF BIRTH, you must calculate and explain the following core numbers:
        1.  **Life Path Number**: From the full date of birth (MM-DD-YYYY).
        2.  **Expression (or Destiny) Number**: From the full birth name, using Pythagorean letter-to-number mapping.
        3.  **Soul Urge (or Heart's Desire) Number**: From the vowels in the full birth name.
        4.  **Personality Number**: From the consonants in the full birth name.
        5.  **Birthday Number**: From the day of birth.

        For each number, provide a title and a detailed, insightful description of its meaning and influence on the user's life. Also, provide an overall summary that weaves these numbers together, lucky numbers, lucky colors, and a key challenge for the user to be aware of.

        Your response MUST be in JSON format and strictly follow the provided schema. Your tone should be wise, empowering, and deeply personal.
    `;

    const numberInfoSchema = {
        type: Type.OBJECT,
        properties: {
            number: { type: Type.NUMBER },
            title: { type: Type.STRING, description: "e.g., 'The Innovative Leader' or 'The Harmonious Nurturer'" },
            description: { type: Type.STRING, description: "A detailed paragraph explaining the traits and influence of this number for the user." }
        },
        required: ["number", "title", "description"]
    };

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            lifePathNumber: { ...numberInfoSchema, description: "Analysis of the Life Path Number." },
            expressionNumber: { ...numberInfoSchema, description: "Analysis of the Expression/Destiny Number." },
            soulUrgeNumber: { ...numberInfoSchema, description: "Analysis of the Soul Urge/Heart's Desire Number." },
            personalityNumber: { ...numberInfoSchema, description: "Analysis of the Personality Number." },
            birthdayNumber: { ...numberInfoSchema, description: "Analysis of the Birthday Number." },
            overallSummary: { type: Type.STRING, description: "A concluding summary that synthesizes the core numbers and provides a holistic view of the user's personality and destiny." },
            luckyNumbers: { type: Type.ARRAY, items: { type: Type.NUMBER }, description: "A list of 3-4 lucky numbers." },
            luckyColors: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 2-3 lucky colors." },
            challenges: { type: Type.STRING, description: "A key challenge or area of growth for the user, described constructively." }
        },
        required: ["lifePathNumber", "expressionNumber", "soulUrgeNumber", "personalityNumber", "birthdayNumber", "overallSummary", "luckyNumbers", "luckyColors", "challenges"]
    };

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error fetching AI numerology report:", error);
        throw new Error("Failed to generate numerology report from AI.");
    }
};

// --- Sun Sign Calculator ---
export const getSunSign = (dob: string): { sign: Rashi, dateRange: string } => {
    const date = new Date(dob);
    // Add a day to date to make sure it is not off by one due to timezone issues
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;

    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return { sign: 'Aries', dateRange: 'Mar 21 - Apr 19' };
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return { sign: 'Taurus', dateRange: 'Apr 20 - May 20' };
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return { sign: 'Gemini', dateRange: 'May 21 - Jun 20' };
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return { sign: 'Cancer', dateRange: 'Jun 21 - Jul 22' };
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return { sign: 'Leo', dateRange: 'Jul 23 - Aug 22' };
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return { sign: 'Virgo', dateRange: 'Aug 23 - Sep 22' };
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return { sign: 'Libra', dateRange: 'Sep 23 - Oct 22' };
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return { sign: 'Scorpio', dateRange: 'Oct 23 - Nov 21' };
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return { sign: 'Sagittarius', dateRange: 'Nov 22 - Dec 21' };
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return { sign: 'Capricorn', dateRange: 'Dec 22 - Jan 19' };
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return { sign: 'Aquarius', dateRange: 'Jan 20 - Feb 18' };
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return { sign: 'Pisces', dateRange: 'Feb 19 - Mar 20' };
    return { sign: 'Aries', dateRange: 'Mar 21 - Apr 19' }; // Default
};


// --- Muhurat Teller Function ---

export const generateMuhuratReport = async (formData: MuhuratFormInput): Promise<MuhuratReportData> => {
    if (!process.env.VITE_API_KEY) {
        throw new Error(API_KEY_ERROR_MESSAGE);
    }

    const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });
    const model = 'gemini-2.5-flash';

    const prompt = `
        You are 'Muhurta Jyotish', an expert Vedic astrologer specializing in determining auspicious timings (Muhurat). The user wants to find the best time for '${formData.activity}' between the dates ${formData.startDate} and ${formData.endDate}.

        Your task is to analyze this period and identify 3 to 5 auspicious muhurats. For each muhurat, provide the exact date, start and end times, and key astrological details like Nakshatra and Tithi. Also, provide a brief explanation of why that time is favorable for the specified activity.

        Your response MUST be in JSON format and strictly follow the provided schema. The 'summary' should give overall advice about the chosen period. If the period is generally unfavorable, mention it in the summary and provide the best available options.
    `;

    const muhuratSchema = {
        type: Type.OBJECT,
        properties: {
            date: { type: Type.STRING, description: "Date in YYYY-MM-DD format." },
            dayOfWeek: { type: Type.STRING },
            startTime: { type: Type.STRING, description: "Start time in HH:MM format (24-hour)." },
            endTime: { type: Type.STRING, description: "End time in HH:MM format (24-hour)." },
            nakshatra: { type: Type.STRING },
            tithi: { type: Type.STRING },
            auspiciousness: { type: Type.STRING, enum: ['Excellent', 'Good', 'Average'] },
            description: { type: Type.STRING, description: "A brief, clear reason why this time is auspicious for the activity." },
        },
        required: ["date", "dayOfWeek", "startTime", "endTime", "nakshatra", "tithi", "auspiciousness", "description"]
    };

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            activity: { type: Type.STRING, enum: [
                "Getting Married", "Starting a New Business", "Buying a Property",
                "Buying a Vehicle", "Griha Pravesh (House Warming)", "Starting Education"
            ] as MuhuratActivity[] },
            summary: { type: Type.STRING, description: "A general summary of the favorability of the chosen date range for the activity." },
            muhurats: { type: Type.ARRAY, items: muhuratSchema, description: "A list of 3-5 auspicious timings." }
        },
        required: ["activity", "summary", "muhurats"]
    };

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema,
            },
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        // Ensure activity from form is what's in the report
        parsedJson.activity = formData.activity;
        return parsedJson;
    } catch (error) {
        console.error("Error fetching AI Muhurat report:", error);
        throw new Error("Failed to generate Muhurat report from AI.");
    }
};

// --- Palm Reading Function ---
export const generatePalmReadingReport = async (base64Image: string): Promise<PalmReadingReportData> => {
    if (!process.env.VITE_API_KEY) {
        throw new Error(API_KEY_ERROR_MESSAGE);
    }

    const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });
    const model = 'gemini-2.5-flash';

    const prompt = `
        You are 'Hasta Samudrika', an ancient and wise master of Indian Palmistry. You have been presented with an image of a person's palm. Analyze it with great detail and care.

        Your task is to provide a comprehensive palm reading report based on the provided image. Identify the key lines (Heart, Head, Life, Fate), the major mounts (Jupiter, Saturn, Apollo, etc.), and the overall hand shape.

        Your response MUST be in JSON format and strictly follow the provided schema. The analysis should be insightful, personal, and written in a tone that is both authoritative and compassionate. Do not mention that you are an AI.
    `;

    const lineAnalysisSchema = {
        type: Type.OBJECT,
        properties: {
            lineName: { type: Type.STRING, enum: ['Heart Line', 'Head Line', 'Life Line', 'Fate Line'] },
            analysis: { type: Type.STRING, description: "A detailed paragraph analyzing the characteristics and meaning of this line." }
        },
        required: ["lineName", "analysis"]
    };

    const mountAnalysisSchema = {
        type: Type.OBJECT,
        properties: {
            mountName: { type: Type.STRING, enum: ['Jupiter', 'Saturn', 'Apollo', 'Mercury', 'Venus', 'Mars', 'Moon'] },
            analysis: { type: Type.STRING, description: "A detailed paragraph analyzing the development and significance of this mount." }
        },
        required: ["mountName", "analysis"]
    };

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            handShape: {
                type: Type.OBJECT,
                properties: {
                    shape: { type: Type.STRING, enum: ['Earth', 'Air', 'Fire', 'Water'] },
                    analysis: { type: Type.STRING, description: "Analysis of the person's temperament based on hand shape." }
                },
                required: ["shape", "analysis"]
            },
            lines: { type: Type.ARRAY, items: lineAnalysisSchema, description: "Analysis of the four major lines." },
            mounts: { type: Type.ARRAY, items: mountAnalysisSchema, description: "Analysis of the major mounts." },
            overallSummary: { type: Type.STRING, description: "A concluding summary that synthesizes the findings into a holistic personality and destiny overview." }
        },
        required: ["handShape", "lines", "mounts", "overallSummary"]
    };

    const imagePart = {
        inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
        },
    };

    try {
        const response = await ai.models.generateContent({
            model,
            contents: { parts: [imagePart, { text: prompt }] },
            config: {
                responseMimeType: "application/json",
                responseSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error fetching AI Palm Reading report:", error);
        throw new Error("Failed to generate Palm Reading report from AI.");
    }
};

// --- Face Reading Function ---
export const generateFaceReadingReport = async (base64Image: string): Promise<FaceReadingReportData> => {
    if (!process.env.VITE_API_KEY) {
        throw new Error(API_KEY_ERROR_MESSAGE);
    }

    const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });
    const model = 'gemini-2.5-flash';

    const prompt = `
        You are 'Mukh Samudrika', a master of Physiognomy (Face Reading) from the ancient Vedic tradition. You have been shown an image of a person's face. Analyze their features to reveal their character, personality, and destiny.

        Your task is to provide a detailed face reading report. Identify the face shape and analyze key features like the forehead, eyebrows, eyes, nose, lips, chin, and cheeks.

        Your response MUST be in JSON format and strictly adhere to the provided schema. The analysis should be insightful and written in a wise, respectful, and enlightening tone. Do not mention you are an AI.
    `;

    const featureAnalysisSchema = {
        type: Type.OBJECT,
        properties: {
            featureName: { type: Type.STRING, enum: ['Forehead', 'Eyebrows', 'Eyes', 'Nose', 'Lips', 'Chin', 'Cheeks'] },
            analysis: { type: Type.STRING, description: "A detailed paragraph analyzing what this facial feature reveals about the person's character." }
        },
        required: ["featureName", "analysis"]
    };

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            faceShape: {
                type: Type.OBJECT,
                properties: {
                    shape: { type: Type.STRING, enum: ['Round', 'Oval', 'Square', 'Heart', 'Long', 'Diamond'] },
                    analysis: { type: Type.STRING, description: "Analysis of the person's fundamental nature based on their face shape." }
                },
                required: ["shape", "analysis"]
            },
            features: { type: Type.ARRAY, items: featureAnalysisSchema, description: "Analysis of the key facial features." },
            overallPersonality: { type: Type.STRING, description: "A concluding summary that synthesizes the analysis into a holistic overview of the person's personality and potential." }
        },
        required: ["faceShape", "features", "overallPersonality"]
    };

    const imagePart = {
        inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
        },
    };

    try {
        const response = await ai.models.generateContent({
            model,
            contents: { parts: [imagePart, { text: prompt }] },
            config: {
                responseMimeType: "application/json",
                responseSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error fetching AI Face Reading report:", error);
        throw new Error("Failed to generate Face Reading report from AI.");
    }
};

// --- Tarot Reading Function ---
export const generateTarotReading = async (cards: { card: TarotCardData, position: string }[]): Promise<TarotReadingData> => {
    if (!process.env.VITE_API_KEY) {
        throw new Error(API_KEY_ERROR_MESSAGE);
    }

    const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });
    const model = 'gemini-2.5-flash';

    const cardDetails = cards.map(c => `${c.position}: ${c.card.name}`).join(', ');

    const prompt = `
        You are 'Madame Divina', a wise and mystical tarot reader with a deep connection to the cosmos. You speak with an air of ancient wisdom, but your guidance is clear, compassionate, and empowering.

        A user has drawn three Major Arcana cards for a "Past, Present, Future" spread. The cards drawn are: ${cardDetails}.

        Your task is to provide a cohesive and insightful reading. Do not just give the individual meaning of each card. Instead, weave a narrative that connects them. Explain how the 'Past' card has shaped the 'Present' situation, and how the 'Present' card's energy is leading toward the potential outcome shown by the 'Future' card.

        Your response MUST be in JSON format and strictly follow the provided schema.
        - For each card, provide a detailed interpretation specific to its position in the spread.
        - The 'summary' should be a final, empowering message that ties the entire reading together, offering the user a clear takeaway or piece of advice.
    `;

    const interpretationSchema = {
        type: Type.OBJECT,
        properties: {
            cardName: { type: Type.STRING },
            position: { type: Type.STRING, enum: ['Past', 'Present', 'Future'] },
            interpretation: { type: Type.STRING, description: "A detailed paragraph interpreting the card in its specific position within the spread." }
        },
        required: ["cardName", "position", "interpretation"]
    };

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            interpretations: { type: Type.ARRAY, items: interpretationSchema, description: "An array of interpretations for the three cards drawn." },
            summary: { type: Type.STRING, description: "A final, cohesive summary that ties the reading together and offers a concluding thought or advice." }
        },
        required: ["interpretations", "summary"]
    };

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error fetching AI Tarot Reading report:", error);
        throw new Error("Failed to generate Tarot Reading report from AI.");
    }
};