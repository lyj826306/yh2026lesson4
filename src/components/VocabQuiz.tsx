import React, { useState, useMemo } from 'react';
import { ParagraphData, Keyword } from '../types';
import { Brain, CheckCircle2, XCircle, Volume2, RotateCcw, ArrowRight, Award } from 'lucide-react';

interface VocabQuizProps {
  paragraphs: ParagraphData[];
  selectedParagraphId: number;
}

interface QuizQuestion {
  id: string;
  type: 'enToKo' | 'koToEn';
  keyword: Keyword;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const VocabQuiz: React.FC<VocabQuizProps> = ({ paragraphs, selectedParagraphId }) => {
  const [scope, setScope] = useState<'current' | 'all'>('current');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Generate quiz questions based on selected scope
  const activeKeywords = useMemo(() => {
    if (scope === 'current') {
      const p = paragraphs.find((p) => p.id === selectedParagraphId) || paragraphs[0];
      return p.keywords;
    }
    return paragraphs.flatMap((p) => p.keywords);
  }, [paragraphs, selectedParagraphId, scope]);

  // Build generated quiz questions
  const quizQuestions: QuizQuestion[] = useMemo(() => {
    const allKeywordsPool = paragraphs.flatMap((p) => p.keywords);

    return activeKeywords.map((kw, idx) => {
      const isEnToKo = idx % 2 === 0;

      if (isEnToKo) {
        // En -> Ko question
        const otherMeanings = allKeywordsPool
          .filter((k) => k.id !== kw.id)
          .map((k) => k.meaning);

        // Pick 3 random distractors
        const shuffledDistractors = Array.from(new Set(otherMeanings))
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        const options = [...shuffledDistractors, kw.meaning].sort(() => 0.5 - Math.random());
        const correctIndex = options.indexOf(kw.meaning);

        return {
          id: `q_${kw.id}_en`,
          type: 'enToKo',
          keyword: kw,
          questionText: `단어 '${kw.word}'의 올바른 한국어 뜻은 무엇일까요?`,
          options,
          correctIndex,
          explanation: `'${kw.word}'은(는) '${kw.meaning}'을(를) 의미합니다. (문단 ${kw.paragraphId})`,
        };
      } else {
        // Ko -> En question
        const otherWords = allKeywordsPool
          .filter((k) => k.id !== kw.id)
          .map((k) => k.word);

        const shuffledDistractors = Array.from(new Set(otherWords))
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        const options = [...shuffledDistractors, kw.word].sort(() => 0.5 - Math.random());
        const correctIndex = options.indexOf(kw.word);

        return {
          id: `q_${kw.id}_ko`,
          type: 'koToEn',
          keyword: kw,
          questionText: `'${kw.meaning}' 뜻에 해당하는 영단어는 무엇일까요?`,
          options,
          correctIndex,
          explanation: `'${kw.meaning}'에 해당하는 영어 단어는 '${kw.word}'입니다. (문단 ${kw.paragraphId})`,
        };
      }
    });
  }, [activeKeywords, paragraphs]);

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleCalculateScore = () => {
    setSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Calculate stats
  const correctCount = quizQuestions.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;
  const totalCount = quizQuestions.length;
  const percentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Quiz Top Control Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit mb-1 border border-emerald-200">
            <Brain className="w-3.5 h-3.5" />
            <span>키워드 단어 퀴즈</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Vocabulary Mastery Quiz</h2>
          <p className="text-xs text-slate-500 mt-1">
            본문의 필수 핵심 단어를 퀴즈로 학습하고 확실히 암기하세요.
          </p>
        </div>

        {/* Scope selector */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            id="scope-current-btn"
            onClick={() => {
              setScope('current');
              handleResetQuiz();
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              scope === 'current'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            현재 문단({selectedParagraphId}) 퀴즈
          </button>
          <button
            id="scope-all-btn"
            onClick={() => {
              setScope('all');
              handleResetQuiz();
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              scope === 'all'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            전체(문단 1~7) 퀴즈
          </button>
        </div>
      </div>

      {/* Score Result Card when submitted */}
      {submitted && (
        <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fadeIn">
          <div className="flex items-center space-x-4">
            <div className="bg-emerald-500/20 p-4 rounded-2xl border border-emerald-400/30 text-emerald-400">
              <Award className="w-10 h-10" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                퀴즈 결과 리포트
              </span>
              <h3 className="text-2xl font-bold">
                {correctCount} / {totalCount} 정답 ({percentage}점)
              </h3>
              <p className="text-xs text-emerald-200/80 mt-1">
                {percentage >= 80
                  ? '🎉 대단합니다! 단어 뜻을 완벽하게 숙지하고 계십니다!'
                  : '💡 틀린 단어의 오답 해설을 확인하고 다시 도전해 보세요!'}
              </p>
            </div>
          </div>

          <button
            id="retry-vocab-quiz-btn"
            onClick={handleResetQuiz}
            className="px-5 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl transition flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>다시 풀기</span>
          </button>
        </div>
      )}

      {/* Quiz Questions List */}
      <div className="space-y-4">
        {quizQuestions.map((q, qIndex) => {
          const userSel = selectedAnswers[q.id];
          const isCorrect = userSel === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl p-6 border shadow-sm transition-all ${
                submitted
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-red-300 bg-red-50/20'
                  : 'border-slate-200'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    {qIndex + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    [문단 {q.keyword.paragraphId}]
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">{q.questionText}</h4>
                </div>

                <button
                  onClick={() => speakText(q.keyword.word)}
                  className="text-slate-400 hover:text-emerald-600 transition"
                  title="발음 듣기"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Options grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userSel === optIdx;
                  const isAnswer = optIdx === q.correctIndex;

                  let optClass = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

                  if (submitted) {
                    if (isAnswer) {
                      optClass = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optClass = 'bg-red-100 border-red-500 text-red-900 font-bold';
                    } else {
                      optClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optClass = 'bg-slate-900 border-slate-900 text-white font-bold shadow-sm';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`p-3.5 rounded-xl border text-left text-sm transition flex items-center justify-between ${optClass}`}
                    >
                      <span className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full border border-slate-300 text-xs font-bold flex items-center justify-center">
                          {optIdx + 1}
                        </span>
                        <span>{opt}</span>
                      </span>

                      {submitted && isAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation section if submitted */}
              {submitted && (
                <div
                  className={`mt-4 p-3 rounded-xl text-xs font-medium ${
                    isCorrect ? 'bg-emerald-100/60 text-emerald-900' : 'bg-red-100/60 text-red-900'
                  }`}
                >
                  💡 <strong>해설:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Button */}
      {!submitted && (
        <div className="flex justify-end pt-2">
          <button
            id="submit-vocab-quiz-btn"
            onClick={handleCalculateScore}
            disabled={Object.keys(selectedAnswers).length === 0}
            className={`px-6 py-3 font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-2 ${
              Object.keys(selectedAnswers).length > 0
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>정답 채점하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
