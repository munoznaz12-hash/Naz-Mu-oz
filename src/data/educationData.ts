import { EducationModule } from '../types';

export const COLOMBIAN_EDUCATION_MODULES: EducationModule[] = [
  {
    id: 'edu-ley-2251',
    title: 'Ley 2251 de 2022: Ley Julián Esteban',
    subtitle: 'Nuevos límites de velocidad y enfoque de Visión Cero en Colombia',
    readTime: '4 min de lectura',
    icon: 'Gauge',
    summary: 'Conoce la reforma histórica que redujo las velocidades urbanas a 50 km/h y 30 km/h en zonas escolares para salvar vidas en Colombia.',
    legalBasis: 'Ley 2251 del 14 de julio de 2022 - Congreso de la República de Colombia',
    contentSections: [
      {
        heading: '1. Límites de Velocidad Máxima en Colombia',
        body: 'La Ley 2251 de 2022 modificó los artículos 106 y 107 del Código Nacional de Tránsito. Establece que ningún vehículo puede transitar a más de 50 km/h en vías urbanas y carreteras municipales, ni a más de 30 km/h en zonas residenciales, escolares y hospitalarias.',
        keyPoints: [
          'Vías Urbanas y Municipales: Máximo 50 km/h.',
          'Zonas Escolares y Residenciales: Máximo 30 km/h.',
          'Carreteras Nacionales y Departamentales: Máximo 90 km/h (o 120 km/h en doble calzada solo si está expresamente señalizado).'
        ]
      },
      {
        heading: '2. ¿Por qué 50 km/h y 30 km/h?',
        body: 'A 50 km/h, la distancia de frenado se reduce sustancialmente y la probabilidad de supervivencia de un peatón o ciclista ante un impacto sube de 15% a más del 80%. A 30 km/h en zonas escolares, la posibilidad de lesiones fatales es inferior al 10%.'
      }
    ]
  },
  {
    id: 'edu-motociclistas',
    title: 'Seguridad Integral para Motociclistas',
    subtitle: 'Resolución 23385 de 2020 y conducción preventiva',
    readTime: '5 min de lectura',
    icon: 'Shield',
    summary: 'Normativa técnica obligatoria de cascos certificados, prendas reflectivas nocturnas y técnicas de manejo defensivo.',
    legalBasis: 'Resolución 23385 de 2020 - Ministerio de Transporte de Colombia',
    contentSections: [
      {
        heading: '1. Uso Correcto y Obligatorio del Casco Reglamentario',
        body: 'El casco debe cumplir con las certificaciones internacionales DOT, ECE 22.05 / 22.06 o NTC 4533. La cabeza debe quedar totalmente contenida y la correa de retención debe ajustarse firmemente por debajo del mentón sin holguras.',
        keyPoints: [
          'Prohibido el uso de teléfonos celulares intercalados entre la cabeza y el casco.',
          'En cascos abatibles, la mentonera debe estar asegurada hacia abajo durante la marcha.',
          'Visor limpio y transparente en horario nocturno.'
        ]
      },
      {
        heading: '2. Chaleco Reflectivo y Visibilidad',
        body: 'Entre las 18:00 (6:00 PM) y las 06:00 (6:00 AM) del día siguiente, o en condiciones de lluvia o baja visibilidad, es obligatorio el uso de chaleco o chaqueta con bandas reflectivas.'
      }
    ]
  },
  {
    id: 'edu-prelacion-glorietas',
    title: 'Prelación de Paso e Intersecciones',
    subtitle: 'Reglas de oro del Código Nacional de Tránsito (Ley 769)',
    readTime: '6 min de lectura',
    icon: 'GitFork',
    summary: 'Domina las normas de prioridad en glorietas, cruces en T, incorporaciones y pasos peatonales en Colombia.',
    legalBasis: 'Artículos 66 al 74 - Ley 769 de 2002',
    contentSections: [
      {
        heading: '1. Regla de Oro en Glorietas (Art. 70)',
        body: 'En cualquier glorieta o rotonda de Colombia, la prelación pertenece SIEMPRE al vehículo que ya se encuentra circulando dentro del anillo vial. Quien pretende entrar debe esperar el espacio seguro.',
        keyPoints: [
          'Para tomar la primera salida: Usar el carril derecho y señalizar a la derecha.',
          'Para seguir de frente o tomar la última salida: Usar los carriles interiores y cambiar con antelación señalizando oportunamente.'
        ]
      },
      {
        heading: '2. Intersecciones sin Semáforo',
        body: 'Cuando dos vehículos convergen en una intersección sin semáforos ni señales verticales de PARE, la preferencia corresponde al vehículo que se aproxima por la derecha.'
      }
    ]
  },
  {
    id: 'edu-usuarios-vulnerables',
    title: 'Protección a Peatones y Ciclistas',
    subtitle: 'Ley 1811 de 2016 y pirámide de la movilidad',
    readTime: '4 min de lectura',
    icon: 'Heart',
    summary: 'La jerarquía vial ubica en la cúspide a peatones y personas con movilidad reducida, seguidos por ciclistas.',
    legalBasis: 'Ley 1811 de 2016 (Ley Pro-Bici) y Art. 57 Ley 769',
    contentSections: [
      {
        heading: '1. Distancia Mínima de Sobrepaso',
        body: 'Al adelantar a un ciclista, es obligatorio conservar una distancia lateral mínima de 1.5 metros. Tocar la bocina excesivamente está prohibido porque puede asustar al ciclista y desestabilizarlo.',
        keyPoints: [
          'Paso peatonal o cebra: Detención total si hay un peatón cruzando o por iniciar el cruce.',
          'Los ciclistas tienen derecho a ocupar el carril completo si la vía no cuenta con ciclorruta segregada.'
        ]
      }
    ]
  }
];
