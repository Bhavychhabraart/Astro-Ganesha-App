
import { Bhajan, Deity, Astrologer, Pooja, ProductCategory, Product, Spell, SpellCategory, ZodiacSign, Rashi, TarotCardData, InteractiveDeityInfo, Mantra } from './types';
import { 
    AriesIcon, TaurusIcon, GeminiIcon, CancerIcon, LeoIcon, VirgoIcon, 
    LibraIcon, ScorpioIcon, SagittariusIcon, CapricornIcon, AquariusIcon, PiscesIcon
} from './components/Icons';

export const BHAJANS: Bhajan[] = [
    {
        id: '1',
        title: 'Achyutam Keshavam Krishna Damodaram',
        artist: 'Shreya Ghoshal',
        coverArt: 'https://picsum.photos/seed/bhajan1/500',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        duration: 275,
    },
    {
        id: '2',
        title: 'Shiv Tandav Stotram',
        artist: 'Shankar Mahadevan',
        coverArt: 'https://picsum.photos/seed/bhajan2/500',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        duration: 542,
    },
    {
        id: '3',
        title: 'Shree Ganeshaya Dheemahi',
        artist: 'Anuradha Paudwal',
        coverArt: 'https://picsum.photos/seed/bhajan3/500',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        duration: 320,
    },
    {
        id: '4',
        title: 'Hanuman Chalisa',
        artist: 'Hariharan',
        coverArt: 'https://picsum.photos/seed/bhajan4/500',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        duration: 590,
    },
    {
        id: '5',
        title: 'Ya Devi Sarva Bhuteshu',
        artist: 'Anuradha Paudwal',
        coverArt: 'https://picsum.photos/seed/bhajan5/500',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        duration: 288,
    },
    {
        id: '6',
        title: 'Radhe Krishna Ki Jyoti',
        artist: 'Lata Mangeshkar & Pradeep',
        coverArt: 'https://picsum.photos/seed/bhajan6/500',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        duration: 315,
    },
    {
        id: '7',
        title: 'Om Jai Jagdish Hare',
        artist: 'Various Artists',
        coverArt: 'https://picsum.photos/seed/bhajan7/500',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        duration: 450,
    },
    // New Aartis for Interactive Pooja
    {
        id: 'aarti-ganesha',
        title: 'Jai Ganesh Deva Aarti',
        artist: 'Anuradha Paudwal',
        coverArt: 'https://picsum.photos/seed/aarti-ganesha/500',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        duration: 290,
    },
    {
        id: 'aarti-shiva',
        title: 'Om Jai Shiv Omkara Aarti',
        artist: 'Lata Mangeshkar',
        coverArt: 'https://picsum.photos/seed/aarti-shiva/500',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
        duration: 305,
    },
    {
        id: 'aarti-devi',
        title: 'Ambe Tu Hai Jagdambe Kali Aarti',
        artist: 'Narendra Chanchal',
        coverArt: 'https://picsum.photos/seed/aarti-devi/500',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
        duration: 340,
    },
    {
        id: 'aarti-vishnu',
        title: 'Om Jai Jagdish Hare',
        artist: 'Anuradha Paudwal',
        coverArt: 'https://picsum.photos/seed/aarti-vishnu/500',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', // Reusing
        duration: 450,
    },
    {
        id: 'aarti-krishna',
        title: 'Aarti Kunj Bihari Ki',
        artist: 'Hari Om Sharan',
        coverArt: 'https://picsum.photos/seed/aarti-krishna/500',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
        duration: 250,
    },
    {
        id: 'aarti-hanuman',
        title: 'Aarti Kije Hanuman Lala Ki',
        artist: 'Hariharan',
        coverArt: 'https://picsum.photos/seed/aarti-hanuman/500',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
        duration: 410,
    },
];

export const DEITIES: Deity[] = [
    Deity.SHIVA,
    Deity.VISHNU,
    Deity.DEVI,
    Deity.GANESHA,
    Deity.KRISHNA,
    Deity.HANUMAN,
];

export const ASTROLOGERS: Astrologer[] = [
    {
        id: 'astro1',
        name: 'Tenzin Choedon',
        avatarUrl: 'https://images.unsplash.com/photo-1597034963830-4e5a32911b32?w=500&auto=format&fit=crop&q=60',
        specialties: ['Vedic', 'Buddhist Astrology'],
        rating: 4.66,
        experience: 12,
        languages: ['Tibetan', 'Hindi', 'English'],
        isOnline: true,
        bio: 'Tenzin Choedon brings the ancient wisdom of the Himalayas to provide deep, compassionate insights into your life path using a unique blend of Vedic and Buddhist astrology.',
        pricePerMinute: 25,
    },
    {
        id: 'astro2',
        name: 'Avani Sharma',
        avatarUrl: 'https://images.unsplash.com/photo-1611601322175-804153534558?w=500&auto=format&fit=crop&q=60',
        specialties: ['Tarot Reading', 'Relationship Coach'],
        rating: 4.75,
        experience: 7,
        languages: ['English', 'Hindi'],
        isOnline: true,
        bio: 'Avani Sharma uses her intuitive gift with Tarot cards to illuminate your path, offering clarity and guidance on love, career, and personal growth.',
        pricePerMinute: 25,
    },
    {
        id: 'astro3',
        name: 'Guru Raghavendra',
        avatarUrl: 'https://images.unsplash.com/photo-1622253392484-c687e1a357b2?w=500&auto=format&fit=crop&q=60',
        specialties: ['Vastu', 'Prashna Kundli'],
        rating: 4.9,
        experience: 20,
        languages: ['Kannada', 'Hindi', 'English'],
        isOnline: true,
        bio: 'An expert in Vastu Shastra and Horary Astrology (Prashna Kundli), Guru Raghavendra provides immediate answers to your pressing questions and helps harmonize your living spaces for prosperity.',
        pricePerMinute: 30,
    },
    {
        id: 'astro4',
        name: 'Dr. Meena Kapoor',
        avatarUrl: 'https://images.unsplash.com/photo-1611590027211-b35210444944c?w=500&auto=format&fit=crop&q=60',
        specialties: ['Medical Astrology', 'Face Reading'],
        rating: 4.7,
        experience: 12,
        languages: ['English'],
        isOnline: false,
        bio: 'Dr. Meena Kapoor combines her medical background with astrological expertise to offer unique insights into health and wellness. She uses face reading as a diagnostic tool for holistic guidance.',
        pricePerMinute: 28,
    }
];

export const POOJAS: Pooja[] = [
    {
        id: 'pooja1',
        name: 'Satyanarayan Katha',
        description: 'For overall prosperity, success, and well-being in the family.',
        longDescription: 'The Satyanarayan Pooja is performed to seek blessings from Lord Vishnu in his form as Satyanarayan. It is a ritual that brings the family together to listen to the divine katha (story) and is believed to remove obstacles and bring happiness.',
        images: ['https://picsum.photos/seed/pooja1-1/800/600', 'https://picsum.photos/seed/pooja1-2/800/600', 'https://picsum.photos/seed/pooja1-3/800/600'],
        benefits: ['Brings happiness and prosperity', 'Removes obstacles from life', 'Ensures success in personal and professional endeavors', 'Promotes harmony in the family'],
        inclusions: ['Experienced Pandit-ji', 'Complete Pooja Samagri (materials)', 'Guidance on rituals and mantras', 'Prasad preparation guidance'],
        price: 5100,
    },
    {
        id: 'pooja2',
        name: 'Griha Shanti Pooja',
        description: 'To nullify negative energies and bring peace to your home.',
        longDescription: 'Griha Shanti Pooja is performed to appease the nine planets (Navagraha) and Vastu Purush to prevent any negative influences from celestial bodies or the layout of the house. It creates a divine atmosphere of peace and positivity.',
        images: ['https://picsum.photos/seed/pooja2-1/800/600', 'https://picsum.photos/seed/pooja2-2/800/600'],
        benefits: ['Removes negative energies and doshas', 'Improves health and well-being of residents', 'Brings peace, harmony, and prosperity', 'Protects home from evil eyes'],
        inclusions: ['Navagraha Homa', 'Vastu Pooja', 'All necessary samagri', 'Pandit Dakshina'],
        price: 7500,
    },
    {
        id: 'pooja3',
        name: 'Maha Mrityunjaya Jaap',
        description: 'A powerful mantra recitation for health, longevity, and protection.',
        longDescription: 'The Maha Mrityunjaya Jaap is a recitation of the powerful mantra dedicated to Lord Shiva. It is a potent healing and rejuvenating ritual that is believed to conquer death (physical, mental, and spiritual) and protect against calamities.',
        images: ['https://picsum.photos/seed/pooja3-1/800/600', 'https://picsum.photos/seed/pooja3-2/800/600', 'https://picsum.photos/seed/pooja3-3/800/600'],
        benefits: ['Promotes good health and longevity', 'Protects against accidents and misfortunes', 'Alleviate mental and emotional stress', 'Creates a powerful spiritual shield'],
        inclusions: ['11,000 mantra recitations by Pandits', 'Sankalp in your name', 'Havan (fire ritual)', 'Live streaming option'],
        price: 11000,
    },
];

export const PRODUCT_CATEGORIES: { name: ProductCategory, image: string }[] = [
    { name: ProductCategory.RUDRAKSHA, image: 'https://picsum.photos/seed/cat-rudraksha/400' },
    { name: ProductCategory.GEMSTONES, image: 'https://picsum.photos/seed/cat-gemstones/400' },
    { name: ProductCategory.YANTRAS, image: 'https://picsum.photos/seed/cat-yantras/400' },
    { name: ProductCategory.IDOLS, image: 'https://picsum.photos/seed/cat-idols/400' },
];

export const PRODUCTS: Product[] = [
    {
        id: 'prod1',
        name: '5 Mukhi Rudraksha Mala',
        category: ProductCategory.RUDRAKSHA,
        images: ['https://picsum.photos/seed/prod1-1/800/600', 'https://picsum.photos/seed/prod1-2/800/600'],
        price: 1500,
        description: 'Authentic 5 Mukhi (faced) Rudraksha mala for peace, health, and spiritual growth. Blessed and energized by priests.',
        remedyFor: ['Stress & Anxiety', 'Blood Pressure', 'Spiritual Growth'],
        howToUse: 'Wear around the neck or use for Japa (mantra chanting). Best to wear after taking a bath in the morning. Chant "Om Namah Shivaya" 108 times.',
        rating: 4.8,
        reviewCount: 120,
    },
    {
        id: 'prod2',
        name: 'Natural Yellow Sapphire (Pukhraj)',
        category: ProductCategory.GEMSTONES,
        images: ['https://picsum.photos/seed/prod2-1/800/600', 'https://picsum.photos/seed/prod2-2/800/600'],
        price: 12500,
        description: 'A high-quality, certified natural Yellow Sapphire gemstone, known to bring prosperity, wisdom, and good fortune. Associated with the planet Jupiter.',
        remedyFor: ['Financial Problems', 'Career Stagnation', 'Marital Harmony'],
        howToUse: 'Best worn on the index finger of the right hand, in a gold ring. First wear on a Thursday morning during Shukla Paksha.',
        rating: 4.9,
        reviewCount: 85,
    },
    {
        id: 'prod3',
        name: 'Shree Yantra on Copper Plate',
        category: ProductCategory.YANTRAS,
        images: ['https://picsum.photos/seed/prod3-1/800/600'],
        price: 2100,
        description: 'The Shree Yantra is the most powerful of all yantras, representing the source of all energy. It brings wealth, prosperity, and removes negative energies from your home or workplace.',
        remedyFor: ['Financial Blockages', 'Vastu Dosha', 'Negative Energy'],
        howToUse: 'Place in the North-East direction of your home or office puja altar. Meditate upon it daily, chanting the mantra "Om Shreem Hreem Shreem Kamale Kamalalaye Praseed Praseed Om Shreem Hreem Shreem Mahalakshmaye Namah".',
        rating: 4.7,
        reviewCount: 95,
    },
];

export const SPELL_CATEGORIES: { name: SpellCategory, image: string }[] = [
    { name: SpellCategory.LOVE, image: 'https://picsum.photos/seed/cat-love/400' },
    { name: SpellCategory.CAREER, image: 'https://picsum.photos/seed/cat-career/400' },
    { name: SpellCategory.FAMILY, image: 'https://picsum.photos/seed/cat-family/400' },
    { name: SpellCategory.PROTECTION, image: 'https://picsum.photos/seed/cat-protection/400' },
];

export const SPELLS: Spell[] = [
    {
        id: 'spell-love1',
        name: 'Love Attraction Spell',
        category: SpellCategory.LOVE,
        description: 'A powerful white magic spell to attract your soulmate or strengthen an existing relationship.',
        longDescription: 'This ancient ritual uses a combination of rose quartz, powerful mantras, and candle magic to open your heart chakra and align your aura with the frequency of love. It is designed to clear past blockages and attract a compatible and loving partner into your life.',
        images: ['https://picsum.photos/seed/spell-love1/800/600', 'https://picsum.photos/seed/spell-love2/800/600'],
        benefits: ['Attract a new romantic partner', 'Strengthen the bond with your current partner', 'Heal from past heartbreak', 'Increase self-love and confidence'],
        requirements: ['Your full name', 'Your date of birth', 'A recent photograph (optional but recommended)', 'A clear intention of what you seek in a partner'],
        price: 4500,
        requiresPhoto: true,
    },
    {
        id: 'spell-career1',
        name: 'Career Success & Promotion Spell',
        category: SpellCategory.CAREER,
        description: 'Remove blockages in your professional life and open doors to new opportunities.',
        longDescription: 'This spell is performed using green aventurine and citrine crystals, along with specific success-oriented chants, to remove obstacles from your career path. It helps you gain recognition from superiors, overcome workplace politics, and attract opportunities for growth and promotion.',
        images: ['https://picsum.photos/seed/spell-career1/800/600'],
        benefits: ['Get noticed for a promotion', 'Attract new job offers', 'Overcome workplace negativity', 'Enhance creativity and focus at work'],
        requirements: ['Your full name', 'Your current job title/company (if any)', 'Your career goals'],
        price: 4200,
        requiresPhoto: false,
    },
    {
        id: 'spell-protection1',
        name: 'Evil Eye & Negative Energy Removal',
        category: SpellCategory.PROTECTION,
        description: 'A cleansing ritual to remove negative energies, hexes, and the evil eye.',
        longDescription: 'Using powerful ingredients like black tourmaline, sea salt, and protective herbs, this spell creates a powerful spiritual shield around you. It cleanses your aura of any attached negativity, breaks curses or hexes, and protects you from future psychic attacks.',
        images: ['https://picsum.photos/seed/spell-protection1/800/600'],
        benefits: ['Feel lighter and more energetic', 'Remove feelings of unexplained bad luck', 'Improve sleep and reduce nightmares', 'Protect yourself from jealousy and negativity'],
        requirements: ['Your full name', 'A recent photograph'],
        price: 3800,
        requiresPhoto: true,
    },
];

export const ZODIAC_SIGNS: ZodiacSign[] = [
    { name: 'Aries', dateRange: 'Mar 21 - Apr 19', icon: AriesIcon },
    { name: 'Taurus', dateRange: 'Apr 20 - May 20', icon: TaurusIcon },
    { name: 'Gemini', dateRange: 'May 21 - Jun 20', icon: GeminiIcon },
    { name: 'Cancer', dateRange: 'Jun 21 - Jul 22', icon: CancerIcon },
    { name: 'Leo', dateRange: 'Jul 23 - Aug 22', icon: LeoIcon },
    { name: 'Virgo', dateRange: 'Aug 23 - Sep 22', icon: VirgoIcon },
    { name: 'Libra', dateRange: 'Sep 23 - Oct 22', icon: LibraIcon },
    { name: 'Scorpio', dateRange: 'Oct 23 - Nov 21', icon: ScorpioIcon },
    { name: 'Sagittarius', dateRange: 'Nov 22 - Dec 21', icon: SagittariusIcon },
    { name: 'Capricorn', dateRange: 'Dec 22 - Jan 19', icon: CapricornIcon },
    { name: 'Aquarius', dateRange: 'Jan 20 - Feb 18', icon: AquariusIcon },
    { name: 'Pisces', dateRange: 'Feb 19 - Mar 20', icon: PiscesIcon },
];

export const TAROT_DECK: TarotCardData[] = [
    { name: 'The Fool', arcana: 'Major', image: 'https://picsum.photos/seed/tarot0/300/500' },
    { name: 'The Magician', arcana: 'Major', image: 'https://picsum.photos/seed/tarot1/300/500' },
    { name: 'The High Priestess', arcana: 'Major', image: 'https://picsum.photos/seed/tarot2/300/500' },
    { name: 'The Empress', arcana: 'Major', image: 'https://picsum.photos/seed/tarot3/300/500' },
    { name: 'The Emperor', arcana: 'Major', image: 'https://picsum.photos/seed/tarot4/300/500' },
    { name: 'The Hierophant', arcana: 'Major', image: 'https://picsum.photos/seed/tarot5/300/500' },
    { name: 'The Lovers', arcana: 'Major', image: 'https://picsum.photos/seed/tarot6/300/500' },
    { name: 'The Chariot', arcana: 'Major', image: 'https://picsum.photos/seed/tarot7/300/500' },
    { name: 'Strength', arcana: 'Major', image: 'https://picsum.photos/seed/tarot8/300/500' },
    { name: 'The Hermit', arcana: 'Major', image: 'https://picsum.photos/seed/tarot9/300/500' },
    { name: 'Wheel of Fortune', arcana: 'Major', image: 'https://picsum.photos/seed/tarot10/300/500' },
    { name: 'Justice', arcana: 'Major', image: 'https://picsum.photos/seed/tarot11/300/500' },
    { name: 'The Hanged Man', arcana: 'Major', image: 'https://picsum.photos/seed/tarot12/300/500' },
    { name: 'Death', arcana: 'Major', image: 'https://picsum.photos/seed/tarot13/300/500' },
    { name: 'Temperance', arcana: 'Major', image: 'https://picsum.photos/seed/tarot14/300/500' },
    { name: 'The Devil', arcana: 'Major', image: 'https://picsum.photos/seed/tarot15/300/500' },
    { name: 'The Tower', arcana: 'Major', image: 'https://picsum.photos/seed/tarot16/300/500' },
    { name: 'The Star', arcana: 'Major', image: 'https://picsum.photos/seed/tarot17/300/500' },
    { name: 'The Moon', arcana: 'Major', image: 'https://picsum.photos/seed/tarot18/300/500' },
    { name: 'The Sun', arcana: 'Major', image: 'https://picsum.photos/seed/tarot19/300/500' },
    { name: 'Judgement', arcana: 'Major', image: 'https://picsum.photos/seed/tarot20/300/500' },
    { name: 'The World', arcana: 'Major', image: 'https://picsum.photos/seed/tarot21/300/500' }
];

export const MANTRAS: Mantra[] = [
  {
    id: 'om',
    name: 'Om Mantra',
    sanskrit: 'ॐ',
    transliteration: 'Aum',
    meaning: 'The primordial sound of the universe, representing the cosmic vibration and the unity of all creation.',
    audioSrc: 'https://www.soundjay.com/buttons/sounds/button-3.mp3' // Placeholder
  },
  {
    id: 'gayatri',
    name: 'Gayatri Mantra',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
    transliteration: 'Om Bhuur-Bhuvah Svah Tat-Savitur-Varennyam Bhargo Devasya Dhiimahi Dhiyo Yo Nah Pracodayaat',
    meaning: 'We meditate on the glory of the Creator; Who has created the Universe; Who is worthy of Worship; Who is the embodiment of Knowledge and Light; Who is the remover of all Sin and Ignorance; May He enlighten our Intellect.',
    audioSrc: 'https://www.soundjay.com/buttons/sounds/button-4.mp3' // Placeholder
  },
  {
    id: 'mrityunjaya',
    name: 'Maha Mrityunjaya Mantra',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात् ॥',
    transliteration: 'Om Tryambakam Yajaamahe Sugandhim Pusstti-Vardhanam Urvaarukam-Iva Bandhanaan Mrtyor-Mukssiiya Maa-[A]mrtaat',
    meaning: 'We worship the Three-eyed Lord who is fragrant and who nourishes and nurtures all beings. As is the ripened cucumber freed from its bondage, may He liberate us from death for the sake of immortality.',
    audioSrc: 'https://www.soundjay.com/buttons/sounds/button-5.mp3' // Placeholder
  }
];

export const INTERACTIVE_DEITIES: InteractiveDeityInfo[] = [
    { name: Deity.GANESHA, image: 'https://i.ibb.co/L8W5d45/ganesha.jpg', aartiId: 'aarti-ganesha' },
    { name: Deity.SHIVA, image: 'https://i.ibb.co/tZ5wQ3C/shiva.jpg', aartiId: 'aarti-shiva' },
    { name: Deity.DEVI, image: 'https://i.ibb.co/hK78rK9/devi.jpg', aartiId: 'aarti-devi' },
    { name: Deity.VISHNU, image: 'https://i.ibb.co/b3j6Y3q/vishnu.jpg', aartiId: 'aarti-vishnu' },
    { name: Deity.KRISHNA, image: 'https://i.ibb.co/7C9CgXf/krishna.jpg', aartiId: 'aarti-krishna' },
    { name: Deity.HANUMAN, image: 'https://i.ibb.co/mB1S9s3/hanuman.jpg', aartiId: 'aarti-hanuman' },
];
