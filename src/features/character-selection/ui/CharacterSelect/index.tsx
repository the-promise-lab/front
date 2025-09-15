// src/features/character-selection/ui/CharacterSelect/index.tsx
// 캐릭터 선택 컴포넌트

import { useEffect } from 'react';
import { useCharacterSelectionStore } from '../../model/useCharacterSelectionStore';
import { mockCharacters } from '../../__mocks__';

interface CharacterSelectProps {
  onNext: () => void;
  onBack: () => void;
}

export default function CharacterSelect({
  onNext,
  onBack,
}: CharacterSelectProps) {
  const {
    characters,
    currentIndex,
    setCharacters,
    moveToNext,
    moveToPrevious,
    selectCharacter,
  } = useCharacterSelectionStore();

  // 캐릭터 데이터 초기화
  useEffect(() => {
    setCharacters(mockCharacters);
  }, [setCharacters]);

  const currentCharacter = characters[currentIndex];

  const handleSelectComplete = () => {
    if (currentCharacter) {
      selectCharacter(currentCharacter);
      onNext(); // 다음 단계로 이동
    }
  };

  if (!currentCharacter) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="text-gray-600">캐릭터를 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100">
      {/* 뒤로가기 버튼 */}
      <div className="absolute top-3 left-3 z-10">
        <button
          className="bg-opacity-80 hover:bg-opacity-100 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-105 active:scale-95"
          onClick={onBack}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-700"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex h-screen flex-col items-center justify-center px-4 py-6">
        {/* 캐릭터 선택 영역 */}
        <div className="relative flex w-full max-w-sm gap-2">
          {/* 좌측 화살표 */}

          <button
            // className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            onClick={moveToPrevious}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-700"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* 캐릭터 이미지 */}
          <div className="mx-12 rounded-lg bg-white p-2 shadow-xl">
            <div className="flex items-center justify-center rounded-lg bg-gray-200">
              <div className="py-2 text-center">
                <div className="mx-auto mb-2 flex h-32 w-32 items-center justify-center rounded-lg bg-blue-500">
                  <span className="text-xl font-bold text-white">
                    {currentCharacter.name.charAt(0)}
                  </span>
                </div>
                <p className="text-xs text-gray-500">캐릭터 이미지</p>
              </div>
            </div>

            {/* 캐릭터 정보 */}
            <div className="text-center">
              <h2 className="mb-1 text-lg font-bold text-gray-800">
                {currentCharacter.name}
              </h2>
              <p className="mb-3 text-xs leading-relaxed text-gray-600">
                {currentCharacter.description}
              </p>

              {/* 특성 표시 */}
              <div className="mb-3 grid grid-cols-2 gap-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">힘:</span>
                  <span className="font-medium">
                    {currentCharacter.characteristics.strength}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">지능:</span>
                  <span className="font-medium">
                    {currentCharacter.characteristics.intelligence}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">민첩:</span>
                  <span className="font-medium">
                    {currentCharacter.characteristics.agility}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">운:</span>
                  <span className="font-medium">
                    {currentCharacter.characteristics.luck}
                  </span>
                </div>
              </div>

              {/* 특수 능력 */}
              <div className="rounded-lg bg-blue-50 p-2">
                <p className="text-xs leading-relaxed font-medium text-blue-800">
                  특수 능력: {currentCharacter.specialAbility}
                </p>
              </div>
            </div>
          </div>

          {/* 우측 화살표 */}
          <button
            // className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            onClick={moveToNext}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-700"
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>

        {/* 선택 완료 버튼 */}
        <button
          onClick={handleSelectComplete}
          className="mt-6 transform rounded-lg bg-gradient-to-r from-red-500 to-pink-600 px-6 py-2.5 text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-red-600 hover:to-pink-700 hover:shadow-2xl active:scale-95 active:from-red-700 active:to-pink-800"
        >
          선택 완료
        </button>

        {/* 캐릭터 인디케이터 */}
        <div className="mt-4 flex gap-1.5">
          {characters.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'scale-125 bg-red-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
