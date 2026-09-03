import React, { useState } from 'react';
import { COLOMBIAN_EDUCATION_MODULES } from '../data/educationData';
import { EducationModule } from '../types';
import { 
  BookOpen, 
  Gauge, 
  Shield, 
  GitFork, 
  Heart, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle,
  FileCheck2,
  BookmarkCheck,
  Scale
} from 'lucide-react';

interface EducationScreenProps {
  onNavigateToQuiz: () => void;
  onNavigateToSimulator: () => void;
}

export const EducationScreen: React.FC<EducationScreenProps> = ({
  onNavigateToQuiz,
  onNavigateToSimulator
}) => {
  const [selectedModule, setSelectedModule] = useState<EducationModule>(COLOMBIAN_EDUCATION_MODULES[0]);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const toggleModuleComplete = (id: string) => {
    if (completedModules.includes(id)) {
      setCompletedModules(completedModules.filter(m => m !== id));
    } else {
      setCompletedModules([...completedModules, id]);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gauge': return Gauge;
      case 'Shield': return Shield;
      case 'GitFork': return GitFork;
      case 'Heart': return Heart;
      default: return BookOpen;
    }
  };

  const isCompleted = completedModules.includes(selectedModule.id);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e0f2fe] text-[#0369a1] text-xs font-bold mb-2">
          <Scale size={14} />
          Código Nacional de Tránsito de Colombia (Ley 769 & Ley 2251)
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
          Módulos de Educación y Seguridad Vial
        </h1>
        <p className="text-sm text-[#475569] mt-1 max-w-3xl">
          Aprende y repasa las leyes, normas de convivencia y técnicas de manejo preventivo vigentes en Colombia para aspirantes y conductores de todas las categorías.
        </p>

        {/* Progress Bar */}
        <div className="mt-4 p-4 bg-white rounded-xl border border-[#e2e8f0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-2/3">
            <div className="flex justify-between text-xs font-bold text-[#334155] mb-1.5">
              <span>Tu Progreso de Formación Vial</span>
              <span>{completedModules.length} de {COLOMBIAN_EDUCATION_MODULES.length} módulos leídos</span>
            </div>
            <div className="w-full bg-[#f1f5f9] h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#0052cc] h-full rounded-full transition-all duration-500"
                style={{ width: `${(completedModules.length / COLOMBIAN_EDUCATION_MODULES.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={onNavigateToQuiz}
              className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-[#eff6ff] text-[#0052cc] text-xs font-bold hover:bg-[#dbeafe] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <HelpCircle size={14} />
              <span>Hacer un Quiz</span>
            </button>
            <button
              onClick={onNavigateToSimulator}
              className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-[#0052cc] text-white text-xs font-bold hover:bg-[#0043a8] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <FileCheck2 size={14} />
              <span>Simulador RUNT</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar List + Content Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Module Selector Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#64748b] px-1">
            Temas de Formación
          </h2>

          {COLOMBIAN_EDUCATION_MODULES.map((module) => {
            const Icon = getIcon(module.icon);
            const isSelected = selectedModule.id === module.id;
            const isDone = completedModules.includes(module.id);

            return (
              <div
                key={module.id}
                onClick={() => setSelectedModule(module)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-[#eff6ff] border-[#0052cc] shadow-sm' 
                    : 'bg-white border-[#e2e8f0] hover:border-[#cbd5e1] hover:bg-[#f8fafc]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg shrink-0 ${
                    isSelected ? 'bg-[#0052cc] text-white' : 'bg-[#f1f5f9] text-[#475569]'
                  }`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-bold text-xs text-[#0f172a] truncate">
                        {module.title}
                      </h3>
                      {isDone && (
                        <CheckCircle2 size={15} className="text-[#16a34a] shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-[#64748b] line-clamp-2 mt-0.5">
                      {module.subtitle}
                    </p>
                    <span className="inline-block mt-2 text-[10px] font-semibold text-[#0052cc]">
                      {module.readTime}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Module Detail View (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-[#e2e8f0] rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Header of reading */}
          <div className="border-b border-[#f1f5f9] pb-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <span className="px-2.5 py-1 rounded bg-[#f1f5f9] text-[#334155] text-[11px] font-bold">
                {selectedModule.readTime}
              </span>
              <button
                onClick={() => toggleModuleComplete(selectedModule.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isCompleted
                    ? 'bg-[#dcfce7] text-[#166534] hover:bg-[#bbf7d0]'
                    : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
                }`}
              >
                <BookmarkCheck size={15} />
                <span>{isCompleted ? 'Módulo Completado ✓' : 'Marcar como Leído'}</span>
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#0f172a]">
              {selectedModule.title}
            </h2>
            <p className="text-xs text-[#0052cc] font-semibold mt-1">
              Base Legal: {selectedModule.legalBasis}
            </p>
            <p className="text-sm text-[#475569] mt-2 italic bg-[#f8fafc] p-3 rounded-lg border-l-4 border-[#0052cc]">
              {selectedModule.summary}
            </p>
          </div>

          {/* Module Sections */}
          <div className="space-y-6">
            {selectedModule.contentSections.map((sec, idx) => (
              <div key={idx} className="space-y-2.5">
                <h3 className="text-base font-bold text-[#0f172a]">
                  {sec.heading}
                </h3>
                <p className="text-sm text-[#334155] leading-relaxed">
                  {sec.body}
                </p>
                {sec.keyPoints && (
                  <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl p-3.5 space-y-1.5 mt-2">
                    <div className="text-[11px] font-black uppercase text-[#0369a1] tracking-wider">
                      Puntos Clave para Recordar:
                    </div>
                    {sec.keyPoints.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-[#0c4a6e]">
                        <span className="text-[#0284c7] font-bold">•</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Next Steps Footer */}
          <div className="mt-8 pt-6 border-t border-[#f1f5f9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => toggleModuleComplete(selectedModule.id)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#0052cc] text-white text-xs font-bold hover:bg-[#0043a8] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <CheckCircle2 size={16} />
              <span>{isCompleted ? 'Desmarcar Lectura' : 'Finalizar y Guardar Progreso'}</span>
            </button>

            <button
              onClick={onNavigateToQuiz}
              className="w-full sm:w-auto text-xs font-bold text-[#0052cc] hover:underline flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Evaluar lo aprendido en un Quiz</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
