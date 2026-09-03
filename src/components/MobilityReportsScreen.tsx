import React, { useState } from 'react';
import { 
  ArrowLeft, 
  PlusCircle, 
  AlertTriangle, 
  MapPin, 
  ThumbsUp, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Camera, 
  Send,
  X,
  LogIn
} from 'lucide-react';
import { COLOMBIAN_ROAD_INCIDENTS } from '../data/mockData';
import { RoadIncident, UserProfile } from '../types';

interface MobilityReportsScreenProps {
  user: UserProfile | null;
  onBackToDashboard: () => void;
  onNavigateToAuth: (mode: 'login' | 'registro') => void;
  onUpdateUser?: (updated: UserProfile) => void;
}

const INCIDENTS_STORAGE_KEY = 'vianova_road_incidents';

export const MobilityReportsScreen: React.FC<MobilityReportsScreenProps> = ({ 
  user, 
  onBackToDashboard,
  onNavigateToAuth,
  onUpdateUser
}) => {
  const [incidents, setIncidents] = useState<RoadIncident[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(INCIDENTS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Error reading incidents from storage', e);
      }
    }
    return COLOMBIAN_ROAD_INCIDENTS;
  });
  const [filterCategory, setFilterCategory] = useState<string>('todos');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [upvotedIds, setUpvotedIds] = useState<{ [id: string]: boolean }>({});
  
  // New Report Modal State
  const [showNewModal, setShowNewModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<RoadIncident['category']>('bache');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<RoadIncident['severity']>('media');
  const [hasPhoto, setHasPhoto] = useState(false);

  const saveIncidents = (updatedList: RoadIncident[]) => {
    setIncidents(updatedList);
    try {
      localStorage.setItem(INCIDENTS_STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.error('Error saving incidents', e);
    }
  };

  const handleUpvote = (id: string) => {
    if (upvotedIds[id]) return;
    setUpvotedIds(prev => ({ ...prev, [id]: true }));
    const nextList = incidents.map(inc => inc.id === id ? { ...inc, upvotes: inc.upvotes + 1 } : inc);
    saveIncidents(nextList);
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim()) return;

    const author = user ? `${user.name} (${user.userType})` : 'Ciudadano en Vía (Colombia)';

    const newReport: RoadIncident = {
      id: `inc-${Date.now()}`,
      title: title.trim(),
      category,
      location: location.trim(),
      city: 'Colombia',
      description: description.trim() || 'Reporte de incidencia vial registrado por usuario en Colombia.',
      severity,
      status: 'reportado',
      reportedAt: 'Hace un momento',
      authorName: author,
      upvotes: 1
    };

    const nextList = [newReport, ...incidents];
    saveIncidents(nextList);

    if (user && onUpdateUser) {
      onUpdateUser({
        ...user,
        activeReports: (user.activeReports || 0) + 1
      });
    }

    setShowNewModal(false);
    // Reset form
    setTitle('');
    setLocation('');
    setDescription('');
    setHasPhoto(false);
  };

  const filteredIncidents = incidents.filter((inc) => {
    const matchesCat = filterCategory === 'todos' || inc.category === filterCategory;
    const matchesStat = filterStatus === 'todos' || inc.status === filterStatus;
    return matchesCat && matchesStat;
  });

  const severityBadge = (severity: RoadIncident['severity']) => {
    switch (severity) {
      case 'critica':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fee2e2] text-[#dc2626]">Crítica</span>;
      case 'alta':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">Alta</span>;
      case 'media':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900">Media</span>;
      case 'baja':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Baja</span>;
    }
  };

  const statusBadge = (status: RoadIncident['status']) => {
    switch (status) {
      case 'reportado':
        return (
          <span className="flex items-center gap-1 text-xs font-semibold text-[#64748b] bg-[#f1f5f9] px-2.5 py-0.5 rounded-full">
            <Clock size={12} />
            Reportado
          </span>
        );
      case 'en_proceso':
        return (
          <span className="flex items-center gap-1 text-xs font-semibold text-[#0052cc] bg-[#eff6ff] px-2.5 py-0.5 rounded-full">
            <AlertTriangle size={12} />
            En Gestión / Cuadrilla
          </span>
        );
      case 'resuelto':
        return (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 size={12} />
            Solucionado
          </span>
        );
    }
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
          <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a]">
            Reportes Ciudadanos en Vía
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] mt-1">
            Canal colaborativo en tiempo real para reportar baches, semáforos averiados, señales caídas y bloqueos en las vías de Colombia.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowNewModal(true)}
          className="h-10 px-4 bg-[#0052cc] hover:bg-[#0043a8] text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <PlusCircle size={16} />
          <span>Crear Nuevo Reporte</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-[#64748b] flex items-center gap-1">
            <Filter size={14} /> Filtros:
          </span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-xs border border-[#cbd5e1] rounded-xl px-2.5 py-1.5 bg-white text-[#0f172a]"
          >
            <option value="todos">Todas las Categorías</option>
            <option value="bache">Baches y Huecos</option>
            <option value="semaforo">Semáforos Fuera de Servicio</option>
            <option value="senal_caida">Señalización Dañada</option>
            <option value="obras">Obras en la Vía</option>
            <option value="bloqueo">Bloqueos de Vía</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs border border-[#cbd5e1] rounded-xl px-2.5 py-1.5 bg-white text-[#0f172a]"
          >
            <option value="todos">Todos los Estados</option>
            <option value="reportado">Reportado</option>
            <option value="en_proceso">En Proceso</option>
            <option value="resuelto">Resuelto</option>
          </select>
        </div>

        <div className="text-xs text-[#64748b] font-medium">
          Mostrando {filteredIncidents.length} de {incidents.length} reportes
        </div>
      </div>

      {/* Incidents Feed */}
      <div className="space-y-4">
        {filteredIncidents.map((incident) => (
          <div
            key={incident.id}
            className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0052cc] bg-[#eff6ff] px-2 py-0.5 rounded-full">
                  {incident.category.replace('_', ' ')}
                </span>
                {severityBadge(incident.severity)}
                {statusBadge(incident.status)}
                <span className="text-xs text-[#94a3b8]">• {incident.reportedAt}</span>
              </div>

              <h3 className="text-base font-bold text-[#0f172a]">{incident.title}</h3>

              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{incident.description}</p>

              <div className="flex items-center gap-4 text-xs text-[#64748b] pt-1">
                <span className="flex items-center gap-1 text-[#0052cc] font-semibold">
                  <MapPin size={14} />
                  {incident.location}
                </span>
                <span>Por: {incident.authorName}</span>
              </div>
            </div>

            {/* Upvote & Community Validation */}
            <div className="sm:self-center shrink-0">
              <button
                type="button"
                onClick={() => handleUpvote(incident.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border cursor-pointer ${
                  upvotedIds[incident.id]
                    ? 'bg-[#eff6ff] text-[#0052cc] border-[#0052cc]'
                    : 'bg-white border-[#cbd5e1] text-[#64748b] hover:bg-[#eff6ff] hover:text-[#0052cc]'
                }`}
              >
                <ThumbsUp size={14} className={upvotedIds[incident.id] ? 'fill-current' : ''} />
                <span>{incident.upvotes}</span>
                <span className="hidden sm:inline">Confirmar</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create New Report Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#e2e8f0] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#eff6ff] text-[#0052cc] flex items-center justify-center">
                  <PlusCircle size={18} />
                </div>
                <h3 className="font-bold text-base text-[#0f172a]">Reportar Incidencia Vial en Colombia</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="text-[#94a3b8] hover:text-[#0f172a] p-1 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {!user && (
              <div className="p-3 bg-[#eff6ff] rounded-xl border border-[#bfdbfe] text-xs text-[#0052cc]">
                Estás reportando como ciudadano invitado. Tu reporte será visible de inmediato en la comunidad.
              </div>
            )}

            <form onSubmit={handleCreateReport} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-[#0f172a] block mb-1">
                  Título de la Incidencia
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Semáforo apagado en cruce de la Carrera 15 con Calle 72"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#cbd5e1] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0052cc]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#0f172a] block mb-1">
                    Categoría
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#cbd5e1] rounded-xl text-xs focus:outline-none focus:border-[#0052cc] bg-white"
                  >
                    <option value="bache">Hueco / Bache en Pavimento</option>
                    <option value="semaforo">Semáforo Dañado</option>
                    <option value="senal_caida">Señal Caída o Ilegible</option>
                    <option value="obras">Obras sin señalizar</option>
                    <option value="bloqueo">Bloqueo de Vía</option>
                    <option value="accidente">Incidente / Accidente</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0f172a] block mb-1">
                    Nivel de Severidad
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#cbd5e1] rounded-xl text-xs focus:outline-none focus:border-[#0052cc] bg-white"
                  >
                    <option value="baja">Baja (Riesgo menor)</option>
                    <option value="media">Media (Riesgo moderado)</option>
                    <option value="alta">Alta (Peligro inminente)</option>
                    <option value="critica">Crítica (Vía cerrada)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0f172a] block mb-1">
                  Ubicación Exacta / Ciudad
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]">
                    <MapPin size={15} />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Bogotá - Av. NQS con Calle 68 o Medellín - Av. El Poblado"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 border border-[#cbd5e1] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0052cc]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0f172a] block mb-1">
                  Descripción Detallada
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe las condiciones, sentido de la vía afectado y detalles relevantes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#cbd5e1] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0052cc] resize-none"
                />
              </div>

              {/* Photo Upload Simulator */}
              <div>
                <label className="text-xs font-bold text-[#0f172a] block mb-1">
                  Evidencia Fotográfica
                </label>
                <button
                  type="button"
                  onClick={() => setHasPhoto(!hasPhoto)}
                  className={`w-full py-2.5 border-2 border-dashed rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    hasPhoto 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                      : 'border-[#cbd5e1] hover:border-[#0052cc] text-[#64748b]'
                  }`}
                >
                  <Camera size={16} />
                  <span>{hasPhoto ? '✓ Fotografía adjuntada con éxito' : 'Adjuntar foto de la vía'}</span>
                </button>
              </div>

              <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 text-xs font-bold text-[#64748b] hover:text-[#0f172a] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0052cc] hover:bg-[#0043a8] text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Send size={15} />
                  <span>Publicar Reporte</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
