import React, { useState } from 'react';
import { TabMode, UserProgress } from './types';
import { PARAGRAPHS_DATA } from './data/paragraphs';
import { Header } from './components/Header';
import { KeywordFinder } from './components/KeywordFinder';
import { VocabQuiz } from './components/VocabQuiz';
import { SentencePractice } from './components/SentencePractice';
import { ComprehensionQuiz } from './components/ComprehensionQuiz';
import { ProgressReport } from './components/ProgressReport';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabMode>('keywords');
  const [selectedParagraphId, setSelectedParagraphId] = useState<number>(1);

  // User state tracking across session
  const [userProgress, setUserProgress] = useState<UserProgress>({
    foundKeywords: {},
    completedSentencePractice: {},
    vocabScores: {},
    compAnswers: {},
  });

  const activeParagraph =
    PARAGRAPHS_DATA.find((p) => p.id === selectedParagraphId) || PARAGRAPHS_DATA[0];

  const handleUpdateFoundKeywords = (paragraphId: number, keywordIds: string[]) => {
    setUserProgress((prev) => ({
      ...prev,
      foundKeywords: {
        ...prev.foundKeywords,
        [paragraphId]: Array.from(
          new Set([...(prev.foundKeywords[paragraphId] || []), ...keywordIds])
        ),
      },
    }));
  };

  const handleCompleteSentence = (
    sentenceId: string,
    level: 'easy' | 'medium' | 'hard'
  ) => {
    setUserProgress((prev) => ({
      ...prev,
      completedSentencePractice: {
        ...prev.completedSentencePractice,
        [sentenceId]: level,
      },
    }));
  };

  const handleNextParagraph = () => {
    if (selectedParagraphId < 7) {
      setSelectedParagraphId(selectedParagraphId + 1);
    }
  };

  const totalFoundKeywordsCount = (Object.values(userProgress.foundKeywords) as string[][]).reduce(
    (acc, list) => acc + (list?.length || 0),
    0
  );

  const totalSentencesCompletedCount = Object.keys(
    userProgress.completedSentencePractice
  ).length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white flex flex-col">
      {/* Top Header & Tab Navigation Bar */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        selectedParagraphId={selectedParagraphId}
        onParagraphChange={setSelectedParagraphId}
        totalFoundKeywords={totalFoundKeywordsCount}
        totalSentencesCompleted={totalSentencesCompletedCount}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'keywords' && (
          <KeywordFinder
            paragraph={activeParagraph}
            foundKeywordIds={userProgress.foundKeywords[activeParagraph.id] || []}
            onUpdateFoundKeywords={handleUpdateFoundKeywords}
            onNextParagraph={handleNextParagraph}
          />
        )}

        {currentTab === 'vocab' && (
          <VocabQuiz
            paragraphs={PARAGRAPHS_DATA}
            selectedParagraphId={selectedParagraphId}
          />
        )}

        {currentTab === 'sentence' && (
          <SentencePractice
            paragraph={activeParagraph}
            onCompleteSentence={handleCompleteSentence}
          />
        )}

        {currentTab === 'comprehension' && (
          <ComprehensionQuiz
            paragraphs={PARAGRAPHS_DATA}
            selectedParagraphId={selectedParagraphId}
          />
        )}

        {currentTab === 'report' && (
          <ProgressReport
            paragraphs={PARAGRAPHS_DATA}
            userProgress={userProgress}
            onSelectParagraph={(pId) => {
              setSelectedParagraphId(pId);
              setCurrentTab('keywords');
            }}
          />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-4">
          Lesson 4. Create a Greener Tomorrow — Breaking the Cycle: Solutions to E-waste Interactive Reading Practice
        </div>
      </footer>
    </div>
  );
}
