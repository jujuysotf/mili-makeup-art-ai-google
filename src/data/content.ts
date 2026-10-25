import { FaqItem, MagazineArticle, ReviewItem, SchoolCourse } from '../types';

export const BUSINESS_INFO = {
  name: 'Milimakeupart',
  owner: 'Milagros Arce',
  title: 'Maquilladora Profesional',
  phoneDisplay: '+54 9 3886 07-4857',
  phoneRaw: '5493886074857',
  email: 'jujuysotf@gmail.com',
  address: 'General Paz 1060, San Miguel de Tucumán, Tucumán',
  shortAddress: 'General Paz 1060, San Miguel de Tucumán',
  schedule: 'Lunes a Domingo de 09:00 a 22:00 hs',
  openingHour: 9,
  closingHour: 22,
  instagram: 'https://www.instagram.com/mili_makeupart/',
  instagramReels: 'https://www.instagram.com/mili_makeupart/reels/',
  instagramHandle: '@mili_makeupart',
  facebook: 'https://www.facebook.com/milimakeupart', // Enlace de ejemplo editable
  tiktok: 'https://www.tiktok.com/@mili_makeupart',   // Enlace de ejemplo editable
  googleMapsUrl: 'https://maps.google.com/?q=General+Paz+1060,+San+Miguel+de+Tucum%C3%A1n,+Tucum%C3%A1n,+Argentina',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.1032338507856!2d-65.21626292415174!3d-26.83665397669222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c0e1fb7b01d%3A0xc3f8e5c2d3a3d548!2sGral.%20Paz%201060%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar',
};

export const ABOUT_TEXT = {
  headline: 'Maquillaje que se ve real, luminoso y dura toda tu fiesta',
  bio: [
    'Milagros Arce maquilla en San Miguel de Tucumán bajo el nombre Milimakeupart. Trabaja en su estudio de General Paz 1060 y también brinda servicio exclusivo a domicilio para que disfrutes de tu previa con total comodidad.',
    'Su sello característico es el maquillaje que se ve impecable tanto en persona como a través del lente: piel fresca y luminosa, mirada definida y un labial que resiste intacto toda la velada. Realiza sociales, novias, quinceañeras, producciones de moda y propuestas artísticas, complementando el estilismo con peinado express.',
    'Antes de cada casamiento coordina una prueba exclusiva, para llegar al gran día con cada detalle de color y fijación ya resuelto. Además, en sus clases de automaquillaje enseña paso a paso sobre el propio rostro de cada alumna qué productos y técnicas potencian sus rasgos.',
  ],
  quote: '“El verdadero secreto está en una piel bien cuidada y en técnicas que resalten tu belleza natural sin transformarte en otra persona.”',
  features: [
    { title: 'Estudio y Domicilio', desc: 'Atención personalizada en General Paz 1060 o en la tranquilidad de tu casa.' },
    { title: 'Productos Profesionales HD', desc: 'Líneas internacionales de alta gama, hipoalergénicas y resistentes al agua.' },
    { title: 'Durabilidad Garantizada', desc: 'Técnica de piel blindada que permanece impecable de principio a fin.' },
  ],
};

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Lucía Ferreyra',
    service: 'Maquillaje de Novia',
    quote: 'Me hice la prueba y el día del casamiento quedó igual de prolijo. La piel se vio luminosa en todas las fotos y el labio no se fue en toda la fiesta a pesar de comer y bailar.',
    rating: 5,
    date: 'Hace 3 semanas',
  },
  {
    id: 'rev-2',
    author: 'Camila Rojas',
    service: 'Maquillaje Social',
    quote: 'Fui al estudio de General Paz para un cumpleaños importante. En una hora exacta tenía el ojo y la piel listos, y Mili me explicó los mejores trucos para retocarme durante la noche.',
    rating: 5,
    date: 'Hace 1 mes',
  },
  {
    id: 'rev-3',
    author: 'Valentina Díaz',
    service: 'Clase de Automaquillaje',
    quote: 'Me llevé una rutina corta y aplicable para el día a día. Milagros va despacio, te enseña con tus propios maquillajes y te muestra el producto sobre tu propia piel.',
    rating: 5,
    date: 'Hace 2 meses',
  },
];

export const SCHOOL_COURSES: SchoolCourse[] = [
  {
    id: 'curso-automaquillaje',
    title: 'Automaquillaje para el Día a Día',
    target: 'Para quien quiere verse arreglada sin depender de un turno cada vez',
    durationMinutes: 120,
    summary: 'Aprende a preparar tu piel, diseñar tus cejas, lograr un esfumado de ojos simple y labios definidos con tus propios cosméticos.',
    topics: [
      'Diagnóstico y preparación de la piel según tu biotipo',
      'Corrección de ojeras e imperfecciones con efecto natural',
      'Cejas orgánicas y mirada luminosa en menos de 15 minutos',
      'Técnica de esfumado fácil para pasar del día a la noche',
    ],
    modalities: ['estudio', 'domicilio'],
  },
  {
    id: 'curso-social-fiesta',
    title: 'Social de Fiesta & Piel Blindada',
    target: 'Para aficionadas o profesionales que buscan perfeccionar técnicas de noche',
    durationMinutes: 120,
    summary: 'Cómo armar un look de noche de alto impacto que no transfiera: preparación intensiva de piel, ojos cargados, pestañas y fijación extrema.',
    topics: [
      'Piel de porcelana y técnica de blindaje waterproof',
      'Delineados simétricos y esfumados con transiciones limpias',
      'Colocación de pestañas postizas y fijación de pigmentos',
      'Sellado estratégico para climas húmedos o calurosos',
    ],
    modalities: ['estudio'],
  },
  {
    id: 'curso-novias',
    title: 'Novias: De la Prueba al Día del Evento',
    target: 'Para novias que quieren aprender su look o maquilladoras en formación',
    durationMinutes: 120,
    summary: 'El paso a paso integral: cómo asesorar a una novia, qué colores favorecen según la luz y cómo se sostiene el maquillaje frente a cámaras HD.',
    topics: [
      'Entrevista técnica y análisis de estilo de la novia',
      'Colorimetría aplicada a vestidos blancos, marfil y encajes',
      'Pruebas de resistencia a la luz de flash y lágrimas',
      'Cronograma y tiempos de trabajo el día del evento',
    ],
    modalities: ['estudio'],
  },
];

export const MAGAZINE_ARTICLES: MagazineArticle[] = [
  {
    id: 'como-llegar-al-turno',
    title: 'Cómo preparar tu piel antes del turno',
    readTime: '2 min de lectura',
    category: 'Cuidado Facial',
    summary: 'Consejos claves para que el maquillaje se adhiera mejor, luzca más fresco y dure toda la fiesta.',
    content: [
      'Conviene presentarte a la cita con el rostro completamente limpio, sin restos de base ni máscara de pestañas previa.',
      'Si tienes la piel reseca, realizar una hidratación suave la noche anterior ayuda muchísimo a que los productos asienten con acabado aterciopelado.',
      'En caso de alergias o sensibilidad a algún ingrediente particular, coméntaselo a Milagros al reservar para personalizar cada producto que use.',
      'El turno empieza puntual a la hora pactada; llegar a tiempo asegura poder dedicarle cada minuto al detalle de tu mirada.',
    ],
  },
  {
    id: 'la-prueba-de-novia',
    title: 'Por qué la prueba de novia es un turno aparte',
    readTime: '3 min de lectura',
    category: 'Novias',
    summary: 'La importancia de diseñar tu look nupcial con tiempo y tranquilidad antes del gran día.',
    content: [
      'La prueba de maquillaje nunca debe realizarse el mismo día de la boda. Su propósito es experimentar variantes de sombras, probar tonalidades de labiales y observar el comportamiento de la piel bajo luz natural y artificial.',
      'En esta sesión previa se evalúa cómo reacciona tu piel con los fijadores y se toma una fotografía de referencia para que el día del evento el resultado sea exacto y sin estrés.',
      'Para la prueba, recomendamos llevar fotos del vestido, el peinado previsto y los accesorios que lucirás.',
    ],
  },
  {
    id: 'social-artistico-produccion',
    title: 'Social, Artístico o Producción: ¿Cuál elegir?',
    readTime: '2 min de lectura',
    category: 'Guía de Estilos',
    summary: 'Conoce las diferencias técnicas entre cada propuesta para reservar la opción ideal para tu ocasión.',
    content: [
      'El Maquillaje Social prioriza la armonía visual en vivo para fiestas o celebraciones: piel luminosa que soporte el movimiento y luzca natural a corta distancia.',
      'El Maquillaje Artístico pone el foco en el concepto creativo, la experimentación con color, grafismos o texturas que desafían lo convencional.',
      'La Sesión de Fotos está optimizada para la cámara y los lentes de alta definición: matiza brillos indeseados por el flash y potencia los contrastes que el sensor capta.',
    ],
  },
];

export const FAQS_DATA: FaqItem[] = [
  {
    question: '¿Hace falta reservar turno previo?',
    answer: 'Sí, la atención tanto en el estudio como a domicilio se coordina exclusivamente con turno previo a través de la web o por WhatsApp, para garantizar dedicación exclusiva.',
  },
  {
    question: '¿Cuál es el horario de atención?',
    answer: 'Atendemos de Lunes a Domingo de 09:00 a 22:00 hs. Cada turno se agenda asegurando que finalice a las 22:00 o antes según la duración del servicio elegido.',
  },
  {
    question: '¿Dónde está ubicado el estudio?',
    answer: 'En General Paz 1060, San Miguel de Tucumán. También brindamos servicio a domicilio en toda la zona metropolitana de Tucumán.',
  },
  {
    question: '¿Por qué no hay precios publicados en la página?',
    answer: 'Porque cada servicio se adapta al tipo de evento, la modalidad (estudio o a domicilio) y las necesidades específicas. Puedes consultar el presupuesto al instante por WhatsApp haciendo clic en cualquier servicio.',
  },
  {
    question: '¿La prueba de maquillaje de novia se agenda por separado?',
    answer: 'Sí. Es un servicio independiente de 90 minutos para diseñar con anticipación el estilo definitivo, probar paletas de color y garantizar que el día de tu boda todo salga perfecto.',
  },
];
