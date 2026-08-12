import React, { useState, useEffect } from 'react';
import { SentencePracticeItem, ParagraphData } from '../types';
import { Volume2, CheckCircle2, RotateCcw, Award, Lightbulb, ArrowRight, ShieldCheck } from 'lucide-react';

interface SentencePracticeProps {
  paragraph: ParagraphData;
  onCompleteSentence: (sentenceId: string, level: 'easy' | 'medium' | 'hard') => void;
}

export const SentencePractice: React.FC<SentencePracticeProps> = ({
  paragraph,
  onCompleteSentence,
}) => {
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(0);
  const [level, setLevel] = useState<'easy' | 'medium' | 'hard'>('easy');

  // Interactive State for Level Easy & Medium (Blank Filling)
  const [filledBlanks, setFilledBlanks] = useState<string[]>([]);
  const [shuffledChoices, setShuffledChoices] = useState<string[]>([]);
  
  // Interactive State for Level Hard (Chunk Ordering)
  const [shuffledChunks, setShuffledChunks] = useState<string[]>([]);
  const [selectedChunks, setSelectedChunks] = useState<string[]>([]);

  // Validation feedback
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const currentSentence: SentencePracticeItem = paragraph.sentences[activeSentenceIndex];

  // Helper function to randomly shuffle an array (Fisher-Yates shuffle)
  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Initialize level states when sentence or level changes
  useEffect(() => {
    setFilledBlanks([]);
    setSelectedChunks([]);
    setIsChecked(false);
    setIsCorrect(false);

    if (currentSentence) {
      if (level === 'easy') {
        setShuffledChoices(shuffleArray(currentSentence.easy.choices));
      } else if (level === 'medium') {
        setShuffledChoices(shuffleArray(currentSentence.medium.choices));
      } else if (level === 'hard') {
        setShuffledChunks(shuffleArray(currentSentence.hard.fragments));
      }
    }
  }, [activeSentenceIndex, level, currentSentence]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Blank click logic for Easy / Medium
  const handlePickWordForBlank = (word: string) => {
    if (isChecked) return;
    const targetCount =
      level === 'easy'
        ? currentSentence.easy.missingWords.length
        : currentSentence.medium.missingWords.length;

    if (filledBlanks.length < targetCount) {
      setFilledBlanks([...filledBlanks, word]);
    }
  };

  const handleRemoveBlankWord = (index: number) => {
    if (isChecked) return;
    const newArr = [...filledBlanks];
    newArr.splice(index, 1);
    setFilledBlanks(newArr);
  };

  // Chunk click logic for Hard
  const handleSelectChunk = (chunk: string) => {
    if (isChecked) return;
    setSelectedChunks([...selectedChunks, chunk]);
    setShuffledChunks(shuffledChunks.filter((c) => c !== chunk));
  };

  const handleDeselectChunk = (chunk: string) => {
    if (isChecked) return;
    setSelectedChunks(selectedChunks.filter((c) => c !== chunk));
    setShuffledChunks([...shuffledChunks, chunk]);
  };

  // Check Answer
  const handleCheck = () => {
    let correct = false;

    if (level === 'easy') {
      const targets = currentSentence.easy.missingWords;
      correct =
        filledBlanks.length === targets.length &&
        filledBlanks.every((w, idx) => w === targets[idx]);
    } else if (level === 'medium') {
      const targets = currentSentence.medium.missingWords;
      correct =
        filledBlanks.length === targets.length &&
        filledBlanks.every((w, idx) => w === targets[idx]);
    } else if (level === 'hard') {
      const targets = currentSentence.hard.fragments;
      correct =
        selectedChunks.length === targets.length &&
        selectedChunks.every((c, idx) => c === targets[idx]);
    }

    setIsCorrect(correct);
    setIsChecked(true);

    if (correct) {
      onCompleteSentence(currentSentence.id, level);
    }
  };

  const handleReset = () => {
    setFilledBlanks([]);
    setSelectedChunks([]);
    setIsChecked(false);
    setIsCorrect(false);

    if (currentSentence) {
      if (level === 'easy') {
        setShuffledChoices(shuffleArray(currentSentence.easy.choices));
      } else if (level === 'medium') {
        setShuffledChoices(shuffleArray(currentSentence.medium.choices));
      } else if (level === 'hard') {
        setShuffledChunks(shuffleArray(currentSentence.hard.fragments));
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Sentence Tabs */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
              {paragraph.page} (문단 {paragraph.id}) 문장 연습
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Sentence Translation Trainer</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              각 문단의 핵심 문장 3개를 상/중/하 난이도별로 해석하며 구문 감각을 키우세요.
            </p>
          </div>

          {/* Sentence 1, 2, 3 Selector */}
          <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            {paragraph.sentences.map((_, idx) => (
              <button
                key={idx}
                id={`sentence-tab-${idx}`}
                onClick={() => setActiveSentenceIndex(idx)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  activeSentenceIndex === idx
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                핵심 문장 {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Level Switcher (하 / 중 / 상) */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600">난이도 선택:</span>
          <div className="flex items-center space-x-2">
            <button
              id="level-easy-btn"
              onClick={() => setLevel('easy')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center space-x-1.5 ${
                level === 'easy'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md ring-2 ring-emerald-400'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>하 (Easy)</span>
              <span className="text-[10px] bg-slate-900/10 px-1.5 py-0.5 rounded">2~3개 빈칸</span>
            </button>

            <button
              id="level-medium-btn"
              onClick={() => setLevel('medium')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center space-x-1.5 ${
                level === 'medium'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md ring-2 ring-amber-400'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>중 (Medium)</span>
              <span className="text-[10px] bg-slate-900/10 px-1.5 py-0.5 rounded">5개 빈칸</span>
            </button>

            <button
              id="level-hard-btn"
              onClick={() => setLevel('hard')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center space-x-1.5 ${
                level === 'hard'
                  ? 'bg-indigo-600 text-white font-bold shadow-md ring-2 ring-indigo-400'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>상 (Hard)</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">6개 청크 순서 배열</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sentence Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        {/* English Source Sentence */}
        <div className="bg-slate-900 text-white rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-emerald-400">ENGLISH SOURCE</span>
            <button
              onClick={() => speakText(currentSentence.sentenceEn)}
              className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg text-xs transition"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>원문 발음</span>
            </button>
          </div>
          <p className="text-base sm:text-lg font-medium leading-relaxed">
            "{currentSentence.sentenceEn}"
          </p>
        </div>

        {/* Level [하] & [중]: Blank Filling Workspace */}
        {(level === 'easy' || level === 'medium') && (
          <div className="space-y-6">
            {/* Target Korean Sentence with interactive slot indicators */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="text-xs font-bold text-slate-500 uppercase mb-3">
                🇰🇷 해석 빈칸 채우기 ({level === 'easy' ? '2~3개 빈칸' : '5개 빈칸'})
              </div>

              <div className="text-base sm:text-lg leading-relaxed text-slate-800 flex flex-wrap gap-2 items-center">
                {(level === 'easy'
                  ? currentSentence.easy.textWithBlanks
                  : currentSentence.medium.textWithBlanks
                )
                  .split('___')
                  .map((segment, idx, arr) => {
                    const isLast = idx === arr.length - 1;
                    const filledWord = filledBlanks[idx];

                    return (
                      <React.Fragment key={idx}>
                        <span>{segment}</span>
                        {!isLast && (
                          <button
                            onClick={() => filledWord && handleRemoveBlankWord(idx)}
                            className={`px-3 py-1 rounded-lg font-bold border text-sm transition-all shadow-xs min-w-[70px] ${
                              filledWord
                                ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                                : 'bg-amber-100/70 border-dashed border-amber-400 text-amber-700'
                            }`}
                          >
                            {filledWord || '___'}
                          </button>
                        )}
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>

            {/* Word choices pool */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600">
                보기 단어 목록 (무작위 배치 - 클릭하여 빈칸을 순서대로 채우세요):
              </span>
              <div className="flex flex-wrap gap-2">
                {shuffledChoices.map((choiceWord, cIdx) => {
                  const usedCount = filledBlanks.filter((w) => w === choiceWord).length;
                  const totalOccurrencesInChoices = shuffledChoices.filter(
                    (w) => w === choiceWord
                  ).length;

                  const isDisabled = usedCount >= totalOccurrencesInChoices || isChecked;

                  return (
                    <button
                      key={cIdx}
                      disabled={isDisabled}
                      onClick={() => handlePickWordForBlank(choiceWord)}
                      className={`px-4 py-2 text-sm font-semibold rounded-xl border transition ${
                        isDisabled
                          ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
                          : 'bg-white border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 text-slate-800 shadow-xs'
                      }`}
                    >
                      {choiceWord}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Level [상]: Fragment / Chunk Ordering Workspace */}
        {level === 'hard' && (
          <div className="space-y-6">
            {/* User Selected Assembled Sentence Area */}
            <div className="bg-indigo-50/60 rounded-xl p-5 border border-indigo-200">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-900 mb-3">
                <span>🇰🇷 완성 중인 한국어 문장 구조 (클릭 시 취소)</span>
                <span>
                  {selectedChunks.length} / {currentSentence.hard.fragments.length} 조각
                </span>
              </div>

              {selectedChunks.length === 0 ? (
                <p className="text-xs text-indigo-400 italic py-3 text-center">
                  아래에서 한국어 조각을 순서대로 클릭하여 완성해 보세요.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedChunks.map((chunk, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDeselectChunk(chunk)}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-xs transition flex items-center space-x-1"
                    >
                      <span className="text-indigo-200 text-xs mr-1">{idx + 1}.</span>
                      <span>{chunk}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Remaining Shuffled Chunks */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600">무작위 배열된 문장 조각:</span>
              <div className="flex flex-wrap gap-2">
                {shuffledChunks.map((chunk, idx) => (
                  <button
                    key={idx}
                    disabled={isChecked}
                    onClick={() => handleSelectChunk(chunk)}
                    className="px-4 py-2 bg-white hover:bg-indigo-50 border border-slate-300 hover:border-indigo-400 text-slate-800 font-medium text-sm rounded-xl shadow-xs transition"
                  >
                    {chunk}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Verification & Action Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            id="reset-sentence-btn"
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>초기화</span>
          </button>

          {!isChecked ? (
            <button
              id="check-sentence-btn"
              onClick={handleCheck}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>정답 확인</span>
            </button>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                id="retry-sentence-btn"
                onClick={handleReset}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition"
              >
                다시 시도
              </button>
              {activeSentenceIndex < paragraph.sentences.length - 1 && (
                <button
                  id="next-sentence-btn"
                  onClick={() => setActiveSentenceIndex(activeSentenceIndex + 1)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center space-x-1.5"
                >
                  <span>다음 문장 연습</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Feedback Alert Box */}
        {isChecked && (
          <div
            className={`p-5 rounded-2xl border text-sm font-medium animate-fadeIn ${
              isCorrect
                ? 'bg-emerald-100/80 border-emerald-300 text-emerald-900'
                : 'bg-red-100/80 border-red-300 text-red-900'
            }`}
          >
            <div className="flex items-center space-x-2 font-bold text-base mb-1">
              {isCorrect ? (
                <>
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>정답입니다! 정확한 문장 해석입니다.</span>
                </>
              ) : (
                <>
                  <Lightbulb className="w-5 h-5 text-red-700" />
                  <span>아쉽습니다. 올바른 문장 구조를 확인해보세요.</span>
                </>
              )}
            </div>
            <p className="text-xs mt-2 pt-2 border-t border-slate-950/10">
              <strong>🇰🇷 올바른 전체 한글 번역:</strong> {currentSentence.fullKo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
