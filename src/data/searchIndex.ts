import { SearchResultItem } from '../types';
import { COLOMBIAN_TRAFFIC_SIGNS, COLOMBIAN_EXAM_QUESTIONS, COLOMBIAN_ROAD_INCIDENTS } from './mockData';
import { COLOMBIAN_EDUCATION_MODULES } from './educationData';
import { COLOMBIAN_ROAD_CAMPAIGNS, COLOMBIAN_SAFETY_RESOURCES } from './campaignsAndResourcesData';

export const ALL_SEARCHABLE_ITEMS: SearchResultItem[] = [
  // 1. Educación Vial
  ...COLOMBIAN_EDUCATION_MODULES.map((mod) => ({
    id: `search-edu-${mod.id}`,
    title: mod.title,
    categoryType: 'educacion' as const,
    categoryLabel: 'Educación Vial',
    subtitle: mod.subtitle,
    description: `${mod.summary} Base Legal: ${mod.legalBasis}.`,
    tags: ['ley 2251', 'ley 769', 'educacion', 'normativa', 'seguridad', 'velocidad', 'casco', 'prelacion', 'ciclistas'],
    badgeColor: 'bg-[#eff6ff] text-[#0052cc] border-[#bfdbfe]',
    targetScreen: 'educacion_vial' as const,
    metadata: `${mod.readTime} • ${mod.legalBasis}`
  })),

  // 2. Señales de Tránsito
  ...COLOMBIAN_TRAFFIC_SIGNS.map((sign) => ({
    id: `search-sign-${sign.id}`,
    title: `${sign.code} - ${sign.name}`,
    categoryType: 'senales' as const,
    categoryLabel: `Señal ${sign.category.charAt(0).toUpperCase() + sign.category.slice(1)}`,
    subtitle: sign.description,
    description: `Significado: ${sign.meaning}. Normativa: ${sign.colombianNorm || 'Manual de Señalización'}. ${sign.finePenalty ? `Sanción: ${sign.finePenalty}` : ''}`,
    tags: [sign.code.toLowerCase(), sign.name.toLowerCase(), sign.category, 'senal', 'transito', 'infraccion', 'comparendo'],
    badgeColor: 
      sign.category === 'reglamentaria' ? 'bg-[#fee2e2] text-[#dc2626] border-[#fecdd3]' :
      sign.category === 'preventiva' ? 'bg-amber-100 text-amber-900 border-amber-300' :
      sign.category === 'informativa' ? 'bg-[#eff6ff] text-[#0052cc] border-[#bfdbfe]' :
      'bg-orange-100 text-orange-900 border-orange-300',
    targetScreen: 'senales' as const,
    metadata: `${sign.code} • ${sign.colombianNorm || 'Manual Mintransporte'}`
  })),

  // 3. Campañas Viales
  ...COLOMBIAN_ROAD_CAMPAIGNS.map((camp) => ({
    id: `search-camp-${camp.id}`,
    title: camp.title,
    categoryType: 'campanas' as const,
    categoryLabel: 'Campaña Vial',
    subtitle: camp.slogan,
    description: `${camp.description} Consejos: ${camp.tips.join(' ')}`,
    tags: ['campaña', 'sensibilizacion', 'prevencion', 'seguridad vial', 'vida', 'cultura ciudadana'],
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    targetScreen: 'busqueda' as const,
    metadata: camp.badge
  })),

  // 4. Recursos y Manuales
  ...COLOMBIAN_SAFETY_RESOURCES.map((rec) => ({
    id: `search-rec-${rec.id}`,
    title: rec.title,
    categoryType: 'recursos' as const,
    categoryLabel: `Recurso (${rec.format})`,
    subtitle: `${rec.type.toUpperCase()} • ${rec.category}`,
    description: `${rec.description} Emitido por: ${rec.author}.`,
    tags: ['descarga', 'manual', 'ley', 'guia', 'pdf', 'ansv', 'mintransporte', 'runt', 'norma'],
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    targetScreen: 'busqueda' as const,
    metadata: `${rec.format} • ${rec.fileSize || 'Descarga'} • ${rec.author}`
  })),

  // 5. Exámenes y Evaluaciones
  ...COLOMBIAN_EXAM_QUESTIONS.map((q) => ({
    id: `search-exam-${q.id}`,
    title: `Pregunta CEA/RUNT: ${q.category}`,
    categoryType: 'evaluacion' as const,
    categoryLabel: 'Simulador / Examen',
    subtitle: q.question,
    description: `Explicación técnica: ${q.explanation} Referencia legal: ${q.legalReference || 'Ley 769 de 2002'}.`,
    tags: ['examen', 'pregunta', 'runt', 'cea', 'simulador', 'licencia', 'evaluacion', 'test'],
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    targetScreen: 'simulador' as const,
    metadata: q.legalReference || 'Examen Teórico'
  })),

  // 6. Reportes e Incidencias en Vía
  ...COLOMBIAN_ROAD_INCIDENTS.map((inc) => ({
    id: `search-inc-${inc.id}`,
    title: `Reporte en Vía: ${inc.title}`,
    categoryType: 'reportes' as const,
    categoryLabel: 'Reportes Ciudadanos',
    subtitle: `${inc.location} (${inc.city})`,
    description: `${inc.description} Estado actual: ${inc.status}. Reportado: ${inc.reportedAt}.`,
    tags: ['reporte', 'hueco', 'bache', 'semaforo', 'bloqueo', 'via', 'calle', 'alerta', inc.city.toLowerCase()],
    badgeColor: 'bg-slate-100 text-slate-900 border-slate-300',
    targetScreen: 'reportes' as const,
    metadata: `${inc.city} • ${inc.reportedAt}`
  }))
];

export function searchViaNovaItems(
  query: string, 
  filterCategory: string = 'todos'
): SearchResultItem[] {
  const cleanQuery = query.trim().toLowerCase();

  return ALL_SEARCHABLE_ITEMS.filter((item) => {
    // 1. Category Filter
    if (filterCategory !== 'todos' && item.categoryType !== filterCategory) {
      return false;
    }

    // If no text query, return all matching category
    if (!cleanQuery) return true;

    // 2. Text Search Match
    const matchTitle = item.title.toLowerCase().includes(cleanQuery);
    const matchSubtitle = item.subtitle.toLowerCase().includes(cleanQuery);
    const matchDesc = item.description.toLowerCase().includes(cleanQuery);
    const matchTags = item.tags.some(t => t.toLowerCase().includes(cleanQuery));
    const matchMetadata = item.metadata?.toLowerCase().includes(cleanQuery);

    return matchTitle || matchSubtitle || matchDesc || matchTags || matchMetadata;
  });
}
