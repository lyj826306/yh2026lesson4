import { ParagraphData } from '../types';

export const PARAGRAPHS_DATA: ParagraphData[] = [
  {
    id: 1,
    page: 'p.93',
    title: 'Paragraph 1',
    subtitleKo: '순환 끊기: 전자 쓰레기에 대한 해결책',
    textEn: `On her way to a study group meeting, Liz accidentally dropped her laptop on the street, seriously damaging it. Although it still turns on, the screen is cracked, and some keys are not working. She can have it repaired, but she is hesitating to do so. Sometimes repairs are expensive, and they often take a long time. Besides, the laptop is about five years old. In this case, getting rid of the old one and purchasing a new one might seem like a more reasonable option. In reality, however, it may not be the best thing to do. If Liz throws her laptop in the trash, she will be contributing to a serious problem: e-waste.`,
    textKo: `스터디 그룹 모임에 가는 길에, Liz는 실수로 그녀의 노트북을 길에 떨어트려 그것을 심각하게 손상시켰다. 그것은 여전히 켜지기는 하지만, 화면은 금이 갔고, 몇몇 키들은 작동하지 않는다. 그녀는 그것을 수리할 수 있지만, 그렇게 하기를 망설이고 있다. 때때로 수리 작업은 돈이 많이 들고, 보통 오랜 시간이 걸린다. 게다가 그 노트북은 5년 정도 되었다. 이 경우에 오래된 노트북은 버리고 새로운 것을 구입하는 것이 더 합리적인 선택처럼 보일 수 있다. 하지만 실제로는 그것이 최선이 아닐 수 있다. 만약 Liz가 그녀의 노트북을 쓰레기통에 버린다면, 그녀는 전자 쓰레기라는 심각한 문제에 기여하게 될 것이다.`,
    keywords: [
      { id: 'p1_k1', word: 'dropped', meaning: '떨어뜨렸다', paragraphId: 1 },
      { id: 'p1_k2', word: 'damaging', meaning: '손상시키는', paragraphId: 1 },
      { id: 'p1_k3', word: 'repaired', meaning: '수리된', paragraphId: 1 },
      { id: 'p1_k4', word: 'hesitating', meaning: '망설이는', paragraphId: 1 },
      { id: 'p1_k5', word: 'reasonable', meaning: '합리적인', paragraphId: 1 },
      { id: 'p1_k6', word: 'contributing to', meaning: '~에 기여하는 / 원인이 되는', paragraphId: 1 },
      { id: 'p1_k7', word: 'e-waste', meaning: '전자 쓰레기', paragraphId: 1 },
    ],
    sentences: [
      {
        id: 'p1_s1',
        paragraphId: 1,
        sentenceEn: 'Although it still turns on, the screen is cracked, and some keys are not working.',
        fullKo: '그것은 여전히 켜지기는 하지만, 화면은 금이 갔고, 몇몇 키들은 작동하지 않는다.',
        easy: {
          textWithBlanks: '그것은 여전히 켜지기는 하지만, 화면은 ___ 갔고, 몇몇 키들은 작동하지 ___ .',
          missingWords: ['금이', '않는다'],
          choices: ['금이', '않는다', '깨져', '화면', '버려'],
        },
        medium: {
          textWithBlanks: '그것은 ___ 켜지기는 하지만, ___ 금이 갔고, ___ 키들은 ___ ___ .',
          missingWords: ['여전히', '화면은', '몇몇', '작동하지', '않는다'],
          choices: ['여전히', '화면은', '몇몇', '작동하지', '않는다', '전혀', '버려지고', '수리되고'],
        },
        hard: {
          fragments: ['그것은 여전히 켜지기는 하지만,', '화면은 금이 갔고,', '몇몇 키들은', '작동하지', '않는다.', '노트북 수리가 필요하다.'],
        },
      },
      {
        id: 'p1_s2',
        paragraphId: 1,
        sentenceEn: 'In this case, getting rid of the old one and purchasing a new one might seem like a more reasonable option.',
        fullKo: '이 경우에 오래된 노트북은 버리고 새로운 것을 구입하는 것이 더 합리적인 선택처럼 보일 수 있다.',
        easy: {
          textWithBlanks: '이 경우에 오래된 노트북은 버리고 ___ 것을 구입하는 것이 더 ___ 선택처럼 보일 수 있다.',
          missingWords: ['새로운', '합리적인'],
          choices: ['새로운', '합리적인', '비싼', '어려운', '수리할'],
        },
        medium: {
          textWithBlanks: '이 경우에 ___ 노트북은 ___ 새로운 것을 ___ 것이 더 ___ 선택처럼 ___ 수 있다.',
          missingWords: ['오래된', '버리고', '구입하는', '합리적인', '보일'],
          choices: ['오래된', '버리고', '구입하는', '합리적인', '보일', '새로운', '수리하는', '복잡한'],
        },
        hard: {
          fragments: ['이 경우에', '오래된 노트북은 버리고', '새로운 것을 구입하는 것이', '더 합리적인 선택처럼', '보일 수', '있다.'],
        },
      },
      {
        id: 'p1_s3',
        paragraphId: 1,
        sentenceEn: 'If Liz throws her laptop in the trash, she will be contributing to a serious problem: e-waste.',
        fullKo: '만약 Liz가 그녀의 노트북을 쓰레기통에 버린다면, 그녀는 전자 쓰레기라는 심각한 문제에 기여하게 될 것이다.',
        easy: {
          textWithBlanks: '만약 Liz가 그녀의 노트북을 쓰레기통에 ___ , 그녀는 전자 쓰레기라는 ___ 문제에 기여하게 될 것이다.',
          missingWords: ['버린다면', '심각한'],
          choices: ['버린다면', '심각한', '수리한다면', '간단한', '사게'],
        },
        medium: {
          textWithBlanks: '만약 Liz가 그녀의 ___ 쓰레기통에 ___ , 그녀는 ___ 쓰레기라는 ___ 문제에 ___ 될 것이다.',
          missingWords: ['노트북을', '버린다면', '전자', '심각한', '기여하게'],
          choices: ['노트북을', '버린다면', '전자', '심각한', '기여하게', '방지하게', '플라스틱', '사게'],
        },
        hard: {
          fragments: ['만약 Liz가 그녀의 노트북을', '쓰레기통에 버린다면,', '그녀는 전자 쓰레기라는', '심각한 문제에', '기여하게', '될 것이다.'],
        },
      },
    ],
    comprehension: {
      q1: {
        id: 'p1_c1',
        questionKo: 'Liz의 노트북 상황에 관한 본문의 내용과 일치하는 것은?',
        optionsKo: [
          '노트북 전원이 전혀 켜지지 않는다.',
          '노트북을 산 지 1년밖에 되지 않았다.',
          '수리 비용과 시간, 사용 연수 때문에 수리를 망설이고 있다.',
          '이미 노트북을 쓰레기통에 버렸다.',
        ],
        answerIndex: 2,
        explanation: 'Liz는 전원은 켜지지만 화면 금과 키 고장, 비싼 수리비, 오랜 수리시간, 5년 된 사용 연수 때문에 수리를 망설이고 있습니다.',
      },
      q2: {
        id: 'p1_c2',
        statementEn: 'Liz hesitates to repair her laptop because repairs can be expensive and time-consuming.',
        isTrue: true,
        explanation: '본문에서 "Sometimes repairs are expensive, and they often take a long time."이라고 언급되어 있습니다.',
      },
      q3: {
        id: 'p1_c3',
        questionEn: 'What is the main topic of Paragraph 1?',
        optionsEn: [
          'How to replace broken laptop screens easily',
          'Liz’s situation and how throwing away devices contributes to e-waste',
          'The history of personal computer development',
          'Why new laptops are much faster than five-year-old ones',
        ],
        answerIndex: 1,
        explanation: 'Liz의 실수로 손상된 노트북 상황을 통해 고장 난 기기를 버리는 것이 전자 쓰레기(e-waste) 문제로 이어짐을 소개하고 있습니다.',
      },
    },
  },
  {
    id: 2,
    page: 'p.94',
    title: 'Paragraph 2',
    subtitleKo: '전자 쓰레기란 정확히 무엇인가?',
    textEn: `What exactly is e-waste? The term refers to discarded electronic devices and electrical appliances. Due to toxic materials contained in these products, such as lead, e-waste is a serious health and environmental hazard. To make matters worse, the amount of e-waste produced each year is increasing at an alarming rate. In 2021, a total of 57.4 million metric tons of e-waste was generated worldwide, which was a 37% increase from 2014, the year when data about e-waste was first collected. Experts predict that by 2030, the amount of e-waste generated annually will have doubled in just 16 years. For this reason, efforts are being made to address this problem, most of which are focused on making products easier to repair. Let’s take a look at some practical approaches from around the world.`,
    textKo: `전자 쓰레기란 정확히 무엇인가? 이 용어는 버려진 전자 장치와 전기 기기를 나타낸다. 이 제품들에 포함된 납과 같은 유독성 물질 때문에 전자 쓰레기는 심각한 건강 및 환경 위험 요소이다. 설상가상으로, 매년 생산되는 전자 쓰레기의 양은 걱정스러운 속도로 증가하고 있다. 2021년에 전 세계적으로 총 5,740만 메트릭톤의 전자 쓰레기가 발생했는데, 이는 전자 쓰레기에 대한 자료가 처음으로 수집된 해인 2014년에 비해 37% 증가한 것이다. 전문가들은 2030년에는 매년 발생하는 전자 쓰레기의 양이 단 16년 만에 두 배가 될 것으로 예측한다. 이러한 이유로 이 문제를 다루기 위해 노력이 이루어지고 있는데, 이 중 대부분은 제품들을 수리하기 더 쉽게 만드는 것에 중점을 두고 있다. 전 세계의 현실성 있는 접근법을 몇 가지 살펴보자.`,
    keywords: [
      { id: 'p2_k1', word: 'discarded', meaning: '버려진', paragraphId: 2 },
      { id: 'p2_k2', word: 'toxic materials', meaning: '유독성 물질', paragraphId: 2 },
      { id: 'p2_k3', word: 'hazard', meaning: '위험 요소', paragraphId: 2 },
      { id: 'p2_k4', word: 'alarming rate', meaning: '걱정스러운 속도', paragraphId: 2 },
      { id: 'p2_k5', word: 'generated', meaning: '발생된 / 생성된', paragraphId: 2 },
      { id: 'p2_k6', word: 'doubled', meaning: '두 배가 된', paragraphId: 2 },
      { id: 'p2_k7', word: 'address', meaning: '다루다 / 해결하다', paragraphId: 2 },
    ],
    sentences: [
      {
        id: 'p2_s1',
        paragraphId: 2,
        sentenceEn: 'The term refers to discarded electronic devices and electrical appliances.',
        fullKo: '이 용어는 버려진 전자 장치와 전기 기기를 나타낸다.',
        easy: {
          textWithBlanks: '이 용어는 ___ 전자 장치와 전기 기기를 ___ .',
          missingWords: ['버려진', '나타낸다'],
          choices: ['버려진', '나타낸다', '새로운', '수리한다', '감춘다'],
        },
        medium: {
          textWithBlanks: '이 ___ ___ 전자 ___ 전기 ___ ___ .',
          missingWords: ['용어는', '버려진', '장치와', '기기를', '나타낸다'],
          choices: ['용어는', '버려진', '장치와', '기기를', '나타낸다', '수리점은', '새로운', '부품을'],
        },
        hard: {
          fragments: ['이 용어는', '버려진', '전자 장치와', '전기 기기를', '나타낸다.', '전자 쓰레기의 정의이다.'],
        },
      },
      {
        id: 'p2_s2',
        paragraphId: 2,
        sentenceEn: 'Due to toxic materials contained in these products, such as lead, e-waste is a serious health and environmental hazard.',
        fullKo: '이 제품들에 포함된 납과 같은 유독성 물질 때문에 전자 쓰레기는 심각한 건강 및 환경 위험 요소이다.',
        easy: {
          textWithBlanks: '이 제품들에 포함된 납과 같은 ___ 물질 때문에 전자 쓰레기는 심각한 건강 및 환경 ___ 요소이다.',
          missingWords: ['유독성', '위험'],
          choices: ['유독성', '위험', '안전한', '이익', '재활용'],
        },
        medium: {
          textWithBlanks: '이 제품들에 ___ 납과 같은 ___ 물질 ___ 전자 쓰레기는 심각한 ___ 및 환경 ___ 요소이다.',
          missingWords: ['포함된', '유독성', '때문에', '건강', '위험'],
          choices: ['포함된', '유독성', '때문에', '건강', '위험', '제외된', '덕분에', '산업'],
        },
        hard: {
          fragments: ['이 제품들에 포함된', '납과 같은 유독성 물질 때문에', '전자 쓰레기는 심각한', '건강 및 환경', '위험 요소이다.', '심각한 문제이다.'],
        },
      },
      {
        id: 'p2_s3',
        paragraphId: 2,
        sentenceEn: 'Experts predict that by 2030, the amount of e-waste generated annually will have doubled in just 16 years.',
        fullKo: '전문가들은 2030년에는 매년 발생하는 전자 쓰레기의 양이 단 16년 만에 두 배가 될 것으로 예측한다.',
        easy: {
          textWithBlanks: '전문가들은 2030년에는 매년 발생하는 전자 쓰레기의 양이 단 16년 만에 ___ 배가 될 것으로 ___ .',
          missingWords: ['두', '예측한다'],
          choices: ['두', '예측한다', '세', '단언한다', '부인한다'],
        },
        medium: {
          textWithBlanks: '전문가들은 2030년에는 ___ ___ 전자 쓰레기의 ___ 단 16년 만에 ___ 배가 될 것으로 ___ .',
          missingWords: ['매년', '발생하는', '양이', '두', '예측한다'],
          choices: ['매년', '발생하는', '양이', '두', '예측한다', '갑자기', '줄어드는', '종류가'],
        },
        hard: {
          fragments: ['전문가들은 2030년에는', '매년 발생하는', '전자 쓰레기의 양이', '단 16년 만에', '두 배가 될 것으로', '예측한다.'],
        },
      },
    ],
    comprehension: {
      q1: {
        id: 'p2_c1',
        questionKo: '전자 쓰레기(e-waste)에 관한 2문단의 내용과 일치하지 않는 것은?',
        optionsKo: [
          '납과 같은 유독 물질을 포함하고 있다.',
          '2021년 전 세계적으로 5,740만 메트릭톤이 발생했다.',
          '전자 쓰레기 양은 해마다 꾸준히 감소하고 있다.',
          '이 문제를 다루기 위해 제품 수리를 더 쉽게 만드는 노력이 이어지고 있다.',
        ],
        answerIndex: 2,
        explanation: '전자 쓰레기의 양은 걱정스러운 속도로 증가하고 있으며 2030년에는 16년 만에 2배가 될 것으로 예측되고 있습니다.',
      },
      q2: {
        id: 'p2_c2',
        statementEn: 'According to experts, the annual amount of e-waste will double by 2030 compared to when data was first collected in 2014.',
        isTrue: true,
        explanation: '본문에서 2014년 최초 수집 이후 16년 뒤인 2030년까지 연간 전자 쓰레기 발생량이 두 배가 될 것이라고 언급했습니다.',
      },
      q3: {
        id: 'p2_c3',
        questionEn: 'What is the main definition and problem of e-waste described in Paragraph 2?',
        optionsEn: [
          'It refers to discarded electric items with toxic chemicals that are rapidly growing worldwide.',
          'It is a clean source of renewable energy for modern cities.',
          'It is plastic waste dumped into the ocean by cargo ships.',
          'It is a minor problem that will resolve automatically in 2030.',
        ],
        answerIndex: 0,
        explanation: '2문단은 버려진 전자/전기 기기인 e-waste의 정의와 유독 물질 함유, 빠르게 증가하는 심각성에 대해 다룹니다.',
      },
    },
  },
  {
    id: 3,
    page: 'p.95',
    title: 'Paragraph 3',
    subtitleKo: '수리할 권리 운동: 소비자들에게 권한 부여하기',
    textEn: `Right-to-Repair Movement: Empowering Consumers
One reason many people dispose of their damaged devices is that they are too difficult to repair. For example, a device may be difficult to disassemble, or its manufacturer may require that it be brought to an official service center to be fixed. Many companies do not allow their customers to take their damaged items to third-party repair shops. What is more, some products are intentionally designed to be difficult to repair. It is common for consumers to be unable to acquire the instructions for how to fix their items or the parts needed to complete repairs.
The right-to-repair movement is trying to solve these problems by promoting legislation that states the following: If you own a product, you have the right to fix it yourself or bring it to a technician of your choice. To protect the rights of consumers, the right-to-repair movement demands four things. First, companies must make information about their products available to everyone. Second, third parties, including individuals, should be able to obtain the parts and tools required to make repairs. Third, the practice of preventing consumers from installing custom software on their own devices should be prohibited by law. Finally, it demands that manufacturers design devices in a way that makes repairs as easy as possible. Advocates of the movement say that if all these goals are accomplished, far less e-waste will be generated. Thanks to their efforts, more than 40 states in the U.S. have begun working on right-to-repair legislation. This movement is gaining a growing influence in Europe as well, with more and more countries joining the cause.`,
    textKo: `수리할 권리 운동: 소비자들에게 권한 부여하기
많은 사람이 그들의 고장 난 장치들을 버리는 한 가지 이유는 그것들이 수리하기 너무 어렵기 때문이다. 예를 들어, 어떤 장치는 분해하기 어려울 수 있고, 또는 그것의 제조사가 그것을 고치려면 공식 수리소로 가져올 것을 요구할 수도 있다. 많은 회사는 그들의 고객들이 고장 난 물건들을 제삼자의 수리점으로 가지고 가는 것을 허용하지 않는다. 게다가, 몇몇 제품은 의도적으로 수리하기 어렵게 만들어진다. 소비자들이 그들의 물건을 고치는 방법에 대한 설명이나 수리를 완료하기 위해 필요한 부품들을 얻지 못하는 것은 흔하다. 
수리할 권리 운동은 다음 내용을 명시하는 법률 제정을 추진함으로써 이러한 문제들을 해결하려고 하고 있는데, 그것은 만약 당신이 어떤 제품을 소유하고 있다면, 당신은 그것을 직접 고치거나 당신이 선택한 기술자에게 가지고 갈 권리가 있다는 내용이다. 소비자의 권리를 보호하기 위해, 수리할 권리 운동은 네 가지를 요구한다. 첫 번째로, 회사들은 그들의 제품에 대한 정보를 모두가 이용할 수 있게 해야 한다. 두 번째로, 개인을 포함한 제삼자가 수리를 하기 위해 필요한 부품들과 도구들을 구할 수 있어야 한다. 세 번째로, 소비자들이 맞춤형 소프트웨어를 자신의 장치에 설치하지 못하게 하는 행위는 법으로 금지되어야 한다. 마지막으로, 그것은 제조사들에게 수리를 최대한 쉽게 만드는 방식으로 장치를 설계할 것을 요구한다. 이 운동의 지지자들은 만약 이 모든 목표가 이루어진다면, 훨씬 적은 전자 쓰레기가 발생할 것이라고 말한다. 그들의 노력 덕분에 미국 40개 이상의 주에서 수리할 권리 법률 제정을 위해 노력하기 시작했다. 이 운동은 점점 더 많은 국가들이 그 대의에 동참하면서 유럽에서도 영향력이 커지고 있다.`,
    keywords: [
      { id: 'p3_k1', word: 'dispose of', meaning: '~을 처리하다 / 버리다', paragraphId: 3 },
      { id: 'p3_k2', word: 'disassemble', meaning: '분해하다', paragraphId: 3 },
      { id: 'p3_k3', word: 'third-party', meaning: '제삼자 / 사설 업체', paragraphId: 3 },
      { id: 'p3_k4', word: 'intentionally', meaning: '의도적으로', paragraphId: 3 },
      { id: 'p3_k5', word: 'legislation', meaning: '법률 / 입법', paragraphId: 3 },
      { id: 'p3_k6', word: 'prohibited', meaning: '금지된', paragraphId: 3 },
      { id: 'p3_k7', word: 'advocates', meaning: '지지자들', paragraphId: 3 },
    ],
    sentences: [
      {
        id: 'p3_s1',
        paragraphId: 3,
        sentenceEn: 'One reason many people dispose of their damaged devices is that they are too difficult to repair.',
        fullKo: '많은 사람이 그들의 고장 난 장치들을 버리는 한 가지 이유는 그것들이 수리하기 너무 어렵기 때문이다.',
        easy: {
          textWithBlanks: '많은 사람이 그들의 고장 난 장치들을 ___ 한 가지 이유는 그것들이 수리하기 너무 ___ 때문이다.',
          missingWords: ['버리는', '어렵기'],
          choices: ['버리는', '어렵기', '구입하는', '쉽기', '싸기'],
        },
        medium: {
          textWithBlanks: '많은 ___ 그들의 ___ 장치들을 ___ 한 가지 ___ 그것들이 수리하기 ___ 어렵기 때문이다.',
          missingWords: ['사람이', '고장 난', '버리는', '이유는', '너무'],
          choices: ['사람이', '고장 난', '버리는', '이유는', '너무', '기업이', '새로운', '전혀'],
        },
        hard: {
          fragments: ['많은 사람이', '그들의 고장 난 장치들을', '버리는 한 가지 이유는', '그것들이 수리하기', '너무 어렵기', '때문이다.'],
        },
      },
      {
        id: 'p3_s2',
        paragraphId: 3,
        sentenceEn: 'If you own a product, you have the right to fix it yourself or bring it to a technician of your choice.',
        fullKo: '만약 당신이 어떤 제품을 소유하고 있다면, 당신은 그것을 직접 고치거나 당신이 선택한 기술자에게 가지고 갈 권리가 있다.',
        easy: {
          textWithBlanks: '만약 당신이 어떤 제품을 ___ 있다면, 당신은 그것을 직접 고치거나 당신이 선택한 기술자에게 가지고 갈 ___ 있다.',
          missingWords: ['소유하고', '권리가'],
          choices: ['소유하고', '권리가', '버리고', '의무가', '기회가'],
        },
        medium: {
          textWithBlanks: '만약 당신이 ___ 제품을 ___ 있다면, 당신은 그것을 ___ 고치거나 당신이 ___ 기술자에게 가지고 갈 ___ 있다.',
          missingWords: ['어떤', '소유하고', '직접', '선택한', '권리가'],
          choices: ['어떤', '소유하고', '직접', '선택한', '권리가', '모든', '간신히', '의무가'],
        },
        hard: {
          fragments: ['만약 당신이 어떤 제품을', '소유하고 있다면, 당신은', '그것을 직접 고치거나', '당신이 선택한 기술자에게', '가지고 갈', '권리가 있다.'],
        },
      },
      {
        id: 'p3_s3',
        paragraphId: 3,
        sentenceEn: 'Advocates of the movement say that if all these goals are accomplished, far less e-waste will be generated.',
        fullKo: '이 운동의 지지자들은 만약 이 모든 목표가 이루어진다면, 훨씬 적은 전자 쓰레기가 발생할 것이라고 말한다.',
        easy: {
          textWithBlanks: '이 운동의 ___ 만약 이 모든 목표가 이루어진다면, 훨씬 적은 전자 쓰레기가 ___ 것이라고 말한다.',
          missingWords: ['지지자들은', '발생할'],
          choices: ['지지자들은', '발생할', '반대자들은', '감소할', '사라질'],
        },
        medium: {
          textWithBlanks: '이 운동의 ___ 만약 이 ___ 목표가 ___ , ___ 적은 전자 쓰레기가 ___ 것이라고 말한다.',
          missingWords: ['지지자들은', '모든', '이루어진다면', '훨씬', '발생할'],
          choices: ['지지자들은', '모든', '이루어진다면', '훨씬', '발생할', '반대자들은', '일부', '조금'],
        },
        hard: {
          fragments: ['이 운동의 지지자들은', '만약 이 모든 목표가', '이루어진다면,', '훨씬 적은 전자 쓰레기가', '발생할 것이라고', '말한다.'],
        },
      },
    ],
    comprehension: {
      q1: {
        id: 'p3_c1',
        questionKo: '수리할 권리 운동(Right-to-Repair Movement)이 요구하는 4가지 사항에 포함되지 않는 것은?',
        optionsKo: [
          '제조사는 제품 정보에 대해 모두가 접근할 수 있게 해야 한다.',
          '제삼자(개인 포함)도 수리에 필요한 부품과 도구를 구할 수 있어야 한다.',
          '제조사는 모든 소비자가 2년마다 새로운 기기를 구매하도록 의무화해야 한다.',
          '제조사는 수리가 가능한 한 쉽게 이루어지도록 장치를 설계해야 한다.',
        ],
        answerIndex: 2,
        explanation: '수리할 권리 운동은 1) 정보 공개, 2) 부품/도구 제공, 3) 맞춤 소프트웨어 설치 금지 법안, 4) 수리 쉬운 설계 요구를 담고 있습니다.',
      },
      q2: {
        id: 'p3_c2',
        statementEn: 'The Right-to-Repair movement aims to ensure consumers can fix their own devices or take them to any technician they choose.',
        isTrue: true,
        explanation: '본문에서 "If you own a product, you have the right to fix it yourself or bring it to a technician of your choice."라고 밝히고 있습니다.',
      },
      q3: {
        id: 'p3_c3',
        questionEn: 'What is the core objective of the Right-to-Repair movement described in Paragraph 3?',
        optionsEn: [
          'To ban official manufacturer service centers completely',
          'To empower consumers with rights and access to fix their broken devices and reduce e-waste',
          'To lower the price of purchasing brand new smartphones every year',
          'To require tech companies to manufacture all parts inside the United States',
        ],
        answerIndex: 1,
        explanation: '3문단은 소비자가 자가 수리나 제삼자 수리를 쉽게 할 수 있도록 보장하고, 전자 쓰레기 줄이기를 목표로 하는 수리할 권리 운동을 다룹니다.',
      },
    },
  },
  {
    id: 4,
    page: 'p.96',
    title: 'Paragraph 4',
    subtitleKo: '수리 가능성 지수: 한눈에 보는 정보',
    textEn: `In January 2021, the French government passed a bill that requires that every manufacturer include a “repairability index” on five categories of electronic devices and electrical appliances: smartphones, laptops, washing machines, televisions, and lawn mowers. Using a score ranging from 0 to 10, as well as a color-coded system, the index lets consumers see how easily the product can be repaired before they purchase it. The index takes into account several elements, including the availability of repair information, the ease of disassembly, and the price of spare parts. A low number on a bright red label means that repairing the product will be difficult, whereas a high number on a green label indicates that the product is easy to repair.`,
    textKo: `2021년 1월, 프랑스 정부는 모든 제조사가 스마트폰, 노트북, 세탁기, 텔레비전, 그리고 잔디 깎는 기계라는 다섯 가지 종류의 전자 장치와 전자 기기에 ‘수리 가능성 지수’를 포함시킬 것을 요구하는 법안을 통과시켰다. 그 지수는 색상으로 표시되는 시스템뿐만 아니라 0에서 10 사이의 점수도 사용하여 소비자들이 제품을 구입하기 전에 그것이 얼마나 쉽게 수리될 수 있는지 알 수 있게 해준다. 그 지수는 수리 정보의 이용 가능성, 분해의 용이성, 그리고 여분 부품의 가격을 포함하여 몇 가지 요소를 고려한다. 초록색 라벨의 높은 숫자는 그 제품이 수리하기 쉽다는 것을 나타내는 데에 반하여, 밝은 빨간색 라벨의 낮은 숫자는 그 제품을 수리하는 것이 어려울 것이라는 것을 의미한다.`,
    keywords: [
      { id: 'p4_k1', word: 'passed a bill', meaning: '법안을 통과시켰다', paragraphId: 4 },
      { id: 'p4_k2', word: 'repairability index', meaning: '수리 가능성 지수', paragraphId: 4 },
      { id: 'p4_k3', word: 'color-coded', meaning: '색상으로 표시된', paragraphId: 4 },
      { id: 'p4_k4', word: 'takes into account', meaning: '~을 고려하다', paragraphId: 4 },
      { id: 'p4_k5', word: 'availability', meaning: '이용 가능성', paragraphId: 4 },
      { id: 'p4_k6', word: 'spare parts', meaning: '여분 부품', paragraphId: 4 },
      { id: 'p4_k7', word: 'indicates', meaning: '나타내다 / 지시하다', paragraphId: 4 },
    ],
    sentences: [
      {
        id: 'p4_s1',
        paragraphId: 4,
        sentenceEn: 'In January 2021, the French government passed a bill that requires that every manufacturer include a “repairability index” on five categories of electronic devices.',
        fullKo: '2021년 1월, 프랑스 정부는 모든 제조사가 5개 카테고리의 전자 기기에 ‘수리 가능성 지수’를 포함하도록 요구하는 법안을 통과시켰다.',
        easy: {
          textWithBlanks: '2021년 1월, 프랑스 정부는 모든 제조사가 5개 카테고리의 전자 기기에 ‘수리 가능성 ___ ’를 포함하도록 요구하는 ___ 통과시켰다.',
          missingWords: ['지수', '법안을'],
          choices: ['지수', '법안을', '가격', '경고를', '세금을'],
        },
        medium: {
          textWithBlanks: '2021년 1월, 프랑스 ___ 모든 ___ 5개 카테고리의 전자 기기에 ‘수리 가능성 지수’를 ___ 요구하는 ___ ___ .',
          missingWords: ['정부는', '제조사가', '포함하도록', '법안을', '통과시켰다'],
          choices: ['정부는', '제조사가', '포함하도록', '법안을', '통과시켰다', '소비자가', '삭제하도록', '부결했다'],
        },
        hard: {
          fragments: ['2021년 1월, 프랑스 정부는', '모든 제조사가 5개 카테고리의', '전자 기기에', '‘수리 가능성 지수’를 포함하도록', '요구하는 법안을', '통과시켰다.'],
        },
      },
      {
        id: 'p4_s2',
        paragraphId: 4,
        sentenceEn: 'Using a score ranging from 0 to 10, as well as a color-coded system, the index lets consumers see how easily the product can be repaired.',
        fullKo: '0에서 10 사이의 점수와 색상 표시 시스템을 통해, 그 지수는 소비자가 제품이 얼마나 쉽게 수리될 수 있는지 알 수 있게 해준다.',
        easy: {
          textWithBlanks: '0에서 10 사이의 ___ 색상 표시 시스템을 통해, 그 지수는 소비자가 제품이 얼마나 쉽게 ___ 될 수 있는지 알 수 있게 해준다.',
          missingWords: ['점수와', '수리'],
          choices: ['점수와', '수리', '비용과', '폐기', '판매'],
        },
        medium: {
          textWithBlanks: '0에서 10 사이의 ___ ___ 표시 시스템을 통해, 그 지수는 ___ 제품이 얼마나 ___ 수리될 수 있는지 ___ 해준다.',
          missingWords: ['점수와', '색상', '소비자가', '쉽게', '알 수 있게'],
          choices: ['점수와', '색상', '소비자가', '쉽게', '알 수 있게', '비용과', '어렵게', '모르게'],
        },
        hard: {
          fragments: ['0에서 10 사이의 점수와', '색상 표시 시스템을 통해,', '그 지수는 소비자가', '제품이 얼마나 쉽게', '수리될 수 있는지', '알 수 있게 해준다.'],
        },
      },
      {
        id: 'p4_s3',
        paragraphId: 4,
        sentenceEn: 'A low number on a bright red label means that repairing the product will be difficult, whereas a high number on a green label indicates that the product is easy to repair.',
        fullKo: '밝은 빨간색 라벨의 낮은 숫자는 제품 수리가 어렵다는 것을 의미하는 반면, 초록색 라벨의 높은 숫자는 수리가 쉽다는 것을 나타낸다.',
        easy: {
          textWithBlanks: '밝은 빨간색 라벨의 ___ 숫자는 제품 수리가 어렵다는 것을 의미하는 반면, 초록색 라벨의 ___ 숫자는 수리가 쉽다는 것을 나타낸다.',
          missingWords: ['낮은', '높은'],
          choices: ['낮은', '높은', '동일한', '복잡한'],
        },
        medium: {
          textWithBlanks: '밝은 ___ 라벨의 ___ 숫자는 제품 수리가 ___ 것을 의미하는 반면, 초록색 라벨의 높은 숫자는 수리가 ___ 것을 ___ .',
          missingWords: ['빨간색', '낮은', '어렵다는', '쉽다는', '나타낸다'],
          choices: ['빨간색', '낮은', '어렵다는', '쉽다는', '나타낸다', '파란색', '높은', '불가능하다는'],
        },
        hard: {
          fragments: ['밝은 빨간색 라벨의 낮은 숫자는', '제품 수리가 어렵다는 것을 의미하는 반면,', '초록색 라벨의 높은 숫자는', '제품이 수리하기 쉽다는 것을', '분명하게', '나타낸다.'],
        },
      },
    ],
    comprehension: {
      q1: {
        id: 'p4_c1',
        questionKo: '프랑스의 수리 가능성 지수(repairability index)에 대한 설명으로 옳은 것은?',
        optionsKo: [
          '모든 공산품에 무조건 의무 적용된다.',
          '0부터 10까지의 점수 및 색상 시스템으로 제품 수리 용이성을 보여준다.',
          '빨간색 라벨에 높은 숫자가 적혀 있을수록 수리가 쉬운 제품이다.',
          '제품의 수리 비용만을 전적으로 고려하여 평가한다.',
        ],
        answerIndex: 1,
        explanation: '수리 가능성 지수는 0~10 점수와 색상 라벨을 사용하여 수리 정보 접근성, 분해 용이성, 부품 가격 등을 고려해 점수를 매깁니다.',
      },
      q2: {
        id: 'p4_c2',
        statementEn: 'A green label with a high score on a product indicates that the device is relatively easy to disassemble and repair.',
        isTrue: true,
        explanation: '본문에서 "a high number on a green label indicates that the product is easy to repair"라고 명시하고 있습니다.',
      },
      q3: {
        id: 'p4_c3',
        questionEn: 'Which 5 categories of electronic devices were mandated by the French bill to include a repairability index?',
        optionsEn: [
          'Smartphones, laptops, washing machines, televisions, and lawn mowers',
          'Microwaves, refrigerators, cars, bicycles, and hair dryers',
          'Cameras, sound speakers, air conditioners, heaters, and printers',
          'Smartwatches, tablets, gaming consoles, drones, and electric scooters',
        ],
        answerIndex: 0,
        explanation: '4문단에 명시된 5개 제품군: smartphones, laptops, washing machines, televisions, lawn mowers 입니다.',
      },
    },
  },
  {
    id: 5,
    page: 'p.97',
    title: 'Paragraph 5',
    subtitleKo: '수리 가능성 지수의 긍정적 효과와 파급력',
    textEn: `The index was designed to have two positive effects. Firstly, it allows consumers to make informed decisions when purchasing new devices and appliances. Secondly, it encourages manufacturers to make their products easier to repair. As a result, with fewer electronic and electrical items ending up in its landfills, France can expect to make a transition to a more sustainable society in the near future. The impact of the index, however, is likely to spread far beyond France. We live in a global economy, and any company that wants to sell its appliances on the French market will need to label its products according to the repairability index. If the index is successful, we can anticipate seeing more countries around the world following France’s innovative lead.`,
    textKo: `그 지수는 두 가지의 긍정적인 효과를 가지도록 만들어졌다. 첫 번째로, 그것은 소비자들이 새로운 장치와 기기를 구입할 때 정보에 근거한 결정을 내릴 수 있도록 한다. 두 번째로, 그것은 제조사들이 자신의 제품을 수리하기 더 쉽게 만들도록 장려한다. 결과적으로, 더 적은 전자 및 전기 제품들이 쓰레기 매립지에 이르게 되면서, 프랑스는 가까운 미래에 더 지속 가능한 사회로 변화할 것을 기대할 수 있다. 하지만 그 지수의 영향은 프랑스를 넘어 더 멀리 퍼질 가능성이 있다. 우리는 세계 경제 속에 살고 있으며, 프랑스 시장에서 기기를 판매하고 싶은 모든 회사는 그들의 제품에 수리 가능성 지수에 따라 라벨을 붙여야 할 것이다. 만약 이 지수가 성공적이라면, 우리는 전 세계의 더 많은 나라들이 프랑스의 혁신적인 선례를 따르는 것을 보길 기대할 수 있다.`,
    keywords: [
      { id: 'p5_k1', word: 'informed decisions', meaning: '정보에 근거한 결정', paragraphId: 5 },
      { id: 'p5_k2', word: 'encourages', meaning: '장려하다 / 격려하다', paragraphId: 5 },
      { id: 'p5_k3', word: 'landfills', meaning: '쓰레기 매립지', paragraphId: 5 },
      { id: 'p5_k4', word: 'sustainable', meaning: '지속 가능한', paragraphId: 5 },
      { id: 'p5_k5', word: 'transition', meaning: '전환 / 변화', paragraphId: 5 },
      { id: 'p5_k6', word: 'anticipate', meaning: '예상하다 / 기대하다', paragraphId: 5 },
      { id: 'p5_k7', word: 'innovative lead', meaning: '혁신적인 선례', paragraphId: 5 },
    ],
    sentences: [
      {
        id: 'p5_s1',
        paragraphId: 5,
        sentenceEn: 'Firstly, it allows consumers to make informed decisions when purchasing new devices and appliances.',
        fullKo: '첫 번째로, 그것은 소비자들이 새로운 장치와 기기를 구입할 때 정보에 근거한 결정을 내릴 수 있도록 한다.',
        easy: {
          textWithBlanks: '첫 번째로, 그것은 소비자들이 새로운 장치를 구입할 때 정보에 ___ 결정을 ___ 수 있도록 한다.',
          missingWords: ['근거한', '내릴'],
          choices: ['근거한', '내릴', '무관한', '포기할', '지연시킬'],
        },
        medium: {
          textWithBlanks: '첫 번째로, 그것은 ___ 새로운 장치와 기기를 ___ 때 정보에 ___ ___ ___ 수 있도록 한다.',
          missingWords: ['소비자들이', '구입할', '근거한', '결정을', '내릴'],
          choices: ['소비자들이', '구입할', '근거한', '결정을', '내릴', '제조사가', '수리할', '포기할'],
        },
        hard: {
          fragments: ['첫 번째로, 그것은 소비자들이', '새로운 장치와 기기를 구입할 때', '정보에 근거한 결정을', '스스로 신중하게', '내릴 수 있도록', '해준다.'],
        },
      },
      {
        id: 'p5_s2',
        paragraphId: 5,
        sentenceEn: 'France can expect to make a transition to a more sustainable society in the near future.',
        fullKo: '프랑스는 가까운 미래에 더 지속 가능한 사회로 변화할 것을 기대할 수 있다.',
        easy: {
          textWithBlanks: '프랑스는 가까운 미래에 더 ___ 가능한 사회로 ___ 것을 기대할 수 있다.',
          missingWords: ['지속', '변화할'],
          choices: ['지속', '변화할', '파괴', '후퇴할', '유지할'],
        },
        medium: {
          textWithBlanks: '프랑스는 ___ 미래에 더 ___ ___ 사회로 ___ 것을 ___ 수 있다.',
          missingWords: ['가까운', '지속', '가능한', '변화할', '기대할'],
          choices: ['가까운', '지속', '가능한', '변화할', '기대할', '아주 먼', '불가능한', '우려할'],
        },
        hard: {
          fragments: ['프랑스는 가까운 미래에', '더 지속 가능한', '사회로', '성공적인 변화를', '만들어 갈 것을', '기대할 수 있다.'],
        },
      },
      {
        id: 'p5_s3',
        paragraphId: 5,
        sentenceEn: 'If the index is successful, we can anticipate seeing more countries around the world following France’s innovative lead.',
        fullKo: '만약 이 지수가 성공적이라면, 우리는 전 세계의 더 많은 나라들이 프랑스의 혁신적인 선례를 따르는 것을 보길 기대할 수 있다.',
        easy: {
          textWithBlanks: '만약 이 지수가 ___ , 우리는 전 세계의 더 많은 나라들이 프랑스의 ___ 선례를 따르는 것을 기대할 수 있다.',
          missingWords: ['성공적이라면', '혁신적인'],
          choices: ['성공적이라면', '혁신적인', '실패한다면', '보수적인', '해로운'],
        },
        medium: {
          textWithBlanks: '만약 이 지수가 ___ , 우리는 ___ 더 많은 나라들이 프랑스의 ___ 선례를 ___ 보길 ___ 수 있다.',
          missingWords: ['성공적이라면', '전 세계의', '혁신적인', '따르는 것을', '기대할'],
          choices: ['성공적이라면', '전 세계의', '혁신적인', '따르는 것을', '기대할', '실패한다면', '유럽의', '거부하는 것을'],
        },
        hard: {
          fragments: ['만약 이 지수가 성공적이라면,', '우리는 전 세계의 더 많은 나라들이', '프랑스의 혁신적인 선례를', '적극적으로 따르는 모습을', '보게 될 것으로', '기대할 수 있다.'],
        },
      },
    ],
    comprehension: {
      q1: {
        id: 'p5_c1',
        questionKo: '수리 가능성 지수 도입이 가져올 긍정적인 효과로 본문에 언급되지 않은 것은?',
        optionsKo: [
          '소비자가 정보에 근거한 현명한 구매 결정을 내리게 돕는다.',
          '제조사들이 제품을 수리하기 쉽게 만들도록 독려한다.',
          '쓰레기 매립지로 가는 전자 제품 양을 줄여 지속 가능한 사회로 나아가게 한다.',
          '모든 전자 제품의 판매 가격을 반값 이하로 강제 하락시킨다.',
        ],
        answerIndex: 3,
        explanation: '수리 가능성 지수는 현명한 소비자 선택, 제조사 설계 변화, 쓰레기 매립 감소를 이끌어냅니다.',
      },
      q2: {
        id: 'p5_c2',
        statementEn: 'Global companies wishing to sell electrical appliances in France must label their products according to the French repairability index.',
        isTrue: true,
        explanation: '본문에서 "any company that wants to sell its appliances on the French market will need to label its products..."라고 설명하고 있습니다.',
      },
      q3: {
        id: 'p5_c3',
        questionEn: 'What is the broader global expectation regarding France’s repairability index in Paragraph 5?',
        optionsEn: [
          'It will force foreign companies to pull out of the French market completely.',
          'It can set an innovative lead that other nations around the world may follow.',
          'It will increase total waste in landfills across Europe.',
          'It will be replaced by a corporate subscription tax next year.',
        ],
        answerIndex: 1,
        explanation: '프랑스의 선도적 정책 성공 시 전 세계 다른 국가들도 혁신적 선례를 따를 것으로 기대한다는 내용입니다.',
      },
    },
  },
  {
    id: 6,
    page: 'p.98',
    title: 'Paragraph 6',
    subtitleKo: '수리 카페: 온 지역 사회가 나서야 한다',
    textEn: `When consumers are given the right tools and materials, along with some helpful advice, they can repair much of the damage that occurs to electronic products by themselves. That is why Repair Cafés were started. They are free meeting places where people can gather together and fix their broken devices. The cafés are staffed by volunteer experts who can give technical advice and teach people how to fix things.
The first Repair Café was opened in the Netherlands in the city of Amsterdam in 2009. It was such a success that the idea soon spread to neighboring countries. Before long, there were Repair Cafés in over 30 countries around the world. Along with preventing damaged items from becoming e-waste, these cafés also encourage people to share their invaluable skills and knowledge about the repair and maintenance of electronics. They continue to grow in popularity, with more and more people signing up to volunteer.
By providing spaces where people can learn, Repair Cafés enable individuals to maintain their devices and extend their life spans. Furthermore, they foster a sustainable perspective that can have a huge positive impact on our future.`,
    textKo: `소비자들에게 유용한 조언과 함께 알맞은 도구와 재료가 주어지면, 그들은 전자 제품에 발생하는 대부분의 손상을 직접 수리할 수 있다. 그것이 수리 카페가 시작된 이유이다. 그곳은 사람들이 함께 모여 자신들의 고장 난 장치들을 고칠 수 있는 자유로운 만남의 장소이다. 그 카페들은 기술적인 조언을 줄 수 있고, 사람들에게 물건을 고치는 방법을 가르쳐 줄 수 있는 자원봉사자 전문가들을 직원으로 두고 있다. 
가장 첫 번째 수리 카페는 네덜란드의 도시 암스테르담에서 2009년에 열렸다. 그것은 너무 성공적이어서 그 아이디어가 곧 이웃 나라들로 확산되었다. 얼마 후, 전 세계 30개국 이상에 수리 카페가 생겼다. 고장 난 물건들이 전자 쓰레기가 되는 것을 막는 것과 더불어, 이 카페들은 또한 사람들이 전자 제품의 수리와 보수 관리에 대한 매우 유용한 기술들과 지식을 공유할 수 있도록 장려한다. 점점 더 많은 사람들이 자원봉사를 하기 위해 신청하면서, 이 카페들은 계속해서 인기를 얻고 있다.
사람들이 배울 수 있는 공간을 제공함으로써, 수리 카페들은 개인이 자신들의 장치를 유지하고 그것들의 수명을 연장할 수 있게 한다. 게다가 그것들은 우리의 미래에 막대한 긍정적인 영향을 미칠 수 있는 지속 가능한 관점을 조성한다.`,
    keywords: [
      { id: 'p6_k1', word: 'volunteer experts', meaning: '자원봉사 전문가', paragraphId: 6 },
      { id: 'p6_k2', word: 'invaluable', meaning: '매우 귀중한', paragraphId: 6 },
      { id: 'p6_k3', word: 'maintenance', meaning: '보수 관리 / 유지', paragraphId: 6 },
      { id: 'p6_k4', word: 'extend', meaning: '연장하다', paragraphId: 6 },
      { id: 'p6_k5', word: 'life spans', meaning: '수명', paragraphId: 6 },
      { id: 'p6_k6', word: 'foster', meaning: '조성하다 / 육성하다', paragraphId: 6 },
      { id: 'p6_k7', word: 'perspective', meaning: '관점 / 시각', paragraphId: 6 },
    ],
    sentences: [
      {
        id: 'p6_s1',
        paragraphId: 6,
        sentenceEn: 'They are free meeting places where people can gather together and fix their broken devices.',
        fullKo: '그곳은 사람들이 함께 모여 자신들의 고장 난 장치들을 고칠 수 있는 자유로운 만남의 장소이다.',
        easy: {
          textWithBlanks: '그곳은 사람들이 함께 모여 자신들의 고장 난 장치들을 ___ 수 있는 ___ 만남의 장소이다.',
          missingWords: ['고칠', '자유로운'],
          choices: ['고칠', '자유로운', '버릴', '유료', '공장'],
        },
        medium: {
          textWithBlanks: '그곳은 ___ 함께 모여 자신들의 ___ 장치들을 ___ 수 있는 ___ ___ 장소이다.',
          missingWords: ['사람들이', '고장 난', '고칠', '자유로운', '만남의'],
          choices: ['사람들이', '고장 난', '고칠', '자유로운', '만남의', '기업들이', '새로운', '버릴'],
        },
        hard: {
          fragments: ['그곳은 사람들이 함께 모여', '자신들의 고장 난 장치들을', '직접 수리하고 고칠 수 있는', '자유롭고 열린', '만남의 공간이자', '장소이다.'],
        },
      },
      {
        id: 'p6_s2',
        paragraphId: 6,
        sentenceEn: 'The first Repair Café was opened in the Netherlands in the city of Amsterdam in 2009.',
        fullKo: '최초의 수리 카페는 2009년 네덜란드의 암스테르담에서 문을 열었다.',
        easy: {
          textWithBlanks: '최초의 수리 카페는 2009년 ___ 암스테르담에서 ___ 열었다.',
          missingWords: ['네덜란드의', '문을'],
          choices: ['네덜란드의', '문을', '프랑스의', '창문을', '미국의'],
        },
        medium: {
          textWithBlanks: '___ 수리 카페는 ___ ___ 암스테르담에서 ___ ___ .',
          missingWords: ['최초의', '2009년', '네덜란드의', '문을', '열었다'],
          choices: ['최초의', '2009년', '네덜란드의', '문을', '열었다', '최근의', '프랑스의', '닫았다'],
        },
        hard: {
          fragments: ['최초의 수리 카페는', '2009년', '네덜란드의 도시 암스테르담에서', '처음으로', '문을', '열었다.'],
        },
      },
      {
        id: 'p6_s3',
        paragraphId: 6,
        sentenceEn: 'By providing spaces where people can learn, Repair Cafés enable individuals to maintain their devices and extend their life spans.',
        fullKo: '배울 수 있는 공간을 제공함으로써, 수리 카페는 개인이 장치를 유지하고 수명을 연장할 수 있게 한다.',
        easy: {
          textWithBlanks: '배울 수 있는 공간을 제공함으로써, 수리 카페는 개인이 장치를 ___ 수명을 ___ 수 있게 한다.',
          missingWords: ['유지하고', '연장할'],
          choices: ['유지하고', '연장할', '파괴하고', '단축할', '구입할'],
        },
        medium: {
          textWithBlanks: '배울 수 있는 ___ 제공함으로써, 수리 카페는 개인이 장치를 ___ 수명을 ___ 수 ___ .',
          missingWords: ['공간을', '유지하고', '연장할', '있게', '한다'],
          choices: ['공간을', '유지하고', '연장할', '있게', '한다', '부품을', '버리고', '없게'],
        },
        hard: {
          fragments: ['배울 수 있는 공간을 제공함으로써,', '수리 카페는 개인이', '자신의 장치를 스스로 유지하고', '기기의 사용 수명을', '더 길게 연장할 수 있도록', '도와준다.'],
        },
      },
    ],
    comprehension: {
      q1: {
        id: 'p6_c1',
        questionKo: '수리 카페(Repair Café)에 대한 내용으로 옳지 않은 것은?',
        optionsKo: [
          '사람들이 무료로 모여 고장 난 기기를 고칠 수 있는 장소이다.',
          '자원봉사 전문가들이 기술적 조언과 수리 방법을 가르쳐 준다.',
          '2009년 네덜란드 암스테르담에서 처음 문을 열었다.',
          '수리 서비스를 이용하려면 매번 고액의 이용료를 지불해야 한다.',
        ],
        answerIndex: 3,
        explanation: '수리 카페는 자원봉사 전문가들의 도움을 받아 무료로 모여 이용할 수 있는 커뮤니티 공간입니다.',
      },
      q2: {
        id: 'p6_c2',
        statementEn: 'Repair Cafés encourage community members to share electronics repair skills and extend device lifespans.',
        isTrue: true,
        explanation: '본문에서 수리 카페가 지식 공유와 기기 수명 연장, 지속 가능한 관점 형성을 돕는다고 설명합니다.',
      },
      q3: {
        id: 'p6_c3',
        questionEn: 'Where and when was the very first Repair Café established?',
        optionsEn: [
          'In Amsterdam, Netherlands in 2009',
          'In Paris, France in 2021',
          'In London, UK in 2014',
          'In New York, USA in 2000',
        ],
        answerIndex: 0,
        explanation: '6문단 두 번째 문단에서 2009년 네덜란드 암스테르담에서 시작되었다고 명시되어 있습니다.',
      },
    },
  },
  {
    id: 7,
    page: 'p.99',
    title: 'Paragraph 7',
    subtitleKo: '지속 가능한 세상을 향한 우리의 미래',
    textEn: `Do you remember Liz, the girl who dropped her laptop? Imagine she lived in a world where repairing damaged devices and appliances was simply part of everyday life. If that were the case, her options wouldn’t be limited to paying for expensive repairs or throwing away her laptop and buying a new one. She would be able to order the necessary parts online and replace them herself. Alternatively, she could bring her damaged device to the nearest Repair Café to get advice on how to fix it. Repairing it probably wouldn’t be very hard, as she likely would have purchased a laptop with a high repairability score.
In fact, this sustainable world is a future we can all enjoy if we work toward it together. Even more importantly, it is a future in which people will generate far less e-waste, making our planet a cleaner, healthier place for everyone.`,
    textKo: `노트북을 떨어트렸던 소녀 Liz를 기억하는가? 그녀가 손상된 장치와 기기를 수리하는 것이 그저 일상의 한 부분인 세상에 살고 있었다고 상상해 보라. 만약 그랬다면, 그녀의 선택지는 비싼 수리를 위해 비용을 지불하거나 노트북을 버리고 새것을 사는 것으로 제한되지는 않았을 것이다. 그녀는 인터넷에서 필요한 부품들을 주문하고, 그것들을 직접 교체할 수 있었을 것이다. 그렇지 않으면, 그녀는 그것을 고치는 방법에 대한 조언을 얻기 위해 고장 난 장치를 가장 가까운 수리 카페에 가지고 갈 수도 있었을 것이다. 그녀는 높은 수리 가능성 점수를 가진 노트북을 구매했을 것이기 때문에, 그것을 수리하는 것은 아마 아주 어렵지는 않았을 것이다.
사실, 이 지속 가능한 세상은 우리가 그것을 향해 함께 노력한다면 우리 모두가 누릴 수 있는 미래이다. 훨씬 더 중요한 것은 그것은 사람들이 훨씬 적은 전자 쓰레기를 발생시킬 미래이며, 이는 우리의 지구를 모두를 위한 더 깨끗하고 건강한 곳으로 만들 것이라는 것이다.`,
    keywords: [
      { id: 'p7_k1', word: 'options', meaning: '선택지', paragraphId: 7 },
      { id: 'p7_k2', word: 'limited to', meaning: '~에 제한된', paragraphId: 7 },
      { id: 'p7_k3', word: 'alternatively', meaning: '그렇지 않으면 / 대안으로', paragraphId: 7 },
      { id: 'p7_k4', word: 'repairability score', meaning: '수리 가능성 점수', paragraphId: 7 },
      { id: 'p7_k5', word: 'sustainable world', meaning: '지속 가능한 세상', paragraphId: 7 },
      { id: 'p7_k6', word: 'generate', meaning: '발생시키다', paragraphId: 7 },
    ],
    sentences: [
      {
        id: 'p7_s1',
        paragraphId: 7,
        sentenceEn: 'She would be able to order the necessary parts online and replace them herself.',
        fullKo: '그녀는 온라인에서 필요한 부품을 주문하고 그것들을 직접 교체할 수 있었을 것이다.',
        easy: {
          textWithBlanks: '그녀는 온라인에서 필요한 부품을 ___ 그것들을 직접 ___ 수 있었을 것이다.',
          missingWords: ['주문하고', '교체할'],
          choices: ['주문하고', '교체할', '버리고', '파괴할', '훔칠'],
        },
        medium: {
          textWithBlanks: '그녀는 ___ 필요한 ___ 주문하고 그것들을 ___ ___ 수 ___ 것이다.',
          missingWords: ['온라인에서', '부품을', '직접', '교체할', '있었을'],
          choices: ['온라인에서', '부품을', '직접', '교체할', '있었을', '매장에서', '컴퓨터를', '없었을'],
        },
        hard: {
          fragments: ['그녀는 온라인에서', '필요한 부품들을 간편히', '주문하고', '그것들을 스스로', '직접 교체할 수', '있었을 것이다.'],
        },
      },
      {
        id: 'p7_s2',
        paragraphId: 7,
        sentenceEn: 'Alternatively, she could bring her damaged device to the nearest Repair Café to get advice on how to fix it.',
        fullKo: '그렇지 않으면, 그녀는 고치는 방법에 대한 조언을 얻기 위해 가장 가까운 수리 카페로 고장 난 장치를 가져갈 수도 있었다.',
        easy: {
          textWithBlanks: '그렇지 않으면, 그녀는 고치는 방법에 대한 ___ 얻기 위해 가장 가까운 ___ 카페로 장치를 가져갈 수도 있었다.',
          missingWords: ['조언을', '수리'],
          choices: ['조언을', '수리', '돈을', '컴퓨터', '부품을'],
        },
        medium: {
          textWithBlanks: '그렇지 않으면, 그녀는 ___ 방법에 대한 ___ ___ 위해 가장 가까운 ___ 카페로 ___ 장치를 가져갈 수도 있었다.',
          missingWords: ['고치는', '조언을', '얻기', '수리', '고장 난'],
          choices: ['고치는', '조언을', '얻기', '수리', '고장 난', '버리는', '돈을', '새로운'],
        },
        hard: {
          fragments: ['그렇지 않으면, 그녀는', '고치는 방법에 대한', '유용한 조언을 얻기 위해', '가장 가까운 수리 카페로', '고장 난 장치를', '가져갈 수도 있었다.'],
        },
      },
      {
        id: 'p7_s3',
        paragraphId: 7,
        sentenceEn: 'Even more importantly, it is a future in which people will generate far less e-waste, making our planet a cleaner, healthier place for everyone.',
        fullKo: '더욱 중요한 것은, 사람들이 훨씬 적은 전자 쓰레기를 발생시켜 우리 지구를 더 깨끗하고 건강한 곳으로 만드는 미래라는 점이다.',
        easy: {
          textWithBlanks: '더욱 중요한 것은, 사람들이 훨씬 ___ 전자 쓰레기를 발생시켜 우리 지구를 더 깨끗하고 ___ 곳으로 만드는 미래라는 점이다.',
          missingWords: ['적은', '건강한'],
          choices: ['적은', '건강한', '많은', '위험한', '더러운'],
        },
        medium: {
          textWithBlanks: '더욱 중요한 것은, 사람들이 ___ 적은 전자 쓰레기를 ___ 우리 지구를 더 ___ ___ 곳으로 만드는 ___ 점이다.',
          missingWords: ['훨씬', '발생시켜', '깨끗하고', '건강한', '미래라는'],
          choices: ['훨씬', '발생시켜', '깨끗하고', '건강한', '미래라는', '조금', '재활용하여', '과거라는'],
        },
        hard: {
          fragments: ['더욱 중요한 것은,', '사람들이 훨씬 적은 전자 쓰레기를', '발생시킴으로써', '우리 지구를 모두를 위해', '더 깨끗하고 건강한 장소로', '만들어 갈 미래라는 점이다.'],
        },
      },
    ],
    comprehension: {
      q1: {
        id: 'p7_c1',
        questionKo: '수리 가능한 지속 가능한 세상에서 Liz가 선택할 수 있는 대안으로 본문에 언급되지 않은 것은?',
        optionsKo: [
          '온라인으로 필요한 부품을 주문하여 직접 교체한다.',
          '가장 가까운 수리 카페에 가져가 조언을 받아 수리한다.',
          '높은 수리 가능성 점수를 가진 제품을 애초에 구매한다.',
          '노트북을 길거리에 그냥 방치하고 새로운 해외 직구를 신청한다.',
        ],
        answerIndex: 3,
        explanation: '본문에서는 부품 주문 자가 교체, 수리 카페 방문, 수리 가능성 점수가 높은 기기 구매를 대안으로 제시했습니다.',
      },
      q2: {
        id: 'p7_c2',
        statementEn: 'In a sustainable future where repairing devices is common, people will generate much less e-waste.',
        isTrue: true,
        explanation: '본문 마지막 문장에서 "people will generate far less e-waste, making our planet a cleaner, healthier place"라고 강조합니다.',
      },
      q3: {
        id: 'p7_c3',
        questionEn: 'What is the ultimate message of Paragraph 7 and the entire passage?',
        optionsEn: [
          'We should stop buying any electronics permanently.',
          'By adopting sustainable repair practices together, we can significantly reduce e-waste and make a healthier planet.',
          'Laptops are not worth repairing because they become slow after 5 years.',
          'France is the only country responsible for solving global e-waste.',
        ],
        answerIndex: 1,
        explanation: '지속 가능한 수리 문화와 사회적 노력을 통해 전자 쓰레기를 줄이고 지구를 더 건강하게 만들자는 최종 결론 메시지입니다.',
      },
    },
  },
];
