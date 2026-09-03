/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId, UserProfile } from './types';
import { Navigation } from './components/Navigation';
import { RegisterScreen } from './components/RegisterScreen';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { SearchScreen } from './components/SearchScreen';
import { EducationScreen } from './components/EducationScreen';
import { ExamSimulatorScreen } from './components/ExamSimulatorScreen';
import { TrafficSignsScreen } from './components/TrafficSignsScreen';
import { QuizScreen } from './components/QuizScreen';
import { MobilityReportsScreen } from './components/MobilityReportsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { CheckCircle2 } from 'lucide-react';
import { ThemeLanguageProvider, useThemeLanguage } from './context/ThemeLanguageContext';
import { 
  getActiveUserSession, 
  setActiveUserSession, 
  clearActiveUserSession 
} from './utils/authStorage';

function AppContent() {
  // Restore persistent active user session if available from localStorage
  const [user, setUser] = useState<UserProfile | null>(() => getActiveUserSession());
  const [authScreen, setAuthScreen] = useState<'login' | 'registro'>('login');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('inicio');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { t } = useThemeLanguage();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Called when user registers in one step: activates session immediately without asking twice
  const handleRegisterSuccess = (newUser: UserProfile) => {
    setActiveUserSession(newUser);
    setUser(newUser);
    setCurrentScreen('inicio');
    showToast(`¡Bienvenido a ViaNova, ${newUser.name}! Tu cuenta ha sido creada exitosamente.`);
  };

  // Called from Login: direct entry to dashboard
  const handleLoginSuccess = (loggedUser: UserProfile) => {
    setActiveUserSession(loggedUser);
    setUser(loggedUser);
    setCurrentScreen('inicio');
    showToast(`¡Sesión iniciada con éxito! Bienvenido, ${loggedUser.name}.`);
  };

  const handleLogout = () => {
    clearActiveUserSession();
    setUser(null);
    setAuthScreen('login');
    setCurrentScreen('login');
    showToast('Has cerrado sesión correctamente.');
  };

  const handleExamCompleted = (score: number) => {
    if (user) {
      const updatedUser: UserProfile = {
        ...user,
        safetyScore: Math.min(100, Math.round((user.safetyScore + score) / 2)),
        passedExams: user.passedExams + (score >= 75 ? 1 : 0),
        completedHours: user.completedHours + 1
      };
      setActiveUserSession(updatedUser);
      setUser(updatedUser);
    }
  };

  const handleUpdateUser = (updated: UserProfile) => {
    setActiveUserSession(updated);
    setUser(updated);
  };

  // Safe navigation handler
  const handleNavigate = (screen: ScreenId) => {
    if (!user) {
      if (screen === 'registro') {
        setAuthScreen('registro');
      } else {
        setAuthScreen('login');
      }
      return;
    }
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#0b1120] text-[#0f172a] dark:text-slate-100 transition-colors duration-200">
      {/* Top Header Navigation */}
      <Navigation
        currentScreen={!user ? authScreen : currentScreen}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content Area: STRICT AUTH GATE */}
      <main className="flex-1 flex flex-col justify-start">
        {!user ? (
          authScreen === 'registro' ? (
            <RegisterScreen
              onRegisterSuccess={handleRegisterSuccess}
              onNavigateToLogin={() => setAuthScreen('login')}
            />
          ) : (
            <LoginScreen
              onLoginSuccess={handleLoginSuccess}
              onFirstTimeRequired={handleRegisterSuccess}
              onNavigateToRegister={() => setAuthScreen('registro')}
            />
          )
        ) : (
          /* ================= AUTHENTICATED USERS: FULL PORTAL ACCESS ================= */
          <>
            {currentScreen === 'inicio' && (
              <DashboardScreen
                user={user}
                onNavigate={setCurrentScreen}
              />
            )}

            {currentScreen === 'busqueda' && (
              <SearchScreen
                onNavigate={setCurrentScreen}
              />
            )}

            {currentScreen === 'educacion_vial' && (
              <EducationScreen
                onNavigateToQuiz={() => setCurrentScreen('quiz')}
                onNavigateToSimulator={() => setCurrentScreen('simulador')}
              />
            )}

            {currentScreen === 'senales' && (
              <TrafficSignsScreen
                onBackToDashboard={() => setCurrentScreen('inicio')}
              />
            )}

            {currentScreen === 'quiz' && (
              <QuizScreen
                onNavigateToEducation={() => setCurrentScreen('educacion_vial')}
                onNavigateToSimulator={() => setCurrentScreen('simulador')}
              />
            )}

            {currentScreen === 'simulador' && (
              <ExamSimulatorScreen
                onBackToDashboard={() => setCurrentScreen('inicio')}
                onExamCompleted={handleExamCompleted}
              />
            )}

            {currentScreen === 'reportes' && (
              <MobilityReportsScreen
                user={user}
                onBackToDashboard={() => setCurrentScreen('inicio')}
                onNavigateToAuth={(m) => {
                  if (m === 'login' || m === 'registro') setAuthScreen(m);
                }}
                onUpdateUser={handleUpdateUser}
              />
            )}

            {currentScreen === 'perfil' && (
              <ProfileScreen
                user={user}
                onBackToDashboard={() => setCurrentScreen('inicio')}
                onNavigateToAuth={(m) => {
                  if (m === 'login' || m === 'registro') setAuthScreen(m);
                }}
                onLogout={handleLogout}
                onUpdateUser={handleUpdateUser}
              />
            )}
          </>
        )}
      </main>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0f172a] dark:bg-slate-800 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-fade-in border border-[#334155] dark:border-slate-700">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Institutional Footer */}
      <footer className="w-full bg-white dark:bg-[#0f172a] border-t border-[#e2e8f0] dark:border-slate-800 py-6 px-4 text-center text-xs text-[#64748b] dark:text-slate-400 mt-auto transition-colors">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0052cc] dark:text-sky-400">ViaNova</span>
            <span>— {t('portalTagline', 'Sistema Integral de Movilidad y Educación Vial')}</span>
          </div>
          <p>{t('footerCopyright', '© 2026 ViaNova. Basado en el Código Nacional de Tránsito (Ley 769/2002) y Ley 2251/2022.')}</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeLanguageProvider>
      <AppContent />
    </ThemeLanguageProvider>
  );
}
