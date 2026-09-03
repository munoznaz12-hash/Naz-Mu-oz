import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  FileCheck2,
  BookOpen,
  MapPin,
  UserCheck,
  UserPlus,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';
import { ViaNovaLogo } from './ViaNovaLogo';
import { UserProfile } from '../types';
import { 
  findRegisteredUserByEmail, 
  getRegisteredUsers, 
  StoredUserAccount 
} from '../utils/authStorage';
import { executeInvisibleRecaptcha, RecaptchaVerificationResult } from '../utils/security';

interface LoginScreenProps {
  onLoginSuccess: (user: UserProfile) => void;
  onFirstTimeRequired: (user: UserProfile) => void;
  onNavigateToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onFirstTimeRequired,
  onNavigateToRegister,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaState, setRecaptchaState] = useState<'idle' | 'checking' | 'verified'>('idle');
  const [recaptchaResult, setRecaptchaResult] = useState<RecaptchaVerificationResult | null>(null);
  const [registeredAccounts, setRegisteredAccounts] = useState<StoredUserAccount[]>([]);
  
  // Forgot password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    // Load registered accounts currently stored in the device
    const accounts = getRegisteredUsers();
    setRegisteredAccounts(accounts);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setErrorMessage('Por favor ingresa tu correo electrónico.');
      return;
    }
    if (!password) {
      setErrorMessage('Por favor ingresa tu contraseña.');
      return;
    }

    setIsSubmitting(true);
    setRecaptchaState('checking');

    // 1. Execute Invisible reCAPTCHA v3
    try {
      const captchaRes = await executeInvisibleRecaptcha('login');
      setRecaptchaResult(captchaRes);
      setRecaptchaState('verified');
    } catch (err) {
      setRecaptchaState('idle');
      setIsSubmitting(false);
      setErrorMessage('Error al validar la protección antibot reCAPTCHA. Inténtalo de nuevo.');
      return;
    }

    // 2. Validate user credentials
    setTimeout(() => {
      const existingAccount = findRegisteredUserByEmail(normalizedEmail);

      if (!existingAccount) {
        setIsSubmitting(false);
        setRecaptchaState('idle');
        setErrorMessage('Esta cuenta no se encuentra registrada. Solo los usuarios registrados pueden iniciar sesión.');
        return;
      }

      // Check password matching if stored
      if (existingAccount.password && existingAccount.password !== password) {
        setIsSubmitting(false);
        setRecaptchaState('idle');
        setErrorMessage('Contraseña incorrecta. Por favor verifica tus credenciales.');
        return;
      }

      setIsSubmitting(false);

      // Direct access to dashboard for registered accounts
      onLoginSuccess(existingAccount.profile);
    }, 450);
  };

  const handleSelectRegisteredAccount = (acc: StoredUserAccount) => {
    setEmail(acc.profile.email);
    setPassword(acc.password || '');
    setErrorMessage('');
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f0f4f9] to-[#e4edf7] dark:from-[#0b1120] dark:to-[#020617] text-[#0f172a] dark:text-slate-100 transition-colors">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
        
        {/* ===================== LEFT COLUMN (Pitch & Registered Accounts) ===================== */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <div className="flex items-center gap-3">
            <ViaNovaLogo size="lg" />
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#0f172a] dark:text-white tracking-tight">
                <span className="text-[#0072ff]">Via</span>Nova
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-[#0052cc] dark:text-sky-400">
                Movilidad Inteligente • Colombia
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f172a] dark:text-white leading-tight max-w-lg">
            Aprende las normas viales, simula exámenes oficiales y viaja seguro por Colombia.
          </h1>

          <p className="text-sm sm:text-base text-[#475569] dark:text-slate-300 max-w-lg leading-relaxed">
            Plataforma integral basada en el <strong>Código Nacional de Tránsito (Ley 769)</strong> y la <strong>Ley Julián Esteban (Ley 2251 de 2022)</strong>. Todos los nuevos usuarios deben verificar su correo electrónico antes de ingresar.
          </p>

          {/* Registered Accounts Quick Access if any exist on this device */}
          {registeredAccounts.length > 0 ? (
            <div className="w-full max-w-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-4 rounded-2xl border border-[#cbd5e1] dark:border-slate-800 shadow-sm text-left">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#475569] dark:text-slate-300 flex items-center gap-1.5">
                  <UserCheck size={16} className="text-[#0052cc] dark:text-sky-400" />
                  Cuentas en este Equipo ({registeredAccounts.length})
                </span>
                <span className="text-[11px] text-[#64748b] dark:text-slate-400">Clic para seleccionar</span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {registeredAccounts.map((acc) => (
                  <button
                    key={acc.profile.id}
                    type="button"
                    onClick={() => handleSelectRegisteredAccount(acc)}
                    className="w-full p-2.5 rounded-xl border border-[#e2e8f0] dark:border-slate-800 bg-[#f8fafc] dark:bg-slate-800/80 hover:bg-[#eff6ff] dark:hover:bg-slate-700/80 hover:border-[#93c5fd] dark:hover:border-sky-500 flex items-center justify-between text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0052cc] text-white font-black text-xs flex items-center justify-center shrink-0">
                        {acc.profile.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0f172a] dark:text-white group-hover:text-[#0052cc] dark:group-hover:text-sky-400 transition-colors">
                          {acc.profile.name}
                        </div>
                        <div className="text-[11px] text-[#64748b] dark:text-slate-400 font-mono">
                          {acc.profile.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {acc.profile.primer_ingreso !== false && (
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                          Pendiente Verificación
                        </span>
                      )}
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-[#e0f2fe] text-[#0369a1] dark:bg-sky-950 dark:text-sky-300">
                        {acc.profile.userType}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full max-w-lg bg-amber-50/90 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 flex items-start gap-3 text-left">
              <ShieldAlert className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={18} />
              <div className="text-xs text-amber-800 dark:text-amber-200">
                <strong>Sin cuentas registradas en este navegador:</strong> Para ingresar, primero debes crear tu cuenta haciendo clic en <em>"Crear cuenta nueva"</em>.
              </div>
            </div>
          )}

          {/* Institutional Feature Highlights */}
          <div className="hidden sm:grid grid-cols-1 gap-3 pt-1 text-xs text-[#334155] dark:text-slate-300 w-full max-w-lg">
            <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-3 rounded-xl border border-[#cbd5e1]/60 dark:border-slate-800 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#eff6ff] dark:bg-sky-950 text-[#0052cc] dark:text-sky-400 flex items-center justify-center shrink-0">
                <FileCheck2 size={18} />
              </div>
              <span className="font-semibold text-left">
                Simulador del examen teórico oficial CEA / RUNT con temporizador y puntajes.
              </span>
            </div>

            <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-3 rounded-xl border border-[#cbd5e1]/60 dark:border-slate-800 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#eff6ff] dark:bg-sky-950 text-[#0052cc] dark:text-sky-400 flex items-center justify-center shrink-0">
                <BookOpen size={18} />
              </div>
              <span className="font-semibold text-left">
                Catálogo de señales de tránsito SR, SP, SI y ST del Manual de Mintransporte.
              </span>
            </div>

            <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-3 rounded-xl border border-[#cbd5e1]/60 dark:border-slate-800 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[#eff6ff] dark:bg-sky-950 text-[#0052cc] dark:text-sky-400 flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <span className="font-semibold text-left">
                Reportes ciudadanos colaborativos de baches, semáforos y estado de vías.
              </span>
            </div>
          </div>
        </div>

        {/* ===================== RIGHT COLUMN (Login Card) ===================== */}
        <div className="w-full lg:w-[440px] shrink-0 flex flex-col items-center">
          <main 
            id="login-card" 
            className="w-full bg-white dark:bg-[#0f172a] rounded-2xl shadow-xl border border-[#e2e8f0] dark:border-slate-800 p-6 sm:p-8 relative overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="h-1.5 w-full bg-[#0052cc] absolute top-0 left-0"></div>

            <div className="mb-5 text-center">
              <h2 className="text-xl font-bold text-[#0f172a] dark:text-white">
                Ingresar a tu Cuenta
              </h2>
              <p className="text-xs text-[#64748b] dark:text-slate-400 mt-1">
                Ingresa con tu correo registrado y contraseña
              </p>
            </div>

            {/* reCAPTCHA Status Indicator */}
            {recaptchaState === 'checking' && (
              <div className="mb-4 p-2.5 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 rounded-xl text-xs text-sky-800 dark:text-sky-300 flex items-center gap-2 animate-pulse">
                <ShieldCheck size={16} className="text-[#0052cc] animate-spin" />
                <span>Verificando seguridad antibot reCAPTCHA v3...</span>
              </div>
            )}

            {errorMessage && (
              <div 
                id="login-error-alert" 
                className="w-full mb-4 p-3.5 bg-[#fee2e2] dark:bg-rose-950/50 border border-[#fecdd3] dark:border-rose-900 text-[#991b1b] dark:text-rose-200 rounded-xl text-xs flex flex-col gap-2 animate-fade-in"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600 dark:text-rose-400" />
                  <span className="font-medium">{errorMessage}</span>
                </div>
                {errorMessage.includes('no se encuentra registrada') && (
                  <button
                    type="button"
                    onClick={onNavigateToRegister}
                    className="self-start text-xs font-bold text-[#0052cc] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <UserPlus size={14} />
                    Haz clic aquí para registrarte ahora
                  </button>
                )}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="w-full space-y-4">
              {/* Email */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider block">
                  Correo Electrónico Registrado
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none">
                    <Mail size={16} />
                  </span>
                  <input 
                    id="login-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full pl-10 pr-3.5 py-3 border border-[#cbd5e1] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#0f172a] dark:text-white placeholder:text-[#94a3b8] focus:outline-none focus:border-[#0052cc] dark:focus:border-sky-500 focus:ring-2 focus:ring-[#0052cc]/20 transition-all bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider block">
                  Contraseña
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none">
                    <Lock size={16} />
                  </span>
                  <input 
                    id="login-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 border border-[#cbd5e1] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#0f172a] dark:text-white placeholder:text-[#94a3b8] focus:outline-none focus:border-[#0052cc] dark:focus:border-sky-500 focus:ring-2 focus:ring-[#0052cc]/20 transition-all bg-white dark:bg-slate-900 font-mono"
                  />
                  <button 
                    type="button"
                    id="login-toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#0052cc] dark:hover:text-sky-400 transition-colors p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Invisible reCAPTCHA Badge Notice */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#f8fafc] dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 text-[11px] text-[#64748b] dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#0052cc] dark:text-sky-400 shrink-0" />
                  <span>Protegido por <strong>reCAPTCHA invisible v3</strong></span>
                </div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Activo
                </span>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                id="submit-login-btn"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#0052cc] text-white font-bold text-sm rounded-xl hover:bg-[#0043a8] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Iniciar Sesión</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {/* Forgot Password Link */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  id="forgot-password-link"
                  onClick={() => {
                    setShowForgotModal(true);
                    setResetSent(false);
                  }}
                  className="text-xs text-[#0052cc] dark:text-sky-400 hover:underline font-semibold cursor-pointer"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="w-full border-t border-[#e2e8f0] dark:border-slate-800"></div>
              </div>

              {/* Create New Account Button */}
              <div className="text-center">
                <button
                  type="button"
                  id="facebook-style-create-account-btn"
                  onClick={onNavigateToRegister}
                  className="w-full py-3 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  <UserPlus size={16} />
                  <span>Crear cuenta nueva</span>
                </button>
              </div>
            </form>
          </main>

          {/* Subtext under card */}
          <p className="text-xs text-[#64748b] dark:text-slate-400 text-center mt-5 leading-relaxed max-w-sm">
            <strong className="text-[#334155] dark:text-slate-300">ViaNova Colombia</strong> • Para acceder a los módulos de educación vial, simulacros y reportes, debes validar tu correo e identidad.
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl max-w-md w-full p-6 border border-[#e2e8f0] dark:border-slate-800 text-[#0f172a] dark:text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#eff6ff] dark:bg-sky-950 flex items-center justify-center text-[#0052cc] dark:text-sky-400">
                <KeyRound size={22} />
              </div>
              <div>
                <h3 className="font-bold text-[#0f172a] dark:text-white text-base">Recuperar Contraseña</h3>
                <p className="text-xs text-[#64748b] dark:text-slate-400">Te enviaremos un enlace de restablecimiento seguro.</p>
              </div>
            </div>

            {resetSent ? (
              <div className="p-4 bg-[#f0fdf4] dark:bg-emerald-950/40 border border-[#bbf7d0] dark:border-emerald-900 rounded-xl text-xs text-[#166534] dark:text-emerald-300 space-y-2">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={16} />
                  ¡Correo enviado con éxito!
                </p>
                <p>Revisa la bandeja de entrada de <strong>{resetEmail}</strong> para restablecer tu clave.</p>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="mt-2 w-full py-2 bg-[#16a34a] text-white rounded-xl font-bold cursor-pointer"
                >
                  Entendido, volver
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (resetEmail) setResetSent(true);
              }} className="space-y-3">
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Ingresa tu correo registrado..."
                  className="w-full px-3.5 py-2.5 border border-[#cbd5e1] dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0052cc] bg-white dark:bg-slate-800 text-[#0f172a] dark:text-white"
                />
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2 text-xs font-bold text-[#64748b] dark:text-slate-400 hover:text-[#0f172a] dark:hover:text-white cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0052cc] text-white rounded-xl text-xs font-bold hover:bg-[#0043a8] cursor-pointer"
                  >
                    Enviar Enlace
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
