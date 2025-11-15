import type { GameSessionDto } from '@api';

export const mockGameSessionResponse: GameSessionDto = {
  id: 1,
  userId: 1,
  currentActId: 1,
  createdAt: '2024-01-01T00:00:00Z',
  inventories: [],
  playingCharacterSet: {
    id: 1,
    characterGroupId: 1,
    playingCharacter: [
      {
        id: 1,
        playingCharacterSetId: 1,
        character: {
          id: 1,
          characterGroupId: 1,
          name: 'John Doe',
          selectImage: 'https://example.com/image.png',
          portraitImage: 'https://example.com/image.png',
          bgColor: '#000000',
          borderColor: '#000000',
        },
        currentHp: 80,
        currentSp: 70,
      },
      {
        id: 2,
        playingCharacterSetId: 2,
        character: {
          id: 2,
          characterGroupId: 2,
          name: 'Jane Doe',
          selectImage: 'https://example.com/image.png',
          portraitImage: 'https://example.com/image.png',
          bgColor: '#000000',
          borderColor: '#000000',
        },
        currentHp: 90,
        currentSp: 85,
      },
    ],
  },
};

export const mockEmptyGameSessionResponse: GameSessionDto = {
  id: 2,
  userId: 1,
  currentActId: null,
  createdAt: '2024-01-01T00:00:00Z',
  playingCharacterSet: null,
  inventories: [],
};
