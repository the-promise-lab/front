import { useEffect, useMemo, useState } from 'react';
import { useGameFlowStore } from '../..';
import { cn } from '@shared/lib/utils';
import Typography from '@shared/ui/Typography';
import {
  getCharacterDetailByName,
  getCharacterPairDetailByGroupId,
  getCharacterPairDetailByName,
} from '@entities/character-data';
import { getObjectUrlSelector, useAssetStore } from '@shared/preload-assets';

/**
 * 캐릭터 ID를 스탯 이미지 경로로 변환
 */
function getCharacterStatImagePath(
  characterId: string | undefined
): string | null {
  if (!characterId) return null;

  // 캐릭터 ID를 스탯 이미지 이니셜로 매핑
  const idToInitial: Record<string, string> = {
    hem: 'hb',
    bang: 'bc',
    boksun: 'bs',
    jinsil: 'js',
    sojaewook: 'jo',
    munyewon: 'yw',
    bangmiri: 'mr',
    ryujaeho: 'jh',
  };

  const initial = idToInitial[characterId.toLowerCase()];
  if (!initial) return null;

  return `/image/charSelect/char_${initial}_stat.svg`;
}

/**
 * 캐릭터 ID를 페어 이미지 경로로 변환
 */
function getCharacterPairImagePath(
  characterId: string | undefined,
  isActive: boolean
): string | null {
  if (!characterId) return null;

  // 캐릭터 ID를 이미지 이니셜로 매핑
  const idToInitial: Record<string, string> = {
    hem: 'hb',
    bang: 'bc',
    boksun: 'bs',
    jinsil: 'js',
    sojaeok: 'jo',
    munyewon: 'yw',
    bangmiri: 'mr',
    ryujaeho: 'jh',
  };

  const initial = idToInitial[characterId.toLowerCase()];
  if (!initial) return null;

  const type = isActive ? 'active' : 'default';
  return `/image/charSelect/pair_${type}_${initial}.svg`;
}

export function CharacterInfoView() {
  const playingCharacters = useGameFlowStore(
    state => state.gameSession?.playingCharacterSet?.playingCharacters
  );
  const selectedGroupName = useGameFlowStore(
    state => state.selectedCharacterGroupName
  );

  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(
    null
  );

  const characterGroupId = useGameFlowStore(
    state => state.gameSession?.playingCharacterSet?.characterGroupId
  );

  const pairDetail = useMemo(() => {
    return (
      getCharacterPairDetailByGroupId(characterGroupId) ||
      getCharacterPairDetailByName(selectedGroupName)
    );
  }, [characterGroupId, selectedGroupName]);

  // playingCharacters와 pairDetail.characters를 매칭
  const characterDetails = useMemo(() => {
    if (!playingCharacters || !pairDetail) {
      return [];
    }

    return playingCharacters.map(playingChar => {
      // 이름으로 매칭
      const detail =
        pairDetail.characters.find(char => {
          const aliases = [char.name, ...(char.aliases ?? [])];
          return aliases.includes(playingChar.name || '');
        }) || getCharacterDetailByName(playingChar.name);
      return {
        playingCharacter: playingChar,
        detail: detail || null,
      };
    });
  }, [playingCharacters, pairDetail]);

  const activeCharacterDetail = useMemo(() => {
    if (!activeCharacterId || characterDetails.length === 0) {
      return characterDetails[0] || null;
    }
    return (
      characterDetails.find(
        item => item.detail?.id === activeCharacterId // detail.id로 매칭 변경
      ) ||
      characterDetails[0] ||
      null
    );
  }, [activeCharacterId, characterDetails]);

  useEffect(() => {
    if (characterDetails.length > 0 && !activeCharacterId) {
      // 초기값 설정: detail.id 사용
      const firstDetail = characterDetails[0].detail;
      if (firstDetail) {
        setActiveCharacterId(firstDetail.id);
      }
    }
  }, [characterDetails, activeCharacterId]);
  const getObjectUrl = useAssetStore(getObjectUrlSelector);

  if (!playingCharacters || playingCharacters.length === 0) {
    return (
      <div className='flex h-full items-center justify-center text-white/70'>
        <Typography variant='dialogue-m' className='text-white/70'>
          선택된 캐릭터가 없습니다.
        </Typography>
      </div>
    );
  }

  if (!pairDetail || !activeCharacterDetail) {
    return (
      <div className='flex h-full items-center justify-center text-white/70'>
        <Typography variant='dialogue-m' className='text-white/70'>
          캐릭터 상세 정보를 불러올 수 없습니다.
        </Typography>
      </div>
    );
  }

  const { playingCharacter, detail } = activeCharacterDetail;
  const activeCharacter = detail; // CharacterSelect와 변수명 통일

  return (
    <div className='flex h-full w-full text-white'>
      {/* 중앙 캐릭터 이미지 */}
      <main className='relative flex flex-1 items-center justify-center'>
        {activeCharacter?.image ? (
          <img
            src={getObjectUrl(activeCharacter.image)}
            alt={activeCharacter.name}
            className='max-h-[540px] min-h-[400px] min-w-[200px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]'
          />
        ) : playingCharacter.fullImage ? (
          <img
            src={getObjectUrl(playingCharacter.fullImage)}
            alt={playingCharacter.name || 'Character'}
            className='max-h-[540px] min-h-[400px] min-w-[200px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]'
          />
        ) : (
          <div className='flex h-[140px] w-[140px] items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white/40'>
            이미지 준비 중
          </div>
        )}
      </main>

      {/* 우측: 캐릭터 정보 (CharacterSelect 스타일 적용) */}
      <aside className='scrollbar-hide flex h-full w-[360px] flex-col justify-center gap-4 overflow-y-auto px-40'>
        <div className='flex flex-col gap-3'>
          <span className='text-sm font-semibold text-white/40'>
            {/* {pairDetail.title} */}
          </span>
          {activeCharacter ? (
            <>
              <div className='flex items-baseline gap-3'>
                <span className='text-[16px] font-extrabold tracking-tight'>
                  | {activeCharacter.name}
                </span>
                {activeCharacter.age && (
                  <span className='text-[12px] font-bold text-white/60'>
                    {activeCharacter.age}
                  </span>
                )}
              </div>
              {activeCharacter.id ? (
                <div className='mt-4'>
                  {(() => {
                    const statImagePath = getCharacterStatImagePath(
                      activeCharacter.id
                    );
                    return statImagePath ? (
                      <img
                        src={getObjectUrl(statImagePath)}
                        alt={`${activeCharacter.name} 스탯`}
                        className='h-33 w-83 object-contain'
                      />
                    ) : null;
                  })()}
                </div>
              ) : null}
            </>
          ) : null}
        </div>

        {pairDetail.overview && (
          <p className='text-sm leading-relaxed whitespace-pre-line'>
            {pairDetail.overview}
          </p>
        )}

        <p className='h-[60px] text-[9px] leading-relaxed whitespace-pre-line'>
          {activeCharacter?.description}
        </p>

        <p className='h-[40px] text-[9px] whitespace-pre-line'>
          {activeCharacter?.traits}
        </p>

        <div className='flex w-full items-start justify-between'>
          <div>
            <div className='text-[10px] font-semibold uppercase'>
              플레이어 페어
            </div>
            <div className='mt-3 flex gap-3'>
              {pairDetail.characters.map(character => {
                const isActive = character.id === activeCharacter?.id;
                const pairImage = getCharacterPairImagePath(
                  character.id,
                  isActive
                );

                return (
                  <div
                    key={character.id}
                    role='button'
                    tabIndex={0}
                    onClick={() => setActiveCharacterId(character.id)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveCharacterId(character.id);
                      }
                    }}
                    className={cn(
                      'h-37p relative w-37 overflow-hidden border-0 bg-transparent p-0 focus:ring-0 focus:outline-none'
                    )}
                  >
                    {pairImage ? (
                      <img
                        src={getObjectUrl(pairImage)}
                        alt={character.name}
                        className={cn(
                          'h-full w-full object-contain transition-transform duration-200 ease-out',
                          isActive ? 'scale-[1.05]' : 'scale-100'
                        )}
                      />
                    ) : (
                      <div className='flex h-full w-full items-center justify-center bg-white/10 text-sm text-white/60'>
                        ?
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
