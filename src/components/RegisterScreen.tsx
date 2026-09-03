import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle,
  Users,
  CheckCircle2,
  ShieldCheck,
  Phone
} from 'lucide-react';
import { ViaNovaLogo } from './ViaNovaLogo';
import { UserType, UserProfile } from '../types';
import { TermsModal } from './TermsModal';
import { findRegisteredUserByEmail, saveRegisteredUser } from '../utils/authStorage';
import { evaluatePasswordStrength, validateColombianPhone } from '../utils/security';

interface RegisterScreenProps {
  onRegisterSuccess: (user: UserProfile) => void;
  onNavigateToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSuccess,
  onNavigateToLogin,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState<UserType | ''>('conductor');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);

  const passwordAnalysis = evaluatePasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validations
    if (!name.trim() || name.trim().length < 3) {
      setErrorMessage('Por favor ingresa tu nombre y apellido completos.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Por favor ingresa un correo electrónico válido.');
      return;
    }
    if (!phone.trim() || !validateColombianPhone(phone)) {
      setErrorMessage('Por favor ingresa un número celular válido en Colombia (mínimo 10 dígitos, ej: 312 456 7890).');
      return;
    }
    if (!userType) {
      setErrorMessage('Por favor selecciona tu tipo de usuario.');
      return;
    }
    if (!passwordAnalysis.isValid) {
      setErrorMessage('La contraseña debe tener mínimo 8 caracteres, al menos 1 mayúscula, 1 número y 1 símbolo especial.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden. Verifica que sean iguales.');
      return;
    }
    if (!acceptedTerms) {
      setErrorMessage('Debes aceptar los Términos de Servicio y la Política de Privacidad.');
      return;
    }

    setIsSubmitting(true);

    const normalizedEmail = email.trim().toLowerCase();

    // Check if an account already exists with this email
    const existing = findRegisteredUserByEmail(normalizedEmail);
    if (existing) {
      setIsSubmitting(false);
      setErrorMessage('Ya existe una cuenta registrada con este correo. Por favor inicia sesión.');
      return;
    }

    // Save registered user immediately in one single step without duplicate prompts
    setTimeout(() => {
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        userType: userType as UserType,
        primer_ingreso: false, // Activated directly in one single step
        emailVerified: true,
        termsAccepted: true,
        safetyScore: 100,
        completedHours: 0,
        passedExams: 0,
        activeReports: 0,
        licenseNumber: userType === 'conductor' ? 'VN-2026-8892' : undefined,
        licenseCategory: userType === 'conductor' ? 'Clase B - Particular' : 'En formación',
        city: 'Bogotá D.C.'
      };

      saveRegisteredUser(newUser, password);
      setIsSubmitting(false);
      onRegisterSuccess(newUser);
    }, 450);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center py-8 px-4 sm:px-6 bg-gradient-to-b from-[#f0f4f9] to-[#e4edf7] dark:from-[#0b1120] dark:to-[#020617] text-[#0f172a] dark:text-slate-100 transition-colors">
      <main 
        id="register-card" 
        className="w-full max-w-[500px] bg-white dark:bg-[#0f172a] rounded-2xl shadow-xl border border-[#e2e8f0] dark:border-slate-800 overflow-hidden relative"
      >
        {/* Top Accent Line */}
        <div className="h-1.5 w-full bg-[#0052cc] absolute top-0 left-0"></div>

        <div className="p-6 sm:p-8 flex flex-col items-center">
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="mb-2">
              <ViaNovaLogo size="md" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] dark:text-white tracking-tight">
              Crear Cuenta Nueva
            </h1>
            <p className="text-xs sm:text-sm text-[#64748b] dark:text-slate-400 mt-1 max-w-sm leading-snug">
              Ingresa tus datos una sola vez para activar tu acceso inmediato a la plataforma.
            </p>
          </div>

          {/* Validation Error banner if any */}
          {errorMessage && (
            <div 
              id="register-error-alert" 
              className="w-full mb-4 p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 rounded-xl text-xs flex items-start gap-2 animate-fade-in"
            >
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5">
            {/* Name Field */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider block" htmlFor="name">
                Nombre Completo *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none">
                  <User size={16} />
                </span>
                <input 
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Juan Carlos Pérez"
                  className="w-full pl-10 pr-3.5 py-2.5 border border-[#cbd5e1] dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-xs sm:text-sm text-[#0f172a] dark:text-white placeholder:text-[#94a3b8] focus:outline-none focus:border-[#0052cc] dark:focus:border-sky-500 focus:ring-2 focus:ring-[#0052cc]/20 transition-all"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider block" htmlFor="email">
                Correo Electrónico *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none">
                  <Mail size={16} />
                </span>
                <input 
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu_correo@ejemplo.com"
                  className="w-full pl-10 pr-3.5 py-2.5 border border-[#cbd5e1] dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-xs sm:text-sm text-[#0f172a] dark:text-white placeholder:text-[#94a3b8] focus:outline-none focus:border-[#0052cc] dark:focus:border-sky-500 focus:ring-2 focus:ring-[#0052cc]/20 transition-all"
                />
              </div>
            </div>

            {/* Phone & User Type Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider block" htmlFor="register-phone">
                  Teléfono Celular *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none">
                    <Phone size={16} />
                  </span>
                  <input 
                    id="register-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="312 456 7890"
                    className="w-full pl-10 pr-3.5 py-2.5 border border-[#cbd5e1] dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-xs sm:text-sm text-[#0f172a] dark:text-white placeholder:text-[#94a3b8] focus:outline-none focus:border-[#0052cc] font-mono"
                  />
                </div>
              </div>

              {/* User Type */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider block" htmlFor="userType">
                  Perfil en la Vía *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none">
                    <Users size={16} />
                  </span>
                  <select 
                    id="userType"
                    name="userType"
                    required
                    value={userType}
                    onChange={(e) => setUserType(e.target.value as UserType)}
                    className="w-full pl-10 pr-8 py-2.5 border border-[#cbd5e1] dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-xs sm:text-sm text-[#0f172a] dark:text-white focus:outline-none focus:border-[#0052cc] cursor-pointer"
                  >
                    <option value="conductor">🚗 Conductor</option>
                    <option value="aspirante">🚦 Aspirante a Licencia</option>
                    <option value="estudiante">📚 Estudiante</option>
                    <option value="ciudadano">🚶 Peatón / Ciudadano</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Secure Password Creation */}
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider block" htmlFor="password">
                  Contraseña Segura *
                </label>
                {password && (
                  <span 
                    className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded"
                    style={{ color: passwordAnalysis.strengthColor }}
                  >
                    {passwordAnalysis.strengthLabel} ({passwordAnalysis.score}%)
                  </span>
                )}
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none">
                  <Lock size={16} />
                </span>
                <input 
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 número, 1 símbolo"
                  className="w-full pl-10 pr-11 py-2.5 border border-[#cbd5e1] dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-xs sm:text-sm text-[#0f172a] dark:text-white placeholder:text-[#94a3b8] focus:outline-none focus:border-[#0052cc] font-mono"
                />
                <button 
                  type="button"
                  id="register-toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#0052cc] p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password Strength Progress Bar */}
              <div className="w-full bg-[#e2e8f0] dark:bg-slate-800 h-1 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${passwordAnalysis.score}%`,
                    backgroundColor: passwordAnalysis.strengthColor,
                  }}
                />
              </div>

              {/* Dynamic 4 criteria badges */}
              <div className="grid grid-cols-2 gap-1 mt-1 text-[10px]">
                <div className={`flex items-center gap-1 ${passwordAnalysis.rules.minLength ? 'text-emerald-600 font-bold' : 'text-[#64748b]'}`}>
                  {passwordAnalysis.rules.minLength ? <CheckCircle2 size={11} className="text-emerald-600" /> : <span>•</span>}
                  <span>Mínimo 8 caracteres</span>
                </div>
                <div className={`flex items-center gap-1 ${passwordAnalysis.rules.hasUpperCase ? 'text-emerald-600 font-bold' : 'text-[#64748b]'}`}>
                  {passwordAnalysis.rules.hasUpperCase ? <CheckCircle2 size={11} className="text-emerald-600" /> : <span>•</span>}
                  <span>1 Mayúscula (A-Z)</span>
                </div>
                <div className={`flex items-center gap-1 ${passwordAnalysis.rules.hasNumber ? 'text-emerald-600 font-bold' : 'text-[#64748b]'}`}>
                  {passwordAnalysis.rules.hasNumber ? <CheckCircle2 size={11} className="text-emerald-600" /> : <span>•</span>}
                  <span>1 Número (0-9)</span>
                </div>
                <div className={`flex items-center gap-1 ${passwordAnalysis.rules.hasSymbol ? 'text-emerald-600 font-bold' : 'text-[#64748b]'}`}>
                  {passwordAnalysis.rules.hasSymbol ? <CheckCircle2 size={11} className="text-emerald-600" /> : <span>•</span>}
                  <span>1 Símbolo (!@#$%)</span>
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider block" htmlFor="confirmPassword">
                Confirmar Contraseña *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none">
                  <KeyRound size={16} />
                </span>
                <input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite tu contraseña"
                  className="w-full pl-10 pr-11 py-2.5 border border-[#cbd5e1] dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-xs sm:text-sm text-[#0f172a] dark:text-white placeholder:text-[#94a3b8] focus:outline-none focus:border-[#0052cc] font-mono"
                />
                <button 
                  type="button"
                  id="register-toggle-confirm-password-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#0052cc] p-1 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input 
                id="terms"
                type="checkbox"
                required
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-[#cbd5e1] text-[#0052cc] focus:ring-[#0052cc] cursor-pointer shrink-0"
              />
              <label htmlFor="terms" className="text-xs text-[#475569] dark:text-slate-300 leading-snug">
                Acepto los{' '}
                <button 
                  type="button"
                  onClick={() => setModalType('terms')}
                  className="text-[#0052cc] dark:text-sky-400 font-bold hover:underline cursor-pointer"
                >
                  Términos de Servicio
                </button>{' '}
                y la{' '}
                <button 
                  type="button"
                  onClick={() => setModalType('privacy')}
                  className="text-[#0052cc] dark:text-sky-400 font-bold hover:underline cursor-pointer"
                >
                  Política de Privacidad
                </button>{' '}
                de ViaNova.
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              id="submit-register-btn"
              disabled={isSubmitting || !passwordAnalysis.isValid || password !== confirmPassword}
              className="w-full h-12 bg-[#0052cc] text-white font-bold text-sm rounded-xl hover:bg-[#0043a8] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Crear Cuenta y Verificar Correo</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer Back to Login */}
          <div className="mt-5 text-center text-xs text-[#64748b] dark:text-slate-400">
            ¿Ya tienes una cuenta registrada?{' '}
            <button 
              type="button"
              id="back-to-login-btn"
              onClick={onNavigateToLogin}
              className="text-[#0052cc] dark:text-sky-400 font-bold hover:underline cursor-pointer"
            >
              Inicia sesión aquí
            </button>
          </div>
        </div>
      </main>

      {/* Terms & Privacy Modals */}
      <TermsModal
        isOpen={modalType !== null}
        type={modalType || 'terms'}
        onClose={() => setModalType(null)}
        onAccept={() => {
          setAcceptedTerms(true);
          setModalType(null);
        }}
      />
    </div>
  );
};
