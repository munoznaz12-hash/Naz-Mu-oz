import React, { useState } from 'react';
import { COLOMBIAN_QUIZ_TOPICS } from '../data/quizData';
import { QuizTopic, ExamQuestion } from '../types';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Award, 
  ShieldCheck, 
  Scale, 
  BookOpen, 
  FileCheck2 
} from 'lucide-react';

interface QuizScreenProps {
  onNavigateToEducation: () => void;
  onNavigateToSimulator: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  onNavigateToEducation,
  onNavigateToSimulator
}) => {
  const [activeTopic, setActiveTopic] = useState<QuizTopic | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const startTopic = (topic: QuizTopic) => {
    setActiveTopic(topic);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleSelectOption = (index: number) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !activeTopic) return;
    setIsAnswerSubmitted(true);
    const question = activeTopic.questions[currentQuestionIdx];
    if (selectedOption === question.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!activeTopic) return;
    if (currentQuestionIdx + 1 < activeTopic.questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    if (activeTopic) {
      startTopic(activeTopic);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Quiz Category Selection if no active topic */}
      {!activeTopic ? (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e0f2fe] text-[#0369a1] text-xs font-bold mb-3">
              <HelpCircle size={14} />
              Quizzes Temáticos de Seguridad Vial
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
              Quizzes Rápidos de Tránsito Colombia
            </h1>
            <p className="text-sm text-[#475569] mt-2">
              Pon a prueba tus conocimientos en rondas cortas de preguntas con retroalimentación instantánea basada en el Código Nacional de Tránsito y el Manual de Señalización de Mintransporte.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {COLOMBIAN_QUIZ_TOPICS.map((topic) => (
              <div 
                key={topic.id}
                className="bg-white border border-[#e2e8f0] hover:border-[#0052cc] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#eff6ff] text-[#0052cc] flex items-center justify-center mb-4 group-hover:bg-[#0052cc] group-hover:text-white transition-colors">
                    <Award size={24} />
                  </div>
                  <h2 className="text-base font-bold text-[#0f172a] mb-2">
                    {topic.title}
                  </h2>
                  <p className="text-xs text-[#64748b] mb-4 leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#475569] border-t border-[#f1f5f9] pt-3 mb-4">
                    <span>{topic.questionCount} preguntas</span>
                    <span>{topic.durationMinutes} min aprox.</span>
                  </div>
                  <button
                    onClick={() => startTopic(topic)}
                    className="w-full py-2.5 rounded-xl bg-[#0052cc] text-white text-xs font-bold hover:bg-[#0043a8] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>Iniciar Quiz</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div className="mt-10 p-6 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="text-[#0052cc] shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-sm text-[#0f172a]">
                  ¿Prefieres estudiar los módulos teóricos primero?
                </h3>
                <p className="text-xs text-[#64748b]">
                  Revisa la sección de Educación Vial con las leyes y normas explicadas paso a paso.
                </p>
              </div>
            </div>
            <button
              onClick={onNavigateToEducation}
              className="px-4 py-2 bg-white border border-[#cbd5e1] text-[#334155] rounded-xl text-xs font-bold hover:bg-[#f1f5f9] transition-colors whitespace-nowrap cursor-pointer"
            >
              Ver Módulos de Educación
            </button>
          </div>
        </div>
      ) : quizFinished ? (
        /* ===================== QUIZ RESULTS SCREEN ===================== */
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 sm:p-10 shadow-sm text-center max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#dcfce7] text-[#16a34a] flex items-center justify-center mx-auto mb-4">
            <Award size={36} />
          </div>
          
          <h2 className="text-2xl font-black text-[#0f172a] mb-1">
            ¡Quiz Completado!
          </h2>
          <p className="text-xs text-[#64748b] mb-6">
            {activeTopic.title}
          </p>

          <div className="p-5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] mb-6">
            <div className="text-4xl font-black text-[#0052cc]">
              {score} / {activeTopic.questions.length}
            </div>
            <div className="text-xs font-bold text-[#475569] mt-1">
              Calificación: {Math.round((score / activeTopic.questions.length) * 100)}%
            </div>
            <p className="text-xs text-[#64748b] mt-2">
              {score === activeTopic.questions.length
                ? '¡Excelente dominio de las normas de tránsito de Colombia! 🏆'
                : score >= activeTopic.questions.length * 0.75
                ? '¡Muy buen trabajo! Tienes conocimientos sólidos de la norma vial.'
                : 'Te recomendamos repasar los módulos de Educación Vial para afianzar tus conocimientos.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="px-4 py-2.5 rounded-xl border border-[#cbd5e1] text-[#334155] text-xs font-bold hover:bg-[#f8fafc] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Repetir Quiz</span>
            </button>
            <button
              onClick={() => setActiveTopic(null)}
              className="px-4 py-2.5 rounded-xl bg-[#0052cc] text-white text-xs font-bold hover:bg-[#0043a8] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Elegir Otro Quiz</span>
            </button>
            <button
              onClick={onNavigateToSimulator}
              className="px-4 py-2.5 rounded-xl bg-[#0f172a] text-white text-xs font-bold hover:bg-[#1e293b] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <FileCheck2 size={14} />
              <span>Ir al Simulador RUNT</span>
            </button>
          </div>
        </div>
      ) : (
        /* ===================== ACTIVE QUIZ QUESTIONS ===================== */
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Header of Active Quiz */}
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4 mb-6">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#0052cc]">
                {activeTopic.title}
              </span>
              <h2 className="text-sm font-bold text-[#64748b]">
                Pregunta {currentQuestionIdx + 1} de {activeTopic.questions.length}
              </h2>
            </div>
            <button
              onClick={() => setActiveTopic(null)}
              className="text-xs font-bold text-[#64748b] hover:text-[#0f172a]"
            >
              Salir del Quiz
            </button>
          </div>

          {/* Question Text */}
          {(() => {
            const question: ExamQuestion = activeTopic.questions[currentQuestionIdx];
            return (
              <div className="space-y-6">
                <div className="p-4 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
                  <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block mb-1">
                    Categoría: {question.category}
                  </span>
                  <p className="text-base sm:text-lg font-bold text-[#0f172a] leading-snug">
                    {question.question}
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {question.options.map((option, oIdx) => {
                    const isSelected = selectedOption === oIdx;
                    const isCorrect = oIdx === question.correctIndex;

                    let btnStyle = 'bg-white border-[#e2e8f0] hover:border-[#94a3b8] text-[#334155]';
                    if (isSelected && !isAnswerSubmitted) {
                      btnStyle = 'bg-[#eff6ff] border-[#0052cc] text-[#0052cc] font-semibold';
                    } else if (isAnswerSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-[#dcfce7] border-[#16a34a] text-[#166534] font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-[#fee2e2] border-[#dc2626] text-[#991b1b] font-medium';
                      } else {
                        btnStyle = 'bg-white border-[#f1f5f9] text-[#94a3b8] opacity-60';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(oIdx)}
                        disabled={isAnswerSubmitted}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs sm:text-sm cursor-pointer ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            isSelected ? 'bg-[#0052cc] text-white' : 'bg-[#f1f5f9] text-[#475569]'
                          }`}>
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{option}</span>
                        </div>
                        {isAnswerSubmitted && isCorrect && (
                          <CheckCircle2 size={18} className="text-[#16a34a] shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrect && (
                          <XCircle size={18} className="text-[#dc2626] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card after submitting */}
                {isAnswerSubmitted && (
                  <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-fade-in ${
                    selectedOption === question.correctIndex 
                      ? 'bg-[#f0fdf4] border-[#bbf7d0] text-[#166534]'
                      : 'bg-[#fff1f2] border-[#fecdd3] text-[#9f1239]'
                  }`}>
                    <div className="font-bold flex items-center gap-1.5 mb-1">
                      <Scale size={14} />
                      <span>{selectedOption === question.correctIndex ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}</span>
                    </div>
                    <p className="text-[#334155]">{question.explanation}</p>
                    {question.legalReference && (
                      <p className="text-[11px] font-semibold text-[#0052cc] mt-1.5">
                        Norma: {question.legalReference}
                      </p>
                    )}
                  </div>
                )}

                {/* Bottom Action Button */}
                <div className="pt-4 border-t border-[#f1f5f9] flex justify-end">
                  {!isAnswerSubmitted ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedOption === null}
                      className="px-6 py-2.5 rounded-xl bg-[#0052cc] disabled:bg-[#cbd5e1] text-white text-xs font-bold hover:bg-[#0043a8] transition-colors shadow-sm cursor-pointer"
                    >
                      Confirmar Respuesta
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-xl bg-[#0052cc] text-white text-xs font-bold hover:bg-[#0043a8] transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span>{currentQuestionIdx + 1 < activeTopic.questions.length ? 'Siguiente Pregunta' : 'Ver Resultados'}</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
