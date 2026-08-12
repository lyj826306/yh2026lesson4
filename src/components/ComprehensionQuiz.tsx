import React, { useState } from 'react';
import { ParagraphData } from '../types';
import { CheckCircle2, XCircle, HelpCircle, Award, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';

interface ComprehensionQuizProps {
  paragraphs: ParagraphData[];
  selectedParagraphId: number;
}

export const ComprehensionQuiz: React.FC<ComprehensionQuizProps> = ({
  paragraphs,
  selectedParagraphId,
}) => {
  const currentParagraph =
    paragraphs.find((p) => p.id === selectedParagraphId) || paragraphs[0];

  const [answers, setAnswers] = useState<Record<string, number | boolean>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { q1, q2, q3 } = currentParagraph.comprehension;

  const handleSelectOption = (qId: string, value: number | boolean) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleCheckAnswers = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  // Score calculations for current paragraph
  const q1Correct = answers[q1.id] === q1.answerIndex;
  const q2Correct = answers[q2.id] === q2.isTrue;
  const q3Correct = answers[q3.id] === q3.answerIndex;

  const correctCount = (q1Correct ? 1 : 0) + (q2Correct ? 1 : 0) + (q3Correct ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
            {currentParagraph.page} (문단 {currentParagraph.id})
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Paragraph Comprehension Test</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            본문의 내용 일치, 진위 판별(O/X), 영문 주제 찾기 퀴즈 3문제를 풀어보세요.
          </p>
        </div>

        {submitted && (
          <div className="flex items-center space-x-3 bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-md">
            <Award className="w-8 h-8 text-emerald-400" />
            <div>
              <span className="text-xs font-bold text-emerald-300">획득 점수</span>
              <div className="text-lg font-extrabold">{correctCount} / 3 문제 정답</div>
            </div>
          </div>
        )}
      </div>

      {/* Question 1: 내용 일치 퀴즈 (Korean Question & Options) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 border-b pb-3 border-slate-100">
          <span className="bg-emerald-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg">
            Q1. 내용 일치 퀴즈
          </span>
          <h3 className="text-sm font-bold text-slate-900">{q1.questionKo}</h3>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {q1.optionsKo.map((opt, idx) => {
            const isSelected = answers[q1.id] === idx;
            const isCorrect = idx === q1.answerIndex;

            let btnClass = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

            if (submitted) {
              if (isCorrect) {
                btnClass = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
              } else if (isSelected && !isCorrect) {
                btnClass = 'bg-red-100 border-red-500 text-red-900 font-bold';
              } else {
                btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              btnClass = 'bg-slate-900 border-slate-900 text-white font-bold shadow-sm';
            }

            return (
              <button
                key={idx}
                disabled={submitted}
                onClick={() => handleSelectOption(q1.id, idx)}
                className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition flex items-center justify-between ${btnClass}`}
              >
                <span className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full border border-slate-300 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span>{opt}</span>
                </span>

                {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                {submitted && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
              </button>
            );
          })}
        </div>

        {submitted && (
          <div
            className={`p-3.5 rounded-xl text-xs font-medium ${
              q1Correct ? 'bg-emerald-100/70 text-emerald-900' : 'bg-red-100/70 text-red-900'
            }`}
          >
            💡 <strong>해설:</strong> {q1.explanation}
          </div>
        )}
      </div>

      {/* Question 2: 영어 진위 판별 O/X 퀴즈 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 border-b pb-3 border-slate-100">
          <span className="bg-amber-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg">
            Q2. 영어 O/X 퀴즈
          </span>
          <h3 className="text-sm font-bold text-slate-900">
            아래 명제가 본문의 내용과 일치하면 O (True), 틀리면 X (False)를 선택하세요.
          </h3>
        </div>

        <div className="bg-slate-900 text-white p-4 rounded-xl text-sm font-medium">
          "{q2.statementEn}"
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[true, false].map((boolVal) => {
            const isSelected = answers[q2.id] === boolVal;
            const isCorrect = boolVal === q2.isTrue;

            let btnClass = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

            if (submitted) {
              if (isCorrect) {
                btnClass = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
              } else if (isSelected && !isCorrect) {
                btnClass = 'bg-red-100 border-red-500 text-red-900 font-bold';
              } else {
                btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              btnClass = 'bg-slate-900 border-slate-900 text-white font-bold shadow-sm';
            }

            return (
              <button
                key={String(boolVal)}
                disabled={submitted}
                onClick={() => handleSelectOption(q2.id, boolVal)}
                className={`py-4 rounded-xl border text-center font-extrabold text-lg transition flex items-center justify-center space-x-2 ${btnClass}`}
              >
                <span>{boolVal ? 'O (True)' : 'X (False)'}</span>
                {submitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                {submitted && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </button>
            );
          })}
        </div>

        {submitted && (
          <div
            className={`p-3.5 rounded-xl text-xs font-medium ${
              q2Correct ? 'bg-emerald-100/70 text-emerald-900' : 'bg-red-100/70 text-red-900'
            }`}
          >
            💡 <strong>해설:</strong> {q2.explanation}
          </div>
        )}
      </div>

      {/* Question 3: 영어 주제 / 요지 퀴즈 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 border-b pb-3 border-slate-100">
          <span className="bg-indigo-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg">
            Q3. English Main Idea Quiz
          </span>
          <h3 className="text-sm font-bold text-slate-900">{q3.questionEn}</h3>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {q3.optionsEn.map((opt, idx) => {
            const isSelected = answers[q3.id] === idx;
            const isCorrect = idx === q3.answerIndex;

            let btnClass = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

            if (submitted) {
              if (isCorrect) {
                btnClass = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
              } else if (isSelected && !isCorrect) {
                btnClass = 'bg-red-100 border-red-500 text-red-900 font-bold';
              } else {
                btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              btnClass = 'bg-slate-900 border-slate-900 text-white font-bold shadow-sm';
            }

            return (
              <button
                key={idx}
                disabled={submitted}
                onClick={() => handleSelectOption(q3.id, idx)}
                className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition flex items-center justify-between ${btnClass}`}
              >
                <span className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full border border-slate-300 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span>{opt}</span>
                </span>

                {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                {submitted && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
              </button>
            );
          })}
        </div>

        {submitted && (
          <div
            className={`p-3.5 rounded-xl text-xs font-medium ${
              q3Correct ? 'bg-emerald-100/70 text-emerald-900' : 'bg-red-100/70 text-red-900'
            }`}
          >
            💡 <strong>해설:</strong> {q3.explanation}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        {submitted ? (
          <button
            id="retry-comprehension-quiz-btn"
            onClick={handleReset}
            className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>다시 풀기</span>
          </button>
        ) : (
          <button
            id="submit-comprehension-quiz-btn"
            onClick={handleCheckAnswers}
            disabled={Object.keys(answers).length < 3}
            className={`px-6 py-3 font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-2 ${
              Object.keys(answers).length >= 3
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>3문제 정답 채점하기</span>
          </button>
        )}
      </div>
    </div>
  );
};
