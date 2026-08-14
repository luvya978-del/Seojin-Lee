import { CompetitionItem, SkillItem, AwardItem, ProjectDetail, HeroData, ProfileInfo, ExternalLinkItem, PortfolioMasterData } from '../types';

export const DEFAULT_EXTERNAL_LINKS: ExternalLinkItem[] = [
  {
    id: "link-youtube-wro",
    title: "WRO 2026 로봇 자율주행 주행 영상",
    url: "https://www.youtube.com",
    description: "경기장 라인트레이싱 및 정밀 물체 조작 시연 비디오",
    category: "video",
    icon: "Youtube",
    isHighlight: true
  },
  {
    id: "link-github-pybricks",
    title: "Pybricks 로봇 자율주행 알고리즘 코드 (GitHub)",
    url: "https://github.com",
    description: "PID 제어기 및 6축 자이로 오도메트리 오픈소스 저장소",
    category: "github",
    icon: "Github",
    isHighlight: true
  },
  {
    id: "link-onshape-cad",
    title: "로봇 차체 3D CAD 도면 (Onshape)",
    url: "https://cad.onshape.com",
    description: "3:1 고속 기어박스 및 모듈형 그리퍼 3D 모델 뷰어",
    category: "cad",
    icon: "Boxes",
    isHighlight: true
  },
  {
    id: "link-notion-log",
    title: "로봇 연구 노트 & 엔지니어링 일지 (Notion)",
    url: "https://notion.so",
    description: "대회 준비 트러블슈팅 및 모터 캘리브레이션 테스트 기록",
    category: "document",
    icon: "BookOpen",
    isHighlight: false
  }
];

export const HERO_DATA: HeroData = {
  name: "이서진의",
  titleSuffix: "포트폴리오.",
  badge: "자율주행 / 로봇공학",
  studentBadge: "로봇공학 학생",
  tagline: "언제나 열심히 노력하자.",
  pastCompetitions: "2024 로보컵, 2026 로보컵, 2024 FLL, 2025 WRO, 2026 WRO",
  bulletPoints: [
    { icon: "GraduationCap", text: "로봇 공학 & 엔지니어링 학습" },
    { icon: "Wrench", text: "로봇 메커니즘 & 제어" },
    { icon: "Code2", text: "C++ & Python 프로그래밍" }
  ],
  currentGoal: "혁신적인 기구 메커니즘과 자율 알고리즘을 통해 실제 문제를 해결하는 로봇 시스템을 개발합니다.",
  quote: '좌우명: "언제나 열심히"',
  systemStatus: {
    label: "시스템 상태",
    value: "대회 출전 최적화 완료",
    healthPercent: 98
  },
  heroImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
  secondaryHeroImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80",
  externalLinks: [
    {
      id: "hero-yt",
      title: "대회 주행 영상 보기",
      url: "https://www.youtube.com",
      category: "video"
    },
    {
      id: "hero-gh",
      title: "GitHub 코드 저장소",
      url: "https://github.com",
      category: "github"
    }
  ]
};

export const COMPETITIONS_DATA: CompetitionItem[] = [
  {
    id: "robocup-2026",
    year: "2026",
    category: "Cospace U12",
    categoryType: "cospace",
    title: "ROBOCUP SouthKorea open",
    team: "팀: K.F.C Codechaser",
    roles: ["프로그래밍", "테스팅", "문제 해결", "팀 지원"],
    wins: "기술 인터뷰 우수, 최우수 연구상 (Best Research Award)",
    reflection: "포기하지 않고 이상한 코드는 고치며 팀과 함께 크게 성장했습니다.",
    description: "한국 오픈 대회에 참가하여 CoSpace 가상 시뮬레이션 환경에서 경로 계획 알고리즘을 작성하고 실제 하드웨어 센서와 연동하여 자율주행 미션을 완수했습니다.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    externalLink: "https://www.youtube.com",
    linkText: "대회 경기 영상",
    featured: true
  },
  {
    id: "wro-korea-2026",
    year: "2026",
    category: "로보미션 중등부",
    categoryType: "robomission",
    title: "WRO KOREA",
    team: "팀: K.F.C Codechaser",
    roles: ["프로그래밍", "전략 수립", "테스팅", "문제 해결", "팀 지원"],
    wins: "우수한 팀워크, 노력의 결실, 은상 (Silver Award)",
    reflection: "검은색 물체 정밀 배치, 정확도 향상 및 시간 단축을 해결하며 자부심을 느꼈습니다.",
    description: "엄격한 경기 시간 내에 검은색 물체를 신속히 조작하고 경기장을 탐색하기 위해 광학 센서와 듀얼 자이로 안정화 시스템을 갖춘 고속 미션 로봇을 설계했습니다.",
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
    externalLink: "https://www.youtube.com",
    linkText: "자율주행 미션 영상",
    featured: true
  },
  {
    id: "wro-2024",
    year: "2024",
    date: "2024년 10월",
    category: "전국 본선 진출",
    categoryType: "wro",
    title: "World Robot Olympiad",
    team: "팀 리더",
    roles: ["경로 탐색", "센서 통합", "팀 리더"],
    wins: "전국 본선 진출 & 사고력상 (Thinking Award)",
    reflection: "복잡한 미로 경로를 자율 주행하고 화물을 운반하는 센서 통합 및 알고리즘을 성공적으로 구현했습니다.",
    description: "복잡한 미로 경기장을 탐색하고 지정된 화물을 운반하도록 설계된 자율주행 로봇을 개발했습니다. 센서 통합과 경로 탐색 알고리즘 최적화에 집중했습니다.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80",
    externalLink: "https://github.com",
    linkText: "미로 탐색 알고리즘"
  },
  {
    id: "fll-2024",
    year: "2024",
    date: "2024년 2월",
    category: "Challenge 리그",
    categoryType: "fll",
    title: "First Lego League (FLL)",
    team: "팀 리더 & 메인 빌더",
    roles: ["미션 기구 제작", "자율주행 코딩", "혁신 프로젝트"],
    wins: "베스트 플레이어상 (Best Player Award) & 로봇 퍼포먼스 우수",
    reflection: "창의적인 모듈형 기구 설계와 팀원들과의 긴밀한 전략 협업으로 목표 미션을 100% 완수했습니다.",
    description: "FLL 시즌 미션을 분석하여 다목적 미션 툴을 신속 교체할 수 있는 구조를 설계하고 자율 라인 주행을 최적화했습니다.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    externalLink: "https://firstkorea.org",
    linkText: "FLL 대회 정보"
  }
];

export const SKILLS_DATA: SkillItem[] = [
  {
    id: "block-coding",
    name: "블록 코딩 (Block Coding)",
    score: 5,
    maxScore: 5,
    percentage: 100,
    category: "core",
    icon: "Boxes",
    description: "복잡한 로봇 제어 로직과 이벤트 드리븐 블록 프로그래밍 구현"
  },
  {
    id: "python",
    name: "파이썬 (Python)",
    score: 4,
    maxScore: 5,
    percentage: 85,
    category: "technical",
    icon: "Code",
    description: "Pybricks MicroPython 및 로봇 데이터 처리 스크립트 작성"
  },
  {
    id: "ppt-presentation",
    name: "PPT 발표 및 프레젠테이션",
    score: 5,
    maxScore: 5,
    percentage: 100,
    category: "soft",
    icon: "Presentation",
    description: "심사위원 기술 인터뷰 및 연구 노트 발표 우수"
  },
  {
    id: "teamwork",
    name: "팀워크 및 협업",
    score: 5,
    maxScore: 5,
    percentage: 100,
    category: "soft",
    icon: "Users",
    description: "팀 리더로서 역할 배분 및 적극적인 소통 지원"
  },
  {
    id: "problem-solving",
    name: "문제 해결 및 트러블슈팅",
    score: 5,
    maxScore: 5,
    percentage: 100,
    category: "soft",
    icon: "Brain",
    description: "경기 현장 실시간 디버깅 및 이상 코드 신속 수정"
  },
  {
    id: "motor-control",
    name: "모터 제어 (Motor Control)",
    score: 4,
    maxScore: 5,
    percentage: 80,
    category: "technical",
    icon: "Cpu",
    description: "PID 제어를 통한 모터 회전수/각도 정밀 오차 보정"
  },
  {
    id: "robot-building",
    name: "로봇 기구 설계 및 제작",
    score: 4,
    maxScore: 5,
    percentage: 80,
    category: "technical",
    icon: "Hammer",
    description: "3:1 기어비 및 다관절 그리퍼 구조 설계"
  },
  {
    id: "instruction-making",
    name: "조립 설명서 및 문서화",
    score: 5,
    maxScore: 5,
    percentage: 100,
    category: "soft",
    icon: "BookOpen",
    description: "체계적인 엔지니어링 일지 및 기구 조립 매뉴얼 작성"
  }
];

export const FEATURED_PROJECT: ProjectDetail = {
  id: "wro-robot",
  title: "WRO Robot",
  badge: "Pybricks",
  subtitle: "WRO 자율주행 경로 탐색 & 물체 분류 로봇",
  description: "WRO 2026 Korea 대회를 위해 제작한 자율주행 로봇. 정밀도, 주행 속도 및 신뢰도 높은 자율 동작에 중점.",
  fullDescription: "WRO 2026 RoboMission 챌린지를 위해 특별히 설계된 경기용 로봇입니다. 정밀 정렬 기어박스와 Pybricks Python / C++로 프로그래밍되어 밀리미터 단위 정밀 제어를 위한 폐루프 PID 제어, 구역 인식을 위한 실시간 컬러 센서 어레이, 신속한 화물 분류를 위한 다단계 모터 그리퍼를 장착했습니다.",
  image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
  ],
  techStack: ["Pybricks", "PID 제어", "홀로노믹 드라이브", "C++", "자이로 자세 안정화"],
  specifications: [
    { label: "구동부 아키텍처", value: "디퍼렌셜 + 캐스터 듀얼 구동" },
    { label: "탑재 센서군", value: "2x 컬러 센서, 1x 6축 자이로, 1x 초음파 센서" },
    { label: "구동 액추에이터", value: "2x 대형 각도 모터, 2x 중형 리프트 모터" },
    { label: "메인 컨트롤러", value: "Spike Prime / Pybricks MicroPython" },
    { label: "최대 주행 속도", value: "1.4 m/s 트랙 주행" }
  ],
  keyFeatures: [
    "주변 조도 자동 캘리브레이션을 통한 서브밀리미터 컬러 감지",
    "적응형 비례-적분-미분(PID) 라인 트레이싱 알고리즘",
    "신속한 교체가 가능한 모듈형 기어 구동 그리퍼 어셈블리",
    "돌발 궤적 이탈에 대응하는 견고한 에러 복구 루틴"
  ],
  externalLink: "https://github.com",
  linkText: "알고리즘 소스코드 (GitHub)",
  codeSnippet: {
    language: "python",
    code: `from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor, ColorSensor, UltrasonicSensor
from pybricks.parameters import Port, Direction, Stop
from pybricks.tools import wait

hub = PrimeHub()
left_motor = Motor(Port.A, Direction.COUNTERCLOCKWISE)
right_motor = Motor(Port.B)
color_sensor = ColorSensor(Port.C)

# 적응형 PID 라인트레이싱 루프
KP, KI, KD = 1.2, 0.04, 0.35
target_light = 50
integral = 0
last_error = 0

def run_mission():
    hub.display.text("RUN")
    while True:
        reflection = color_sensor.reflection()
        error = target_light - reflection
        integral += error
        derivative = error - last_error
        turn_rate = (KP * error) + (KI * integral) + (KD * derivative)
        
        left_motor.dc(60 + turn_rate)
        right_motor.dc(60 - turn_rate)
        last_error = error
        wait(10)`
  }
};

export const AWARDS_DATA: AwardItem[] = [
  {
    id: "award-1",
    title: "WRO KOREA",
    subtitle: "은상 / 사고력상 (Silver / Thinking Award)",
    year: "2026",
    category: "RoboMission 전국대회",
    iconType: "shield",
    badgeColor: "bg-[#7864f6]/10 text-[#7864f6] border-[#7864f6]/20",
    description: "뛰어난 전략 수립, 자율 알고리즘 정밀도 및 컴퓨팅 사고력을 인정받아 전국대회 부문 은상을 수상했습니다.",
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80",
    externalLink: "https://www.wrocontest.kr",
    linkText: "대회 결과 공지"
  },
  {
    id: "award-2",
    title: "Robocup",
    subtitle: "최우수 연구상 (Best Research)",
    year: "2026",
    category: "RoboCup 한국 오픈",
    iconType: "star",
    badgeColor: "bg-[#7864f6]/10 text-[#7864f6] border-[#7864f6]/20",
    description: "철저한 엔지니어링 연구 노트와 기술 인터뷰 발표의 우수성을 인정받아 최우수 연구상을 수상했습니다.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
    externalLink: "https://robocupkorea.org",
    linkText: "한국오픈 웹사이트"
  },
  {
    id: "award-3",
    title: "Robocup",
    subtitle: "우수상 (Excellence Award)",
    year: "2024",
    category: "RoboCup 지역 리그",
    iconType: "trophy",
    badgeColor: "bg-[#7864f6]/10 text-[#7864f6] border-[#7864f6]/20",
    description: "로봇 하드웨어 설계의 완성도, 신속한 트러블슈팅 및 우수한 필드 득점력을 바탕으로 우수상을 수상했습니다.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "award-4",
    title: "FLL",
    subtitle: "베스트 플레이어상 (Best Player Award)",
    year: "2024",
    category: "First Lego League",
    iconType: "medal",
    badgeColor: "bg-[#7864f6]/10 text-[#7864f6] border-[#7864f6]/20",
    description: "모범적인 팀 리더십, 스포츠맨십 및 핵심 가치 실천을 인정받아 베스트 플레이어상을 수상했습니다.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "award-5",
    title: "Robocup",
    subtitle: "우수상 (Excellence Award)",
    year: "2023",
    category: "RoboCup Junior",
    iconType: "trophy",
    badgeColor: "bg-[#7864f6]/10 text-[#7864f6] border-[#7864f6]/20",
    description: "탁월한 자율 주행 경로 탐색, 신속한 팀 프로토타이핑 및 안정적인 그리퍼 메커니즘으로 우수상을 수상했습니다.",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=600&q=80"
  }
];

export const PROFILE_INFO: ProfileInfo = {
  name: "이서진 (Lee Seojin)",
  role: "로봇 공학 & 코딩 학생 개발자",
  email: "sjleedavid0131@gmail.com",
  location: "대한민국 서울",
  school: "중학교 로봇 & AI 트랙",
  interests: ["자율주행 로봇", "Pybricks 제어", "Python & C++", "CoSpace 시뮬레이션", "기구 메커니즘 CAD"],
  bio: "안녕하세요! 로봇을 직접 조립하고 자율 제어 알고리즘을 코딩하며 다양한 문제들을 기술로 해결해나가는 학생 개발자 이서진입니다. 저의 좌우명은 '언제나 열심히 노력하자'입니다.",
  avatarUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
  stats: [
    { label: "출전 대회", value: "6회+" },
    { label: "수상 실적", value: "8회" },
    { label: "제작 로봇", value: "12대+" },
    { label: "코딩 경력", value: "4년+" }
  ],
  externalLinks: [
    {
      id: "prof-email",
      title: "이메일 문의",
      url: "mailto:sjleedavid0131@gmail.com"
    },
    {
      id: "prof-github",
      title: "GitHub 프로필",
      url: "https://github.com"
    }
  ]
};

export const DEFAULT_PORTFOLIO_DATA: PortfolioMasterData = {
  hero: HERO_DATA,
  competitions: COMPETITIONS_DATA,
  projects: [FEATURED_PROJECT],
  skills: SKILLS_DATA,
  awards: AWARDS_DATA,
  externalLinks: DEFAULT_EXTERNAL_LINKS,
  profile: PROFILE_INFO,
  updatedAt: new Date().toISOString()
};
