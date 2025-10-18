import type { JSX } from "react";

export interface Blog {
  category: Record<string, string>;
  title: Record<string, string>;
  src: string;
  content: (t: (key: string, fallback: string) => string) => JSX.Element;
}

// Blog 1: Rishikesh - The Yoga Capital (4 images)
const RishikeshContent = (t: (key: string, fallback: string) => string) => {
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-gray-900 p-8 md:p-14 rounded-3xl mb-4">
        <h2 className="text-neutral-800 dark:text-neutral-100 text-2xl md:text-3xl font-bold mb-4">
          {t("rishikesh.heading1", "The Spiritual Gateway to the Himalayas")}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto mb-6">
          {t("rishikesh.para1", "Nestled in the foothills of the Himalayas along the sacred Ganges River, Rishikesh is a destination that perfectly blends spirituality, adventure, and natural beauty. Known as the 'Yoga Capital of the World,' this enchanting town attracts seekers, adventurers, and travelers from across the globe. The gentle sound of temple bells, the mesmerizing Ganga Aarti at dusk, and the sight of the emerald river flowing through the valley create an atmosphere that touches the soul. Whether you're seeking inner peace through meditation, an adrenaline rush through river rafting, or simply want to immerse yourself in the Himalayan culture, Rishikesh offers an unforgettable experience.")}
        </p>
        <img
          src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23"
          alt="Rishikesh Ganges River with Lakshman Jhula bridge"
          className="w-full h-[400px] object-cover rounded-2xl mb-6"
        />
      </div>

      <div className="bg-[#F5F5F7] dark:bg-gray-900 p-8 md:p-14 rounded-3xl mb-4">
        <h2 className="text-neutral-800 dark:text-neutral-100 text-2xl md:text-3xl font-bold mb-4">
          {t("rishikesh.heading2", "Adventure and Ashram Life")}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto mb-6">
          {t("rishikesh.para2", "Rishikesh is a study in contrasts, where ancient ashrams coexist with adventure sports operators. Start your day with sunrise yoga on the riverbank, where the cool morning breeze and the sound of flowing water create the perfect ambiance for practice. The iconic Lakshman Jhula and Ram Jhula, suspension bridges spanning the Ganges, offer breathtaking views and connect the spiritual heart of the town. For adventure enthusiasts, Rishikesh is the white water rafting capital of India, with rapids ranging from gentle Grade I to thrilling Grade IV. Beyond rafting, you can try bungee jumping at one of India's highest jumping sites, go cliff jumping, or trek to the nearby waterfalls and temples hidden in the hills.")}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa"
            alt="Yoga session by the Ganges"
            className="w-full h-[300px] object-cover rounded-2xl"
          />
          <img
            src="https://images.unsplash.com/photo-1621425652352-b0e71f53f40c"
            alt="White water rafting in Rishikesh"
            className="w-full h-[300px] object-cover rounded-2xl"
          />
        </div>
      </div>

      <div className="bg-[#F5F5F7] dark:bg-gray-900 p-8 md:p-14 rounded-3xl mb-4">
        <h2 className="text-neutral-800 dark:text-neutral-100 text-2xl md:text-3xl font-bold mb-4">
          {t("rishikesh.heading3", "Sacred Ceremonies and Local Culture")}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto mb-6">
          {t("rishikesh.para3", "The highlight of any Rishikesh visit is the evening Ganga Aarti at Parmarth Niketan or Triveni Ghat. As the sun sets, hundreds gather on the ghats to witness this spectacular ritual. Priests in saffron robes perform synchronized movements with fire lamps while devotional songs fill the air. The sight of floating diyas (oil lamps) on the Ganges creates a magical atmosphere that leaves visitors spellbound. Explore the numerous ashrams offering yoga courses, meditation retreats, and Ayurvedic treatments. The Beatles Ashram, now abandoned but covered in vibrant graffiti, offers a glimpse into the town's connection with Western spirituality in the 1960s. Don't miss trying local vegetarian cuisine at the riverside cafes, where you can savor traditional North Indian dishes while watching the river flow by.")}
        </p>
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada"
          alt="Evening Ganga Aarti ceremony in Rishikesh"
          className="w-full h-[400px] object-cover rounded-2xl"
        />
      </div>
    </>
  );
};

// Blog 2: Nainital - The Lake District (2 images)
const NainitalContent = (t: (key: string, fallback: string) => string) => {
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-gray-900 p-8 md:p-14 rounded-3xl mb-4">
        <h2 className="text-neutral-800 dark:text-neutral-100 text-2xl md:text-3xl font-bold mb-4">
          {t("nainital.heading1", "A Himalayan Paradise Around the Emerald Lake")}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto mb-6">
          {t("nainital.para1", "Perched at an altitude of 2,084 meters in the Kumaon hills, Nainital is one of Uttarakhand's most beloved hill stations. The town wraps itself around the stunning Naini Lake, a natural freshwater body that sparkles like an emerald jewel in the valley. British colonial architecture dots the hillsides, giving the town a charming old-world character. As you stroll along the Mall Road, the cool mountain air, the sight of colorful boats on the lake, and the backdrop of snow-capped peaks create a postcard-perfect setting. Nainital is a year-round destination, offering pleasant summers, vibrant monsoons, and enchanting winters when the surrounding peaks are dusted with snow. The town serves as an excellent base for exploring the wider Kumaon region and offers something for every type of traveler.")}
        </p>
        <img
          src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23"
          alt="Naini Lake surrounded by hills"
          className="w-full h-[400px] object-cover rounded-2xl mb-6"
        />
      </div>

      <div className="bg-[#F5F5F7] dark:bg-gray-900 p-8 md:p-14 rounded-3xl mb-4">
        <h2 className="text-neutral-800 dark:text-neutral-100 text-2xl md:text-3xl font-bold mb-4">
          {t("nainital.heading2", "Viewpoints, Adventures, and Colonial Charm")}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto mb-6">
          {t("nainital.para2", "Nainital offers numerous viewpoints that provide breathtaking panoramas of the Himalayan ranges. Naina Peak (China Peak), the highest point in Nainital at 2,615 meters, offers 360-degree views and can be reached via a thrilling cable car ride or a scenic trek. Snow View Point provides spectacular vistas of the snow-laden Himalayan peaks including Nanda Devi and Trisul. For nature lovers, the Nainital Zoo houses rare Himalayan species, while the surrounding forests offer excellent opportunities for bird watching and nature walks. The town's colonial heritage is evident in its Gothic churches, including St. John's Church in the wilderness, built in 1844. Boating on Naini Lake is a must-do activity – choose between paddle boats, rowing boats, or yachting for a leisurely experience on the tranquil waters. The evening light show at the lake adds a magical touch to your visit, and shopping for woolen garments, candles, and local handicrafts at Tibetan Market makes for perfect souvenirs.")}
        </p>
        <img
          src="https://images.unsplash.com/photo-1587474260584-136574528ed5"
          alt="Nainital town view from hilltop"
          className="w-full h-[400px] object-cover rounded-2xl"
        />
      </div>
    </>
  );
};

// Blog 3: Valley of Flowers - Nature's Canvas (4 images)
const ValleyOfFlowersContent = (t: (key: string, fallback: string) => string) => {
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-gray-900 p-8 md:p-14 rounded-3xl mb-4">
        <h2 className="text-neutral-800 dark:text-neutral-100 text-2xl md:text-3xl font-bold mb-4">
          {t("valley.heading1", "A UNESCO World Heritage Wonder")}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto mb-6">
          {t("valley.para1", "Hidden in the West Himalayan ranges of Uttarakhand lies one of nature's most spectacular displays – the Valley of Flowers National Park. Discovered accidentally by mountaineer Frank S. Smythe in 1931, this UNESCO World Heritage Site transforms into a vibrant carpet of alpine flowers during the monsoon months. Spread across 87.50 square kilometers at an altitude of 3,658 meters, the valley blooms with over 600 species of flowers including rare and endangered ones like the Brahma Kamal, Blue Poppy, and Cobra Lily. The valley opens only from June to October, with peak blooming occurring in July and August when the entire landscape becomes a living painting of purples, yellows, reds, and blues. This is not just a trek; it's a pilgrimage for nature lovers, photographers, and botanists who come from around the world to witness this incredible natural phenomenon.")}
        </p>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
          alt="Valley of Flowers in full bloom"
          className="w-full h-[400px] object-cover rounded-2xl mb-6"
        />
      </div>

      <div className="bg-[#F5F5F7] dark:bg-gray-900 p-8 md:p-14 rounded-3xl mb-4">
        <h2 className="text-neutral-800 dark:text-neutral-100 text-2xl md:text-3xl font-bold mb-4">
          {t("valley.heading2", "The Trek and Biodiversity")}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto mb-6">
          {t("valley.para2", "Reaching the Valley of Flowers requires dedication and moderate fitness. The journey begins from Govindghat, from where you trek 13 kilometers to Ghangaria, the base village. From Ghangaria, it's another 6 kilometers to the valley entrance. The trail winds through dense forests, crosses gushing streams, and offers stunning views of the Himalayan peaks. The valley itself is a 10-kilometer stretch of gentle meadows where you can spot not just flowers but also rare Himalayan wildlife including the Asiatic black bear, snow leopard, musk deer, and over 114 bird species. The presence of glaciers, snow-clad peaks of Gauri Parbat and Rataban, and crystal-clear streams adds to the valley's ethereal beauty. Nearby Hemkund Sahib, a Sikh pilgrimage site situated at 4,632 meters beside a pristine glacial lake, makes for an excellent add-on to your trip.")}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <img
            src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e"
            alt="Alpine flowers in the valley"
            className="w-full h-[300px] object-cover rounded-2xl"
          />
          <img
            src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9"
            alt="Trekking path through the valley"
            className="w-full h-[300px] object-cover rounded-2xl"
          />
        </div>
      </div>

      <div className="bg-[#F5F5F7] dark:bg-gray-900 p-8 md:p-14 rounded-3xl mb-4">
        <h2 className="text-neutral-800 dark:text-neutral-100 text-2xl md:text-3xl font-bold mb-4">
          {t("valley.heading3", "Planning Your Visit")}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto mb-6">
          {t("valley.para3", "Timing is crucial for a Valley of Flowers visit. The best period is mid-July to mid-August when the maximum variety of flowers are in bloom. September offers fewer flowers but clearer skies and better mountain views. Permits are required and available at Ghangaria. The valley doesn't allow camping, so you'll need to base yourself in Ghangaria where basic but comfortable accommodation is available. Pack warm clothing, rain gear, good trekking shoes, and a camera with extra batteries. The weather can be unpredictable with sudden rain showers. Acclimatization is important – spend a day in Ghangaria before attempting the valley trek. Remember, you're visiting a protected national park, so maintain trail discipline, carry back all waste, and don't pluck flowers or disturb wildlife. This pristine ecosystem has been preserved for millions of years, and it's our responsibility to keep it that way for future generations.")}
        </p>
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
          alt="Himalayan landscape near Valley of Flowers"
          className="w-full h-[400px] object-cover rounded-2xl"
        />
      </div>
    </>
  );
};

// Blog 4: Jim Corbett National Park (1 image)
const JimCorbettContent = (t: (key: string, fallback: string) => string) => {
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-gray-900 p-8 md:p-14 rounded-3xl mb-4">
        <h2 className="text-neutral-800 dark:text-neutral-100 text-2xl md:text-3xl font-bold mb-4">
          {t("corbett.heading1", "India's Oldest National Park and Tiger Reserve")}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto mb-6">
          {t("corbett.para1", "Established in 1936 as Hailey National Park and later renamed after the legendary hunter-turned-conservationist Jim Corbett, this park holds the distinction of being India's first national park and played a pivotal role in launching Project Tiger in 1973. Spread across 520 square kilometers in the Nainital district of Uttarakhand, the park encompasses diverse landscapes including hills, riverine belts, marshy depressions, grasslands, and large lake areas. The Ramganga River flowing through the reserve adds to its scenic beauty and provides crucial water sources for the rich wildlife. Home to over 215 species of birds, the park is a paradise for bird watchers. The dense Sal forests and grasslands shelter not just the majestic Bengal tiger but also elephants, leopards, sloth bears, crocodiles, and over 600 species of plants, making it one of India's most biodiverse protected areas.")}
        </p>
        <img
          src="https://images.unsplash.com/photo-1534177616072-ef7dc120449d"
          alt="Bengal tiger in Jim Corbett National Park"
          className="w-full h-[450px] object-cover rounded-2xl mb-6"
        />
      </div>

      <div className="bg-[#F5F5F7] dark:bg-gray-900 p-8 md:p-14 rounded-3xl mb-4">
        <h2 className="text-neutral-800 dark:text-neutral-100 text-2xl md:text-3xl font-bold mb-4">
          {t("corbett.heading2", "Safari Zones and Wildlife Experiences")}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto">
          {t("corbett.para2", "The park is divided into five zones – Dhikala, Bijrani, Jhirna, Domunda, and Durgadevi – each offering unique wildlife viewing experiences. Dhikala, the core zone, offers the most immersive experience with overnight stays possible in forest rest houses, where you can hear the wild sounds at night. Bijrani zone is known for high tiger sighting probability, while Jhirna remains open throughout the year, making it ideal for off-season visits. Safari options include jeep safaris and, in Dhikala, the unique canter (bus) safari. Early morning and evening safaris offer the best chance of wildlife spotting when animals are most active. The park is closed during the monsoon season (mid-June to mid-November) except for the Jhirna zone. Beyond safaris, you can enjoy elephant rides, visit Garjia Devi Temple situated on a large rock in the Kosi River, or go river rafting in the Kosi River. The park's rich avifauna makes it a year-round destination for bird enthusiasts, with migratory species adding to the resident birds during winter. Staying in one of the forest lodges or nearby resorts completes the wilderness experience, offering a perfect blend of adventure and comfort.")}
        </p>
      </div>
    </>
  );
};

// Blog 5: Auli - The Skiing Destination (2 images)
const AuliContent = (t: (key: string, fallback: string) => string) => {
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-gray-900 p-8 md:p-14 rounded-3xl mb-4">
        <h2 className="text-neutral-800 dark:text-neutral-100 text-2xl md:text-3xl font-bold mb-4">
          {t("auli.heading1", "The Skiing Capital of India")}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto mb-6">
          {t("auli.para1", "Situated at an altitude of 2,500 to 3,050 meters in the Chamoli district, Auli is India's premier skiing destination and one of the best in Asia. The name 'Auli' means meadow, and this high-altitude destination lives up to its name with expansive snow-covered slopes during winter and lush green meadows in summer. What sets Auli apart is its perfectly positioned slopes that offer ideal conditions for skiing, ranging from gentle slopes for beginners to challenging runs for advanced skiers. The panoramic views of some of the highest peaks in the Indian Himalayas – Nanda Devi (7,816m), Kamet (7,756m), Mana Parvat (7,272m), and Dunagiri (7,066m) – create a stunning backdrop for your skiing adventure. During winter (December to February), when the slopes are covered with thick pristine snow, Auli transforms into a winter sports paradise. The Indian Army's High Altitude Warfare School also conducts training here, testament to the excellent skiing conditions.")}
        </p>
        <img
          src="https://images.unsplash.com/photo-1551524164-687a55dd1126"
          alt="Auli skiing slopes with mountain views"
          className="w-full h-[400px] object-cover rounded-2xl mb-6"
        />
      </div>

      <div className="bg-[#F5F5F7] dark:bg-gray-900 p-8 md:p-14 rounded-3xl mb-4">
        <h2 className="text-neutral-800 dark:text-neutral-100 text-2xl md:text-3xl font-bold mb-4">
          {t("auli.heading2", "Beyond Skiing: Year-Round Mountain Paradise")}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto mb-6">
          {t("auli.para2", "While winter brings skiing enthusiasts, Auli is a year-round destination with different charms in each season. One of the longest cable cars in Asia (4 kilometers) connects Auli to Joshimath, offering spectacular aerial views of the valleys, apple orchards, and snow-clad peaks. The ropeway journey itself is an unforgettable experience. During summer and monsoon, Auli transforms into a trekker's paradise with trails leading to Gurso Bugyal, a picturesque meadow offering 360-degree mountain views, and Chattrakund, a pristine lake shrouded in mystery and mythology. The Auli Artificial Lake, one of the world's highest man-made lakes, was created to provide artificial snow on the slopes and adds to the area's beauty. Adventure seekers can try the chairlift ride, go camping under the stars, or simply enjoy the serene mountain atmosphere. The nearby Chenab Lake (just before Auli) offers a tranquil spot for contemplation. Auli also serves as a base for the trek to Valley of Flowers and Hemkund Sahib. The area is dotted with oak and coniferous forests, adding to its natural beauty and offering opportunities for nature walks and bird watching.")}
        </p>
        <img
          src="https://images.unsplash.com/photo-1483664852095-d6cc6870702d"
          alt="Auli cable car with mountain panorama"
          className="w-full h-[400px] object-cover rounded-2xl"
        />
      </div>
    </>
  );
};

export const blogs: Blog[] = [
  {
    category: { 
      en: "Spiritual & Adventure", 
      es: "Espiritual y Aventura", 
      hi: "आध्यात्मिक और साहसिक",
      fr: "Spirituel et Aventure"
    },
    title: { 
      en: "Rishikesh: Where Spirituality Meets Adventure", 
      es: "Rishikesh: Donde la espiritualidad se encuentra con la aventura", 
      hi: "ऋषिकेश: जहां आध्यात्मिकता साहसिक से मिलती है",
      fr: "Rishikesh: Où la spiritualité rencontre l'aventure"
    },
    src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
    content: RishikeshContent,
  },
  {
    category: { 
      en: "Hill Station", 
      es: "Estación de montaña", 
      hi: "पहाड़ी स्टेशन",
      fr: "Station de montagne"
    },
    title: { 
      en: "Nainital: The Lake District of Uttarakhand", 
      es: "Nainital: El distrito de los lagos de Uttarakhand", 
      hi: "नैनीताल: उत्तराखंड का झील जिला",
      fr: "Nainital: Le district des lacs de l'Uttarakhand"
    },
    src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
    content: NainitalContent,
  },
  {
    category: { 
      en: "Nature & Trekking", 
      es: "Naturaleza y Senderismo", 
      hi: "प्रकृति और ट्रैकिंग",
      fr: "Nature et Randonnée"
    },
    title: { 
      en: "Valley of Flowers: Nature's Masterpiece", 
      es: "Valle de las Flores: Obra maestra de la naturaleza", 
      hi: "फूलों की घाटी: प्रकृति की उत्कृष्ट कृति",
      fr: "Vallée des Fleurs: Chef-d'œuvre de la nature"
    },
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    content: ValleyOfFlowersContent,
  },
  {
    category: { 
      en: "Wildlife Safari", 
      es: "Safari de vida silvestre", 
      hi: "वन्यजीव सफारी",
      fr: "Safari animalier"
    },
    title: { 
      en: "Jim Corbett National Park: Into the Wild", 
      es: "Parque Nacional Jim Corbett: Hacia lo salvaje", 
      hi: "जिम कॉर्बेट राष्ट्रीय उद्यान: जंगल में",
      fr: "Parc national Jim Corbett: Dans la nature sauvage"
    },
    src: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d",
    content: JimCorbettContent,
  },
  {
    category: { 
      en: "Winter Sports", 
      es: "Deportes de invierno", 
      hi: "शीतकालीन खेल",
      fr: "Sports d'hiver"
    },
    title: { 
      en: "Auli: The Skiing Paradise of India", 
      es: "Auli: El paraíso del esquí de la India", 
      hi: "औली: भारत का स्कीइंग स्वर्ग",
      fr: "Auli: Le paradis du ski en Inde"
    },
    src: "https://images.unsplash.com/photo-1551524164-687a55dd1126",
    content: AuliContent,
  },
];