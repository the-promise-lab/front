import { ContentTitle } from '../kit/ContentTitle';
import { GlassPanel } from '../kit/GlassPanel';
import PlayReportScrollContent from './PlayReportScrollContent';

// TODO: 실제 데이터 연동
const mockData = {
  endingTitle: 'Happy: 사랑과 득근',
  points: [
    {
      type: 'positive' as const,
      label: 'Point 1',
      description:
        '물과 보온 용품을 준비하고, 심리적 안정을 위한 애착 물건을 챙기는 것은 극한 상황을 대비하는 훌륭한 전략입니다.',
    },
    {
      type: 'negative' as const,
      label: 'Point 2',
      description:
        '재난 상황에서는 개인 특성에 맞춘 준비가 생존의 핵심입니다. 수면이 예민한 경우 귀마개나 수면 안대를, 시력이 나쁜 경우 여분의 안경 등을 챙겨 생존 확률을 높일 수 있습니다.',
    },
  ],
  characters: [
    { name: '형빈', health: 62, mental: 45, potential: 45 },
    { name: '병철', health: 62, mental: 45, potential: 45 },
  ],
  survivalBag: {
    ownerNames: '형빈, 병철',
    bagType: '여행용 백팩',
    usability: '중간',
    itemUsageRate: '80%',
    bagImage: '/bag.png',
    // TODO: 실제 아이템 데이터로 교체
    items: [
      {
        id: 'item-1',
        name: '생수',
        image: '/chicken-breast.png',
        state: 'default' as const,
      },
      {
        id: 'item-2',
        name: '라면',
        image: '/chicken-breast.png',
        state: 'default' as const,
      },
      {
        id: 'item-3',
        name: '손전등',
        image: '/chicken-breast.png',
        state: 'default' as const,
      },
      {
        id: 'item-4',
        name: '담요',
        image: '/chicken-breast.png',
        state: 'default' as const,
      },
      {
        id: 'item-5',
        name: '구급약',
        image: '/chicken-breast.png',
        state: 'default' as const,
      },
    ],
  },
};

export function PlayReportContent() {
  return (
    // 1차 스크롤: 외부 스크롤 컨테이너
    <div className='h-full w-full overflow-y-auto'>
      {/* 타이틀 영역 - 1차 스크롤 시 밀려올라감 */}
      <div className='flex h-45 shrink-0 items-center px-16'>
        <ContentTitle title='Play Report' />
      </div>

      {/* GlassPanel 컨테이너 - sticky로 상단 고정, 높이는 화면 전체 */}
      <div className='sticky top-0 h-dvh px-15 py-8'>
        {/* GlassPanel 배경 */}
        <GlassPanel className='absolute inset-0' />

        {/* 2차 스크롤: GlassPanel 내부 스크롤 영역 */}
        <div className='relative z-10 h-full overflow-y-auto'>
          <PlayReportScrollContent
            endingTitle={mockData.endingTitle}
            points={mockData.points}
            characters={mockData.characters}
            survivalBag={mockData.survivalBag}
          />
        </div>
      </div>
    </div>
  );
}
