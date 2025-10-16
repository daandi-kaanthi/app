import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      selectLanguage: "Select Language",
      title: "DaandiKaanthi",
      startGame: "Start Game",
      restart: "Restart",
      gameOver: "Game Over",
      yourScore: "Your Score",
      gameBoardPlaceholder: "Game board initialization area...",
      gridInfo: "(The grid and tile logic will be implemented here.)",
      playInstructions: "Use the arrow keys to play!",

      searchPlaceholder: "Search for a location...",
      expandingSoon: "We’re expanding to this area soon!",
      nearest: "Nearest:",
      viewDetails: "View details",

      tabOverview: "Overview",
      tabPhotos: "Photos",
      tabAskAi: "Ask AI",
      tabDates: "Dates",

      travelPackages: {
        "Tungnath - Chandrashila": {
          title: "Tungnath - Chandrashila",
          subtitle:
            "Trek to Tungnath, the highest Shiva temple, and enjoy panoramic Himalayan views from Chandrashila peak.",
        },
        "Harsil Valley - Gangotri Expedition": {
          title: "Harsil Valley - Gangotri Expedition",
          subtitle:
            "Explore the pristine Harsil Valley and trek to the sacred Gangotri glacier, source of the holy Ganga river.",
        },
        Kedarnath: {
          title: "Kedarnath",
          subtitle:
            "A spiritual journey to Kedarnath, one of the holiest Shiva temples, amidst breathtaking Himalayan scenery.",
        },
        Kalpeshwar: {
          title: "Kalpeshwar",
          subtitle:
            "Visit the serene Kalpeshwar temple, a hidden gem in the Garhwal Himalayas, surrounded by lush forests.",
        },
        Rudranath: {
          title: "Rudranath",
          subtitle:
            "A spiritual trekking experience to Rudranath temple, nestled in the remote Garhwal Himalayas.",
        },
        "Valley Of Flowers": {
          title: "Valley Of Flowers",
          subtitle:
            "Witness the breathtaking beauty of the Valley of Flowers, a UNESCO World Heritage site, blooming with alpine flora.",
        },
        Madhyamaheshwar: {
          title: "Madhyamaheshwar",
          subtitle:
            "Trek to the ancient Madhyamaheshwar temple, surrounded by dense forests and majestic peaks.",
        },
      },

      duration: "Duration",
      destinations: "Destinations",
      bestTime: "Best Time",
      tourType: "Tour Type",
      day: "Day",
      stay: "Stay",
      meals: "Meals",
      tourInclusions: "Tour Inclusions",
      tourExclusions: "Tour Exclusions",
      whyChooseUs: "Why Choose Us?",
      bookAdventure: "Book Your Adventure",
      dayWiseItinerary: "Day-wise Itinerary",
      contactUs: "Contact Us",
      phone: "Phone",
      email: "Email",
      website: "Website",
      limitedSeats:
        "Limited seats available – Get ready for a spiritual & scenic journey through the Garhwal Himalayas!",

      // Default inclusions/exclusions/why choose us
      "Comfortable Transport From Delhi To Delhi":
        "Comfortable Transport From Delhi To Delhi",
      "Nights accommodation in scenic camps or guesthouses":
        "Nights accommodation in scenic camps or guesthouses",
      "Daily meals": "Daily meals",
      "Guided trek": "Excursión guiada",
      "First aid support during trekking": "First aid support during trekking",
      "Required permits and entry fees": "Required permits and entry fees",

      "Personal expenses (snacks, shopping, tips)":
        "Personal expenses (snacks, shopping, tips)",
      "Lunch Not Included": "Lunch Not Included",
      "Travel insurance": "Travel insurance",
      "Anything not mentioned under “Inclusions”":
        "Anything not mentioned under “Inclusions”",

      "Offbeat Himalayan adventure with local Guides":
        "Offbeat Himalayan adventure with local Guides",
      "Clean stays & hygienic meals": "Clean stays & hygienic meals",
      "Experienced drivers & trek support":
        "Experienced drivers & trek support",

      gallery: "Gallery",
      noMediaAvailable: "No media available",
      aiTab: {
        needHelpPlanning: "Need Help Planning Your Trip?",
        description:
          "Our AI travel assistant can help you customize your experience, answer questions about destinations, and provide personalized recommendations.",
        instantAnswers: "Get instant answers",
        personalizedSuggestions: "Personalized suggestions",
        virtualAssistance: "24/7 virtual assistance",
      },
      datesTab: {
        availableDates: "Available Dates",
        availabilityInfo: "Information about availability",
        spotLegend:
          "🟢 Green = plenty of spots\n🟡 Yellow = limited spots\n🔴 Red = fully booked",
        spotsAvailable: "{{count}} spots available",
        limitedSpots: "Only {{count}} spots left!",
        fullyBooked: "Fully booked",
        optionsAvailable: "{{count}} options available",
        noUpcomingDates:
          "No upcoming dates available. Check back later for new schedules.",
        day: "day",
        days: "days",
        priceComingSoon: "Price coming soon",
      },
    },
  },
  hi: {
    translation: {
      selectLanguage: "भाषा चुनें",
      title: "दांडी कांठि",
      startGame: "खेल शुरू करें",
      restart: "पुनः आरंभ",
      gameOver: "खेल समाप्त",
      yourScore: "आपका स्कोर",
      gameBoardPlaceholder: "खेल बोर्ड आरंभ क्षेत्र...",
      gridInfo: "(ग्रिड और टाइल लॉजिक यहां लागू किया जाएगा।)",
      playInstructions: "खेलने के लिए एरो कुंजियों का उपयोग करें!",

      searchPlaceholder: "स्थान खोजें...",
      expandingSoon: "हम जल्द ही इस क्षेत्र में विस्तार कर रहे हैं!",
      nearest: "निकटतम:",
      viewDetails: "विवरण देखें",

      tabOverview: "सारांश",
      tabPhotos: "फ़ोटो",
      tabAskAi: "AI से पूछें",
      tabDates: "तिथियाँ",

      travelPackages: {
        "Tungnath - Chandrashila": {
          title: "तुंगनाथ - चंद्रशिला",
          subtitle:
            "तुंगनाथ, सबसे ऊँचा शिव मंदिर, की यात्रा करें और चंद्रशिला शिखर से हिमालय के शानदार दृश्य देखें।",
        },
        "Harsil Valley - Gangotri Expedition": {
          title: "हर्षिल घाटी - गंगोत्री अभियान",
          subtitle:
            "पवित्र गंगोत्री ग्लेशियर तक ट्रेक करें और हर्षिल घाटी की शांति का अनुभव करें, जहाँ गंगा नदी की उत्पत्ति होती है।",
        },
        Kedarnath: {
          title: "केदारनाथ",
          subtitle:
            "केदारनाथ, सबसे पवित्र शिव मंदिरों में से एक, की आध्यात्मिक यात्रा करें और हिमालय की अद्भुत सुंदरता का अनुभव करें।",
        },
        Kalpeshwar: {
          title: "कल्पेश्वर",
          subtitle:
            "कल्पेश्वर मंदिर की यात्रा करें, जो घने जंगलों से घिरा हुआ एक शांत स्थान है।",
        },
        Rudranath: {
          title: "रुद्रनाथ",
          subtitle:
            "हिमालय की गोद में स्थित रुद्रनाथ मंदिर तक एक आध्यात्मिक ट्रेकिंग अनुभव।",
        },
        "Valley Of Flowers": {
          title: "फूलों की घाटी",
          subtitle:
            "फूलों की घाटी की अद्भुत सुंदरता देखें, जो अल्पाइन फूलों से खिला एक यूनेस्को विश्व धरोहर स्थल है।",
        },
        Madhyamaheshwar: {
          title: "मध्य महेश्वर",
          subtitle:
            "घने जंगलों और ऊँचे पहाड़ों से घिरे प्राचीन मध्य महेश्वर मंदिर की यात्रा करें।",
        },
      },

      duration: "अवधि",
      destinations: "गंतव्य",
      bestTime: "सर्वश्रेष्ठ समय",
      tourType: "यात्रा का प्रकार",
      day: "दिन",
      stay: "रहना",
      meals: "भोजन",
      tourInclusions: "यात्रा में शामिल",
      tourExclusions: "यात्रा में शामिल नहीं",
      whyChooseUs: "हमें क्यों चुनें?",
      bookAdventure: "अपना साहसिक बुक करें",
      dayWiseItinerary: "दिन-वार यात्रा विवरण",
      contactUs: "संपर्क करें",
      phone: "फोन",
      email: "ईमेल",
      website: "वेबसाइट",
      limitedSeats:
        "सीटें सीमित हैं – तैयार हो जाइए गढ़वाल हिमालय की आध्यात्मिक और दृश्य यात्रा के लिए!",

      "Comfortable Transport From Delhi To Delhi":
        "दिल्ली से दिल्ली तक आरामदायक परिवहन",
      "Nights accommodation in scenic camps or guesthouses":
        "सुगम कैंप या गेस्टहाउस में रात का आवास",
      "Daily meals": "दैनिक भोजन",
      "Guided trek": "निर्देशित ट्रेक",

      "First aid support during trekking":
        "ट्रेकिंग के दौरान प्राथमिक चिकित्सा सहायता",
      "Required permits and entry fees": "आवश्यक परमिट और प्रवेश शुल्क",

      "Personal expenses (snacks, shopping, tips)":
        "व्यक्तिगत खर्च (नाश्ता, खरीदारी, टिप्स)",
      "Lunch Not Included": "दोपहर का भोजन शामिल नहीं",
      "Travel insurance": "यात्रा बीमा",
      "Anything not mentioned under “Inclusions”":
        "जो शामिल नहीं है, वह शामिल नहीं है",

      "Offbeat Himalayan adventure with local Guides":
        "स्थानीय मार्गदर्शकों के साथ अनूठा हिमालयन अनुभव",
      "Clean stays & hygienic meals": "साफ-सुथरा आवास और स्वच्छ भोजन",
      "Experienced drivers & trek support": "अनुभवी चालक और ट्रेक सहायता",
      gallery: "गैलरी",
      noMediaAvailable: "कोई मीडिया उपलब्ध नहीं है",
      aiTab: {
        needHelpPlanning:
          "क्या आप अपनी यात्रा की योजना बनाने में मदद चाहते हैं?",
        description:
          "हमारा AI यात्रा सहायक आपकी यात्रा को कस्टमाइज़ करने, गंतव्यों के बारे में प्रश्नों का उत्तर देने और व्यक्तिगत सुझाव देने में मदद कर सकता है।",
        instantAnswers: "तुरंत उत्तर प्राप्त करें",
        personalizedSuggestions: "व्यक्तिगत सुझाव",
        virtualAssistance: "24/7 वर्चुअल सहायता",
      },
      datesTab: {
        availableDates: "उपलब्ध तिथियाँ",
        availabilityInfo: "उपलब्धता के बारे में जानकारी",
        spotLegend:
          "🟢 हरे = बहुत सारे स्थान\n🟡 पीले = सीमित स्थान\n🔴 लाल = पूर्ण रूप से भरा हुआ",
        spotsAvailable: "{{count}} स्थान उपलब्ध",
        limitedSpots: "केवल {{count}} स्थान बचे हैं!",
        fullyBooked: "पूर्ण रूप से भरा हुआ",
        optionsAvailable: "{{count}} विकल्प उपलब्ध",
        noUpcomingDates:
          "कोई आगामी तिथियाँ उपलब्ध नहीं हैं। नई अनुसूचियों के लिए बाद में देखें।",
        day: "दिन",
        days: "दिन",
        priceComingSoon: "कीमत जल्द ही उपलब्ध",
      },
    },
  },
  es: {
    translation: {
      selectLanguage: "Seleccionar idioma",
      title: "DaandiKaanthi",
      startGame: "Iniciar Juego",
      restart: "Reiniciar",
      gameOver: "Juego Terminado",
      yourScore: "Tu Puntuación",
      gameBoardPlaceholder: "Área de inicialización del tablero de juego...",
      gridInfo:
        "(La cuadrícula y la lógica de las fichas se implementarán aquí.)",
      playInstructions: "¡Usa las flechas para jugar!",

      searchPlaceholder: "Buscar una ubicación...",
      expandingSoon: "¡Nos estamos expandiendo a esta área pronto!",
      nearest: "Más cercano:",
      viewDetails: "Ver detalles",

      tabOverview: "Resumen",
      tabPhotos: "Fotos",
      tabAskAi: "Preguntar a la IA",
      tabDates: "Fechas",

      travelPackages: {
        "Tungnath - Chandrashila": {
          title: "Tungnath - Chandrashila",
          subtitle:
            "Camina hasta Tungnath, el templo de Shiva más alto, y disfruta de las vistas panorámicas del Himalaya desde Chandrashila.",
        },
        "Harsil Valley - Gangotri Expedition": {
          title: "Valle de Harsil - Expedición a Gangotri",
          subtitle:
            "Explora el prístino Valle de Harsil y camina hasta el glaciar sagrado de Gangotri, fuente del río Ganges.",
        },
        Kedarnath: {
          title: "Kedarnath",
          subtitle:
            "Un viaje espiritual a Kedarnath, uno de los templos de Shiva más sagrados, rodeado de paisajes himalayos impresionantes.",
        },
        Kalpeshwar: {
          title: "Kalpeshwar",
          subtitle:
            "Visita el tranquilo templo de Kalpeshwar, una joya escondida en los Himalayas de Garhwal, rodeado de bosques.",
        },
        Rudranath: {
          title: "Rudranath",
          subtitle:
            "Una experiencia espiritual de senderismo hasta el templo de Rudranath, enclavado en los remotos Himalayas de Garhwal.",
        },
        "Valley Of Flowers": {
          title: "Valle de las Flores",
          subtitle:
            "Admira la impresionante belleza del Valle de las Flores, un sitio Patrimonio Mundial de la UNESCO lleno de flora alpina.",
        },
        Madhyamaheshwar: {
          title: "Madhyamaheshwar",
          subtitle:
            "Camina hasta el antiguo templo de Madhyamaheshwar, rodeado de densos bosques y majestuosas montañas.",
        },
      },

      duration: "Duración",
      destinations: "Destinos",
      bestTime: "Mejor época",
      tourType: "Tipo de viaje",
      day: "Día",
      stay: "Estancia",
      meals: "Comidas",
      tourInclusions: "Incluido en el viaje",
      tourExclusions: "No incluido en el viaje",
      whyChooseUs: "¿Por qué elegirnos?",
      bookAdventure: "Reserva tu aventura",
      dayWiseItinerary: "Itinerario por día",
      contactUs: "Contáctenos",
      phone: "Teléfono",
      email: "Correo electrónico",
      website: "Sitio web",
      limitedSeats:
        "¡Plazas limitadas – Prepárate para un viaje espiritual y panorámico por los Himalayas de Garhwal!",

      "Comfortable Transport From Delhi To Delhi":
        "Transporte cómodo de Delhi a Delhi",
      "Nights accommodation in scenic camps or guesthouses":
        "Alojamiento nocturno en campamentos o casas de huéspedes pintorescas",
      "Daily meals": "Comidas diarias",
      "Guided trek": "Excursión guiada",
      "First aid support during trekking":
        "Soporte de primeros auxilios durante la caminata",
      "Required permits and entry fees":
        "Permisos y tarifas de entrada necesarios",

      "Personal expenses (snacks, shopping, tips)":
        "Gastos personales (aperitivos, compras, propinas)",
      "Lunch Not Included": "Almuerzo no incluido",
      "Travel insurance": "Seguro de viaje",
      "Anything not mentioned under “Inclusions”":
        "Cualquier cosa no mencionada en “Incluido”",

      "Offbeat Himalayan adventure with local Guides":
        "Aventura himalaya alternativa con guías locales",
      "Clean stays & hygienic meals":
        "Alojamientos limpios y comidas higiénicas",
      "Experienced drivers & trek support":
        "Conductores experimentados y soporte de trekking",
      gallery: "Galería",
      noMediaAvailable: "No hay medios disponibles",
      aiTab: {
        needHelpPlanning:
          "क्या आप अपनी यात्रा की योजना बनाने में मदद चाहते हैं?",
        description:
          "हमारा AI यात्रा सहायक आपकी यात्रा को कस्टमाइज़ करने, गंतव्यों के बारे में प्रश्नों का उत्तर देने और व्यक्तिगत सुझाव देने में मदद कर सकता है।",
        instantAnswers: "तुरंत उत्तर प्राप्त करें",
        personalizedSuggestions: "व्यक्तिगत सुझाव",
        virtualAssistance: "24/7 वर्चुअल सहायता",
      },
      datesTab: {
        availableDates: "Fechas disponibles",
        availabilityInfo: "Información sobre la disponibilidad",
        spotLegend:
          "🟢 Verde = muchos lugares\n🟡 Amarillo = lugares limitados\n🔴 Rojo = completo",
        spotsAvailable: "{{count}} lugares disponibles",
        limitedSpots: "¡Solo quedan {{count}} lugares!",
        fullyBooked: "Completamente reservado",
        optionsAvailable: "{{count}} opciones disponibles",
        noUpcomingDates:
          "No hay fechas próximas disponibles. Vuelve más tarde para nuevos horarios.",
        day: "día",
        days: "días",
        priceComingSoon: "Precio disponible pronto",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
