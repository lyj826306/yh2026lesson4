export interface Keyword {
  id: string;
  word: string;
  meaning: string;
  paragraphId: number;
}

export interface SentenceEasy {
  textWithBlanks: string; // e.g., "노트북을 버린다면, 그녀는 ___ 쓰레기라는 ___ 문제에 ___ 될 것이다."
  missingWords: string[]; // 3 missing Korean words in order
  choices: string[];      // pool of options including distractor words
}

export interface SentenceMedium {
  textWithBlanks: string; // Korean text with 5-6 blanks
  missingWords: string[]; // 5-6 missing Korean words
  choices: string[];      // pool of options
}

export interface SentenceHard {
  fragments: string[]; // 6 chunks in correct sequence
}

export interface SentencePracticeItem {
  id: string;
  paragraphId: number;
  sentenceEn: string;
  fullKo: string;
  easy: SentenceEasy;
  medium: SentenceMedium;
  hard: SentenceHard;
}

export interface CompQuestion1 {
  id: string;
  questionKo: string;
  optionsKo: string[];
  answerIndex: number;
  explanation: string;
}

export interface CompQuestion2 {
  id: string;
  statementEn: string;
  isTrue: boolean;
  explanation: string;
}

export interface CompQuestion3 {
  id: string;
  questionEn: string;
  optionsEn: string[];
  answerIndex: number;
  explanation: string;
}

export interface ComprehensionSuite {
  q1: CompQuestion1;
  q2: CompQuestion2;
  q3: CompQuestion3;
}

export interface ParagraphData {
  id: number;
  page: string;
  title: string;
  subtitleKo: string;
  textEn: string;
  textKo: string;
  keywords: Keyword[];
  sentences: SentencePracticeItem[];
  comprehension: ComprehensionSuite;
}

export type TabMode = 'keywords' | 'vocab' | 'sentence' | 'comprehension' | 'report';

export interface UserProgress {
  foundKeywords: Record<number, string[]>; // paragraphId -> list of found keyword IDs
  completedSentencePractice: Record<string, 'easy' | 'medium' | 'hard'>; // sentenceId -> level completed
  vocabScores: Record<number, number>; // paragraphId -> score
  compAnswers: Record<string, number | boolean>; // questionId -> selected answer index or boolean
}
