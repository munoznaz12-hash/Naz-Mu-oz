import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  SlidersHorizontal, 
  Sparkles, 
  Download, 
  ExternalLink, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  HelpCircle, 
  Filter, 
  FileCheck2, 
  MapPin, 
  HeartHandshake, 
  CheckCircle2, 
  Clock, 
  Info,
  Layers,
  ChevronRight,
  Share2,
  Bookmark
} from 'lucide-react';
import { ScreenId, SearchResultItem, RoadSafetyCampaign, SafetyResource } from '../types';
import { searchViaNovaItems, ALL_SEARCHABLE_ITEMS } from '../data/searchIndex';
import { COLOMBIAN_ROAD_CAMPAIGNS, COLOMBIAN_SAFETY_RESOURCES } from '../data/campaignsAndResourcesData';

interface SearchScreenProps {
  onNavigate: (screen: ScreenId) => void;
  initialQuery?: string;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ 
  onNavigate,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedCampaign, setSelectedCampaign] = useState<RoadSafetyCampaign | null>(null);
  const [selectedResource, setSelectedResource] = useState<SafetyResource | null>(null);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  // Search results calculation
  const results = useMemo(() => {
    return searchViaNovaItems(query, activeCategory);
  }, [query, activeCategory]);

  const categories = [
    { id: 'todos', label: 'Todos los Contenidos', icon: Layers },
    { id: 'educacion', label: 'Educación Vial', icon: BookOpen },
    { id: 'senales', label: 'Señales de Tránsito', icon: SlidersHorizontal },
    { id: 'campanas', label: 'Campañas Viales', icon: HeartHandshake },
    { id: 'recursos', label: 'Recursos & Manuales', icon: FileText },
    { id: 'evaluacion', label: 'Simulador & Exámenes', icon: FileCheck2 },
    { id: 'reportes', label: 'Reportes en Vía', icon: MapPin },
  ];

  const popularSearches = [
    'Límites de velocidad',
    'Ley 2251',
    'SR-01 Pare',
    'Casco reglamentario',
    'Distancia 1.5m ciclistas',
    'Prelación en glorietas',
    'Alcoholemia Ley 1696',
    'Manual de Señalización',
    'Primeros auxilios PAS',
    'SP-33 Zona Escolar'
  ];

  const handleDownloadResource = (resource: SafetyResource) => {
    setDownloadSuccessMsg(`Descargando recurso: "${resource.title}" (${resource.format})`);
    setTimeout(() => {
      setDownloadSuccessMsg(null);
    }, 4000);
  };

  const handleResultClick = (item: SearchResultItem) => {
    if (item.categoryType === 'campanas') {
      const camp = COLOMBIAN_ROAD_CAMPAIGNS.find(c => c.title.toLowerCase() === item.title.toLowerCase() || item.id.includes(c.id));
      if (camp) {
        setSelectedCampaign(camp);
        return;
      }
    } else if (item.categoryType === 'recursos') {
      const rec = COLOMBIAN_SAFETY_RESOURCES.find(r => r.title.toLowerCase() === item.title.toLowerCase() || item.id.includes(r.id));
      if (rec) {
        setSelectedResource(rec);
        return;
      }
    }

    if (item.targetScreen) {
      onNavigate(item.targetScreen);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-[#0052cc] to-[#0a2540] rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
        {/* Subtle geometric pattern */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-[#93c5fd]">
            <Sparkles size={14} className="text-[#38bdf8]" />
            <span>Centro de Búsqueda Inteligente • ViaNova Colombia</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Encuentra al instante lo que necesitas en ViaNova
          </h1>

          <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
            Localiza contenidos sobre educación vial, señales de tránsito según el Manual de Mintransporte, campañas de prevención ciudadana, simuladores y recursos descargables sin recorrer toda la plataforma.
          </p>

          {/* Search Box */}
          <div className="pt-2">
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl p-1.5 border border-white/20">
              <span className="pl-4 pr-2 text-[#64748b]">
                <Search size={22} className="text-[#0052cc]" />
              </span>
              <input
                type="text"
                id="main-search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por norma, señal (SR-01), límite de velocidad, campaña, ley..."
                className="w-full py-3 px-2 text-xs sm:text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none bg-transparent"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  id="clear-search-btn"
                  onClick={() => setQuery('')}
                  className="p-2 text-[#94a3b8] hover:text-[#0f172a] rounded-xl transition-colors cursor-pointer mr-1"
                  title="Borrar búsqueda"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Popular Search Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
            <span className="text-[#94a3b8] font-bold mr-1 flex items-center gap-1">
              <Info size={12} /> Búsquedas frecuentes:
            </span>
            {popularSearches.map((term, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuery(term)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          const count = cat.id === 'todos' 
            ? ALL_SEARCHABLE_ITEMS.length 
            : ALL_SEARCHABLE_ITEMS.filter(i => i.categoryType === cat.id).length;

          return (
            <button
              key={cat.id}
              type="button"
              id={`filter-category-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all border cursor-pointer ${
                isActive
                  ? 'bg-[#0052cc] text-white border-[#0052cc] shadow-xs'
                  : 'bg-white text-[#475569] border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-[#cbd5e1]'
              }`}
            >
              <Icon size={15} />
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                isActive ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Access Highlights: Campañas y Recursos Oficiales */}
      {(activeCategory === 'todos' || activeCategory === 'campanas' || activeCategory === 'recursos') && !query && (
        <div className="space-y-6">
          {/* Campañas Viales */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black">
                  <HeartHandshake size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0f172a]">Campañas de Seguridad Vial</h2>
                  <p className="text-xs text-[#64748b]">Iniciativas de concientización ciudadana y prevención de siniestros en Colombia</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {COLOMBIAN_ROAD_CAMPAIGNS.slice(0, 3).map((camp) => (
                <div
                  key={camp.id}
                  onClick={() => setSelectedCampaign(camp)}
                  className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-900 border border-purple-200 uppercase tracking-wider">
                        {camp.badge}
                      </span>
                      <ChevronRight size={16} className="text-[#94a3b8] group-hover:text-[#0052cc] group-hover:translate-x-1 transition-all" />
                    </div>

                    <h3 className="font-bold text-sm text-[#0f172a] group-hover:text-[#0052cc] transition-colors">
                      {camp.title}
                    </h3>

                    <p className="text-xs font-semibold text-[#0052cc] italic">
                      "{camp.slogan}"
                    </p>

                    <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">
                      {camp.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#f1f5f9] mt-3 flex items-center justify-between text-[11px] text-[#64748b]">
                    <span>{camp.legalContext}</span>
                    <span className="font-bold text-[#0052cc] group-hover:underline">Ver campaña</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recursos y Documentos Oficiales */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                  <FileText size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0f172a]">Recursos y Manuales Oficiales</h2>
                  <p className="text-xs text-[#64748b]">Documentos técnicos, leyes compiladas y guías de inspección vehicular</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {COLOMBIAN_SAFETY_RESOURCES.slice(0, 3).map((rec) => (
                <div
                  key={rec.id}
                  className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-200 uppercase">
                        {rec.format} • {rec.fileSize}
                      </span>
                      <span className="text-[10px] text-[#64748b] font-semibold">{rec.type.toUpperCase()}</span>
                    </div>

                    <h3 className="font-bold text-sm text-[#0f172a] line-clamp-2">
                      {rec.title}
                    </h3>

                    <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">
                      {rec.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#f1f5f9] mt-3 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedResource(rec)}
                      className="px-3 py-1.5 rounded-lg bg-[#eff6ff] text-[#0052cc] text-xs font-bold hover:bg-[#dbeafe] transition-colors cursor-pointer"
                    >
                      Detalles
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadResource(rec)}
                      className="px-3 py-1.5 rounded-lg bg-[#0052cc] text-white text-xs font-bold hover:bg-[#0043a8] transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                    >
                      <Download size={13} />
                      <span>Descargar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#64748b] flex items-center gap-2">
            <span>Resultados de la Búsqueda</span>
            <span className="px-2 py-0.5 rounded-full bg-[#e2e8f0] text-[#0f172a] text-xs font-extrabold">
              {results.length}
            </span>
          </h2>
          {query && (
            <span className="text-xs text-[#64748b]">
              Filtrado por término: <strong className="text-[#0f172a]">"{query}"</strong>
            </span>
          )}
        </div>

        {results.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-12 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 bg-[#eff6ff] text-[#0052cc] rounded-2xl flex items-center justify-center mx-auto">
              <Search size={28} />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="font-bold text-base text-[#0f172a]">
                No encontramos coincidencias para "{query}"
              </h3>
              <p className="text-xs text-[#64748b]">
                Prueba buscando por palabras clave generales como "velocidad", "glorieta", "casco", "SR-01", "PARE" o cambia el filtro de categoría.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setActiveCategory('todos');
              }}
              className="px-4 py-2 bg-[#0052cc] text-white text-xs font-bold rounded-xl hover:bg-[#0043a8] transition-colors cursor-pointer"
            >
              Ver todos los contenidos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((item) => (
              <div
                key={item.id}
                onClick={() => handleResultClick(item)}
                className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-xs hover:shadow-md hover:border-[#0052cc]/40 transition-all cursor-pointer flex flex-col justify-between group space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider ${item.badgeColor}`}>
                      {item.categoryLabel}
                    </span>
                    {item.metadata && (
                      <span className="text-[11px] text-[#64748b] font-medium truncate max-w-[180px]">
                        {item.metadata}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#0f172a] group-hover:text-[#0052cc] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>

                  <p className="text-[11px] text-[#64748b] line-clamp-2 leading-relaxed bg-[#f8fafc] p-2.5 rounded-xl border border-[#f1f5f9]">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-bold text-[#0052cc]">
                  <span className="flex items-center gap-1 group-hover:underline">
                    <span>
                      {item.categoryType === 'campanas' ? 'Ver campaña completa' :
                       item.categoryType === 'recursos' ? 'Ver o descargar recurso' :
                       item.categoryType === 'senales' ? 'Ver señal en catálogo' :
                       item.categoryType === 'educacion' ? 'Ir al módulo de estudio' :
                       item.categoryType === 'evaluacion' ? 'Practicar en simulador' :
                       'Ir a reportes en vía'}
                    </span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#e2e8f0] overflow-hidden">
            {/* Modal Header with Campaign Banner */}
            <div className={`p-6 sm:p-8 bg-gradient-to-r ${selectedCampaign.bannerBg} text-white relative`}>
              <button
                type="button"
                onClick={() => setSelectedCampaign(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
                title="Cerrar modal"
              >
                <X size={18} />
              </button>

              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-black uppercase tracking-wider backdrop-blur-sm">
                {selectedCampaign.badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-2">{selectedCampaign.title}</h2>
              <p className="text-sm font-semibold text-white/90 italic mt-1">"{selectedCampaign.slogan}"</p>
              <p className="text-xs text-white/80 mt-2">Público Objetivo: {selectedCampaign.targetAudience}</p>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-5">
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#64748b]">Propósito y Justificación</h3>
                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">{selectedCampaign.description}</p>
                <p className="text-xs font-bold text-[#0052cc]">Marco Normativo: {selectedCampaign.legalContext}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#64748b]">Consejos Clave de la Campaña</h3>
                <div className="space-y-2">
                  {selectedCampaign.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] text-xs text-[#1e40af]">
                      <CheckCircle2 size={16} className="text-[#0052cc] shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#e2e8f0] flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCampaign(null)}
                  className="px-5 py-2.5 rounded-xl border border-[#cbd5e1] text-xs font-bold text-[#475569] hover:bg-[#f1f5f9] cursor-pointer"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCampaign(null);
                    onNavigate('educacion_vial');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0052cc] hover:bg-[#0043a8] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <BookOpen size={15} />
                  <span>Estudiar en Educación Vial</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resource Details Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-[#e2e8f0] space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-200 uppercase">
                    {selectedResource.format} • {selectedResource.fileSize}
                  </span>
                  <h3 className="font-bold text-base text-[#0f172a] mt-1">{selectedResource.title}</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedResource(null)}
                className="text-[#94a3b8] hover:text-[#0f172a] p-1 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#334155]">
              <p className="leading-relaxed">{selectedResource.description}</p>
              <div className="p-3 bg-[#f8fafc] rounded-xl border border-[#e2e8f0] text-xs space-y-1 text-[#64748b]">
                <div><strong>Autor / Entidad:</strong> {selectedResource.author}</div>
                <div><strong>Categoría:</strong> {selectedResource.category}</div>
                <div><strong>Formato de Entrega:</strong> {selectedResource.format} ({selectedResource.fileSize})</div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedResource(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#64748b] hover:text-[#0f172a] cursor-pointer"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadResource(selectedResource);
                  setSelectedResource(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0052cc] hover:bg-[#0043a8] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Download size={15} />
                <span>Descargar Archivo Oficial</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Toast Notification */}
      {downloadSuccessMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f172a] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold border border-[#334155] animate-fade-in">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{downloadSuccessMsg}</span>
        </div>
      )}
    </div>
  );
};
