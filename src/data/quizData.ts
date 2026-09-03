import { QuizTopic } from '../types';

export const COLOMBIAN_QUIZ_TOPICS: QuizTopic[] = [
  {
    id: 'quiz-velocidad-ley2251',
    title: 'Quiz: Ley Julián Esteban y Velocidades',
    description: 'Pon a prueba tus conocimientos sobre la Ley 2251 de 2022 y los límites vigentes en Colombia.',
    icon: 'Gauge',
    questionCount: 4,
    durationMinutes: 5,
    questions: [
      {
        id: 101,
        category: 'Velocidad Urbana',
        question: '¿Cuál es la velocidad máxima permitida en vías urbanas según la Ley 2251 de 2022 en Colombia?',
        options: ['60 km/h', '50 km/h', '70 km/h', '80 km/h'],
        correctIndex: 1,
        explanation: 'La Ley 2251 fijó el límite urbano nacional en 50 km/h para disminuir fatalidades.',
        legalReference: 'Art. 106 Ley 769 de 2002'
      },
      {
        id: 102,
        category: 'Zonas Escolares',
        question: 'En zonas escolares y frente a hospitales en horario diurno, ¿cuál es el límite máximo?',
        options: ['40 km/h', '30 km/h', '20 km/h', '50 km/h'],
        correctIndex: 1,
        explanation: 'En zonas escolares y residenciales el límite es de 30 km/h obligatoriamente.',
        legalReference: 'Ley 2251 de 2022'
      },
      {
        id: 103,
        category: 'Carreteras Nacionales',
        question: 'En carreteras nacionales rurales de calzada sencilla en Colombia, ¿cuál es el límite general para vehículos particulares?',
        options: ['80 km/h', '90 km/h', '100 km/h', '120 km/h'],
        correctIndex: 1,
        explanation: 'El límite general en vías nacionales de calzada sencilla es de 90 km/h.',
        legalReference: 'Art. 107 Ley 769 de 2002'
      },
      {
        id: 104,
        category: 'Sanción por Exceso',
        question: '¿Qué código de infracción corresponde al exceso de velocidad en Colombia?',
        options: ['Infracción A.01', 'Infracción C.29', 'Infracción D.02', 'Infracción B.01'],
        correctIndex: 1,
        explanation: 'La infracción C.29 sanciona conducir a velocidad superior a la máxima permitida con 15 SMDLV.',
        legalReference: 'Resolución 3027 de 2010 - Mintransporte'
      }
    ]
  },
  {
    id: 'quiz-senales-colombianas',
    title: 'Quiz: Señalización Vial Oficial (SR, SP, SI)',
    description: 'Evalúa tu capacidad de identificar códigos y significados del Manual de Señalización de Mintransporte.',
    icon: 'SlidersHorizontal',
    questionCount: 4,
    durationMinutes: 5,
    questions: [
      {
        id: 201,
        category: 'Señales Reglamentarias',
        question: '¿Qué forma y colores caracterizan a la señal SR-01 PARE en Colombia?',
        options: [
          'Rombo amarillo con letras negras.',
          'Octágono de fondo rojo con orla y letras blancas.',
          'Círculo blanco con orla roja.',
          'Triángulo invertido azul.'
        ],
        correctIndex: 1,
        explanation: 'La señal SR-01 es la única octagonal en el manual colombiano, de fondo rojo con letras blancas.',
        legalReference: 'Manual de Señalización Vial - Mintransporte'
      },
      {
        id: 202,
        category: 'Señales Preventivas',
        question: 'Las señales preventivas (código SP) tienen como color y forma predominante:',
        options: [
          'Círculo rojo con fondo blanco.',
          'Rombo de fondo amarillo con orla y símbolo negro.',
          'Rectángulo azul con orla blanca.',
          'Rectángulo naranja.'
        ],
        correctIndex: 1,
        explanation: 'Las preventivas son rombos amarillos con símbolos negros que advierten un peligro en la vía.',
        legalReference: 'Capítulo 2 - Manual de Señalización Vial'
      },
      {
        id: 203,
        category: 'Señales Transitorias',
        question: '¿Qué color de fondo identifica a las señales transitorias (ST) por obras en la vía?',
        options: ['Verde fluorescente', 'Naranja', 'Rojo oscuro', 'Blanco reflectivo'],
        correctIndex: 1,
        explanation: 'El color naranja identifica zonas de obras, construcciones o mantenimiento temporal en vías.',
        legalReference: 'Capítulo 4 - Manual de Señalización Vial'
      },
      {
        id: 204,
        category: 'Señales Reglamentarias',
        question: '¿Qué indica una señal circular de fondo azul con flechas blancas en sentido antihorario (SR-42)?',
        options: [
          'Prohibido girar.',
          'Circulación obligatoria en glorieta / rotonda.',
          'Estacionamiento exclusivo.',
          'Pista de carreras autorizada.'
        ],
        correctIndex: 1,
        explanation: 'La señal SR-42 indica el sentido de circulación giratorio obligatorio dentro de una rotonda.',
        legalReference: 'Manual de Señalización Vial - Mintransporte'
      }
    ]
  },
  {
    id: 'quiz-normas-alcoholemia',
    title: 'Quiz: Alcoholemia, Cascos y Documentos RUNT',
    description: 'Conoce los requisitos legales para circular en Colombia sin incurrir en comparendos ni inmovilizaciones.',
    icon: 'ShieldCheck',
    questionCount: 4,
    durationMinutes: 5,
    questions: [
      {
        id: 301,
        category: 'Alcoholemia',
        question: '¿A partir de qué grado de alcoholemia se suspende la licencia de conducción en Colombia?',
        options: [
          'Solo a partir de Grado 2.',
          'Desde Grado 0 (20 a 39 mg de etanol/100 ml de sangre total).',
          'Solo si supera los 100 mg.',
          'No hay suspensión en el primer comparendo.'
        ],
        correctIndex: 1,
        explanation: 'La Ley 1696 de 2013 castiga desde Grado Cero con suspensión de licencia por 1 año e inmovilización.',
        legalReference: 'Ley 1696 de 2013'
      },
      {
        id: 302,
        category: 'Motociclistas',
        question: 'Según la Resolución 23385 de 2020, ¿qué acción está terminantemente prohibida con el celular al conducir moto?',
        options: [
          'Tener el celular guardado en el bolsillo.',
          'Intercalar o meter el teléfono móvil dentro del casco junto al oído.',
          'Usar intercomunicadores bluetooth certificados.',
          'Llevar el GPS en el soporte del manubrio.'
        ],
        correctIndex: 1,
        explanation: 'Está prohibido alojar teléfonos entre la cabeza y el casco, ya que reduce la efectividad del sistema de absorción de impacto.',
        legalReference: 'Resolución 23385 de 2020'
      },
      {
        id: 303,
        category: 'Ciclistas',
        question: '¿Cuál es la distancia lateral mínima que debe guardar un automóvil al rebasar a un ciclista en Colombia?',
        options: ['50 centímetros', '1.0 metro', '1.5 metros', '2.0 metros'],
        correctIndex: 2,
        explanation: 'La Ley 1811 de 2016 establece la distancia mínima de 1.5 metros.',
        legalReference: 'Ley 1811 de 2016'
      },
      {
        id: 304,
        category: 'Documentos Obligatorios',
        question: '¿Cuál de los siguientes documentos NO es obligatorio para circular en vehículo particular?',
        options: [
          'Licencia de Conducción vigente.',
          'Póliza de seguro Todo Riesgo privada voluntaria.',
          'Seguro Obligatorio de Accidentes de Tránsito (SOAT).',
          'Certificado de Revisión Técnico-Mecánica (cuando aplique por antigüedad).'
        ],
        correctIndex: 1,
        explanation: 'El seguro Todo Riesgo es voluntario; los obligatorios por ley son SOAT, Licencia de Conducción, Licencia de Tránsito y Técnico-Mecánica.',
        legalReference: 'Art. 42 Ley 769 de 2002'
      }
    ]
  }
];
