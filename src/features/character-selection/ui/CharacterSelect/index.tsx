// src/features/character-selection/ui/CharacterSelect/index.tsx
// 캐릭터 선택 컴포넌트

import { useEffect } from 'react';
import { useCharacterSelectionStore } from '../../model/useCharacterSelectionStore';
import { useCharacterGroups } from '../../model/useCharacterGroups';
import { useSelectCharacterSet } from '../../model/useSelectCharacterSet';
import type { SelectCharacterSetResponseDto } from '@api/models/SelectCharacterSetResponseDto';

interface CharacterSelectProps {
  onNext: () => void;
  onBack: () => void;
  onSelectSuccess?: (response: SelectCharacterSetResponseDto) => void;
}

export default function CharacterSelect({
  onNext,
  onBack,
  onSelectSuccess,
}: CharacterSelectProps) {
  const { currentIndex, setCharacterSets, moveToNext, moveToPrevious } =
    useCharacterSelectionStore();

  // 서버에서 캐릭터 그룹 조회
  const { data: characterSets = [], isLoading, error } = useCharacterGroups();

  // 캐릭터 선택 mutation
  const { mutate: selectCharacter, isPending: isSelecting } =
    useSelectCharacterSet({
      onSuccess: ({ response }) => {
        console.log('[CharacterSelect] 캐릭터 선택 완료');

        // 외부에서 전달받은 콜백 실행 (gameSession 저장 등)
        onSelectSuccess?.(response);

        // 다음 단계로 이동
        onNext();
      },
      onError: (error: Error) => {
        console.error('[CharacterSelect] 캐릭터 선택 실패:', error);
        alert(`캐릭터 선택 실패: ${error.message}`);
      },
    });

  // 로컬 스토어에 서버 데이터 동기화 (슬라이드 네비게이션용)
  useEffect(() => {
    if (characterSets.length > 0) {
      setCharacterSets(characterSets);
    }
  }, [characterSets, setCharacterSets]);

  const handleSelectComplete = () => {
    const currentSet = characterSets[currentIndex];
    if (currentSet && !currentSet.isLocked) {
      selectCharacter({
        characterGroupId: Number(currentSet.id),
        groupName: currentSet.name,
      });
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500'></div>
          <p className='text-gray-600'>캐릭터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <p className='mb-4 text-red-600'>
            캐릭터 정보를 불러오는데 실패했습니다.
          </p>
          <p className='mb-4 text-sm text-gray-500'>{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 데이터 없음
  if (characterSets.length === 0) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <p className='text-gray-600'>사용 가능한 캐릭터가 없습니다.</p>
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

              {/* 캐릭터 그룹 이미지 */}
              {currentSet?.isLocked ? (
                <div className='mb-4 flex h-60 w-60 items-center justify-center rounded-lg bg-gray-300'>
                  <span className='text-6xl'>🔒</span>
                </div>
              ) : (
                <div className='mb-4 flex h-60 w-60 items-center justify-center rounded-lg'>
                  <img
                    src={currentSet?.image}
                    alt={currentSet?.name}
                    className='h-full w-full rounded-lg object-contain'
                  />
                </div>
              )}

              {/* 설명 */}
              <p className='mb-4 text-center text-sm leading-relaxed text-gray-600'>
                {currentSet?.description}
              </p>
            </div>
          </div>
        </div>

        {/* 인디케이터 */}
        <div className='mt-6 flex gap-2'>
          {characterSets.map((_set, index) => (
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
            disabled={currentSet?.isLocked || isSelecting}
            className='transform rounded-lg bg-gradient-to-r from-red-500 to-pink-600 px-8 py-3 text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-red-600 hover:to-pink-700 hover:shadow-2xl active:scale-95 active:from-red-700 active:to-pink-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100'
          >
            {isSelecting
              ? '선택 중...'
              : currentSet?.isLocked
                ? '공개 예정'
                : '선택 완료'}
          </button>
        </div>
      </div>
    </div>
  );
}
