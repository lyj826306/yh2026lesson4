import React from 'react';
import { TabMode } from '../types';
import { Sparkles, BookOpen, Brain, GraduationCap, CheckCircle2, BarChart2 } from 'lucide-react';

interface HeaderProps {
  currentTab: TabMode;
  onTabChange: (tab: TabMode) => void;
  selectedParagraphId: number;
  onParagraphChange: (id: number) => void;
  totalFoundKeywords: number;
  totalSentencesCompleted: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  selectedParagraphId,
  onParagraphChange,
  totalFoundKeywords,
  totalSentencesCompleted,
}) => {
  const tabs: { id: TabMode; label: string; icon: React.ReactNode }[] = [
    { id: 'keywords', label: '1. 키워드 찾기', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'vocab', label: '2. 단어 퀴즈', icon: <Brain className="w-4 h-4" /> },
    { id: 'sentence', label: '3. 문장 해석 연습', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'comprehension', label: '4. 문단 이해 퀴즈', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'report', label: '5. 학습 리포트', icon: <BarChart2 className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          {/* Logo & Lesson Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500/20 p-2.5 rounded-xl border border-emerald-500/30 text-emerald-400">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Lesson 4
                </span>
                <span className="text-xs text-slate-400 font-medium">Create a Greener Tomorrow</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white mt-0.5">
                Breaking the Cycle: Solutions to E-waste
              </h1>
            </div>
          </div>

          {/* Quick Paragraph Selector Bar */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs text-slate-400 font-medium mr-1 hidden sm:inline">문단 선택:</span>
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <button
                key={num}
                id={`paragraph-btn-${num}`}
                onClick={() => onParagraphChange(num)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  selectedParagraphId === num
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                p.{92 + num} (문단 {num})
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 sm:space-x-2 border-t border-slate-800 pt-2 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs sm:text-sm font-medium rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
                currentTab === tab.id
                  ? 'border-emerald-400 text-emerald-400 bg-slate-800/60 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
