import { useEffect, useMemo, useState } from 'react';
import { useGameFlowStore } from '../..';
import { cn } from '@shared/lib/utils';
import Typography from '@shared/ui/Typography';
import {
  getCharacterDetailByName,
  getCharacterPairDetailByGroupId,
  getCharacterPairDetailByName,
} from '@shared/character-data';

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
        item => item.playingCharacter.id.toString() === activeCharacterId
      ) ||
      characterDetails[0] ||
      null
    );
  }, [activeCharacterId, characterDetails]);

  useEffect(() => {
    if (characterDetails.length > 0) {
      setActiveCharacterId(characterDetails[0].playingCharacter.id.toString());
    }
  }, [characterDetails]);

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
  const currentPair = characterDetails;

  return (
    <div className='flex h-full w-full flex-col text-white'>
      <header className='mb-8 flex items-center justify-between'>
        <div className='text-sm text-white/40'>
          {playingCharacters.length > 0
            ? `${playingCharacters.length} PLAYERS`
            : '준비중'}
        </div>
      </header>

      <div className='flex flex-1 items-center gap-16'>
        {/* 중앙 캐릭터 이미지 */}
        <div className='flex flex-1 items-center justify-center'>
          {detail?.image ? (
            <img
              src={detail.image}
              alt={detail.name || 'Character'}
              className='max-h-[540px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]'
            />
          ) : playingCharacter.fullImage ? (
            <img
              src={playingCharacter.fullImage}
              alt={playingCharacter.name || 'Character'}
              className='max-h-[540px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]'
            />
          ) : (
            <div className='flex h-[200px] w-[200px] items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white/40'>
              이미지 준비 중
            </div>
          )}
        </div>

        {/* 우측 캐릭터 정보 */}
        <div className='flex w-[420px] flex-col gap-8'>
          <div className='flex flex-col gap-3'>
            {detail ? (
              <>
                <div className='flex items-baseline gap-3'>
                  <Typography
                    variant='h3-b'
                    className='text-xl font-extrabold tracking-tight text-white'
                  >
                    {detail.name}
                  </Typography>
                  {detail.age && (
                    <span className='text-lg text-white/60'>{detail.age}</span>
                  )}
                </div>
                {detail.stats && detail.stats.length > 0 && (
                  <div className='flex gap-3'>
                    {detail.stats.map(stat => (
                      <div
                        key={`${detail.id}-${stat.label}`}
                        className='flex flex-col rounded-2xl border border-white/15 bg-white/5 px-5 py-3'
                      >
                        <span className='text-xs font-semibold tracking-wide text-white/40 uppercase'>
                          {stat.label}
                        </span>
                        <span className='text-lg font-bold text-white'>
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {/* 게임 진행 중인 스탯도 표시 */}
                {(playingCharacter.currentHp !== null ||
                  playingCharacter.currentMental !== null) && (
                  <div className='flex gap-3'>
                    {playingCharacter.currentHp !== null && (
                      <div className='flex flex-col rounded-2xl border border-white/15 bg-white/5 px-5 py-3'>
                        <span className='text-xs font-semibold tracking-wide text-white/40 uppercase'>
                          현재 체력
                        </span>
                        <span className='text-lg font-bold text-white'>
                          {playingCharacter.currentHp}
                        </span>
                      </div>
                    )}
                    {playingCharacter.currentMental !== null && (
                      <div className='flex flex-col rounded-2xl border border-white/15 bg-white/5 px-5 py-3'>
                        <span className='text-xs font-semibold tracking-wide text-white/40 uppercase'>
                          현재 정신력
                        </span>
                        <span className='text-lg font-bold text-white'>
                          {playingCharacter.currentMental}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                {pairDetail.overview && (
                  <p className='text-sm leading-relaxed whitespace-pre-line text-white/70'>
                    {pairDetail.overview}
                  </p>
                )}
                {detail.description && (
                  <p className='text-sm leading-relaxed whitespace-pre-line text-white/80'>
                    {detail.description}
                  </p>
                )}
                {'traits' in detail && detail.traits && (
                  <p className='text-xs whitespace-pre-line text-white/50'>
                    {detail.traits}
                  </p>
                )}
              </>
            ) : null}
          </div>

          {/* 하단 캐릭터 썸네일 */}
          {currentPair && currentPair.length > 1 && (
            <div className='flex h-full w-full items-end justify-between'>
              <div>
                <div className='text-xs font-semibold tracking-[0.3em] text-white/40 uppercase'>
                  플레이어 페어
                </div>
                <div className='mt-3 flex gap-3'>
                  {currentPair.map(item => {
                    const isActive =
                      item.playingCharacter.id === playingCharacter.id;
                    const thumbnail =
                      item.detail?.thumbnail ||
                      item.playingCharacter.profileImage;
                    return (
                      <button
                        key={item.playingCharacter.id}
                        onClick={() =>
                          setActiveCharacterId(
                            item.playingCharacter.id.toString()
                          )
                        }
                        className={cn(
                          'relative h-20 w-20 overflow-hidden rounded-2xl border transition-all',
                          isActive
                            ? 'border-white shadow-[0_0_22px_rgba(255,255,255,0.35)]'
                            : 'border-white/15 hover:border-white/30'
                        )}
                      >
                        {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt={
                              item.detail?.name ||
                              item.playingCharacter.name ||
                              'Character'
                            }
                            className='h-full w-full object-cover'
                          />
                        ) : (
                          <div className='flex h-full w-full items-center justify-center bg-white/10 text-sm text-white/60'>
                            ?
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
