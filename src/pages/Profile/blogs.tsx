import type { JSX } from "react";

export interface Blog {
  category: Record<string, string>;
  title: Record<string, string>;
}

export const blogs: Blog[] = [
  {
    category: {
      en: "Name",
      es: "Name",
      hi: "Name",
      fr: "Name",
    },
    title: {
      en: "Rishikesh: Where Spirituality Meets Adventure",
      es: "Rishikesh: Donde la espiritualidad se encuentra con la aventura",
      hi: "ऋषिकेश: जहां आध्यात्मिकता साहसिक से मिलती है",
      fr: "Rishikesh: Où la spiritualité rencontre l'aventure",
    },
  },
  {
    category: {
      en: "Phone",
      es: "Phone",
      hi: "Phone",
      fr: "Phone",
    },
    title: {
      en: "Nainital: The Lake District of Uttarakhand",
      es: "Nainital: El distrito de los lagos de Uttarakhand",
      hi: "नैनीताल: उत्तराखंड का झील जिला",
      fr: "Nainital: Le district des lacs de l'Uttarakhand",
    },
  },
  {
    category: {
      en: "Email",
      es: "Email",
      hi: "Email",
      fr: "Email",
    },
    title: {
      en: "Valley of Flowers: Nature's Masterpiece",
      es: "Valle de las Flores: Obra maestra de la naturaleza",
      hi: "फूलों की घाटी: प्रकृति की उत्कृष्ट कृति",
      fr: "Vallée des Fleurs: Chef-d'œuvre de la nature",
    },
  },
  {
    category: {
      en: "Wildlife Safari",
      es: "Safari de vida silvestre",
      hi: "वन्यजीव सफारी",
      fr: "Safari animalier",
    },
    title: {
      en: "Jim Corbett National Park: Into the Wild",
      es: "Parque Nacional Jim Corbett: Hacia lo salvaje",
      hi: "जिम कॉर्बेट राष्ट्रीय उद्यान: जंगल में",
      fr: "Parc national Jim Corbett: Dans la nature sauvage",
    },
  },
  {
    category: {
      en: "Winter Sports",
      es: "Deportes de invierno",
      hi: "शीतकालीन खेल",
      fr: "Sports d'hiver",
    },
    title: {
      en: "Auli: The Skiing Paradise of India",
      es: "Auli: El paraíso del esquí de la India",
      hi: "औली: भारत का स्कीइंग स्वर्ग",
      fr: "Auli: Le paradis du ski en Inde",
    },
  },
];
