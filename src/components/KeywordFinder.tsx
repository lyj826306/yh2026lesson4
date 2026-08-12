import React, { useState } from 'react';
import { ParagraphData } from '../types';
import { PARAGRAPHS_DATA } from '../data/paragraphs';
import { CheckCircle2, AlertCircle, Volume2, Search, ArrowRight, Eye, EyeOff, RotateCcw, Sparkles } from 'lucide-react';

interface KeywordFinderProps {
  paragraph: ParagraphData;
  foundKeywordIds: string[];
  onUpdateFoundKeywords: (paragraphId: number, keywordIds: string[]) => void;
  onNextParagraph: () => void;
}

// Prepositions and Function words to suppress tooltips for
const FUNCTION_WORDS = new Set([
  'a', 'an', 'the',
  'in', 'on', 'at', 'to', 'for', 'with', 'by', 'from', 'of', 'about', 'above',
  'below', 'under', 'over', 'into', 'onto', 'out', 'off', 'through', 'during',
  'before', 'after', 'between', 'among', 'behind', 'beside',
  'and', 'but', 'or', 'nor', 'so', 'yet', 'as', 'if', 'than', 'then',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'am',
  'it', 'its', 'itself', 'he', 'him', 'his', 'she', 'her', 'hers',
  'they', 'them', 'their', 'theirs', 'we', 'us', 'our', 'ours',
  'you', 'your', 'yours', 'i', 'me', 'my', 'mine',
  'this', 'that', 'these', 'those',
  'do', 'does', 'did', 'have', 'has', 'had', 'having',
  'will', 'would', 'can', 'could', 'shall', 'should', 'may', 'might', 'must',
  'not', 'no', 'some', 'any', 'all', 'more', 'most', 'other', 'another', 'such'
]);

// List of multi-word idioms and phrasal verbs for Lesson 4
const IDIOMS_AND_PHRASES: Array<{ phrase: string; meaning: string }> = [
  { phrase: 'contributing to', meaning: '~에 기여하는 / 원인이 되는' },
  { phrase: 'getting rid of', meaning: '~을 버리다 / 제거하다' },
  { phrase: 'get rid of', meaning: '~을 버리다 / 제거하다' },
  { phrase: 'turns on', meaning: '전원이 켜지다' },
  { phrase: 'turn on', meaning: '켜다' },
  { phrase: 'in this case', meaning: '이 경우에' },
  { phrase: 'on her way to', meaning: '~로 가던 길에' },
  { phrase: 'e-waste', meaning: '전자 쓰레기' },
  { phrase: 'to make matters worse', meaning: '설상가상으로' },
  { phrase: 'due to', meaning: '~ 때문에 / ~로 인해' },
  { phrase: 'toxic materials', meaning: '유독성 물질' },
  { phrase: 'alarming rate', meaning: '걱정스러운 속도' },
  { phrase: 'for this reason', meaning: '이러한 이유로' },
  { phrase: 'focused on', meaning: '~에 중점을 둔' },
  { phrase: 'take a look at', meaning: '~을 살펴보다' },
  { phrase: 'right to repair', meaning: '수리할 권리' },
  { phrase: 'right-to-repair', meaning: '수리할 권리' },
  { phrase: 'dispose of', meaning: '~을 처리하다 / 버리다' },
  { phrase: 'third-party', meaning: '제삼자 / 사설 업체' },
  { phrase: 'third parties', meaning: '제삼자들 / 사설 업체들' },
  { phrase: 'service center', meaning: '서비스 센터 / 수리점' },
  { phrase: 'prohibited by law', meaning: '법으로 금지된' },
  { phrase: 'as easy as possible', meaning: '가능한 한 쉽게' },
  { phrase: 'thanks to', meaning: '~ 덕분에' },
  { phrase: 'as well as', meaning: '~뿐만 아니라' },
  { phrase: 'passed a bill', meaning: '법안을 통과시켰다' },
  { phrase: 'repairability index', meaning: '수리 가능성 지수' },
  { phrase: 'color-coded', meaning: '색상으로 표시된' },
  { phrase: 'takes into account', meaning: '~을 고려하다' },
  { phrase: 'take into account', meaning: '~을 고려하다' },
  { phrase: 'spare parts', meaning: '여분 부품' },
  { phrase: 'informed decisions', meaning: '정보에 근거한 결정' },
  { phrase: 'ending up in', meaning: '결국 ~매립지에 다다르다' },
  { phrase: 'end up in', meaning: '결국 ~에 다다르다' },
  { phrase: 'near future', meaning: '가까운 미래' },
  { phrase: 'innovative lead', meaning: '혁신적인 선례' },
  { phrase: 'repair café', meaning: '수리 카페' },
  { phrase: 'repair cafés', meaning: '수리 카페들' },
  { phrase: 'gather together', meaning: '함께 모이다' },
  { phrase: 'staffed by', meaning: '직원이 배치된' },
  { phrase: 'volunteer experts', meaning: '자원봉사 전문가' },
  { phrase: 'life spans', meaning: '수명 / 사용 연수' },
  { phrase: 'life span', meaning: '수명' },
  { phrase: 'sustainable perspective', meaning: '지속 가능한 관점' },
  { phrase: 'limited to', meaning: '~에 제한된' },
  { phrase: 'repairability score', meaning: '수리 가능성 점수' },
  { phrase: 'sustainable world', meaning: '지속 가능한 세상' },
  { phrase: 'even more importantly', meaning: '더욱 중요한 것은' },
];

// Dictionary covering English words in Lesson 4
const EXTENDED_DICTIONARY: Record<string, string> = {
  study: '학습 / 연구',
  group: '그룹 / 모임',
  meeting: '모임 / 회의',
  accidentally: '우연히 / 실수로',
  dropped: '떨어뜨렸다',
  drop: '떨어뜨리다',
  laptop: '노트북 컴퓨터',
  street: '길거리 / 도로',
  seriously: '심각하게',
  damaging: '손상시키는',
  damage: '손상 / 고장',
  screen: '화면 / 스크린',
  cracked: '금이 간 / 균열된',
  working: '작동하는',
  repaired: '수리된',
  repair: '수리하다 / 고치다',
  hesitating: '망설이는',
  hesitate: '망설이다',
  expensive: '비싼 / 수리비가 많은',
  often: '자주 / 흔히',
  years: '년 / 세월',
  purchasing: '구매하는',
  purchase: '구입하다',
  reasonable: '합리적인 / 이치에 맞는',
  option: '선택지 / 옵션',
  reality: '실제 / 현실',
  however: '하지만 / 그러나',
  throws: '버리다 / 던지다',
  trash: '쓰레기통 / 쓰레기',
  problem: '문제',
  term: '용어 / 기간',
  refers: '나타내다 / 가리키다',
  discarded: '버려진',
  discard: '버리다',
  electronic: '전자의',
  devices: '전자 기기들',
  electrical: '전기의',
  appliances: '가전제품 / 기기',
  toxic: '유독한 / 독성의',
  materials: '물질 / 재료',
  contained: '포함된',
  lead: '납 (유독 금속) / 이끌다',
  health: '건강',
  environmental: '환경의 / 환경적인',
  hazard: '위험 요소',
  produced: '생산된 / 발생된',
  increasing: '증가하고 있는',
  alarming: '걱정스러운 / 놀라운',
  rate: '속도 / 비율',
  total: '총계 / 전체의',
  metric: '메트릭 (단위)',
  tons: '톤 (무게 단위)',
  generated: '발생된 / 생성된',
  generate: '발생시키다',
  worldwide: '전 세계적으로',
  collected: '수집된',
  experts: '전문가들',
  predict: '예측하다 / 전망하다',
  annually: '매년 / 연간',
  annual: '매년의',
  doubled: '두 배가 된',
  double: '두 배가 되다',
  reason: '이유 / 원인',
  efforts: '노력들',
  address: '다루다 / 해결하다',
  focused: '중점을 둔 / 집중된',
  easier: '더 쉬운',
  practical: '현실적인 / 실용적인',
  approaches: '접근법들',
  movement: '운동 / 캠페인',
  empowering: '권한을 부여하는',
  consumers: '소비자들',
  dispose: '처리하다 / 버리다',
  difficult: '어려운',
  disassemble: '분해하다',
  manufacturer: '제조사 / 제조업체',
  require: '요구하다',
  official: '공식적인',
  service: '서비스 / 수리소',
  center: '센터 / 수리점',
  allow: '허용하다',
  customers: '고객들',
  intentionally: '의도적으로',
  designed: '설계된',
  acquire: '얻다 / 획득하다',
  instructions: '설명서 / 지침',
  parts: '부품들',
  promoting: '추진하는 / 촉진하는',
  legislation: '법률 / 입법',
  states: '명시하다 / 주(州)',
  own: '소유하다',
  right: '권리 / 오른쪽',
  technician: '기술자 / 수리기사',
  choice: '선택',
  protect: '보호하다',
  demands: '요구하다 / 요구사항',
  obtain: '구하다 / 얻다',
  tools: '도구들',
  installing: '설치하는 것',
  custom: '맞춤형 / 사용자 지정',
  software: '소프트웨어',
  prohibited: '금지된',
  prohibit: '금지하다',
  law: '법률',
  advocates: '지지자들 / 옹호자들',
  accomplished: '성취된 / 이루어진',
  gaining: '얻고 있는',
  growing: '커지고 있는',
  influence: '영향력',
  passed: '통과시켰다',
  bill: '법안 / 영수증',
  repairability: '수리 가능성',
  index: '지수 / 지표',
  system: '시스템 / 체계',
  takes: '취하다 / 고려하다',
  account: '고려 / 계정',
  elements: '요소들',
  availability: '이용 가능성',
  ease: '용이성 / 쉬움',
  spare: '여분의 / 예비의',
  label: '라벨 / 표식',
  indicates: '나타내다 / 지시하다',
  positive: '긍정적인',
  effects: '효과들 / 영향',
  informed: '정보에 근거한',
  decisions: '결정들',
  encourages: '장려하다 / 격려하다',
  ending: '결국 ~되다 / 끝',
  landfills: '쓰레기 매립지',
  sustainable: '지속 가능한',
  transition: '전환 / 변화',
  impact: '영향 / 충격',
  spread: '퍼지다 / 확산되다',
  global: '세계적인 / 글로벌',
  economy: '경제',
  anticipate: '예상하다 / 기대하다',
  innovative: '혁신적인',
  advice: '조언 / 도움말',
  occurs: '발생하다',
  free: '무료의 / 자유로운',
  gather: '모이다 / 집합하다',
  staffed: '직원이 배치된',
  volunteer: '자원봉사자',
  invaluable: '매우 귀중한',
  skills: '기술들',
  knowledge: '지식',
  maintenance: '보수 관리 / 유지',
  popularity: '인기',
  providing: '제공하는 것',
  spaces: '공간들',
  enable: '가능하게 하다',
  maintain: '유지하다',
  extend: '연장하다',
  spans: '수명 / 기간',
  foster: '조성하다 / 육성하다',
  perspective: '관점 / 시각',
  refurbished: '재단장된 / 리퍼비시된',
  components: '부품들 / 구성 요소',
  raw: '원자재의 / 날것의',
  precious: '귀중한 / 소중한',
  metals: '금속들',
  extracted: '추출된',
  circularity: '순환성',
  properly: '제대로 / 적절히',
  replace: '교체하다 / 대체하다',
  alternatively: '그렇지 않으면 / 대안으로',
  options: '선택지들',
  limited: '제한된',
  planet: '지구 / 행성',
  cleaner: '더 깨끗한',
  healthier: '더 건강한',
};

export const KeywordFinder: React.FC<KeywordFinderProps> = ({
  paragraph,
  foundKeywordIds,
  onUpdateFoundKeywords,
  onNextParagraph,
}) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [hasChecked, setHasChecked] = useState<boolean>(foundKeywordIds.length > 0);
  const [showKoreanTranslation, setShowKoreanTranslation] = useState<boolean>(false);

  const cleanWord = (str: string) => str.toLowerCase().replace(/[^a-z0-9-]/g, '');

  const textWords = paragraph.textEn.split(/\s+/);

  // Helper to find multi-word idiom/phrasal verb/phrase group for a token index
  const getPhraseGroupForIndex = (idx: number) => {
    if (idx < 0 || idx >= textWords.length) return null;

    // Collect candidates: current paragraph keywords, global idioms, all paragraph keywords
    const candidateList: Array<{ phrase: string; meaning: string; isKeyword: boolean; id?: string }> = [];

    // Target paragraph keywords first
    for (const k of paragraph.keywords) {
      candidateList.push({
        phrase: k.word,
        meaning: k.meaning,
        isKeyword: true,
        id: k.id,
      });
    }

    // Idioms & phrasal verbs
    for (const item of IDIOMS_AND_PHRASES) {
      candidateList.push({
        phrase: item.phrase,
        meaning: item.meaning,
        isKeyword: false,
      });
    }

    // All paragraph keywords
    for (const p of PARAGRAPHS_DATA) {
      for (const k of p.keywords) {
        candidateList.push({
          phrase: k.word,
          meaning: k.meaning,
          isKeyword: true,
          id: k.id,
        });
      }
    }

    // Sort multi-word phrases by word count descending so longest match wins
    const multiWordCandidates = candidateList
      .filter((c) => c.phrase.includes(' ') || c.phrase.includes('-'))
      .sort((a, b) => b.phrase.length - a.phrase.length);

    for (const candidate of multiWordCandidates) {
      const pWords = candidate.phrase.split(/[\s-]+/).map(cleanWord).filter(Boolean);
      if (pWords.length <= 1) continue;

      // Scan textWords to see if pWords match starting around idx
      const len = pWords.length;
      for (let start = Math.max(0, idx - len + 1); start <= Math.min(idx, textWords.length - len); start++) {
        let match = true;
        for (let offset = 0; offset < len; offset++) {
          if (cleanWord(textWords[start + offset]) !== pWords[offset]) {
            match = false;
            break;
          }
        }

        if (match) {
          const groupIndices = Array.from({ length: len }, (_, i) => start + i);
          return {
            phrase: candidate.phrase,
            meaning: candidate.meaning,
            isKeyword: candidate.isKeyword,
            keywordId: candidate.id,
            indices: groupIndices,
            isIdiom: !candidate.isKeyword || pWords.length > 1,
          };
        }
      }
    }

    return null;
  };

  const handleWordClick = (idx: number) => {
    const phraseGroup = getPhraseGroupForIndex(idx);
    const indicesToToggle = phraseGroup ? phraseGroup.indices : [idx];

    const allSelected = indicesToToggle.every((i) => selectedIndices.includes(i));

    if (allSelected) {
      setSelectedIndices(selectedIndices.filter((i) => !indicesToToggle.includes(i)));
    } else {
      setSelectedIndices(Array.from(new Set([...selectedIndices, ...indicesToToggle])));
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCheckKeywords = () => {
    const selectedCleanedWords = selectedIndices
      .map((i) => cleanWord(textWords[i]))
      .filter(Boolean);

    const matchedIds = paragraph.keywords
      .filter((k) => {
        const targetClean = cleanWord(k.word);
        const targetParts = targetClean.split(' ').filter(Boolean);

        if (targetParts.length === 1) {
          return selectedCleanedWords.includes(targetParts[0]);
        }
        return targetParts.every((part) => selectedCleanedWords.includes(part));
      })
      .map((k) => k.id);

    const updated = Array.from(new Set([...foundKeywordIds, ...matchedIds]));
    onUpdateFoundKeywords(paragraph.id, updated);
    setHasChecked(true);
  };

  const handleAutoReveal = () => {
    const allIds = paragraph.keywords.map((k) => k.id);
    onUpdateFoundKeywords(paragraph.id, allIds);
    setHasChecked(true);
  };

  const handleReset = () => {
    setSelectedIndices([]);
    setHasChecked(false);
  };

  const targetKeywords = paragraph.keywords;
  const foundList = targetKeywords.filter((k) => foundKeywordIds.includes(k.id));
  const missedList = targetKeywords.filter((k) => !foundKeywordIds.includes(k.id));

  // Determine hover information for word index
  const getHoverInfo = (idx: number) => {
    const wordRaw = textWords[idx] || '';
    const currentClean = cleanWord(wordRaw);
    if (!currentClean) return null;

    // 1. Check if token belongs to a multi-word phrase / idiom
    const phraseGroup = getPhraseGroupForIndex(idx);
    if (phraseGroup) {
      return {
        title: phraseGroup.phrase,
        meaning: phraseGroup.meaning,
        isKeyword: phraseGroup.isKeyword,
        isIdiom: phraseGroup.isIdiom,
        isFound: phraseGroup.keywordId ? foundKeywordIds.includes(phraseGroup.keywordId) : false,
        indices: phraseGroup.indices,
      };
    }

    // 2. Suppress prepositions and function words completely!
    if (FUNCTION_WORDS.has(currentClean)) {
      return null;
    }

    // 3. Check single-word target keywords in current paragraph
    for (const k of paragraph.keywords) {
      const kClean = cleanWord(k.word);
      if (kClean === currentClean || (kClean.length >= 4 && currentClean.includes(kClean))) {
        return {
          title: k.word,
          meaning: k.meaning,
          isKeyword: true,
          isIdiom: false,
          isFound: foundKeywordIds.includes(k.id),
          indices: [idx],
        };
      }
    }

    // 4. Check single-word keywords across all paragraphs
    for (const p of PARAGRAPHS_DATA) {
      for (const k of p.keywords) {
        const kClean = cleanWord(k.word);
        if (kClean === currentClean) {
          return {
            title: k.word,
            meaning: k.meaning,
            isKeyword: true,
            isIdiom: false,
            isFound: false,
            indices: [idx],
          };
        }
      }
    }

    // 5. Check extended dictionary for meaningful content words
    if (EXTENDED_DICTIONARY[currentClean]) {
      return {
        title: wordRaw.replace(/[^a-zA-Z0-9-]/g, ''),
        meaning: EXTENDED_DICTIONARY[currentClean],
        isKeyword: false,
        isIdiom: false,
        isFound: false,
        indices: [idx],
      };
    }

    // Do NOT return generic fallback box for prepositions or unlisted words!
    return null;
  };

  const hoveredPhraseGroup = hoveredIdx !== null ? getPhraseGroupForIndex(hoveredIdx) : null;
  const hoveredIndices = hoveredPhraseGroup
    ? hoveredPhraseGroup.indices
    : hoveredIdx !== null
    ? [hoveredIdx]
    : [];

  return (
    <div className="space-y-6">
      {/* Top Banner Info */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
              {paragraph.page} (문단 {paragraph.id})
            </span>
            <span className="text-sm font-semibold text-slate-600">{paragraph.title}</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">{paragraph.subtitleKo}</h2>
          <p className="text-xs text-slate-500 mt-1 flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 inline" />
            <span>단어나 숙어/구동사 위에 마우스를 올려 뜻을 확인하고, 클릭하여 키워드를 학습하세요.</span>
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            id="read-aloud-btn"
            onClick={() => speakText(paragraph.textEn)}
            className="flex items-center space-x-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
            title="영문 전체 듣기"
          >
            <Volume2 className="w-4 h-4 text-emerald-600" />
            <span>원문 듣기</span>
          </button>
          <button
            id="toggle-translation-btn"
            onClick={() => setShowKoreanTranslation(!showKoreanTranslation)}
            className="flex items-center space-x-2 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-xl transition border border-emerald-200"
          >
            {showKoreanTranslation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showKoreanTranslation ? '한글 해석 숨기기' : '한글 해석 보기'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Reading Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Reading & Word Picker */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-800">
                  English Passage (숙어/구동사는 하나의 묶음으로 통합 표시)
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
                선택된 단어/구문: {selectedIndices.length}개
              </span>
            </div>

            {/* Clickable Paragraph Words with Tooltips */}
            <div className="leading-relaxed text-slate-800 text-base sm:text-lg flex flex-wrap gap-1.5 p-5 bg-slate-50/80 rounded-xl border border-slate-100 relative">
              {textWords.map((word, idx) => {
                const cleaned = cleanWord(word);
                const isSelected = selectedIndices.includes(idx);
                const isHoveredGroup = hoveredIndices.includes(idx);

                // Check if this word belongs to a target keyword after check
                const isTargetFound =
                  hasChecked &&
                  targetKeywords.some((k) => {
                    const kClean = cleanWord(k.word);
                    return (
                      foundKeywordIds.includes(k.id) &&
                      (kClean.includes(cleaned) || kClean.split(' ').includes(cleaned))
                    );
                  });

                const hoverInfo = hoveredIdx === idx ? getHoverInfo(idx) : null;

                return (
                  <div key={idx} className="relative inline-block">
                    <span
                      onClick={() => handleWordClick(idx)}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      onTouchStart={() => setHoveredIdx(idx)}
                      className={`cursor-pointer px-1.5 py-0.5 rounded transition-all duration-150 font-medium select-none ${
                        isTargetFound
                          ? 'bg-emerald-200 text-emerald-950 font-bold border-b-2 border-emerald-500 ring-2 ring-emerald-400/30'
                          : isSelected
                          ? 'bg-amber-300 text-amber-950 font-bold ring-2 ring-amber-400 shadow-sm'
                          : isHoveredGroup
                          ? 'bg-indigo-100 text-indigo-950 font-semibold ring-2 ring-indigo-400/80 border-b-2 border-indigo-500'
                          : 'hover:bg-slate-200/90 text-slate-800'
                      }`}
                    >
                      {word}
                    </span>

                    {/* Korean Meaning Hover Tooltip - Suppressed for function words */}
                    {hoveredIdx === idx && hoverInfo && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-2 bg-slate-900 text-white text-xs rounded-xl shadow-2xl z-50 whitespace-nowrap pointer-events-none animate-fadeIn border border-slate-700/80">
                        <div className="flex items-center space-x-1.5 font-bold text-emerald-400">
                          <span>{hoverInfo.title}</span>
                          {hoverInfo.isKeyword && (
                            <span className="bg-emerald-500/25 text-emerald-300 text-[10px] px-1.5 py-0.2 rounded border border-emerald-400/40">
                              핵심 키워드
                            </span>
                          )}
                          {hoverInfo.isIdiom && !hoverInfo.isKeyword && (
                            <span className="bg-indigo-500/30 text-indigo-200 text-[10px] px-1.5 py-0.2 rounded border border-indigo-400/40">
                              숙어 / 구동사
                            </span>
                          )}
                        </div>
                        <div className="text-slate-100 font-medium mt-0.5 text-xs">
                          {hoverInfo.meaning}
                        </div>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Control buttons below text */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
              <button
                id="reset-selection-btn"
                onClick={handleReset}
                className="flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>선택 초기화</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  id="auto-reveal-keywords-btn"
                  onClick={handleAutoReveal}
                  className="px-3.5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                >
                  모든 키워드 정답 공개
                </button>
                <button
                  id="check-keywords-btn"
                  onClick={handleCheckKeywords}
                  className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>키워드 확인하기</span>
                </button>
              </div>
            </div>
          </div>

          {/* Korean Translation Accordion */}
          {showKoreanTranslation && (
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 text-slate-800 animate-fadeIn">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
                🇰🇷 문단 전체 한글 해석
              </h4>
              <p className="text-sm leading-relaxed text-slate-700">{paragraph.textKo}</p>
            </div>
          )}
        </div>

        {/* Right 1 Col: Found vs Missed Keywords Display */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 flex items-center justify-between border-b pb-3 border-slate-100">
              <span>🎯 키워드 분석 결과</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                {foundKeywordIds.length} / {targetKeywords.length} 달성
              </span>
            </h3>

            {!hasChecked ? (
              <div className="py-8 text-center text-slate-400 space-y-2">
                <Search className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs">
                  본문 단어 및 숙어/구동사 위로 마우스를 올려 뜻을 확인하고, 클릭 후 '키워드 확인하기'를 눌러 수집해 보세요.
                </p>
                <p className="text-[11px] text-emerald-600 font-medium">
                  ✓ 문장별 핵심 키워드가 최소 1개 이상 배치되어 있습니다.
                </p>
              </div>
            ) : (
              <div className="space-y-5 mt-4">
                {/* Found Keywords Section */}
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>찾은 키워드 ({foundList.length}개)</span>
                  </div>
                  {foundList.length === 0 ? (
                    <p className="text-xs text-slate-400 italic bg-slate-50 p-2.5 rounded-lg border">
                      아직 일치하는 키워드를 찾지 못했습니다.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {foundList.map((k) => (
                        <div
                          key={k.id}
                          className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-emerald-900">{k.word}</span>
                            <button
                              onClick={() => speakText(k.word)}
                              className="text-emerald-600 hover:text-emerald-800"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-xs font-medium text-emerald-700">{k.meaning}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Missed Keywords Section */}
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 mb-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>놓친 키워드 ({missedList.length}개)</span>
                  </div>
                  {missedList.length === 0 ? (
                    <div className="p-3 bg-emerald-100/70 border border-emerald-200 rounded-xl text-center text-xs font-bold text-emerald-800">
                      🎉 축하합니다! 모든 주요 키워드를 정확히 확인했습니다!
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {missedList.map((k) => (
                        <div
                          key={k.id}
                          className="flex items-center justify-between p-2.5 bg-amber-50 border border-amber-200 rounded-xl"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-amber-900">{k.word}</span>
                            <button
                              onClick={() => speakText(k.word)}
                              className="text-amber-600 hover:text-amber-800"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-xs font-medium text-amber-800">{k.meaning}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Next paragraph prompt */}
                {paragraph.id < 7 && (
                  <button
                    id="go-next-paragraph-btn"
                    onClick={onNextParagraph}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center space-x-2 mt-2"
                  >
                    <span>다음 문단({paragraph.id + 1}) 키워드 학습하기</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


