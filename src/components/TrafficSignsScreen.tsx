import React, { useState } from 'react';
import { 
  Search, 
  ArrowLeft, 
  Layers, 
  ShieldAlert, 
  AlertTriangle, 
  Info, 
  HardHat, 
  Sparkles, 
  Eye, 
  EyeOff,
  Scale
} from 'lucide-react';
import { COLOMBIAN_TRAFFIC_SIGNS } from '../data/mockData';
import { TrafficSign } from '../types';

interface TrafficSignsScreenProps {
  onBackToDashboard: () => void;
}

export const TrafficSignsScreen: React.FC<TrafficSignsScreenProps> = ({ onBackToDashboard }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [revealedCards, setRevealedCards] = useState<{ [id: string]: boolean }>({});

  const categories = [
    { id: 'todas', label: 'Todas las Señales', icon: Layers, count: COLOMBIAN_TRAFFIC_SIGNS.length },
    { id: 'reglamentaria', label: 'Reglamentarias (SR)', icon: ShieldAlert, count: COLOMBIAN_TRAFFIC_SIGNS.filter(s => s.category === 'reglamentaria').length },
    { id: 'preventiva', label: 'Preventivas (SP)', icon: AlertTriangle, count: COLOMBIAN_TRAFFIC_SIGNS.filter(s => s.category === 'preventiva').length },
    { id: 'informativa', label: 'Informativas (SI)', icon: Info, count: COLOMBIAN_TRAFFIC_SIGNS.filter(s => s.category === 'informativa').length },
    { id: 'transitoria', label: 'Transitorias / Obras (ST)', icon: HardHat, count: COLOMBIAN_TRAFFIC_SIGNS.filter(s => s.category === 'transitoria').length },
  ];

  const filteredSigns = COLOMBIAN_TRAFFIC_SIGNS.filter((sign) => {
    const matchesCategory = selectedCategory === 'todas' || sign.category === selectedCategory;
    const matchesQuery = sign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sign.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleReveal = (id: string) => {
    setRevealedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderColombianSignGraphic = (sign: TrafficSign) => {
    // SR-01 PARE (Octagon red with white letters)
    if (sign.code.startsWith('SR-01')) {
      return (
        <div className="w-20 h-20 bg-[#ba1a1a] rounded-lg rotate-45 flex items-center justify-center border-2 border-white shadow-md shrink-0">
          <div className="-rotate-45 text-white font-black text-sm tracking-wider uppercase text-center px-1">
            PARE
          </div>
        </div>
      );
    }

    // SR-02 CEDA EL PASO (Inverted triangle)
    if (sign.code.startsWith('SR-02')) {
      return (
        <div className="w-20 h-20 flex items-center justify-center shrink-0">
          <div className="w-0 h-0 border-l-[36px] border-l-transparent border-r-[36px] border-r-transparent border-t-[64px] border-t-[#ba1a1a] relative flex items-center justify-center">
            <div className="w-0 h-0 border-l-[26px] border-l-transparent border-r-[26px] border-r-transparent border-t-[48px] border-t-white absolute -bottom-[60px] -left-[26px] flex items-center justify-center">
              <span className="text-[#ba1a1a] font-black text-[7.5px] absolute -top-8 -left-4 w-8 text-center leading-none">
                CEDA
              </span>
            </div>
          </div>
        </div>
      );
    }

    // Circular Signs (SR)
    if (sign.shape === 'circle') {
      const isBlue = sign.bgHex === '#0052cc';
      return (
        <div className={`w-20 h-20 rounded-full border-4 ${isBlue ? 'border-white bg-[#0052cc]' : 'border-[#ba1a1a] bg-white'} flex flex-col items-center justify-center shadow-md shrink-0 p-1`}>
          {sign.code.includes('50') ? (
            <div className="text-center leading-none">
              <span className="font-black text-xl text-[#0f172a] block">50</span>
              <span className="text-[7px] font-bold text-[#64748b]">KM/H</span>
            </div>
          ) : sign.code.includes('30') ? (
            <div className="text-center leading-none">
              <span className="font-black text-xl text-[#ba1a1a] block">30</span>
              <span className="text-[7px] font-bold text-[#64748b]">KM/H</span>
            </div>
          ) : sign.code === 'SR-26' ? (
            <div className="relative flex items-center justify-center">
              <span className="text-2xl font-black text-[#0f172a]">P</span>
              <div className="w-12 h-1 bg-[#ba1a1a] rotate-45 absolute"></div>
            </div>
          ) : (
            <span className={`text-[10px] font-black ${isBlue ? 'text-white' : 'text-[#ba1a1a]'} text-center`}>
              {sign.code}
            </span>
          )}
        </div>
      );
    }

    // Diamond Signs (SP Yellow / ST Orange)
    if (sign.shape === 'diamond') {
      const isOrange = sign.category === 'transitoria';
      return (
        <div className={`w-18 h-18 ${isOrange ? 'bg-[#f77f00]' : 'bg-[#ffb703]'} rotate-45 flex items-center justify-center border-2 border-[#0f172a] shadow-md shrink-0`}>
          <div className="-rotate-45 text-[#0f172a] font-black text-xs text-center px-1">
            {sign.code}
          </div>
        </div>
      );
    }

    // Rectangle Signs (SI Blue / Direction)
    return (
      <div className="w-20 h-16 bg-[#0052cc] rounded-lg border-2 border-white flex flex-col items-center justify-center text-white shadow-md shrink-0">
        <span className="font-black text-xs">{sign.code}</span>
        <span className="text-[8px] uppercase tracking-wider font-bold">INFO</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 sm:px-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="text-xs font-bold text-[#64748b] hover:text-[#0052cc] flex items-center gap-1.5 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Volver al Inicio</span>
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#eff6ff] text-[#0052cc] text-[11px] font-bold mb-1">
            <Scale size={12} />
            Manual de Señalización Vial - Ministerio de Transporte de Colombia & INVÍAS
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a]">
            Señales de Tránsito de Colombia
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] mt-1">
            Aprende los códigos oficiales (SR, SP, SI, ST), significados normativos y tipos de infracción aplicables en el territorio colombiano.
          </p>
        </div>

        {/* Flashcard Mode Toggle */}
        <button
          type="button"
          onClick={() => setIsFlashcardMode(!isFlashcardMode)}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            isFlashcardMode
              ? 'bg-[#0052cc] text-white shadow-sm'
              : 'bg-white border border-[#cbd5e1] text-[#0052cc] hover:bg-[#eff6ff]'
          }`}
        >
          <Sparkles size={15} />
          <span>{isFlashcardMode ? 'Modo Normal' : 'Modo Flashcards (Entrenamiento)'}</span>
        </button>
      </div>

      {/* Search and Category Filter */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-sm space-y-3">
        {/* Search */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Buscar por código (Ej: SR-01, SP-33, SI-01) o palabra clave (Pare, Velocidad, Ciclistas, Curva)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[#cbd5e1] rounded-xl text-xs sm:text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/20"
          />
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0052cc] text-white shadow-sm'
                    : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0] hover:text-[#0f172a]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#475569]'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Signs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSigns.map((sign) => {
          const isRevealed = revealedCards[sign.id];

          return (
            <div
              key={sign.id}
              className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Sign badge header */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    sign.category === 'reglamentaria'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : sign.category === 'preventiva'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : sign.category === 'transitoria'
                      ? 'bg-orange-50 text-orange-800 border border-orange-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {sign.code} • {sign.category.toUpperCase()}
                  </span>

                  {isFlashcardMode && (
                    <button
                      type="button"
                      onClick={() => toggleReveal(sign.id)}
                      className="text-xs text-[#0052cc] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                      <span>{isRevealed ? 'Ocultar' : 'Revelar'}</span>
                    </button>
                  )}
                </div>

                {/* Sign Icon Center Visual */}
                <div className="py-3 flex justify-center items-center">
                  {renderColombianSignGraphic(sign)}
                </div>

                {/* Content */}
                {(!isFlashcardMode || isRevealed) ? (
                  <div className="mt-4 space-y-2 animate-fade-in">
                    <h3 className="font-black text-[#0f172a] text-sm sm:text-base">{sign.name}</h3>
                    <p className="text-xs text-[#475569] leading-relaxed">{sign.description}</p>
                    
                    <div className="p-2.5 bg-[#eff6ff] rounded-xl text-xs text-[#0052cc]">
                      <strong className="block mb-0.5 font-bold">Significado en Colombia:</strong>
                      {sign.meaning}
                    </div>

                    {sign.colombianNorm && (
                      <p className="text-[10px] text-[#64748b] font-medium">
                        Norma: {sign.colombianNorm}
                      </p>
                    )}

                    {sign.finePenalty && (
                      <p className="text-[11px] text-[#dc2626] font-bold">
                        ⚠️ {sign.finePenalty}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mt-4 p-4 bg-[#f8fafc] rounded-xl text-center space-y-2 border border-[#e2e8f0]">
                    <p className="text-xs text-[#64748b] font-semibold">
                      ¿Identificas esta señal colombiana?
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleReveal(sign.id)}
                      className="px-3 py-1.5 bg-[#0052cc] text-white text-xs font-bold rounded-lg hover:bg-[#0043a8] transition-colors cursor-pointer"
                    >
                      Verificar Respuesta
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredSigns.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#e2e8f0] p-6">
          <AlertTriangle size={36} className="mx-auto text-[#94a3b8] mb-2" />
          <h3 className="font-bold text-[#0f172a]">No se encontraron señales</h3>
          <p className="text-xs text-[#64748b] mt-1">Prueba con otros términos de búsqueda (Ej: SR-01, Curva, Pare, 50).</p>
        </div>
      )}
    </div>
  );
};
