import { ExamQuestion, TrafficSign, RoadIncident } from '../types';

export const COLOMBIAN_TRAFFIC_SIGNS: TrafficSign[] = [
  // ===================== REGLAMENTARIAS (SR - Fondo blanco/rojo/azul) =====================
  {
    id: 'sr-01',
    code: 'SR-01',
    name: 'PARE',
    category: 'reglamentaria',
    description: 'Obligación estricta de detener por completo la marcha del vehículo antes de la línea de parada o antes de ingresar a la intersección.',
    meaning: 'El conductor debe detener completamente el vehículo, verificar que no transiten peatones ni otros vehículos con prelación, y solo reiniciar la marcha cuando sea seguro.',
    colombianNorm: 'Art. 109 Ley 769 de 2002 (Código Nacional de Tránsito Terrestre)',
    finePenalty: 'Infracción C.02 - 30 SMDLV + inmovilización si aplica',
    shape: 'octagon',
    bgHex: '#ba1a1a',
    borderHex: '#ffffff',
    iconName: 'OctagonAlert'
  },
  {
    id: 'sr-02',
    code: 'SR-02',
    name: 'CEDA EL PASO',
    category: 'reglamentaria',
    description: 'Obligación de disminuir la velocidad y detenerse si fuere necesario para permitir el paso de vehículos o peatones con prelación.',
    meaning: 'Ceder el paso a los vehículos que circulan por la vía a la cual se aproxima o que ya circulan dentro de la glorieta.',
    colombianNorm: 'Art. 110 Ley 769 de 2002',
    finePenalty: 'Infracción C.03',
    shape: 'triangle',
    bgHex: '#ffffff',
    borderHex: '#ba1a1a',
    iconName: 'TriangleAlert'
  },
  {
    id: 'sr-30-50',
    code: 'SR-30 (50)',
    name: 'VELOCIDAD MÁXIMA 50 KM/H',
    category: 'reglamentaria',
    description: 'Límite máximo general de velocidad permitido en vías urbanas y carreteras municipales de Colombia.',
    meaning: 'Prohibido exceder los 50 km/h según la Ley Julián Esteban. Protege la vida de todos los actores viales en perímetros urbanos.',
    colombianNorm: 'Ley 2251 de 2022 (Ley Julián Esteban) - Art. 106',
    finePenalty: 'Infracción C.29 - Conducir a velocidad superior a la máxima permitida',
    shape: 'circle',
    bgHex: '#ffffff',
    borderHex: '#ba1a1a',
    iconName: 'Gauge'
  },
  {
    id: 'sr-30-30',
    code: 'SR-30 (30)',
    name: 'VELOCIDAD MÁXIMA 30 KM/H (ZONA ESCOLAR / RESIDENCIAL)',
    category: 'reglamentaria',
    description: 'Límite máximo obligatorio en zonas escolares, hospitales, áreas residenciales y centros comerciales.',
    meaning: 'Velocidad reducida obligatoria para garantizar la reacción inmediata y frenado seguro ante el cruce imprevisto de niños o peatones.',
    colombianNorm: 'Ley 2251 de 2022 - Art. 106 parágrafo',
    finePenalty: 'Infracción C.29',
    shape: 'circle',
    bgHex: '#ffffff',
    borderHex: '#ba1a1a',
    iconName: 'Gauge'
  },
  {
    id: 'sr-04',
    code: 'SR-04',
    name: 'PROHIBIDO GIRAR A LA IZQUIERDA',
    category: 'reglamentaria',
    description: 'Prohíbe a los conductores efectuar la maniobra de viraje hacia la izquierda en la intersección.',
    meaning: 'Previene choques de frente o laterales en vías de alto flujo donde no existe fase semafórica exclusiva de giro.',
    colombianNorm: 'Manual de Señalización Vial - Mintransporte',
    finePenalty: 'Infracción C.04',
    shape: 'circle',
    bgHex: '#ffffff',
    borderHex: '#ba1a1a',
    iconName: 'Undo2'
  },
  {
    id: 'sr-06',
    code: 'SR-06',
    name: 'PROHIBIDO GIRAR EN U',
    category: 'reglamentaria',
    description: 'Prohibición absoluta de realizar retorno o vuelta en 180 grados en la calzada.',
    meaning: 'Evita bloqueos de carril y situaciones de alto riesgo en corredores de alta velocidad o cruces angostos.',
    colombianNorm: 'Manual de Señalización Vial - Mintransporte',
    finePenalty: 'Infracción C.05',
    shape: 'circle',
    bgHex: '#ffffff',
    borderHex: '#ba1a1a',
    iconName: 'RotateCcw'
  },
  {
    id: 'sr-26',
    code: 'SR-26',
    name: 'PROHIBIDO PARQUEAR O ESTACIONAR',
    category: 'reglamentaria',
    description: 'Prohíbe estacionar el vehículo en el tramo de vía indicado.',
    meaning: 'El conductor no puede dejar el vehículo desatendido ni inmovilizado en la calzada o andén.',
    colombianNorm: 'Art. 112 Ley 769 de 2002',
    finePenalty: 'Infracción C.02 - Inmovilización con grúa',
    shape: 'circle',
    bgHex: '#ffffff',
    borderHex: '#ba1a1a',
    iconName: 'Ban'
  },
  {
    id: 'sr-28',
    code: 'SR-28',
    name: 'PROHIBIDO ADELANTAR',
    category: 'reglamentaria',
    description: 'Prohíbe la maniobra de adelantar a otro vehículo ocupando el carril de sentido contrario.',
    meaning: 'Señalizada en curvas, puentes, túneles, pasos a nivel y tramos con visibilidad reducida.',
    colombianNorm: 'Art. 73 Ley 769 de 2002',
    finePenalty: 'Infracción D.06 - Adelantar en sitios prohibidos',
    shape: 'circle',
    bgHex: '#ffffff',
    borderHex: '#ba1a1a',
    iconName: 'Car'
  },
  {
    id: 'sr-42',
    code: 'SR-42',
    name: 'CIRCULACIÓN EN GLORIETA (ROTONDA)',
    category: 'reglamentaria',
    description: 'Indica la obligación de circular en torno a la rotonda o glorieta en el sentido de las flechas (antihorario en Colombia).',
    meaning: 'Todo vehículo que ya se encuentra en el anillo circular tiene prelación de paso sobre el que va a ingresar.',
    colombianNorm: 'Art. 70 Ley 769 de 2002',
    finePenalty: 'Infracción C.03',
    shape: 'circle',
    bgHex: '#0052cc',
    borderHex: '#ffffff',
    iconName: 'RefreshCw'
  },
  {
    id: 'sr-38',
    code: 'SR-38',
    name: 'SENTIDO ÚNICO DE CIRCULACIÓN',
    category: 'reglamentaria',
    description: 'Indica la dirección obligatoria del flujo vehicular en la vía.',
    meaning: 'Prohibido transitar en contravía bajo ninguna circunstancia.',
    colombianNorm: 'Art. 109 Ley 769 de 2002',
    finePenalty: 'Infracción D.03 - Transitar en sentido contrario',
    shape: 'rectangle',
    bgHex: '#101c2d',
    borderHex: '#ffffff',
    iconName: 'ArrowRight'
  },

  // ===================== PREVENTIVAS (SP - Fondo amarillo / Rombo) =====================
  {
    id: 'sp-01',
    code: 'SP-01',
    name: 'CURVA PELIGROSA A LA DERECHA',
    category: 'preventiva',
    description: 'Advierte la proximidad de una curva pronunciada hacia la derecha.',
    meaning: 'Reduzca la velocidad antes de iniciar el trazado de la curva y conserve su carril sin invadir la calzada opuesta.',
    colombianNorm: 'Manual de Señalización Vial de Colombia',
    shape: 'diamond',
    bgHex: '#ffb703',
    borderHex: '#101c2d',
    iconName: 'CornerUpRight'
  },
  {
    id: 'sp-23',
    code: 'SP-23',
    name: 'RESALTO / REDUCTOR DE VELOCIDAD',
    category: 'preventiva',
    description: 'Advierte la proximidad de un reductor de velocidad en la vía.',
    meaning: 'Disminuir la velocidad a menos de 20 km/h para evitar pérdida de control y proteger la suspensión del vehículo.',
    colombianNorm: 'Manual de Señalización Vial - INVÍAS',
    shape: 'diamond',
    bgHex: '#ffb703',
    borderHex: '#101c2d',
    iconName: 'Activity'
  },
  {
    id: 'sp-33',
    code: 'SP-33',
    name: 'ZONA ESCOLAR',
    category: 'preventiva',
    description: 'Advierte la cercanía de colegios, escuelas o centros educativos.',
    meaning: 'Disminuya la velocidad a un máximo de 30 km/h y preste especial atención a niños cruzando la calle.',
    colombianNorm: 'Ley 769 de 2002 y Ley 2251 de 2022',
    shape: 'diamond',
    bgHex: '#ffb703',
    borderHex: '#101c2d',
    iconName: 'School'
  },
  {
    id: 'sp-39',
    code: 'SP-39',
    name: 'ZONA DE CICLISTAS',
    category: 'preventiva',
    description: 'Advierte la presencia habitual de ciclistas en la calzada o cruce de ciclorruta.',
    meaning: 'Conduzca con precaución y conserve la distancia obligatoria de 1.5 metros al rebasar a cualquier ciclista.',
    colombianNorm: 'Ley 1811 de 2016 (Ley Pro-Bici en Colombia)',
    shape: 'diamond',
    bgHex: '#ffb703',
    borderHex: '#101c2d',
    iconName: 'Bike'
  },
  {
    id: 'sp-46',
    code: 'SP-46',
    name: 'SEMÁFORO PRÓXIMO',
    category: 'preventiva',
    description: 'Advierte la aproximación a una intersección regulada por semáforos.',
    meaning: 'Prepárese para desacelerar y respetar la señal de detención luminosa.',
    colombianNorm: 'Manual de Señalización Vial de Colombia',
    shape: 'diamond',
    bgHex: '#ffb703',
    borderHex: '#101c2d',
    iconName: 'SlidersVertical'
  },
  {
    id: 'sp-55',
    code: 'SP-55',
    name: 'SUPERFICIE DESLIZANTE',
    category: 'preventiva',
    description: 'Advierte un tramo de pavimento que puede tornarse resbaloso por lluvia, humedad o asfalto pulido.',
    meaning: 'Evite maniobras bruscas de aceleración o frenado y aumente la distancia de seguimiento.',
    colombianNorm: 'Manual de Señalización Vial de Colombia',
    shape: 'diamond',
    bgHex: '#ffb703',
    borderHex: '#101c2d',
    iconName: 'ShieldAlert'
  },

  // ===================== INFORMATIVAS (SI - Fondo azul / Rectángulo) =====================
  {
    id: 'si-01',
    code: 'SI-01',
    name: 'PUESTO DE PRIMEROS AUXILIOS / HOSPITAL',
    category: 'informativa',
    description: 'Indica la ubicación o cercanía de un hospital, clínica o centro de atención médica de urgencias.',
    meaning: 'Guía de asistencia para emergencias médicas en la vía.',
    colombianNorm: 'Manual de Señalización Vial de Colombia',
    shape: 'rectangle',
    bgHex: '#0052cc',
    borderHex: '#ffffff',
    iconName: 'HeartPulse'
  },
  {
    id: 'si-02',
    code: 'SI-02',
    name: 'ESTACIÓN DE SERVICIO (COMBUSTIBLE)',
    category: 'informativa',
    description: 'Indica la proximidad de una estación de combustible y aprovisionamiento.',
    meaning: 'Facilita el repostaje de combustible y servicios conexos.',
    colombianNorm: 'Manual de Señalización Vial de Colombia',
    shape: 'rectangle',
    bgHex: '#0052cc',
    borderHex: '#ffffff',
    iconName: 'Fuel'
  },
  {
    id: 'si-10',
    code: 'SI-10',
    name: 'ESTACIONAMIENTO PERMITIDO (PARQUEADERO)',
    category: 'informativa',
    description: 'Indica un lugar debidamente autorizado y habilitado para el parqueo de vehículos.',
    meaning: 'Área segura de estacionamiento donde no se generan comparendos ni bloqueo de calzada.',
    colombianNorm: 'Manual de Señalización Vial de Colombia',
    shape: 'rectangle',
    bgHex: '#0052cc',
    borderHex: '#ffffff',
    iconName: 'ParkingCircle'
  },
  {
    id: 'si-24',
    code: 'SI-24',
    name: 'CICLORRUTA / CICLOVÍA',
    category: 'informativa',
    description: 'Indica el trazado de una vía exclusiva o preferente para bicicletas.',
    meaning: 'Espacio protegido para la movilidad en dos ruedas sin emisión de carbono.',
    colombianNorm: 'Ley 1811 de 2016 y Manual Mintransporte',
    shape: 'rectangle',
    bgHex: '#006476',
    borderHex: '#ffffff',
    iconName: 'Bike'
  },

  // ===================== TRANSITORIAS (ST - Fondo naranja / Rombo) =====================
  {
    id: 'st-01',
    code: 'ST-01',
    name: 'TRABAJOS EN LA VÍA (OBRAS)',
    category: 'transitoria',
    description: 'Advierte la presencia de obreros, maquinaria y labores de mantenimiento sobre la vía.',
    meaning: 'Reduzca drásticamente la velocidad, atienda las órdenes del personal de obra y esté atento a desvíos.',
    colombianNorm: 'Capítulo 4 Manual de Señalización Vial de Colombia',
    shape: 'diamond',
    bgHex: '#f77f00',
    borderHex: '#101c2d',
    iconName: 'HardHat'
  },
  {
    id: 'st-04',
    code: 'ST-04',
    name: 'BANDERILLERO',
    category: 'transitoria',
    description: 'Advierte la presencia de un operador de tránsito con bandera roja o paleta PARE/SIGA en la zona de obra.',
    meaning: 'Sus indicaciones son de estricto cumplimiento y tienen prevalencia sobre las demás señales.',
    colombianNorm: 'Manual de Señalización Vial de Colombia',
    shape: 'diamond',
    bgHex: '#f77f00',
    borderHex: '#101c2d',
    iconName: 'Flag'
  }
];

export const COLOMBIAN_EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    category: 'Límites de Velocidad (Ley 2251 de 2022)',
    licenseCategory: 'todas',
    question: 'En Colombia, de acuerdo con la Ley 2251 de 2022 (Ley Julián Esteban), ¿cuál es el límite máximo de velocidad en vías urbanas y carreteras municipales?',
    options: [
      '60 km/h para autos y 50 km/h para motos.',
      '50 km/h de manera general (salvo señalización expresa que fije un límite menor).',
      '70 km/h en avenidas principales.',
      '80 km/h si no hay tráfico pesado.'
    ],
    correctIndex: 1,
    explanation: 'La Ley 2251 de 2022 unificó y redujo la velocidad máxima en zonas urbanas a 50 km/h para reducir la severidad de los siniestros viales.',
    legalReference: 'Art. 106 Ley 769 de 2002 modificado por Ley 2251 de 2022'
  },
  {
    id: 2,
    category: 'Zonas Especiales de Protección',
    licenseCategory: 'todas',
    question: '¿Cuál es la velocidad máxima permitida en Colombia en zonas escolares, residenciales y de hospitales durante sus horarios de actividad?',
    options: [
      '40 km/h',
      '30 km/h',
      '20 km/h',
      '50 km/h con luces estacionarias'
    ],
    correctIndex: 1,
    explanation: 'El Código Nacional de Tránsito y la Ley 2251 establecen un límite máximo de 30 km/h en zonas escolares y residenciales.',
    legalReference: 'Art. 106 Parágrafo - Ley 769 de 2002'
  },
  {
    id: 3,
    category: 'Prelación de Paso en Glorietas (Rotondas)',
    licenseCategory: 'todas',
    question: 'Al llegar a una glorieta o rotonda en Colombia, ¿quién tiene la prelación de paso?',
    options: [
      'El vehículo que pretende entrar a la glorieta por la derecha.',
      'El vehículo que ya circula dentro de la glorieta.',
      'El vehículo de mayor cilindraje o transporte pesado.',
      'El vehículo que accione primero las luces de emergencia.'
    ],
    correctIndex: 1,
    explanation: 'El Artículo 70 de la Ley 769 de 2002 establece que en una glorieta, el vehículo que transita dentro de ella tiene prelación sobre el que intenta ingresar.',
    legalReference: 'Art. 70 Ley 769 de 2002'
  },
  {
    id: 4,
    category: 'Convivencia con Ciclistas (Ley 1811 de 2016)',
    licenseCategory: 'todas',
    question: 'Al adelantar a un ciclista en una vía colombiana, ¿cuál es la distancia lateral mínima obligatoria que debe mantener el conductor?',
    options: [
      '0.8 metros',
      '1.0 metro',
      '1.5 metros de separación lateral',
      '2.5 metros en carretera destapada'
    ],
    correctIndex: 2,
    explanation: 'La Ley 1811 de 2016 obliga a todo conductor a respetar una distancia lateral mínima de 1.5 metros para salvaguardar la vida del ciclista.',
    legalReference: 'Ley 1811 de 2016 (Ley Pro-Bici Colombia)'
  },
  {
    id: 5,
    category: 'Seguridad en Motocicletas (Resolución 23385 de 2020)',
    licenseCategory: 'A2',
    question: 'En Colombia, el uso del casco protector para motociclistas exige que:',
    options: [
      'Solo se use en carreteras nacionales.',
      'La cabeza esté totalmente inmersa en el casco, el sistema de retención esté abrochado bajo la mandíbula y no se use el celular dentro del casco.',
      'Se puede llevar desabrochado a menos de 30 km/h.',
      'Solo es obligatorio para el conductor y no para el acompañante.'
    ],
    correctIndex: 1,
    explanation: 'La Resolución 23385 de 2020 del Ministerio de Transporte reglamenta las condiciones obligatorias de uso seguro y abrochado del casco reglamentario certificado.',
    legalReference: 'Resolución 23385 de 2020 - Mintransporte'
  },
  {
    id: 6,
    category: 'Normativa de Alcoholemia (Ley 1696 de 2013)',
    licenseCategory: 'todas',
    question: 'En Colombia, la Ley 1696 de 2013 frente a la conducción bajo el efecto del alcohol establece:',
    options: [
      'Se permite hasta 0.5 gramos de alcohol sin sanción.',
      'Cero tolerancia: desde Grado Cero (20-39 mg/100ml) se aplican multas millonarias, suspensión de licencia e inmovilización.',
      'Solo se sanciona si ocurre un accidente.',
      'La sanción solo es pedagógica para conductores particulares.'
    ],
    correctIndex: 1,
    explanation: 'Colombia tiene una de las leyes de alcoholemia más estrictas de la región: el Grado 0 ya genera suspensión de licencia de 1 año e inmovilización.',
    legalReference: 'Ley 1696 de 2013'
  },
  {
    id: 7,
    category: 'Documentación Obligatoria en Vía',
    licenseCategory: 'todas',
    question: '¿Cuáles son los 4 documentos obligatorios que debe portar o tener vigentes en el RUNT todo conductor en Colombia?',
    options: [
      'Cédula, Pasaporte, Carné de Vacunación y Factura de compra.',
      'Licencia de Conducción, Licencia de Tránsito (Tarjeta de Propiedad), SOAT vigente y Certificado de Revisión Técnico-Mecánica.',
      'Solo la Licencia de Conducción.',
      'Tarjeta de crédito y póliza todo riesgo únicamente.'
    ],
    correctIndex: 1,
    explanation: 'La Ley 769 de 2002 exige Licencia de Conducción, Tarjeta de Propiedad, SOAT y Técnico-Mecánica vigentes en la plataforma RUNT.',
    legalReference: 'Art. 34 y 42 Ley 769 de 2002'
  },
  {
    id: 8,
    category: 'Prelación en Intersecciones no Señalizadas',
    licenseCategory: 'todas',
    question: 'En un cruce o intersección donde no hay semáforos ni señales de PARE o Ceda el Paso, ¿qué vehículo tiene la prelación?',
    options: [
      'El vehículo que circula a mayor velocidad.',
      'El vehículo que se aproxima por la derecha del otro conductor.',
      'El vehículo más pesado o de servicio público.',
      'El vehículo que hace sonar la bocina.'
    ],
    correctIndex: 1,
    explanation: 'En intersecciones no reguladas, la prelación pertenece al vehículo que transita por la derecha.',
    legalReference: 'Art. 70 Ley 769 de 2002'
  }
];

export const COLOMBIAN_ROAD_INCIDENTS: RoadIncident[] = [
  {
    id: 'inc-bog-01',
    title: 'Hueco profundo en carril exclusivo mixto',
    category: 'bache',
    location: 'Av. Caracas con Calle 53, Sentido Sur-Norte',
    city: 'Bogotá D.C.',
    description: 'Bache de gran profundidad que genera riesgo inminente de caída para motociclistas y ciclistas.',
    severity: 'alta',
    status: 'en_proceso',
    reportedAt: 'Hace 1 hora',
    authorName: 'Comunidad Vial Teusaquillo',
    upvotes: 24
  },
  {
    id: 'inc-med-02',
    title: 'Semáforo dañado en cruce peatonal',
    category: 'semaforo',
    location: 'Calle San Juan con Cra 65',
    city: 'Medellín',
    description: 'Semáforo intermitente en amarillo continuo. Alto riesgo para el paso de peatones hacia la estación.',
    severity: 'critica',
    status: 'reportado',
    reportedAt: 'Hace 30 minutos',
    authorName: 'Movilidad Poblado / Laureles',
    upvotes: 41
  },
  {
    id: 'inc-cali-03',
    title: 'Señal SR-01 PARE derribada por colisión',
    category: 'senal_caida',
    location: 'Av. Roosevelt con Calle 5ta',
    city: 'Cali',
    description: 'La señal reglamentaria de PARE está en el piso tras un roce vehicular nocturno. Conductores no frenan.',
    severity: 'alta',
    status: 'reportado',
    reportedAt: 'Hace 3 horas',
    authorName: 'Veeduría Ciudadana Valle',
    upvotes: 18
  },
  {
    id: 'inc-bar-04',
    title: 'Mantenimiento y demarcación de paso cebra',
    category: 'obras',
    location: 'Vía 40 con Calle 76',
    city: 'Barranquilla',
    description: 'Obras de señalización horizontal termoplástica finalizadas satisfactoriamente.',
    severity: 'baja',
    status: 'resuelto',
    reportedAt: 'Ayer',
    authorName: 'Secretaría de Tránsito y Seguridad Vial',
    upvotes: 56
  }
];
