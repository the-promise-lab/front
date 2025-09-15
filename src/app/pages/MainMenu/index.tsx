import React from 'react';
import {
  useGameFlowStore,
  gameFlowActions,
} from '../../../processes/game-flow';

export default function MainMenu() {
  const { next } = useGameFlowStore();

  const handleSettings = () => {
    // TODO: 설정 화면으로 이동
    console.log('설정 버튼 클릭');
  };

  const handleInventory = () => {
    // TODO: 가방/인벤토리 화면으로 이동
    console.log('가방 버튼 클릭');
  };

  return (
    <div className="h-dvh w-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden relative">
      {/* 상단 우측 설정 버튼 */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleSettings}
          className="w-12 h-12 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-700"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="m12 1 1.09 2.45 2.46 1.09-1.09 2.45L12 8.09l-2.45-1.09L8.46 4.55 9.55 2.1 12 1z" />
            <path d="M21 12l-2.45 1.09L17.46 15.54 15.01 14.45 13.91 12l1.09-2.45 2.45-1.09L19.9 9.55 21 12z" />
            <path d="M3 12l2.45 1.09L6.54 15.54 9 14.45 10.09 12 9 9.55 6.54 8.46 3 9.55 3 12z" />
            <path d="m12 23-1.09-2.45L8.46 19.46l1.09-2.45L12 15.91l2.45 1.09 1.09 2.45-1.09 2.45L12 23z" />
          </svg>
        </button>
      </div>

      {/* 좌측 하단 가방 버튼 */}
      <div className="absolute bottom-4 left-4 z-10">
        <button
          onClick={handleInventory}
          className="w-12 h-12 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-700"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </button>
      </div>

      {/* 상단 사용자 정보 */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white bg-opacity-80 px-4 py-2 rounded-full shadow-lg flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">U</span>
          </div>
          <span className="text-gray-700 font-medium">사용자님</span>
          <button
            onClick={async () => await gameFlowActions.logout()}
            className="text-xs text-red-600 hover:text-red-800 transition-colors px-2 py-1 rounded hover:bg-red-50"
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* 중앙 메인 컨텐츠 */}
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">The Promise</h1>
          <p className="text-lg text-gray-600">재난 대비 훈련 게임</p>
        </div>

        {/* 게임 시작 버튼 */}
        <button
          onClick={next}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:from-blue-700 active:to-indigo-800 text-white font-bold text-xl px-12 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          🎮 게임 시작하기
        </button>

        {/* 부가 정보 */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-2">
            재난 상황에서 필요한 물품을 선택하고 준비하세요
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            <span>🏠 가정용품</span>
            <span>🍞 식료품</span>
            <span>👕 의류</span>
          </div>
        </div>
      </div>

      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 bg-opacity-30 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-indigo-200 bg-opacity-30 rounded-full blur-xl"></div>
        <div className="absolute top-3/4 left-1/3 w-24 h-24 bg-purple-200 bg-opacity-30 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}
