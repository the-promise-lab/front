import Typography from '@shared/ui/Typography';
import type {
  PlayReportPoint,
  PlayReportCharacterStats,
  PlayReportSurvivalBag,
  PlayreportEnding,
} from '../../../../model/types';
import CharacterStatsSection from './CharacterStatsSection';
import GoodBadPointsSection from './GoodBadPointsSection';
import SurvivalBagSection from './SurvivalBagSection';

interface PlayReportScrollContentProps {
  ending: PlayreportEnding;
  points: PlayReportPoint[];
  characters: PlayReportCharacterStats[];
  survivalBag: PlayReportSurvivalBag;
  /** 엔딩 타이틀 표시 여부 (기본값: true) */
  showTitle?: boolean;
}

export default function PlayReportScrollContent({
  ending,
  points,
  characters,
  survivalBag,
  showTitle = true,
}: PlayReportScrollContentProps) {
  return (
    <div className='flex flex-col gap-6'>
      {/* 엔딩 타이틀 */}
      {showTitle && (
        <Typography variant='h2-b' className='text-white'>
          {ending.title}
        </Typography>
      )}

      {/* Point 섹션들 */}
      <GoodBadPointsSection points={points} />

      {/* 캐릭터 영역 */}
      <CharacterStatsSection
        characters={characters}
        endingImage={ending.image}
      />

      {/* 구분선 */}
      <div className='h-px w-full bg-white/40' />

      {/* 생존 가방 섹션 */}
      <SurvivalBagSection
        ownerNames={survivalBag.ownerNames}
        bagType={survivalBag.bagName}
        usability={survivalBag.usability}
        itemUsageRate={survivalBag.itemUsageRate}
        bagImage={survivalBag.bagImage}
        items={survivalBag.items}
      />
      <div className='h-45' />
    </div>
  );
}
