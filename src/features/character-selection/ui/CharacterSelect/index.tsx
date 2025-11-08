// src/features/character-selection/ui/CharacterSelect/index.tsx
// 캐릭터 선택 컴포넌트

import { useEffect } from 'react';
import { useCharacterSelectionStore } from '../../model/useCharacterSelectionStore';
import { mockCharacterSets } from '../../__mocks__';

interface CharacterSelectProps {
  onNext: () => void;
  onBack: () => void;
}

export default function CharacterSelect({
  onNext,
  onBack,
}: CharacterSelectProps) {
  const {
    characterSets,
    currentIndex,
    setCharacterSets,
    moveToNext,
    moveToPrevious,
    selectCharacterSet,
  } = useCharacterSelectionStore();

  // 캐릭터 세트 데이터 초기화
  useEffect(() => {
    setCharacterSets(mockCharacterSets);
  }, [setCharacterSets]);

  const handleSelectComplete = () => {
    // 현재 선택된 캐릭터 세트가 잠금 해제되어 있는 경우만 진행
    const currentSet = characterSets[currentIndex];
    if (currentSet && !currentSet.isLocked) {
      selectCharacterSet(currentSet); // 선택된 세트 저장
      onNext(); // 다음 단계로 이동
    }
  };

  if (characterSets.length === 0) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500'></div>
          <p className='text-gray-600'>캐릭터를 로딩 중...</p>
        </div>
      </div>
    );
  }

  const currentSet = characterSets[currentIndex];

  return (
    <div className='relative h-screen w-screen overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100'>
      {/* 뒤로가기 버튼 */}
      <div className='absolute top-3 left-3 z-10'>
        <button
          className='bg-opacity-80 hover:bg-opacity-100 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-105 active:scale-95'
          onClick={onBack}
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className='text-gray-700'
          >
            <polyline points='15 18 9 12 15 6' />
          </svg>
        </button>
      </div>

      {/* 메인 컨텐츠 */}
      <div className='flex h-screen flex-col items-center justify-center px-4 py-6'>
        {/* 좌측 슬라이드 버튼 */}
        <button
          onClick={moveToPrevious}
          className='absolute top-1/2 left-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg transition-all hover:scale-110 hover:bg-white active:scale-95'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className='text-gray-700'
          >
            <polyline points='15 18 9 12 15 6' />
          </svg>
        </button>

        {/* 우측 슬라이드 버튼 */}
        <button
          onClick={moveToNext}
          className='absolute top-1/2 right-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg transition-all hover:scale-110 hover:bg-white active:scale-95'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className='text-gray-700'
          >
            <polyline points='9 6 15 12 9 18' />
          </svg>
        </button>

        {/* 캐릭터 선택 영역 */}
        <div className='relative w-full max-w-md'>
          <div className='rounded-lg bg-white p-6 shadow-xl'>
            <div className='flex flex-col items-center'>
              {/* 헤더 */}
              <h2 className='mb-4 text-2xl font-bold text-gray-800'>
                {currentSet?.name}
              </h2>

              {/* 미공개 캐릭터 */}
              {currentSet?.isLocked ? (
                <div className='mb-4 flex h-30 w-30 items-center justify-center rounded-lg bg-gray-300'>
                  <span className='text-4xl'>🔒</span>
                </div>
              ) : (
                /* 캐릭터 이미지를 나란히 */
                <div className='mb-4 flex gap-4'>
                  {currentSet?.characters.map(character => (
                    <div
                      key={character.id}
                      className='flex flex-col items-center'
                    >
                      <div className='mb-2 flex h-30 w-30 items-center justify-center rounded-lg'>
                        <img
                          src={character.image}
                          alt={character.name}
                          className='h-full w-full rounded-lg object-cover'
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 설명 */}
              <p className='mb-4 text-center text-sm leading-relaxed text-gray-600'>
                {currentSet?.description}
              </p>

              {/* 특수 능력 */}
              <div className='w-full rounded-lg bg-blue-50 p-3'>
                <p className='text-center text-xs font-medium text-blue-800'>
                  특수 능력: {currentSet?.specialAbility}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 인디케이터 */}
        <div className='mt-6 flex gap-2'>
          {characterSets.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? 'w-6 bg-red-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* 선택 완료 버튼 */}
        <div className='mt-8 text-center'>
          <button
            onClick={handleSelectComplete}
            disabled={currentSet?.isLocked}
            className='transform rounded-lg bg-gradient-to-r from-red-500 to-pink-600 px-8 py-3 text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-red-600 hover:to-pink-700 hover:shadow-2xl active:scale-95 active:from-red-700 active:to-pink-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100'
          >
            {currentSet?.isLocked ? '공개 예정' : '선택 완료'}
          </button>
        </div>
      </div>
    </div>
  );
}
