import React from 'react';
import { ParagraphData, UserProgress } from '../types';
import { Award, BookOpen, Brain, CheckCircle2, GraduationCap, BarChart2, Flame } from 'lucide-react';

interface ProgressReportProps {
  paragraphs: ParagraphData[];
  userProgress: UserProgress;
  onSelectParagraph: (paragraphId: number) => void;
}

export const ProgressReport: React.FC<ProgressReportProps> = ({
  paragraphs,
  userProgress,
  onSelectParagraph,
}) => {
  const totalKeywordsInText = paragraphs.reduce((acc, p) => acc + p.keywords.length, 0);
  const foundKeywordsCount = (Object.values(userProgress.foundKeywords) as string[][]).reduce(
    (acc, list) => acc + (list?.length || 0),
    0
  );
  const keywordPct = Math.round((foundKeywordsCount / totalKeywordsInText) * 100);

  const totalSentencesCount = paragraphs.length * 3;
  const completedSentencesCount = Object.keys(userProgress.completedSentencePractice).length;
  const sentencePct = Math.round((completedSentencesCount / totalSentencesCount) * 100);

  return (
    <div className="space-y-6">
      {/* Top Hero Overall Metrics */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Award className="w-10 h-10 animate-bounce" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Lesson 4 전체 학습 성취도
              </span>
              <h2 className="text-2xl font-black">E-Waste Reading Mastery Progress</h2>
              <p className="text-xs text-slate-300 mt-1">
                7개 문단의 키워드, 단어 퀴즈, 문장 구조 해석 및 독해 이해도를 통합 관리합니다.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center min-w-[100px]">
              <div className="text-2xl font-black text-emerald-400">{keywordPct}%</div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">키워드 달성률</div>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center min-w-[100px]">
              <div className="text-2xl font-black text-amber-400">{sentencePct}%</div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">문장 연습 달성률</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Keywords Progress Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">핵심 키워드 습득 현황</h3>
            </div>
            <span className="text-xs font-bold text-emerald-700">
              {foundKeywordsCount} / {totalKeywordsInText} 개
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${keywordPct}%` }}
            />
          </div>

          <p className="text-xs text-slate-500">
            본문의 필수 표제어 및 구동사 {totalKeywordsInText}개 중 {foundKeywordsCount}개를
            완벽히 확인했습니다.
          </p>
        </div>

        {/* Sentences Practice Progress Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-sm">문장 해석 연습 현황</h3>
            </div>
            <span className="text-xs font-bold text-amber-700">
              {completedSentencesCount} / {totalSentencesCount} 문장
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${sentencePct}%` }}
            />
          </div>

          <p className="text-xs text-slate-500">
            전체 {totalSentencesCount}개 핵심 문장 중 {completedSentencesCount}개 문장을 성공적으로
            구문 해석 완료했습니다.
          </p>
        </div>
      </div>

      {/* Paragraph by Paragraph Status Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 border-b pb-3 border-slate-100">
          <BarChart2 className="w-4 h-4 text-emerald-600" />
          <span>문단별(Paragraph 1~7) 상세 학습 현황</span>
        </h3>

        <div className="space-y-3">
          {paragraphs.map((p) => {
            const foundInP = userProgress.foundKeywords[p.id]?.length || 0;
            const totalInP = p.keywords.length;

            return (
              <div
                key={p.id}
                onClick={() => onSelectParagraph(p.id)}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                      {p.page} (문단 {p.id})
                    </span>
                    <span className="text-sm font-bold text-slate-900">{p.subtitleKo}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{p.textEn}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-xs">
                    <span className="text-slate-400 block">키워드</span>
                    <span className="font-bold text-emerald-700">
                      {foundInP}/{totalInP}
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-400 block">핵심 문장</span>
                    <span className="font-bold text-amber-700">3개 준비됨</span>
                  </div>
                  <button
                    id={`study-p-${p.id}-btn`}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg transition"
                  >
                    학습하기
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
