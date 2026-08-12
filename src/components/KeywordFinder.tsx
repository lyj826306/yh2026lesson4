import React, { useState, useEffect } from 'react';
import { ParagraphData, Keyword, TabMode } from '../types';
import { PARAGRAPHS_DATA } from '../data/paragraphs';
import {
  CheckCircle2,
  AlertCircle,
  Volume2,
  Search,
  ArrowRight,
  Eye,
  EyeOff,
  RotateCcw,
  Sparkles,
  Square,
  BookOpen,
  Brain,
  GraduationCap,
  X,
  HelpCircle,
  Lightbulb,
  ChevronRight,
} from 'lucide-react';

interface KeywordFinderProps {
  paragraph: ParagraphData;
  foundKeywordIds: string[];
  onUpdateFoundKeywords: (paragraphId: number, keywordIds: string[]) => void;
  onNextParagraph: () => void;
  onSelectTab: (tab: TabMode) => void;
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

// Custom pedagogical importance dictionary mapping words to why they matter
const KEYWORD_IMPORTANCE_MAP: Record<string, string> = {
  dropped: 'Liz의 노트북 고장 사건을 유발하는 결정적 동작 어휘입니다. 본문 전체 이야기의 시작점이 됩니다.',
  damaging: '노트북 손상 상태를 설명하며, 수리(repair)와 폐기(e-waste) 사이의 현실적 갈등을 유발하는 원인 어휘입니다.',
  repaired: '전자 쓰레기 배출을 막는 가장 근본적 행동으로, Lesson 4의 핵심 주제인 수리 권리(Right to Repair)의 출발점입니다.',
  hesitating: '비싼 수리비와 긴 소요 시간 때문에 소비자들이 수리를 선뜻 하지 못하는 현실적 고민을 잘 보여주는 어휘입니다.',
  reasonable: '단기적으로 새 제품 구매가 더 이성적/합리적으로 보이지만, 지구 환경 측면에서는 그렇지 않다는 반전을 나타냅니다.',
  'contributing to': '개인의 무심한 행위(노트북 폐기)가 심각한 지구 환경 문제(e-waste)로 연결됨을 설명하는 핵심 인과 구문입니다.',
  'e-waste': 'Lesson 4의 핵심 주제어로, 버려지는 전자기기 쓰레기와 이로 인한 지구 환경 오염 문제를 뜻하는 가장 중요한 핵심 어휘입니다.',
  refers: '전자 쓰레기(e-waste)의 학술적/사회적 정의를 도입할 때 사용되는 개념 설명용 어휘입니다.',
  discarded: '버려진 전자기기(discarded electrical devices)를 수식하는 어휘로, e-waste로 분류되는 대상의 상태를 구체화합니다.',
  toxic: '전자 쓰레기 내부에 함유된 유독성 물질을 지칭하며, e-waste가 왜 인체와 자연에 치명적인 위험(hazard)인지 설명합니다.',
  increasing: '전 세계 전자 쓰레기 발생량이 가파르게 늘어나고 있는 시급한 상황을 보여주는 추세 설명 어휘입니다.',
  hazard: '전자 쓰레기가 토양과 수질을 오염시키고 인체 건강에 유해한 영향을 미친다는 경각심을 전달하는 핵심 명사입니다.',
  generated: '전 세계적으로 매년 수천만 톤씩 발생하는 e-waste의 엄청난 생산 규모를 나타내는 어휘입니다.',
  predict: '환경 전문가들의 미래 예측을 전달하며, 대책 마련이 시급함을 경고하는 전망 관련 어휘입니다.',
  doubled: '전자 쓰레기 양이 불과 몇 년 만에 2배로 증가할 것이라는 심각성을 숫자로 입증하는 어휘입니다.',
  address: '전자 쓰레기 문제에 적극적으로 대응하고 해결책을 모색한다는 의미의 중요 동사입니다.',
  approaches: '단순 쓰레기 수거를 넘어 소비자의 수리권 보장 등 현실적이고 실용적인 문제 해결 접근법을 의미합니다.',
  movement: '소비자의 권리를 되찾고 환경을 보호하려는 사회적 캠페인 및 법적 운동(Right to Repair movement)을 지칭합니다.',
  empowering: '소비자에게 직접 기기를 수리하고 선택할 권한을 부여한다는 수리권 운동의 핵심 가치를 나타냅니다.',
  dispose: '기기를 무분별하게 버리기보다 안전하게 처리하고 재활용하는 책임 있는 자원 관리 행위를 뜻합니다.',
  disassemble: '제조사가 기기를 분해하기 어렵게 설계한 현실적 장벽을 나타내며, 수리 권리 법안의 필요성을 뒷받침합니다.',
  manufacturer: '전자제품을 생산하는 기업으로, 기기의 수리 가능성과 부품 공급 책임을 지는 주요 주체입니다.',
  'third-party': '공식 수리점 외의 제삼자(사설 수리점)를 의미하며, 수리 비용 단가를 낮추고 접근성을 높이는 핵심 주체입니다.',
  intentionally: '제조사들이 자사 이익을 위해 의도적으로 수리를 어렵게 만든 구조적 문제를 지적하는 핵심 부사입니다.',
  legislation: '소비자의 수리할 권리를 법적으로 의무화하고 보장하는 법률 제정 노력을 의미합니다.',
  prohibited: '사설 수리나 사용자 직접 수리를 금지하던 제조사의 정책적 장벽을 설명하는 어휘입니다.',
  accomplished: '수리권 운동가들이 이끌어낸 법적·제도적 성과와 사회적 변화를 평가하는 어휘입니다.',
  repairability: '제품이 얼마나 고쳐 쓰기 쉬운지를 평가하는 개념으로, 지속 가능한 소비 시스템의 중심 지표입니다.',
  index: '소비자가 구매 전에 제품의 수리 난이도를 한눈에 확인할 수 있도록 점수화한 정책 지수입니다.',
  'color-coded': '수리 가능성 점수를 색상별로 직관적으로 구분하여 소비자의 합리적 선택을 돕는 디자인 요소입니다.',
  account: '법안 및 지수 산정 시 부품 가격, 수리 설명서 등 다양한 환경 요소를 종합적으로 고려함을 의미합니다.',
  landfills: '수리되지 못한 기기들이 결국 매립지에 묻혀 심각한 오염을 유발하는 최종 거점으로, 감소시켜야 할 대상입니다.',
  transition: '선형 경제(버리는 구조)에서 지속 가능한 순환 경제(고쳐 쓰는 구조)로의 거대한 사회적 변화를 의미합니다.',
  innovative: '수리 카페(Repair Café) 등 지역 사회 중심의 새롭고 창의적인 문제 해결 방식을 수식하는 어휘입니다.',
  gather: '지역 주민과 기술 전문가들이 함께 모여 기기를 고치고 지식을 나누는 공동체 활동을 나타냅니다.',
  volunteer: '대가 없이 자신의 기술과 시간을 나누어 주민들의 기기 수리를 돕는 자원봉사자들의 헌신을 뜻합니다.',
  invaluable: '수리 카페에서 얻는 기술과 경험이 매우 소중하고 가치 있음을 강조하는 고득점 핵심 형용사입니다.',
  spans: '기기의 사용 수명(life spans)을 연장시킴으로써 새로운 자원 소모와 쓰레기 발생을 줄이는 핵심 원리입니다.',
  foster: '지역 사회 내에서 지속 가능한 소비와 자원 재사용에 대한 긍정적 관점을 육성하고 확산함을 나타냅니다.',
  refurbished: '헌 기기를 재단장하여 신제품처럼 재사용함으로써 원자재 추출을 줄이는 순환 경제의 핵심 어휘입니다.',
  circularity: '자원이 버려지지 않고 계속 재활용되는 순환성(circularity) 개념으로 4과의 최종 비전입니다.',
  sustainable: '환경을 파괴하지 않고 지속 가능한 미래를 만들어가는 Lesson 4 전체의 대전제 키워드입니다.',
};

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
  onSelectTab,
}) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [hasChecked, setHasChecked] = useState<boolean>(foundKeywordIds.length > 0);
  const [showKoreanTranslation, setShowKoreanTranslation] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [activeAnalysisKeyword, setActiveAnalysisKeyword] = useState<Keyword | null>(null);

  // Stop speech synthesis when changing paragraphs or unmounting
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [paragraph.id]);

  const cleanWord = (str: string) => str.toLowerCase().replace(/[^a-z0-9-]/g, '');

  const textWords = paragraph.textEn.split(/\s+/);

  // Helper to find multi-word idiom/phrasal verb/phrase group for a token index
  const getPhraseGroupForIndex = (idx: number) => {
    if (idx < 0 || idx >= textWords.length) return null;

    const candidateList: Array<{ phrase: string; meaning: string; isKeyword: boolean; id?: string }> = [];

    for (const k of paragraph.keywords) {
      candidateList.push({
        phrase: k.word,
        meaning: k.meaning,
        isKeyword: true,
        id: k.id,
      });
    }

    for (const item of IDIOMS_AND_PHRASES) {
      candidateList.push({
        phrase: item.phrase,
        meaning: item.meaning,
        isKeyword: false,
      });
    }

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

    const multiWordCandidates = candidateList
      .filter((c) => c.phrase.includes(' ') || c.phrase.includes('-'))
      .sort((a, b) => b.phrase.length - a.phrase.length);

    for (const candidate of multiWordCandidates) {
      const pWords = candidate.phrase.split(/[\s-]+/).map(cleanWord).filter(Boolean);
      if (pWords.length <= 1) continue;

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

  // Toggle read-aloud playback (Play/Stop toggle)
  const toggleSpeakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAudio || window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakSingleWord = (word: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const handleCheckKeywords = () => {
    const matchedIds: string[] = [];

    for (const k of paragraph.keywords) {
      const kWords = k.word.split(/[\s-]+/).map(cleanWord).filter(Boolean);
      if (kWords.length === 0) continue;

      // Skip single-word prepositions or function words
      if (kWords.length === 1 && FUNCTION_WORDS.has(kWords[0])) {
        continue;
      }

      const len = kWords.length;
      for (let start = 0; start <= textWords.length - len; start++) {
        let match = true;
        for (let offset = 0; offset < len; offset++) {
          if (cleanWord(textWords[start + offset]) !== kWords[offset]) {
            match = false;
            break;
          }
        }
        if (match) {
          const rangeIndices = Array.from({ length: len }, (_, i) => start + i);
          if (rangeIndices.every((i) => selectedIndices.includes(i))) {
            matchedIds.push(k.id);
            break;
          }
        }
      }
    }

    const updated = Array.from(new Set([...foundKeywordIds, ...matchedIds]));
    onUpdateFoundKeywords(paragraph.id, updated);
    setHasChecked(true);
  };

  const handleReset = () => {
    setSelectedIndices([]);
    setHasChecked(false);
    setActiveAnalysisKeyword(null);
  };

  const targetKeywords = paragraph.keywords;
  const foundList = targetKeywords.filter((k) => foundKeywordIds.includes(k.id));
  const missedList = targetKeywords.filter((k) => !foundKeywordIds.includes(k.id));

  // Get sentence context for a keyword
  const getContextSentence = (keywordWord: string) => {
    const cleanTarget = cleanWord(keywordWord);
    const enSentences = paragraph.textEn.split(/(?<=[.!?])\s+/);
    const koSentences = paragraph.textKo.split(/(?<=[.!?])\s+/);

    for (let i = 0; i < enSentences.length; i++) {
      const sEn = enSentences[i];
      const sKo = koSentences[i] || paragraph.textKo;
      if (sEn.toLowerCase().includes(cleanTarget) || sEn.toLowerCase().includes(keywordWord.toLowerCase())) {
        return {
          sentenceEn: sEn,
          sentenceKo: sKo,
        };
      }
    }

    return {
      sentenceEn: paragraph.textEn,
      sentenceKo: paragraph.textKo,
    };
  };

  // Get pedagogical reason why this keyword is essential
  const getImportanceExplanation = (k: Keyword) => {
    const keyClean = cleanWord(k.word);
    if (KEYWORD_IMPORTANCE_MAP[keyClean]) {
      return KEYWORD_IMPORTANCE_MAP[keyClean];
    }
    return `이 키워드는 '${paragraph.title}'의 핵심 구문을 구성하며, 글의 맥락과 Lesson 4의 전자 쓰레기 문제 및 해결책 주제를 파악하는 데 필수적인 핵심 어휘입니다.`;
  };

  // Determine hover information for word index
  const getHoverInfo = (idx: number) => {
    const wordRaw = textWords[idx] || '';
    const currentClean = cleanWord(wordRaw);
    if (!currentClean) return null;

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

    if (FUNCTION_WORDS.has(currentClean)) {
      return null;
    }

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

    return null;
  };

  const hoveredPhraseGroup = hoveredIdx !== null ? getPhraseGroupForIndex(hoveredIdx) : null;
  const hoveredIndices = hoveredPhraseGroup
    ? hoveredPhraseGroup.indices
    : hoveredIdx !== null
    ? [hoveredIdx]
    : [];

  const foundPercent = targetKeywords.length > 0 ? Math.round((foundList.length / targetKeywords.length) * 100) : 0;

  const foundRanges = new Set<number>();
  const missedRanges = new Set<number>();
  if (hasChecked) {
    for (const k of targetKeywords) {
      const isFound = foundKeywordIds.includes(k.id);
      const kWords = k.word.split(/[\s-]+/).map(cleanWord).filter(Boolean);
      if (kWords.length === 0) continue;
      if (kWords.length === 1 && FUNCTION_WORDS.has(kWords[0])) continue;

      const len = kWords.length;
      for (let start = 0; start <= textWords.length - len; start++) {
        let match = true;
        for (let offset = 0; offset < len; offset++) {
          if (cleanWord(textWords[start + offset]) !== kWords[offset]) {
            match = false;
            break;
          }
        }
        if (match) {
          for (let i = 0; i < len; i++) {
            if (isFound) {
              foundRanges.add(start + i);
            } else {
              missedRanges.add(start + i);
            }
          }
        }
      }
    }
  }

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
            <span>단어나 숙어/구동사 위에 마우스를 올려 뜻을 확인하고, 클릭하여 키워드를 수집해 보세요.</span>
          </p>
        </div>

        {/* Action Controls: Audio Toggle Play/Stop & Korean Translation Toggle */}
        <div className="flex items-center space-x-2">
          <button
            id="toggle-read-aloud-btn"
            onClick={() => toggleSpeakText(paragraph.textEn)}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold rounded-xl transition shadow-sm ${
              isPlayingAudio
                ? 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 ring-2 ring-red-400/30'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
            }`}
            title={isPlayingAudio ? '원문 읽기 중단' : '원문 전체 읽기'}
          >
            {isPlayingAudio ? (
              <>
                <Square className="w-3.5 h-3.5 text-red-600 fill-red-600 animate-pulse" />
                <span className="font-bold">듣기 중단</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>원문 듣기</span>
              </>
            )}
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-100 gap-2">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-800">
                  English Passage (숙어/구동사는 하나의 묶음으로 통합 표시)
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                {hasChecked && (
                  <div className="flex items-center space-x-2 text-[11px] font-semibold">
                    <span className="inline-flex items-center space-x-1 bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>찾은 키워드</span>
                    </span>
                    <span className="inline-flex items-center space-x-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>놓친 키워드</span>
                    </span>
                  </div>
                )}
                <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
                  선택된 단어/구문: {selectedIndices.length}개
                </span>
              </div>
            </div>

            {/* Clickable Paragraph Words with Tooltips */}
            <div className="leading-relaxed text-slate-800 text-base sm:text-lg flex flex-wrap gap-1.5 p-5 bg-slate-50/80 rounded-xl border border-slate-100 relative">
              {textWords.map((word, idx) => {
                const cleaned = cleanWord(word);
                const isSelected = selectedIndices.includes(idx);
                const isHoveredGroup = hoveredIndices.includes(idx);
                const isTargetFound = foundRanges.has(idx);
                const isTargetMissed = missedRanges.has(idx);

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
                          : isTargetMissed
                          ? 'bg-amber-200 text-amber-950 font-bold border-b-2 border-amber-500 ring-2 ring-amber-400/30'
                          : isSelected
                          ? 'bg-indigo-200 text-indigo-950 font-bold ring-2 ring-indigo-400 shadow-sm'
                          : isHoveredGroup
                          ? 'bg-indigo-100 text-indigo-950 font-semibold ring-2 ring-indigo-400/80 border-b-2 border-indigo-500'
                          : 'hover:bg-slate-200/90 text-slate-800'
                      }`}
                    >
                      {word}
                    </span>

                    {/* Korean Meaning Hover Tooltip */}
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
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Control buttons below text (Auto Reveal button removed per request) */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
              <button
                id="reset-selection-btn"
                onClick={handleReset}
                className="flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>선택 초기화</span>
              </button>

              <button
                id="check-keywords-btn"
                onClick={handleCheckKeywords}
                className="px-5 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition flex items-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>선택 단어 분석 및 키워드 확인</span>
              </button>
            </div>
          </div>

          {/* Korean Translation Box */}
          {showKoreanTranslation && (
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 text-slate-800 animate-fadeIn">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
                🇰🇷 문단 전체 한글 해석
              </h4>
              <p className="text-sm leading-relaxed text-slate-700">{paragraph.textKo}</p>
            </div>
          )}

          {/* Connected Learning Step Navigation Buttons (After Checking Keywords) */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                  단계별 연계 학습 코스
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  다음 연습 단계로 바로 이동하기
                </h3>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 font-semibold px-2.5 py-1 rounded-full border border-emerald-500/30">
                문단 {paragraph.id} 학습 진행 중
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Step 2: Vocab Quiz */}
              <button
                id="goto-vocab-quiz-btn"
                onClick={() => onSelectTab('vocab')}
                className="p-3.5 bg-slate-800/90 hover:bg-emerald-600/90 hover:border-emerald-400 text-left rounded-xl border border-slate-700 transition group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:bg-white/20 group-hover:text-white transition">
                    <Brain className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-white">
                    2단계. 단어 퀴즈
                  </div>
                  <div className="text-[11px] text-slate-400 group-hover:text-emerald-100 mt-0.5">
                    핵심 어휘 확인 테스트
                  </div>
                </div>
              </button>

              {/* Step 3: Sentence Practice */}
              <button
                id="goto-sentence-practice-btn"
                onClick={() => onSelectTab('sentence')}
                className="p-3.5 bg-slate-800/90 hover:bg-emerald-600/90 hover:border-emerald-400 text-left rounded-xl border border-slate-700 transition group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:bg-white/20 group-hover:text-white transition">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-white">
                    3단계. 문장 해석 연습
                  </div>
                  <div className="text-[11px] text-slate-400 group-hover:text-emerald-100 mt-0.5">
                    빈칸 채우기 및 순서 배열
                  </div>
                </div>
              </button>

              {/* Step 4: Comprehension Quiz */}
              <button
                id="goto-comprehension-quiz-btn"
                onClick={() => onSelectTab('comprehension')}
                className="p-3.5 bg-slate-800/90 hover:bg-emerald-600/90 hover:border-emerald-400 text-left rounded-xl border border-slate-700 transition group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:bg-white/20 group-hover:text-white transition">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-white">
                    4단계. 문단 이해 퀴즈
                  </div>
                  <div className="text-[11px] text-slate-400 group-hover:text-emerald-100 mt-0.5">
                    수능형 지문 이해 문제
                  </div>
                </div>
              </button>
            </div>

            {/* Option to move to Next Paragraph */}
            {paragraph.id < 7 && (
              <div className="pt-2 flex justify-end">
                <button
                  id="go-next-paragraph-btn"
                  onClick={onNextParagraph}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center space-x-1.5 shadow"
                >
                  <span>다음 문단({paragraph.id + 1}) 키워드 학습으로 이동</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Found vs Missed Keywords Display & Interactive Importance Inspector */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center justify-between border-b pb-3 border-slate-100">
              <span className="flex items-center space-x-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>🎯 키워드 탐색 및 분석 결과</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                {foundKeywordIds.length} / {targetKeywords.length} 달성 ({foundPercent}%)
              </span>
            </h3>

            {!hasChecked ? (
              <div className="py-8 text-center text-slate-400 space-y-2">
                <Search className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs">
                  본문 단어 및 숙어를 클릭한 후 아래 <strong className="text-slate-600">'선택 단어 분석 및 키워드 확인'</strong>을 누르면 탐색 결과와 단어별 중요성 분석이 나타납니다.
                </p>
                <p className="text-[11px] text-emerald-600 font-medium">
                  ✓ 문장별 핵심 키워드가 최소 1개 이상 배치되어 있습니다.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Score Progress Bar */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>핵심 키워드 탐색 성취도</span>
                    <span className="text-emerald-600 font-bold">{foundPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-500 rounded-full"
                      style={{ width: `${foundPercent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 italic mt-1">
                    {foundPercent === 100
                      ? '🎉 완벽합니다! 모든 주요 키워드를 수집했습니다.'
                      : missedList.length > 0
                      ? '💡 아래 놓친 단어를 클릭하여 왜 이 키워드가 지문에서 중요한지 해석을 확인해보세요!'
                      : '잘하셨습니다!'}
                  </p>
                </div>

                {/* Found Keywords Section */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-700 mb-2">
                    <span className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>찾은 키워드 ({foundList.length}개)</span>
                    </span>
                    <span className="text-[10px] text-slate-400">클릭 시 중요성 해석 보기</span>
                  </div>
                  {foundList.length === 0 ? (
                    <p className="text-xs text-slate-400 italic bg-slate-50 p-2.5 rounded-lg border">
                      아직 찾은 키워드가 없습니다. 본문을 다시 확인해 보세요.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {foundList.map((k) => (
                        <div
                          key={k.id}
                          onClick={() => setActiveAnalysisKeyword(k)}
                          className={`p-2.5 bg-emerald-50/90 hover:bg-emerald-100/90 border border-emerald-200/90 rounded-xl cursor-pointer transition flex items-center justify-between group ${
                            activeAnalysisKeyword?.id === k.id ? 'ring-2 ring-emerald-500 shadow-md' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-emerald-950 group-hover:text-emerald-700">
                              {k.word}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakSingleWord(k.word);
                              }}
                              className="text-emerald-600 hover:text-emerald-800 p-0.5 rounded"
                              title="발음 듣기"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <span className="text-xs font-medium text-emerald-800">{k.meaning}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Missed Keywords Section */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-amber-800 mb-2">
                    <span className="flex items-center space-x-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>놓친 키워드 ({missedList.length}개)</span>
                    </span>
                    <span className="text-[10px] text-amber-600 font-medium">클릭 시 왜 중요한지 해석 보기</span>
                  </div>
                  {missedList.length === 0 ? (
                    <div className="p-3 bg-emerald-100/70 border border-emerald-200 rounded-xl text-center text-xs font-bold text-emerald-800">
                      🎉 축하합니다! 모든 주요 키워드를 정확히 찾았습니다!
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {missedList.map((k) => (
                        <div
                          key={k.id}
                          onClick={() => setActiveAnalysisKeyword(k)}
                          className={`p-2.5 bg-amber-50 hover:bg-amber-100/90 border border-amber-200 rounded-xl cursor-pointer transition flex items-center justify-between group ${
                            activeAnalysisKeyword?.id === k.id ? 'ring-2 ring-amber-500 shadow-md' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-amber-950 group-hover:text-amber-800">
                              {k.word}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakSingleWord(k.word);
                              }}
                              className="text-amber-600 hover:text-amber-800 p-0.5 rounded"
                              title="발음 듣기"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs font-medium text-amber-900">{k.meaning}</span>
                            <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded font-bold ml-1">
                              해석 분석
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Detailed Keyword Analysis & Importance Inspector Card */}
          {activeAnalysisKeyword && (
            <div className="bg-white rounded-2xl p-5 border-2 border-emerald-500/80 shadow-lg animate-fadeIn space-y-3 relative">
              <button
                onClick={() => setActiveAnalysisKeyword(null)}
                className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 pr-6">
                <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-700">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                    키워드 집중 분석 카드
                  </span>
                  <h4 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <span>{activeAnalysisKeyword.word}</span>
                    <span className="text-xs font-normal text-slate-500">
                      ({activeAnalysisKeyword.meaning})
                    </span>
                  </h4>
                </div>
              </div>

              {/* Status Tag */}
              <div className="flex items-center space-x-2">
                {foundKeywordIds.includes(activeAnalysisKeyword.id) ? (
                  <span className="inline-flex items-center space-x-1 text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>찾은 키워드</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1 text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
                    <AlertCircle className="w-3 h-3 text-amber-600" />
                    <span>놓친 키워드 분석</span>
                  </span>
                )}
                <button
                  onClick={() => speakSingleWord(activeAnalysisKeyword.word)}
                  className="flex items-center space-x-1 text-xs text-slate-600 hover:text-emerald-700 bg-slate-100 px-2 py-0.5 rounded-md"
                >
                  <Volume2 className="w-3 h-3 text-emerald-600" />
                  <span>발음 듣기</span>
                </button>
              </div>

              {/* Context Sentence in Passage */}
              {(() => {
                const ctx = getContextSentence(activeAnalysisKeyword.word);
                return (
                  <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="font-bold text-slate-700 block mb-0.5">📖 지문 속 활용 문장:</span>
                      <p className="text-slate-800 font-medium leading-relaxed bg-white p-2 rounded border border-slate-200">
                        "{ctx.sentenceEn}"
                      </p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block mb-0.5">🇰🇷 문장 한글 해석:</span>
                      <p className="text-slate-600 leading-relaxed italic bg-white p-2 rounded border border-slate-200">
                        "{ctx.sentenceKo}"
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* Why This Keyword Matters */}
              <div className="bg-amber-50/80 border border-amber-200 p-3.5 rounded-xl space-y-1">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>왜 이 키워드가 중요할까요? (지문 역할 & 맥락 분석)</span>
                </div>
                <p className="text-xs text-amber-950 font-medium leading-relaxed">
                  {getImportanceExplanation(activeAnalysisKeyword)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
