import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Award, 
  MapPin, 
  ArrowRight, 
  BookOpen, 
  SlidersHorizontal, 
  HelpCircle,
  FileCheck2, 
  TrendingUp, 
  Car, 
  Sparkles,
  CheckCircle2,
  ChevronRight,
  UserPlus,
  LogIn,
  AlertTriangle,
  Scale,
  Search,
  Palette,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { UserProfile, ScreenId } from '../types';
import { ViaNovaLogo } from './ViaNovaLogo';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface DashboardScreenProps {
  user: UserProfile | null;
  onNavigate: (screen: ScreenId) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ user, onNavigate }) => {
  const { 
    themeMode, 
    activeThemeConfig, 
    t 
  } = useThemeLanguage();

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 sm:px-6 space-y-8 animate-fade-in">
      {/* ===================== HERO / WELCOME BANNER ===================== */}
      {user ? (
        /* Logged-in User Banner */
        <div 
          id="dashboard-welcome-banner" 
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-[#e2e8f0] dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors"
        >
          <div 
            className="h-full w-2 absolute top-0 left-0" 
            style={{ backgroundColor: activeThemeConfig.primaryHex }}
          />
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span 
                className="text-xs font-bold px-2.5 py-0.5 rounded-full border"
                style={{ 
                  backgroundColor: themeMode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : activeThemeConfig.bgLightHex, 
                  color: activeThemeConfig.primaryHex,
                  borderColor: activeThemeConfig.borderLightHex
                }}
              >
                {user.userType.toUpperCase()} REGISTRADO
              </span>
              <span className="text-xs text-[#64748b] dark:text-slate-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Perfil Activo
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] dark:text-white tracking-tight">
              Hola, {user.name} 👋
            </h1>
            <p className="text-sm text-[#475569] dark:text-slate-300 max-w-xl leading-relaxed">
              {t('dash_welcome_sub', 'Bienvenido al portal oficial de movilidad inteligente y educación vial de ViaNova. Continúa tu formación según el Código Nacional de Tránsito de Colombia o consulta las alertas viales.')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              id="quick-search-nav-btn"
              onClick={() => onNavigate('busqueda')}
              className="h-11 px-4 text-xs font-bold rounded-xl border transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              style={{ 
                backgroundColor: themeMode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : activeThemeConfig.bgLightHex, 
                color: activeThemeConfig.primaryHex,
                borderColor: activeThemeConfig.borderLightHex
              }}
            >
              <Search size={16} />
              <span>{t('dash_quick_search', 'Búsqueda Rápida')}</span>
            </button>

            <button
              type="button"
              id="quick-start-exam-btn"
              onClick={() => onNavigate('simulador')}
              className="h-11 px-5 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              style={{ backgroundColor: activeThemeConfig.primaryHex }}
            >
              <span>{t('dash_quick_simulator', 'Simulador RUNT')}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        /* Guest / Unauthenticated Hero Welcome */
        <div className="bg-gradient-to-br from-white dark:from-slate-900 via-[#f8fafc] dark:via-slate-900 to-[#eff6ff] dark:to-slate-800 rounded-3xl p-6 sm:p-10 border border-[#e2e8f0] dark:border-slate-800 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8 transition-colors">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border"
              style={{ 
                backgroundColor: activeThemeConfig.bgLightHex, 
                color: activeThemeConfig.primaryHex,
                borderColor: activeThemeConfig.borderLightHex 
              }}
            >
              <Scale size={14} />
              Educación y Seguridad Vial en Colombia (Leyes 769 & 2251)
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-[#0f172a] dark:text-white tracking-tight leading-tight">
              Movilidad Inteligente para <span style={{ color: activeThemeConfig.primaryHex }}>tu Ciudad</span>
            </h1>

            <p className="text-sm sm:text-base text-[#475569] dark:text-slate-300 leading-relaxed">
              Plataforma integral para aprender señales de tránsito colombianas, realizar simulacros de examen teórico para licencias de conducción (A2, B1, C1), practicar quizzes y reportar el estado de las vías en tiempo real.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => onNavigate('registro')}
                className="px-5 py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                style={{ backgroundColor: activeThemeConfig.primaryHex }}
              >
                <UserPlus size={16} />
                <span>{t('nav_register', 'Crear Cuenta Gratis')}</span>
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-[#cbd5e1] dark:border-slate-700 hover:bg-[#f8fafc] text-[#334155] dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <LogIn size={16} />
                <span>{t('nav_login', 'Iniciar Sesión')}</span>
              </button>
            </div>
          </div>

          <div className="shrink-0 flex justify-center">
            <ViaNovaLogo size="xl" showText={false} />
          </div>
        </div>
      )}

      {/* ===================== FAST SEARCH SEARCHBAR ===================== */}
      {user && (
        <div 
          onClick={() => onNavigate('busqueda')}
          className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-[#e2e8f0] dark:border-slate-800 shadow-xs hover:border-[#0052cc] transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 group"
        >
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
              style={{ 
                backgroundColor: themeMode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : activeThemeConfig.bgLightHex, 
                color: activeThemeConfig.primaryHex 
              }}
            >
              <Search size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0f172a] dark:text-white group-hover:text-sky-500 transition-colors">
                {t('search_prompt', '¿Qué deseas consultar hoy en ViaNova?')}
              </h3>
              <p className="text-xs text-[#64748b] dark:text-slate-400">
                {t('search_sub', 'Busca señales de tránsito, normas, límites de velocidad (Ley Julián Esteban), campañas y manuales.')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span 
              className="text-xs font-bold flex items-center gap-1 group-hover:underline"
              style={{ color: activeThemeConfig.primaryHex }}
            >
              <span>{t('search_open_finder', 'Abrir buscador')}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      )}

      {/* ===================== 4 KEY METRICS / STATS (If logged in) ===================== */}
      {user && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-[#e2e8f0] dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#64748b] dark:text-slate-400 uppercase tracking-wider">
                {t('dash_stat_safety_score', 'Puntaje de Seguridad')}
              </span>
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ 
                  backgroundColor: themeMode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : activeThemeConfig.bgLightHex, 
                  color: activeThemeConfig.primaryHex 
                }}
              >
                <ShieldCheck size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-[#0f172a] dark:text-white">{user.safetyScore}</span>
              <span className="text-xs text-[#64748b] dark:text-slate-400">{t('dash_points_max', '/ 100 pts')}</span>
            </div>
            <div className="w-full h-2 bg-[#f1f5f9] dark:bg-slate-800 rounded-full overflow-hidden mt-3">
              <div 
                className="h-full rounded-full transition-all duration-500" 
                style={{ width: `${user.safetyScore}%`, backgroundColor: activeThemeConfig.primaryHex }}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-[#e2e8f0] dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#64748b] dark:text-slate-400 uppercase tracking-wider">
                {t('dash_stat_training_hrs', 'Horas de Formación')}
              </span>
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ 
                  backgroundColor: themeMode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : activeThemeConfig.bgLightHex, 
                  color: activeThemeConfig.primaryHex 
                }}
              >
                <Clock size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-[#0f172a] dark:text-white">{user.completedHours}</span>
              <span className="text-xs text-[#64748b] dark:text-slate-400">{t('dash_hours_unit', 'horas certificadas')}</span>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium flex items-center gap-1">
              <TrendingUp size={14} />
              <span>Avance en módulos viales</span>
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-[#e2e8f0] dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#64748b] dark:text-slate-400 uppercase tracking-wider">
                {t('dash_stat_approved_exams', 'Exámenes Aprobados')}
              </span>
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ 
                  backgroundColor: themeMode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : activeThemeConfig.bgLightHex, 
                  color: activeThemeConfig.primaryHex 
                }}
              >
                <Award size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-[#0f172a] dark:text-white">{user.passedExams}</span>
              <span className="text-xs text-[#64748b] dark:text-slate-400">{t('dash_exams_unit', 'evaluaciones')}</span>
            </div>
            <p 
              className="text-xs mt-2 font-medium flex items-center gap-1"
              style={{ color: activeThemeConfig.primaryHex }}
            >
              <CheckCircle2 size={14} />
              <span>Normativa colombiana</span>
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-[#e2e8f0] dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#64748b] dark:text-slate-400 uppercase tracking-wider">
                {t('dash_stat_active_reports', 'Reportes Ciudadanos')}
              </span>
              <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <MapPin size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-[#0f172a] dark:text-white">{user.activeReports}</span>
              <span className="text-xs text-[#64748b] dark:text-slate-400">{t('dash_reports_unit', 'en seguimiento')}</span>
            </div>
            <p className="text-xs text-[#64748b] dark:text-slate-400 mt-2">
              Comunidad activa
            </p>
          </div>
        </div>
      )}

      {/* ===================== 7 MAIN SYSTEM APARTADOS ===================== */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-black text-[#0f172a] dark:text-white">
              {t('dash_modules_title', 'Apartados de la Plataforma ViaNova')}
            </h2>
            <p className="text-xs text-[#64748b] dark:text-slate-400">
              {t('dash_modules_sub', 'Accede a las herramientas de educación, evaluación y reporte vial de Colombia.')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Educación Vial */}
          <div 
            onClick={() => onNavigate('educacion_vial')}
            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[#e2e8f0] dark:border-slate-800 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                  style={{ 
                    backgroundColor: themeMode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : activeThemeConfig.bgLightHex, 
                    color: activeThemeConfig.primaryHex 
                  }}
                >
                  <BookOpen size={22} />
                </div>
                <span 
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full border"
                  style={{ 
                    backgroundColor: activeThemeConfig.bgLightHex, 
                    color: activeThemeConfig.primaryHex,
                    borderColor: activeThemeConfig.borderLightHex 
                  }}
                >
                  Ley 769 & 2251
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0f172a] dark:text-white group-hover:text-sky-500 transition-colors">
                {t('nav_education', 'Educación Vial')}
              </h3>
              <p className="text-xs text-[#64748b] dark:text-slate-400 mt-1.5 leading-relaxed">
                Módulos de formación con la Ley Julián Esteban (límites 50/30 km/h), prelación en glorietas, cascos en motos y protección a ciclistas.
              </p>
            </div>
            <div 
              className="mt-5 pt-3 border-t border-[#f1f5f9] dark:border-slate-800 flex items-center justify-between text-xs font-bold"
              style={{ color: activeThemeConfig.primaryHex }}
            >
              <span>Estudiar módulos</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. Señales de Tránsito */}
          <div 
            onClick={() => onNavigate('senales')}
            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[#e2e8f0] dark:border-slate-800 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                  style={{ 
                    backgroundColor: themeMode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : activeThemeConfig.bgLightHex, 
                    color: activeThemeConfig.primaryHex 
                  }}
                >
                  <SlidersHorizontal size={22} />
                </div>
                <span className="text-[10px] font-bold text-sky-800 bg-sky-50 dark:bg-sky-950/60 dark:text-sky-300 px-2.5 py-1 rounded-full border border-sky-200 dark:border-sky-900">
                  Manual Mintransporte
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0f172a] dark:text-white group-hover:text-sky-500 transition-colors">
                {t('nav_signs', 'Señales de Tránsito (Colombia)')}
              </h3>
              <p className="text-xs text-[#64748b] dark:text-slate-400 mt-1.5 leading-relaxed">
                Catálogo oficial con códigos colombianos SR (Reglamentarias), SP (Preventivas), SI (Informativas) y ST (Obras). Incluye modo Flashcards.
              </p>
            </div>
            <div 
              className="mt-5 pt-3 border-t border-[#f1f5f9] dark:border-slate-800 flex items-center justify-between text-xs font-bold"
              style={{ color: activeThemeConfig.primaryHex }}
            >
              <span>Ver señales y flashcards</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. Quiz */}
          <div 
            onClick={() => onNavigate('quiz')}
            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[#e2e8f0] dark:border-slate-800 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                  style={{ 
                    backgroundColor: themeMode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : activeThemeConfig.bgLightHex, 
                    color: activeThemeConfig.primaryHex 
                  }}
                >
                  <HelpCircle size={22} />
                </div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-900">
                  Autoevaluación
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0f172a] dark:text-white group-hover:text-amber-500 transition-colors">
                {t('nav_quiz', 'Quiz de Conocimiento')}
              </h3>
              <p className="text-xs text-[#64748b] dark:text-slate-400 mt-1.5 leading-relaxed">
                Pruebas rápidas por temas con retroalimentación inmediata, explicaciones legales y sistema de puntuación.
              </p>
            </div>
            <div 
              className="mt-5 pt-3 border-t border-[#f1f5f9] dark:border-slate-800 flex items-center justify-between text-xs font-bold"
              style={{ color: activeThemeConfig.primaryHex }}
            >
              <span>Hacer un quiz</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 4. Simulador Examen */}
          <div 
            onClick={() => onNavigate('simulador')}
            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[#e2e8f0] dark:border-slate-800 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                  style={{ 
                    backgroundColor: themeMode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : activeThemeConfig.bgLightHex, 
                    color: activeThemeConfig.primaryHex 
                  }}
                >
                  <FileCheck2 size={22} />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
                  Examen Oficial RUNT
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0f172a] dark:text-white group-hover:text-emerald-500 transition-colors">
                {t('nav_simulator', 'Simulador de Examen Teórico')}
              </h3>
              <p className="text-xs text-[#64748b] dark:text-slate-400 mt-1.5 leading-relaxed">
                Simula el examen oficial de los Centros de Enseñanza Automovilística (CEA) para categorías A2 (Motos), B1 (Carros) y C1 (Público).
              </p>
            </div>
            <div 
              className="mt-5 pt-3 border-t border-[#f1f5f9] dark:border-slate-800 flex items-center justify-between text-xs font-bold"
              style={{ color: activeThemeConfig.primaryHex }}
            >
              <span>Iniciar simulación</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 5. Reportes en Vía */}
          <div 
            onClick={() => onNavigate('reportes')}
            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[#e2e8f0] dark:border-slate-800 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
                  <AlertTriangle size={22} />
                </div>
                <span className="text-[10px] font-bold text-red-700 bg-red-50 dark:bg-red-950/60 dark:text-red-300 px-2.5 py-1 rounded-full border border-red-200 dark:border-red-900">
                  Ciudadano
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0f172a] dark:text-white group-hover:text-red-500 transition-colors">
                {t('nav_reports', 'Reportes en Vía')}
              </h3>
              <p className="text-xs text-[#64748b] dark:text-slate-400 mt-1.5 leading-relaxed">
                Reporta baches, semáforos fuera de servicio, señales caídas o bloqueos viales en Bogotá, Medellín, Cali, Barranquilla y todo el país.
              </p>
            </div>
            <div 
              className="mt-5 pt-3 border-t border-[#f1f5f9] dark:border-slate-800 flex items-center justify-between text-xs font-bold"
              style={{ color: activeThemeConfig.primaryHex }}
            >
              <span>Ver y crear reportes</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 6. Búsqueda y Recursos */}
          <div 
            onClick={() => onNavigate('busqueda')}
            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[#e2e8f0] dark:border-slate-800 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                  style={{ 
                    backgroundColor: themeMode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : activeThemeConfig.bgLightHex, 
                    color: activeThemeConfig.primaryHex 
                  }}
                >
                  <Search size={22} />
                </div>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-300 px-2.5 py-1 rounded-full border border-purple-200 dark:border-purple-900">
                  Buscador Global
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0f172a] dark:text-white group-hover:text-purple-500 transition-colors">
                {t('nav_search', 'Búsqueda & Recursos')}
              </h3>
              <p className="text-xs text-[#64748b] dark:text-slate-400 mt-1.5 leading-relaxed">
                Encuentra al instante contenidos sobre educación vial, señales, campañas preventivas y descarga de manuales oficiales.
              </p>
            </div>
            <div 
              className="mt-5 pt-3 border-t border-[#f1f5f9] dark:border-slate-800 flex items-center justify-between text-xs font-bold"
              style={{ color: activeThemeConfig.primaryHex }}
            >
              <span>Explorar buscador</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 7. Mi Perfil */}
          <div 
            onClick={() => onNavigate('perfil')}
            className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[#e2e8f0] dark:border-slate-800 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                  style={{ 
                    backgroundColor: themeMode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : activeThemeConfig.bgLightHex, 
                    color: activeThemeConfig.primaryHex 
                  }}
                >
                  <Car size={22} />
                </div>
                <span className="text-[10px] font-bold text-sky-700 bg-sky-50 dark:bg-sky-950/60 dark:text-sky-300 px-2.5 py-1 rounded-full border border-sky-200 dark:border-sky-900">
                  Credencial Digital
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0f172a] dark:text-white group-hover:text-sky-500 transition-colors">
                {t('nav_profile', 'Mi Perfil & Credencial')}
              </h3>
              <p className="text-xs text-[#64748b] dark:text-slate-400 mt-1.5 leading-relaxed">
                Consulta tu credencial digital de conductor seguro con código QR, historial de certificados, exámenes aprobados e insignias.
              </p>
            </div>
            <div 
              className="mt-5 pt-3 border-t border-[#f1f5f9] dark:border-slate-800 flex items-center justify-between text-xs font-bold"
              style={{ color: activeThemeConfig.primaryHex }}
            >
              <span>Ver mi credencial</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Colombian Daily Road Safety Fact */}
      <div 
        className="rounded-3xl p-5 border flex items-start gap-4 transition-colors"
        style={{ 
          backgroundColor: themeMode === 'dark' ? 'rgba(30, 41, 59, 0.6)' : activeThemeConfig.bgLightHex,
          borderColor: activeThemeConfig.borderLightHex 
        }}
      >
        <div 
          className="w-10 h-10 rounded-2xl text-white flex items-center justify-center shrink-0 shadow-xs"
          style={{ backgroundColor: activeThemeConfig.primaryHex }}
        >
          <Sparkles size={20} />
        </div>
        <div>
          <h4 
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: activeThemeConfig.primaryHex }}
          >
            Consejo de Seguridad Vial en Colombia (Ley 2251 de 2022)
          </h4>
          <p className="text-xs sm:text-sm text-[#1e293b] dark:text-slate-200 mt-1 leading-relaxed">
            Recuerda que en Colombia la velocidad máxima en zonas urbanas es de <strong>50 km/h</strong> y en zonas escolares es de <strong>30 km/h</strong>. Reducir la velocidad en solo 10 km/h duplica la posibilidad de salvar la vida de un peatón o ciclista ante una colisión.
          </p>
        </div>
      </div>
    </div>
  );
};
