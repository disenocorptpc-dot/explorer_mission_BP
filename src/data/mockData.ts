export type Language = 'es' | 'en';

export type POI = {
  id: string;
  name: { es: string; en: string };
  coordinates: { lat: number; lng: number };
  triggerRadius: number;
  letter: string;
  trivia: {
    title: { es: string; en: string };
    question: { es: string; en: string };
    image?: string;
    blurImage?: boolean;
    iconImage: string;
    isImageOptions?: boolean;
    options: { id: string; text?: string; arrows?: string; image?: string }[];
    correctAnswer: string; 
  };
  funFact: { es: string; en: string };
};

export const POIS_ROUTE: POI[] = [
  {
    id: 'poi-1',
    letter: 'B',
    name: { es: 'Ruta al Aeropuerto', en: 'Airport Route' },
    coordinates: { lat: 21.0416, lng: -86.8483 },
    triggerRadius: 200, 
    trivia: {
      title: { es: '¡Ruta al Aeropuerto!', en: 'Airport Route!' },
      question: { 
        es: 'Saliendo del aeropuerto cruzas un puente y abajo puedes ver esta carretera. ¿Cuántos carriles tiene?', 
        en: 'Leaving the airport you cross a bridge and below you can see this road. How many lanes does it have?' 
      },
      image: '/assets/haz_que_la_202604221258.jpeg',
      iconImage: '/assets/trivia/Abstract_icon_stylized_202604221452 copia.webp',
      options: [
        { id: "A", text: "2 carriles", arrows: "↓↑" },
        { id: "B", text: "8 carriles", arrows: "↓↓↓↓↑↑↑↑" },
        { id: "C", text: "10 carriles", arrows: "↓↓↓↓↓↑↑↑↑↑" }
      ],
      correctAnswer: 'B',
    },
    funFact: {
      es: '¡Arrancamos! El Aeropuerto de Cancún es el segundo más transitado de México.',
      en: 'Let’s go! Cancun Airport is the second busiest in Mexico.'
    }
  },
  {
    id: 'poi-2',
    letter: 'E',
    name: { es: 'La Figura Especial', en: 'The Special Figure' },
    coordinates: { lat: 21.0552, lng: -86.7821 },
    triggerRadius: 200,
    trivia: {
      title: { es: '¡La Figura Especial!', en: 'The Special Figure!' },
      question: { 
        es: 'Al entrar a la Zona Hotelera puedes observar una figura muy especial (Fonatur) – elige de las imágenes la correcta:', 
        en: 'Upon entering the Hotel Zone you can observe a very special figure (Fonatur) – choose the correct one from the images:' 
      },
      image: '/assets/trivia/pregunta_2_E.jpeg',
      blurImage: true,
      iconImage: '/assets/trivia/Abstract_icon_stylized_202604221455 copia.webp',
      isImageOptions: true,
      options: [
        { id: "A", image: '/assets/trivia/pregunta_2_A.jpeg' },
        { id: "B", image: '/assets/trivia/pregunta_2_C.jpeg' }, 
        { id: "C", image: '/assets/trivia/pregunta_2D.jpeg' },
        { id: "D", image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=200&q=80' },
        { id: "E", image: '/assets/trivia/pregunta_2_E.jpeg' } 
      ],
      correctAnswer: 'E',
    },
    funFact: {
      es: 'Estás entrando a la famosa Zona Hotelera.',
      en: 'You are entering the famous Hotel Zone.'
    }
  },
  {
    id: 'poi-3',
    letter: 'A',
    name: { es: 'Fauna Local', en: 'Local Wildlife' },
    coordinates: { lat: 21.0934, lng: -86.7652 },
    triggerRadius: 200, 
    trivia: {
      title: { es: '¡Fauna Local!', en: 'Local Wildlife!' },
      question: { 
        es: 'En el camino puedes ver manglares – elige el animal que crees que vive acá:', 
        en: 'On the way you can see mangroves – choose the animal you think lives here:' 
      },
      image: '/assets/trivia/Cocodrilo_en_Cancún_202604221506.jpeg',
      blurImage: true,
      iconImage: '/assets/trivia/cocodrilo.webp',
      isImageOptions: true, 
      options: [
        { id: "A", image: "/assets/trivia/Cocodrilo_en_Cancún_202604221506.jpeg" },
        { id: "B", image: "/assets/trivia/Canguro_en_Cancun_202604221509.jpeg" },
        { id: "C", image: "/assets/trivia/Elephant_close-up_in_202604221509.jpeg" },
        { id: "D", image: "/assets/trivia/Penguin_in_Cancun_202604221508.jpeg" }
      ],
      correctAnswer: 'A',
    },
    funFact: {
      es: 'A tu izquierda está la Laguna Nichupté. Sus manglares protegen la costa.',
      en: 'On your left is the Nichupté Lagoon. Its mangroves protect the coast.'
    }
  },
  {
    id: 'poi-4',
    letter: 'C',
    name: { es: 'Hoteles Hermanos', en: 'Sister Hotels' },
    coordinates: { lat: 21.0601, lng: -86.7798 },
    triggerRadius: 200,
    trivia: {
      title: { es: '¡Hoteles Hermanos!', en: 'Sister Hotels!' },
      question: { 
        es: 'En el camino a tu hotel verás otro hotel de la compañía The Palace Company, ¿cómo se llama?', 
        en: 'On the way to your hotel you will see another hotel from The Palace Company, what is its name?' 
      },
      image: '/assets/trivia/sun palace.jpeg',
      iconImage: '/assets/trivia/sun palace.webp',
      options: [
        { id: "A", text: "Moon Palace" },
        { id: "B", text: "Cozumel Palace" },
        { id: "C", text: "Sun Palace" }
      ],
      correctAnswer: 'C',
    },
    funFact: {
      es: 'Estamos pasando por uno de los miradores más bonitos de Cancún.',
      en: 'We are passing by one of the most beautiful viewpoints in Cancun.'
    }
  },
  {
    id: 'poi-5',
    letter: 'H',
    name: { es: 'Llegando al Destino', en: 'Arriving at Destination' },
    coordinates: { lat: 21.1158, lng: -86.7514 }, 
    triggerRadius: 200,
    trivia: {
      title: { es: '¡Llegando al Destino!', en: 'Arriving at Destination!' },
      question: { 
        es: 'Estás llegando a tu destino para tus vacaciones inolvidables. ¿Dónde te hospedas? (Marca la primera letra de tu solución)', 
        en: 'You are arriving at your destination for unforgettable vacations. Where are you staying? (Mark the first letter)' 
      },
      image: '/assets/trivia/medium_beach_palace_view_palace_resorts_890d076ece_eccda81456.webp',
      iconImage: '/assets/trivia/Beach_palace.webp',
      options: [
        { id: "A", text: "Hotel" },
        { id: "B", text: "Casa" },
        { id: "C", text: "Departamento" }
      ],
      correctAnswer: 'A', 
    },
    funFact: {
      es: '¡Casi llegamos! Ve preparando tu código secreto.',
      en: 'Almost there! Get your secret code ready.'
    }
  }
];
