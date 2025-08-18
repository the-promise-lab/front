import { ShelfSelector } from './components/ShelfSelector';

interface ShelfItem {
  id: string;
  name: string;
  x: number;
  y: number;
}
import './App.css';

// 테스트용 샘플 데이터
const sampleItems = [
  {
    id: 'claw-hammer',
    name: '장도리',
    x: 0.295,
    y: 0.37,
  },
  {
    id: 'tissue',
    name: '휴지',
    x: 0.73,
    y: 0.32,
  },
  {
    id: 'blanket',
    name: '담요',
    x: 0.548,
    y: 0.568,
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
