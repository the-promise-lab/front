import React from 'react';
import { ShelfSelector } from './components/ShelfSelector';

interface ShelfItem {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
import './App.css';

// 테스트용 샘플 데이터
const sampleItems = [
  {
    id: 'water-bottle',
    name: '생수',
    x: 0.3, // 이미지 내 30% 지점
    y: 0.4, // 이미지 내 40% 지점
    width: 0.1, // 전체 크기의 10%
    height: 0.15, // 전체 크기의 15%
  },
  {
    id: 'snack',
    name: '과자',
    x: 0.7, // 이미지 내 70% 지점
    y: 0.3, // 이미지 내 30% 지점
    width: 0.12,
    height: 0.12,
  },
  {
    id: 'drink',
    name: '음료수',
    x: 0.5, // 이미지 내 중앙
    y: 0.6, // 이미지 내 60% 지점
    width: 0.08,
    height: 0.18,
  },
];

function App() {
  const handleItemSelect = (item: ShelfItem) => {
    window.alert(`선택된 아이템: ${item.name} (ID: ${item.id})`);
    console.log('선택된 아이템:', item);
  };

  return (
    <div className="App">
      <ShelfSelector
        backgroundImage="/shelf-example.png"
        items={sampleItems}
        onItemSelect={handleItemSelect}
      />
    </div>
  );
}

export default App;
