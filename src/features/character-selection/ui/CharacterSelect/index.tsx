// src/features/character-selection/ui/CharacterSelect/index.tsx
// 캐릭터 선택 컴포넌트

import React, { useEffect } from 'react';
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">캐릭터를 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-50 to-pink-100 overflow-hidden relative">
      {/* 뒤로가기 버튼 */}
      <div className="absolute top-3 left-3 z-10">
        <button
          className="w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
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
      <div className="flex flex-col items-center justify-center h-screen px-4 py-6">
        {/* 캐릭터 선택 영역 */}
        <div className="relative w-full max-w-sm flex gap-2">
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
          <div className="bg-white rounded-lg shadow-xl p-2 mx-12">
            <div className="bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center py-2">
                <div className="w-32 h-32 bg-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {currentCharacter.name.charAt(0)}
                  </span>
                </div>
                <p className="text-xs text-gray-500">캐릭터 이미지</p>
              </div>
            </div>

            {/* 캐릭터 정보 */}
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-800 mb-1">
                {currentCharacter.name}
              </h2>
              <p className="text-gray-600 text-xs mb-3 leading-relaxed">
                {currentCharacter.description}
              </p>

              {/* 특성 표시 */}
              <div className="grid grid-cols-2 gap-1 text-xs mb-3">
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
              <div className="p-2 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800 font-medium leading-relaxed">
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
          className="mt-6 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 active:from-red-700 active:to-pink-800 text-white font-bold text-base px-6 py-2.5 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          선택 완료
        </button>

        {/* 캐릭터 인디케이터 */}
        <div className="flex gap-1.5 mt-4">
          {characters.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-red-500 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
