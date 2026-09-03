import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Timer, 
  HelpCircle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  ShieldAlert, 
  Scale,
  Car,
  FileCheck2
} from 'lucide-react';
import { COLOMBIAN_EXAM_QUESTIONS } from '../data/mockData';
import { ExamQuestion } from '../types';

interface ExamSimulatorScreenProps {
  onBackToDashboard: () => void;
  onExamCompleted?: (score: number) => void;
}

export const ExamSimulatorScreen: React.FC<ExamSimulatorScreenProps> = ({ 
  onBackToDashboard,
  onExamCompleted
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'todas' | 'A2' | 'B1' | 'C1'>('todas');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: number }>({});
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [showExplanation, setShowExplanation] = useState(false);

  const questions: ExamQuestion[] = COLOMBIAN_EXAM_QUESTIONS;

  // Timer countdown
  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const currentQuestion = questions[currentIndex];
  const selectedOption = selectedAnswers[currentQuestion.id];

  const handleSelectOption = (index: number) => {
    if (isFinished) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: index,
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowExplanation(false);
    } else {
      finishExam();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowExplanation(false);
    }
  };

  const finishExam = () => {
    setIsFinished(true);
    const correctCount = questions.filter(
      (q) => selectedAnswers[q.id] === q.correctIndex
    ).length;
    const score = Math.round((correctCount / questions.length) * 100);
    if (onExamCompleted) {
      onExamCompleted(score);
    }
  };

  const restartExam = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
    setTimeLeft(600);
    setShowExplanation(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateResults = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    const percentage = Math.round((correct / questions.length) * 100);
    const isPassed = percentage >= 75;
    return { correct, total: questions.length, percentage, isPassed };
  };

  const results = isFinished ? calculateResults() : null;

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4 sm:px-6 space-y-6 animate-fade-in">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToDashboard}
          className="text-xs font-bold text-[#64748b] hover:text-[#0052cc] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Volver al Inicio</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-[#0052cc] bg-[#eff6ff] px-2.5 py-1 rounded-lg">
            <Scale size={12} />
            <span>Simulador Oficial CEA / RUNT</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-[#e2e8f0] shadow-sm">
            <Timer size={16} className={timeLeft < 60 ? 'text-[#dc2626] animate-pulse' : 'text-[#0052cc]'} />
            <span className={`text-xs font-mono font-bold ${timeLeft < 60 ? 'text-[#dc2626]' : 'text-[#0f172a]'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 sm:p-8 space-y-6 relative overflow-hidden">
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-[#64748b]">
              <span>Pregunta {currentIndex + 1} de {questions.length}</span>
              <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}% Completado</span>
            </div>
            <div className="w-full h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#0052cc] rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Category Selector Tabs */}
          <div className="flex items-center gap-2 text-xs font-bold text-[#64748b] pt-1">
            <span className="text-[11px] uppercase tracking-wider">Categoría:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#eff6ff] text-[#0052cc] border border-[#bfdbfe]">
              {currentQuestion.category}
            </span>
          </div>

          {/* Question Box */}
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#0f172a] leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#eff6ff] border-[#0052cc] ring-2 ring-[#0052cc]/20 text-[#0052cc] font-semibold'
                      : 'bg-white border-[#e2e8f0] text-[#1e293b] hover:bg-[#f8fafc] hover:border-[#cbd5e1]'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    isSelected ? 'bg-[#0052cc] text-white' : 'bg-[#f1f5f9] text-[#64748b]'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-xs sm:text-sm leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation reveal button */}
          {selectedOption !== undefined && (
            <div className="pt-2">
              {!showExplanation ? (
                <button
                  type="button"
                  onClick={() => setShowExplanation(true)}
                  className="text-xs font-bold text-[#0052cc] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle size={14} />
                  <span>Ver fundamento legal colombiano antes de avanzar</span>
                </button>
              ) : (
                <div className="p-4 bg-[#eff6ff] border border-[#bfdbfe] rounded-xl text-xs text-[#0052cc] animate-fade-in space-y-1">
                  <p className="font-bold flex items-center gap-1">
                    <Scale size={13} />
                    Fundamento Legal (Código Nacional de Tránsito de Colombia):
                  </p>
                  <p className="text-[#334155]">{currentQuestion.explanation}</p>
                  {currentQuestion.legalReference && (
                    <p className="text-[10px] text-[#64748b] font-semibold pt-1">
                      Referencia: {currentQuestion.legalReference}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-[#f1f5f9] flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2 text-xs font-bold text-[#64748b] border border-[#cbd5e1] rounded-xl hover:bg-[#f8fafc] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={selectedOption === undefined}
              className="px-5 py-2.5 bg-[#0052cc] hover:bg-[#0043a8] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>{currentIndex === questions.length - 1 ? 'Finalizar Examen' : 'Siguiente'}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-3 pb-6 border-b border-[#f1f5f9]">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
              results?.isPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-[#fee2e2] text-[#dc2626]'
            }`}>
              {results?.isPassed ? <Award size={36} /> : <ShieldAlert size={36} />}
            </div>
            
            <h2 className="text-2xl font-black text-[#0f172a]">
              {results?.isPassed ? '¡Examen Aprobado con Éxito!' : 'Examen No Aprobado'}
            </h2>
            
            <p className="text-xs sm:text-sm text-[#64748b] max-w-md mx-auto">
              {results?.isPassed 
                ? 'Felicitaciones. Has superado el examen teórico con el estándar exigido por los Centros de Enseñanza Automovilística (CEA) de Colombia.'
                : 'Se requiere un mínimo de 75% para aprobar el examen teórico. Repasa la sección de Educación Vial e inténtalo de nuevo.'
              }
            </p>

            <div className="inline-flex items-baseline gap-2 px-6 py-3 bg-[#eff6ff] rounded-2xl border border-[#bfdbfe]">
              <span className="text-3xl font-black text-[#0052cc]">{results?.percentage}%</span>
              <span className="text-xs text-[#64748b]">({results?.correct} de {results?.total} correctas)</span>
            </div>
          </div>

          {/* Answers Breakdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#0f172a]">Desglose de Preguntas y Respuestas</h3>
            <div className="space-y-3">
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctIndex;
                return (
                  <div 
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs sm:text-sm ${
                      isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-red-50/60 border-red-200'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {isCorrect ? (
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle size={18} className="text-[#dc2626] shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-1">
                        <p className="font-bold text-[#0f172a]">{idx + 1}. {q.question}</p>
                        <p className="text-xs text-[#475569]">
                          <strong>Tu respuesta:</strong> {userAns !== undefined ? q.options[userAns] : 'No contestada'}
                        </p>
                        {!isCorrect && (
                          <p className="text-xs text-emerald-800 font-bold">
                            <strong>Respuesta correcta:</strong> {q.options[q.correctIndex]}
                          </p>
                        )}
                        <p className="text-xs text-[#64748b] italic mt-1">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={restartExam}
              className="w-full sm:w-auto px-5 py-2.5 border border-[#cbd5e1] text-[#0052cc] rounded-xl text-xs font-bold hover:bg-[#eff6ff] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>Reintentar Examen</span>
            </button>

            <button
              type="button"
              onClick={onBackToDashboard}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#0052cc] hover:bg-[#0043a8] text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Volver al Inicio</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
