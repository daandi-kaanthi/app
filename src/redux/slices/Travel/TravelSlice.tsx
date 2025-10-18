import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { generateFutureDatesDynamic } from './dateGenerator';


export interface ITravelPackage {
  id: string;
  image: string;
  geoLocation: number[]
  dateAvailabilities?: DateAvailability[];
  images?: string[];
  videos?: IVideosResponse | any;
  travelType?: string
  translations: {
    en: TravelPackageTranslation;
    hi?: TravelPackageTranslation;
    es?: TravelPackageTranslation;
  };
}

export interface TravelPackageTranslation {
  title: string;
  subtitle?: string;
  overview?: Overview;
  activities?: string[];
  days?: Day[];
}

export interface IVideoItem {
  id: string;
  awsUrl: string;
}

export interface IVideosResponse {
  videoCount: number;
  allVideos?: IVideoItem[];
  randomVideo?: IVideoItem;
}

export interface DateAvailability {
  id?: string;
  startDate: number;
  endDate: number;
  maxTravelers: number;
  availableSpots: number;
  price: number;
  originalPrice?: number;
  travelPackageId?: string;
}

interface Day {
  day: number;
  title: string;
  activities: string[];
  stay: string;
  meals: string;
}

interface Overview {
  description: string;
  duration: string;
  pickup: string;
  destinations: string;
  bestTime: string;
  type: string;
}

export interface TravelState {
  travelPackages: ITravelPackage[];
  loading: boolean;
}
export const mockTravelPackages = [
  // ----------------- Package 1 -----------------
  {
    id: '1',
    translations: {
      en: {
        title: 'Tungnath - Chandrashila',
        subtitle: 'Trek to Tungnath, the highest Shiva temple, and enjoy panoramic Himalayan views from Chandrashila peak.',
        overview: {
          description:
            "Chopta, known as 'Mini Switzerland of India,' is a serene hill station in Uttarakhand. It serves as the gateway to Tungnath Temple—the highest Shiva temple in the world—and leads to Chandrashila Peak with panoramic Himalayan views.",
          duration: '4 Days / 3 Nights',
          pickup: 'From Delhi (AC tempo traveller or similar)',
          destinations: 'Rishikesh, Sari, Chopta, Tungnath, Deoriatal',
          bestTime: 'March – June & September – December',
          type: 'Adventure / Spiritual / Nature / Trekking',
        },
        activities: ['Trekking', 'Temple Visit', 'Sunrise View'],
        days: [
          {
            day: 1,
            title: 'Departure from Delhi/Dehradun',
            activities: [
              'Board an evening AC tempo traveller / bus from Delhi/Dehradun',
              'Meet fellow travellers',
              'Explore the local market in free time',
            ],
            stay: 'Hotel / Camp',
            meals: 'Breakfast, Dinner',
          },
          {
            day: 2,
            title: 'Dhari Devi Temple and Devprayag Sightseeing',
            activities: [
              'Visit Dhari Devi Temple and Devprayag en route to Chopta',
              'Reach Chopta and enjoy a nature walk',
              'Bonfire session at campsite in evening',
            ],
            stay: 'Hotel / Camp',
            meals: 'Breakfast, Dinner',
          },
          {
            day: 3,
            title: 'Tungnath & Chandrashila',
            activities: [
              'Sunrise view from mountains',
              'Trek to Tungnath Temple, the highest Shiva temple',
              'Ascend to Chandrashila Peak for panoramic views',
              'Return to campsite for dinner',
            ],
            stay: 'Hotel / Camp in Chopta',
            meals: 'Breakfast, Dinner',
          },
          {
            day: 4,
            title: 'Deoria Tal Trek and Departure',
            activities: [
              'Trek to Deoria Tal from Sari Village',
              'Enjoy scenic lake surrounded by mountains',
              'Return to Sari village and depart to Delhi',
            ],
            stay: 'Hotel / Camp in Chopta',
            meals: 'Breakfast, Dinner',
          },
        ],
      },
      hi: {
        title: 'तुंगनाथ - चंद्रशिला',
        subtitle: 'तुंगनाथ, सबसे ऊँचा शिव मंदिर, तक ट्रेक करें और चंद्रशिला चोटी से हिमालय के शानदार दृश्य देखें।',
        overview: {
          description:
            "चोप्टा, जिसे 'भारत का मिनी स्विट्ज़रलैंड' कहा जाता है, उत्तराखंड में एक शांत हिल स्टेशन है। यह तुंगनाथ मंदिर का प्रवेश द्वार है—जो दुनिया का सबसे ऊँचा शिव मंदिर है—और चंद्रशिला चोटी की ओर जाता है, जहाँ से हिमालय के व्यापक दृश्य मिलते हैं।",
          duration: '4 दिन / 3 रातें',
          pickup: 'दिल्ली से (AC टेम्पो ट्रैवलर या समान)',
          destinations: 'ऋषिकेश, साड़ी, चोप्टा, तुंगनाथ, देवोरियाताल',
          bestTime: 'मार्च – जून और सितंबर – दिसंबर',
          type: 'साहसिक / आध्यात्मिक / प्रकृति / ट्रेकिंग',
        },
        activities: ['ट्रेकिंग', 'मंदिर दर्शन', 'सूर्योदय दृश्य'],
        days: [
          {
            day: 1,
            title: 'दिल्ली/देहरादून से प्रस्थान',
            activities: [
              'शाम को AC टेम्पो ट्रैवलर / बस में चढ़ें',
              'अन्य यात्रियों से मिलें',
              'खाली समय में स्थानीय बाजार देखें',
            ],
            stay: 'होटल / कैंप',
            meals: 'नाश्ता, रात का खाना',
          },
          {
            day: 2,
            title: 'धारी देवी मंदिर और देवप्रयाग दर्शन',
            activities: [
              'चोप्टा जाते समय धारी देवी मंदिर और देवप्रयाग का दर्शन',
              'चोप्टा पहुँचें और प्रकृति की सैर करें',
              'शाम में कैंपसाइट पर बोनफायर',
            ],
            stay: 'होटल / कैंप',
            meals: 'नाश्ता, रात का खाना',
          },
          {
            day: 3,
            title: 'तुंगनाथ और चंद्रशिला',
            activities: [
              'पहाड़ों से सूर्योदय का आनंद लें',
              'दुनिया के सबसे ऊँचे शिव मंदिर तुंगनाथ तक ट्रेक करें',
              'चंद्रशिला चोटी पर पहुँचें और हिमालय के दृश्य देखें',
              'कैंपसाइट पर वापसी और रात का खाना',
            ],
            stay: 'चोप्टा में होटल / कैंप',
            meals: 'नाश्ता, रात का खाना',
          },
          {
            day: 4,
            title: 'देवरिया ताल ट्रेक और प्रस्थान',
            activities: [
              'साड़ी गाँव से देवरिया ताल तक ट्रेक करें',
              'पहाड़ों से घिरे सुंदर झील का आनंद लें',
              'साड़ी गाँव लौटें और दिल्ली के लिए प्रस्थान करें',
            ],
            stay: 'चोप्टा में होटल / कैंप',
            meals: 'नाश्ता, रात का खाना',
          },
        ],
      },
      es: {
        title: 'Tungnath - Chandrashila',
        subtitle: 'Trek hasta Tungnath, el templo Shiva más alto, y disfruta de vistas panorámicas del Himalaya desde el pico Chandrashila.',
        overview: {
          description:
            "Chopta, conocida como 'Mini Suiza de India', es una tranquila estación de montaña en Uttarakhand. Sirve como puerta de entrada al Templo Tungnath, el templo Shiva más alto del mundo, y conduce al Pico Chandrashila con vistas panorámicas del Himalaya.",
          duration: '4 días / 3 noches',
          pickup: 'Desde Delhi (AC tempo traveller o similar)',
          destinations: 'Rishikesh, Sari, Chopta, Tungnath, Deoriatal',
          bestTime: 'Marzo – Junio y Septiembre – Diciembre',
          type: 'Aventura / Espiritual / Naturaleza / Trekking',
        },
        activities: ['Senderismo', 'Visita al templo', 'Vista del amanecer'],
        days: [
          {
            day: 1,
            title: 'Salida de Delhi/Dehradun',
            activities: [
              'Suba a un AC tempo traveller / bus por la tarde desde Delhi/Dehradun',
              'Conozca a los demás viajeros',
              'Explore el mercado local en tiempo libre',
            ],
            stay: 'Hotel / Campamento',
            meals: 'Desayuno, Cena',
          },
          {
            day: 2,
            title: 'Templo Dhari Devi y Visita a Devprayag',
            activities: [
              'Visita al Templo Dhari Devi y Devprayag en camino a Chopta',
              'Llegada a Chopta y paseo por la naturaleza',
              'Sesión de fogata en el campamento por la tarde',
            ],
            stay: 'Hotel / Campamento',
            meals: 'Desayuno, Cena',
          },
          {
            day: 3,
            title: 'Tungnath y Chandrashila',
            activities: [
              'Vista del amanecer desde las montañas',
              'Trek al Templo Tungnath, el Shiva más alto del mundo',
              'Ascenso al Pico Chandrashila para vistas panorámicas',
              'Regreso al campamento para cenar',
            ],
            stay: 'Hotel / Campamento en Chopta',
            meals: 'Desayuno, Cena',
          },
          {
            day: 4,
            title: 'Trek a Deoria Tal y Salida',
            activities: [
              'Trek a Deoria Tal desde Sari Village',
              'Disfrute del lago rodeado de montañas',
              'Regreso a Sari Village y salida hacia Delhi',
            ],
            stay: 'Hotel / Campamento en Chopta',
            meals: 'Desayuno, Cena',
          },
        ],
      },
    },
    image: 'https://skaya-bucket.s3.us-east-1.amazonaws.com/tungnath/Tungnath+Rudraprayag+Uttarakhand+India.jpeg',
    images: [
      'https://skaya-bucket.s3.us-east-1.amazonaws.com/tungnath/Tungnath_Temple_in_winter.jpg',
      'https://skaya-bucket.s3.us-east-1.amazonaws.com/tungnath/Tungnath+Rudraprayag+Uttarakhand+India.jpeg',
    ],
    geoLocation: [30.4885, 79.2167],
    travelType: 'group',
  },

  // ----------------- Package 2 -----------------
  {
    id: '2',
    translations: {
      en: {
        title: 'Valley of Flowers Trek',
        subtitle: 'Experience a blooming paradise on the Valley of Flowers trek.',
        overview: {
          description:
            "The Valley of Flowers in Uttarakhand is a UNESCO World Heritage site, famous for its meadows of endemic alpine flowers. This trek offers serene landscapes, rare flora, and a glimpse of Himalayan wildlife.",
          duration: '5 Days / 4 Nights',
          pickup: 'From Rishikesh',
          destinations: 'Rishikesh, Govindghat, Ghangaria, Valley of Flowers',
          bestTime: 'July – September',
          type: 'Nature / Adventure / Photography',
        },
        activities: ['Trekking', 'Photography', 'Flora & Fauna Exploration'],
        days: [
          {
            day: 1,
            title: 'Arrival at Rishikesh',
            activities: ['Meet your guide', 'Prepare trek gear', 'Overnight in Rishikesh'],
            stay: 'Hotel',
            meals: 'Dinner',
          },
          {
            day: 2,
            title: 'Rishikesh to Govindghat to Ghangaria',
            activities: ['Drive to Govindghat', 'Trek to Ghangaria', 'Evening briefing for next day'],
            stay: 'Guesthouse / Camp',
            meals: 'Breakfast, Dinner',
          },
          {
            day: 3,
            title: 'Valley of Flowers Trek',
            activities: ['Full day trek in Valley of Flowers', 'Explore alpine flora', 'Wildlife spotting'],
            stay: 'Guesthouse / Camp',
            meals: 'Breakfast, Dinner',
          },
          {
            day: 4,
            title: 'Hemkund Sahib Visit',
            activities: ['Trek to Hemkund Sahib', 'Capture sunrise & mountain views', 'Return to Ghangaria'],
            stay: 'Guesthouse / Camp',
            meals: 'Breakfast, Dinner',
          },
          {
            day: 5,
            title: 'Return Journey',
            activities: ['Trek down to Govindghat', 'Drive back to Rishikesh', 'Departure'],
            stay: 'Hotel / None',
            meals: 'Breakfast',
          },
        ],
      },
      hi: {
        title: 'फूलों की घाटी ट्रेक',
        subtitle: 'फूलों की घाटी ट्रेक में खिले हुए स्वर्ग का अनुभव करें।',
        overview: {
          description:
            "उत्तराखंड की फूलों की घाटी यूनेस्को वर्ल्ड हेरिटेज साइट है, जो अपनी अल्पाइन फूलों की चरागाहों के लिए प्रसिद्ध है। यह ट्रेक शांत वातावरण, दुर्लभ वनस्पति और हिमालयी वन्यजीवों का अनुभव प्रदान करता है।",
          duration: '5 दिन / 4 रातें',
          pickup: 'ऋषिकेश से',
          destinations: 'ऋषिकेश, गोविंदघाट, घांगरिया, फूलों की घाटी',
          bestTime: 'जुलाई – सितंबर',
          type: 'प्रकृति / साहसिक / फोटोग्राफी',
        },
        activities: ['ट्रेकिंग', 'फोटोग्राफी', 'वनस्पति और जीव-जंतु का अनुभव'],
        days: [
          {
            day: 1,
            title: 'ऋषिकेश आगमन',
            activities: ['गाइड से मिलें', 'ट्रेक गियर तैयार करें', 'ऋषिकेश में रात्री विश्राम'],
            stay: 'होटल',
            meals: 'रात का खाना',
          },
          {
            day: 2,
            title: 'ऋषिकेश से गोविंदघाट और घांगरिया',
            activities: ['गोविंदघाट तक ड्राइव', 'घांगरिया तक ट्रेक', 'अगले दिन के लिए ब्रिफिंग'],
            stay: 'गेस्टहाउस / कैंप',
            meals: 'नाश्ता, रात का खाना',
          },
          {
            day: 3,
            title: 'फूलों की घाटी ट्रेक',
            activities: ['पूरे दिन फूलों की घाटी में ट्रेक', 'अल्पाइन वनस्पति का अन्वेषण', 'वन्यजीव देखना'],
            stay: 'गेस्टहाउस / कैंप',
            meals: 'नाश्ता, रात का खाना',
          },
          {
            day: 4,
            title: 'हेमकुंड साहिब दर्शन',
            activities: ['हेमकुंड साहिब तक ट्रेक', 'सूर्योदय और पर्वतीय दृश्य देखें', 'घांगरिया लौटें'],
            stay: 'गेस्टहाउस / कैंप',
            meals: 'नाश्ता, रात का खाना',
          },
          {
            day: 5,
            title: 'वापसी यात्रा',
            activities: ['गोविंदघाट तक ट्रेक', 'ऋषिकेश वापसी', 'प्रस्थान'],
            stay: 'होटल / नहीं',
            meals: 'नाश्ता',
          },
        ],
      },
      es: {
        title: 'Trek al Valle de las Flores',
        subtitle: 'Experimenta un paraíso en flor en el trek del Valle de las Flores.',
        overview: {
          description:
            "El Valle de las Flores en Uttarakhand es un sitio Patrimonio de la Humanidad de la UNESCO, famoso por sus praderas de flores alpinas endémicas. Este trek ofrece paisajes serenos, flora rara y avistamiento de fauna del Himalaya.",
          duration: '5 días / 4 noches',
          pickup: 'Desde Rishikesh',
          destinations: 'Rishikesh, Govindghat, Ghangaria, Valle de las Flores',
          bestTime: 'Julio – Septiembre',
          type: 'Naturaleza / Aventura / Fotografía',
        },
        activities: ['Senderismo', 'Fotografía', 'Exploración de Flora y Fauna'],
        days: [
          {
            day: 1,
            title: 'Llegada a Rishikesh',
            activities: ['Conoce a tu guía', 'Prepara el equipo de trekking', 'Noche en Rishikesh'],
            stay: 'Hotel',
            meals: 'Cena',
          },
          {
            day: 2,
            title: 'Rishikesh a Govindghat a Ghangaria',
            activities: ['Conduzca a Govindghat', 'Trek a Ghangaria', 'Briefing de la tarde'],
            stay: 'Guesthouse / Campamento',
            meals: 'Desayuno, Cena',
          },
          {
            day: 3,
            title: 'Trek al Valle de las Flores',
            activities: ['Trek de día completo en el Valle de las Flores', 'Explorar flora alpina', 'Avistamiento de fauna'],
            stay: 'Guesthouse / Campamento',
            meals: 'Desayuno, Cena',
          },
          {
            day: 4,
            title: 'Visita a Hemkund Sahib',
            activities: ['Trek a Hemkund Sahib', 'Captura el amanecer y vistas de montaña', 'Regreso a Ghangaria'],
            stay: 'Guesthouse / Campamento',
            meals: 'Desayuno, Cena',
          },
          {
            day: 5,
            title: 'Regreso',
            activities: ['Trek de regreso a Govindghat', 'Conduzca a Rishikesh', 'Salida'],
            stay: 'Hotel / Ninguno',
            meals: 'Desayuno',
          },
        ],
      },
    },
    image: "https://skaya-bucket.s3.us-east-1.amazonaws.com/Valley+Of+Flowers/valley+of.png",
    images:[
      "https://skaya-bucket.s3.us-east-1.amazonaws.com/Valley+Of+Flowers/Valley+Of+Flowers+National+Park.jpeg",
      "https://skaya-bucket.s3.us-east-1.amazonaws.com/Valley+Of+Flowers/Valley+of+Flowers%2C+India.jpeg",
      "https://skaya-bucket.s3.us-east-1.amazonaws.com/Valley+Of+Flowers/valley+of.png",
      "https://skaya-bucket.s3.us-east-1.amazonaws.com/Valley+Of+Flowers/valley0fflower.avif"
      
    ],
    geoLocation: [30.7056, 79.6040],
    travelType: 'group',
  },

  // ----------------- Package 3 -----------------
  {
    id: '3',
    translations: {
      en: {
        title: 'Roopkund Trek',
        subtitle: 'Mystical lake hidden in the Himalayas – the Roopkund Trek adventure.',
        overview: {
          description:
            "Roopkund, also known as Skeleton Lake, is famous for its mysterious human skeletons found beneath its glacial waters. This trek offers challenging routes, scenic landscapes, and the thrill of adventure in high-altitude Himalayas.",
          duration: '8 Days / 7 Nights',
          pickup: 'From Kathgodam / Ranikhet',
          destinations: 'Kathgodam, Lohajung, Roopkund, Bedni Bugyal',
          bestTime: 'May – June & September – October',
          type: 'Adventure / High-altitude Trek / Nature',
        },
        activities: ['High-altitude Trek', 'Camping', 'Photography'],
        days: [
          {
            day: 1,
            title: 'Arrival and Preparation',
            activities: ['Reach Kathgodam', 'Meet guide and group', 'Gear check and briefing'],
            stay: 'Hotel',
            meals: 'Dinner',
          },
          {
            day: 2,
            title: 'Kathgodam to Lohajung',
            activities: ['Drive to Lohajung', 'Overnight in base camp', 'Short acclimatization trek'],
            stay: 'Camp',
            meals: 'Breakfast, Dinner',
          },
          {
            day: 3,
            title: 'Lohajung to Didina',
            activities: ['Begin trek to Didina village', 'Explore nearby meadows', 'Camping'],
            stay: 'Camp',
            meals: 'Breakfast, Dinner',
          },
          {
            day: 4,
            title: 'Didina to Ali Bugyal',
            activities: ['Trek through forests and streams', 'Reach Ali Bugyal for panoramic views'],
            stay: 'Camp',
            meals: 'Breakfast, Dinner',
          },
          {
            day: 5,
            title: 'Ali Bugyal to Roopkund',
            activities: ['Trek to Roopkund Lake', 'Explore Skeleton Lake area', 'Photography session'],
            stay: 'Camp',
            meals: 'Breakfast, Dinner',
          },
          {
            day: 6,
            title: 'Roopkund to Junargali',
            activities: ['Trek down to Junargali', 'Evening relaxation at camp'],
            stay: 'Camp',
            meals: 'Breakfast, Dinner',
          },
          {
            day: 7,
            title: 'Junargali to Lohajung',
            activities: ['Trek down to Lohajung', 'Drive to Kathgodam'],
            stay: 'Hotel',
            meals: 'Breakfast, Dinner',
          },
          {
            day: 8,
            title: 'Departure',
            activities: ['Depart Kathgodam', 'Return home safely'],
            stay: 'None',
            meals: 'Breakfast',
          },
        ],
      },
      hi: {
        title: 'रूपकुंड ट्रेक',
        subtitle: 'हिमालय में छुपा रहस्यमयी झील – रूपकुंड ट्रेक एडवेंचर।',
        overview: {
          description:
            "रूपकुंड, जिसे कंकाल झील भी कहा जाता है, अपनी ग्लेशियल झील के नीचे पाए गए रहस्यमयी मानव कंकालों के लिए प्रसिद्ध है। यह ट्रेक चुनौतीपूर्ण मार्ग, शानदार परिदृश्य और उच्च हिमालय में रोमांच प्रदान करता है।",
          duration: '8 दिन / 7 रातें',
          pickup: 'काठगोदाम / रानीखेत से',
          destinations: 'काठगोदाम, लोहाजुंग, रूपकुंड, बेदनी बुग्याल',
          bestTime: 'मई – जून और सितंबर – अक्टूबर',
          type: 'साहसिक / उच्च-ऊंचाई ट्रेक / प्रकृति',
        },
        activities: ['उच्च-ऊंचाई ट्रेक', 'कैंपिंग', 'फोटोग्राफी'],
        days: [
          { day: 1, title: 'आगमन और तैयारी', activities: ['काठगोदाम पहुँचें', 'गाइड और समूह से मिलें', 'गियर जांच और ब्रिफिंग'], stay: 'होटल', meals: 'रात का खाना' },
          { day: 2, title: 'काठगोदाम से लोहाजुंग', activities: ['लोहाजुंग तक ड्राइव', 'बेस कैंप में रात्री विश्राम', 'छोटा अनुकूलन ट्रेक'], stay: 'कैंप', meals: 'नाश्ता, रात का खाना' },
          { day: 3, title: 'लोहाजुंग से डिडिना', activities: ['डिडिना गाँव की ओर ट्रेक शुरू करें', 'निकटस्थ मैदान का अन्वेषण', 'कैंपिंग'], stay: 'कैंप', meals: 'नाश्ता, रात का खाना' },
          { day: 4, title: 'डिडिना से अली बुग्याल', activities: ['जंगल और नालों से ट्रेक', 'अली बुग्याल पर पहुँचें और दृश्य देखें'], stay: 'कैंप', meals: 'नाश्ता, रात का खाना' },
          { day: 5, title: 'अली बुग्याल से रूपकुंड', activities: ['रूपकुंड झील तक ट्रेक', 'कंकाल झील क्षेत्र का अन्वेषण', 'फोटोग्राफी सेशन'], stay: 'कैंप', meals: 'नाश्ता, रात का खाना' },
          { day: 6, title: 'रूपकुंड से जुनारगली', activities: ['जुनारगली तक ट्रेक', 'शाम में कैम्प पर विश्राम'], stay: 'कैंप', meals: 'नाश्ता, रात का खाना' },
          { day: 7, title: 'जुनारगली से लोहाजुंग', activities: ['लोहाजुंग तक ट्रेक', 'काठगोदाम तक ड्राइव'], stay: 'होटल', meals: 'नाश्ता, रात का खाना' },
          { day: 8, title: 'प्रस्थान', activities: ['काठगोदाम से प्रस्थान', 'सुरक्षित वापसी'], stay: 'कोई नहीं', meals: 'नाश्ता' },
        ],
      },
      es: {
        title: 'Trek Roopkund',
        subtitle: 'Lago místico escondido en el Himalaya – la aventura del Trek Roopkund.',
        overview: {
          description:
            "Roopkund, también conocido como Lago de los Esqueletos, es famoso por sus misteriosos esqueletos humanos encontrados bajo sus aguas glaciales. Este trek ofrece rutas desafiantes, paisajes escénicos y la emoción de la aventura en los Himalayas de gran altitud.",
          duration: '8 días / 7 noches',
          pickup: 'Desde Kathgodam / Ranikhet',
          destinations: 'Kathgodam, Lohajung, Roopkund, Bedni Bugyal',
          bestTime: 'Mayo – Junio & Septiembre – Octubre',
          type: 'Aventura / Trek de gran altitud / Naturaleza',
        },
        activities: ['Trek de alta montaña', 'Campamento', 'Fotografía'],
        days: [
          { day: 1, title: 'Llegada y Preparación', activities: ['Llegar a Kathgodam', 'Conocer al guía y grupo', 'Revisión de equipo y briefing'], stay: 'Hotel', meals: 'Cena' },
          { day: 2, title: 'Kathgodam a Lohajung', activities: ['Conducir a Lohajung', 'Noche en base camp', 'Trek corto de aclimatación'], stay: 'Campamento', meals: 'Desayuno, Cena' },
          { day: 3, title: 'Lohajung a Didina', activities: ['Comenzar trek a Didina', 'Explorar praderas cercanas', 'Campamento'], stay: 'Campamento', meals: 'Desayuno, Cena' },
          { day: 4, title: 'Didina a Ali Bugyal', activities: ['Trek a través de bosques y arroyos', 'Llegada a Ali Bugyal para vistas panorámicas'], stay: 'Campamento', meals: 'Desayuno, Cena' },
          { day: 5, title: 'Ali Bugyal a Roopkund', activities: ['Trek al Lago Roopkund', 'Explorar área del Lago de los Esqueletos', 'Sesión de fotografía'], stay: 'Campamento', meals: 'Desayuno, Cena' },
          { day: 6, title: 'Roopkund a Junargali', activities: ['Trek a Junargali', 'Relajación por la tarde en campamento'], stay: 'Campamento', meals: 'Desayuno, Cena' },
          { day: 7, title: 'Junargali a Lohajung', activities: ['Trek a Lohajung', 'Conducir a Kathgodam'], stay: 'Hotel', meals: 'Desayuno, Cena' },
          { day: 8, title: 'Salida', activities: ['Salida de Kathgodam', 'Regreso seguro'], stay: 'Ninguno', meals: 'Desayuno' },
        ],
      },
    },
    image: 'https://skaya-bucket.s3.us-east-1.amazonaws.com/roopkund/roopkund.jpg',
    images:[
"https://skaya-bucket.s3.us-east-1.amazonaws.com/roopkund/roopkund1.jpg",
"https://skaya-bucket.s3.us-east-1.amazonaws.com/roopkund/roopkund3.jpg",
"https://skaya-bucket.s3.us-east-1.amazonaws.com/roopkund/roopkund4.jpg",
"https://skaya-bucket.s3.us-east-1.amazonaws.com/roopkund/roopkund5.jpg",
"https://skaya-bucket.s3.us-east-1.amazonaws.com/roopkund/roopkund.jpg",
"https://skaya-bucket.s3.us-east-1.amazonaws.com/roopkund/roopkund6.jpg",
"https://skaya-bucket.s3.us-east-1.amazonaws.com/roopkund/roopkund7.jpg",
    ],
    geoLocation: [30.2621, 79.7314],
    travelType: 'custom',
  },

  // ----------------- Package 4 -----------------
  // ... (similarly structure packages 4-7)
];



// Apply it
mockTravelPackages.forEach((pkg:ITravelPackage) => {
  pkg.dateAvailabilities = generateFutureDatesDynamic(pkg);
});

const initialState: TravelState = {
  travelPackages: mockTravelPackages,
  loading: false,
};

// -------------------------
// 🧭 Slice
// -------------------------
const travelSlice = createSlice({
  name: 'travelCollection',
  initialState,
  reducers: {
    setLoadedItems: (
      state,
      action: PayloadAction<{
        itemData?: ITravelPackage[];
        loading: boolean;
        pagination?: {
          currentPage: number;
          pageSize: number;
          totalItems: number;
          totalPages: number;
        };
      }>
    ) => {
      const { loading } = action.payload;

      state.loading = loading;

    },
  },
});

export const { setLoadedItems } = travelSlice.actions;

export default travelSlice.reducer;

export const selectedTravelPackages = (state: { travelCollection: TravelState }) =>
  state.travelCollection;




// Selector to get dateAvailabilities by travel package id
export const selectPackageDates = (id: string) => (state: { travelCollection: TravelState }) => {
  const pkg = state.travelCollection.travelPackages.find((item) => item.id === id);
  return pkg?.dateAvailabilities ?? [];
};

export type FlattenedTravelPackage = Omit<ITravelPackage, "translations"> &
  TravelPackageTranslation;

export const useSelectedTravelPackage = (id: string): FlattenedTravelPackage | undefined => {
  const { i18n } = useTranslation();
  const travelPackage = useSelector((state: { travelCollection: TravelState }) =>
    state.travelCollection.travelPackages.find((pkg) => pkg.id === id)
  );

  if (!travelPackage) return undefined;

  const lang = i18n.language as keyof typeof travelPackage.translations;
  const translation = travelPackage.translations[lang] || travelPackage.translations.en;

  return {
    ...travelPackage,
    ...translation,
  } as FlattenedTravelPackage;
};

