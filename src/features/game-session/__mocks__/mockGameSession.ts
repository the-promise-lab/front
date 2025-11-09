import type { GameSessionResponseDto } from '@api';

export const mockGameSessionResponse: GameSessionResponseDto = {
  id: 1,
  userId: 1,
  currentActId: 1,
  createdAt: '2024-01-01T00:00:00Z',
  playingCharacterSet: {
    id: 1,
    characterGroupId: 1,
    playingCharacter: [
      {
        id: 1,
        characterId: 1,
        currentHp: 80,
        currentSp: 70,
      },
      {
        id: 2,
        characterId: 2,
        currentHp: 90,
        currentSp: 85,
      },
    ],
  },
  inventories: [
    {
      id: 1,
      bagId: 1,
      slots: [
        {
          id: 1,
          itemId: 101,
          quantity: 3,
        },
        {
          id: 2,
          itemId: 102,
          quantity: 5,
        },
      ],
    },
  ],
};

export const mockEmptyGameSessionResponse: GameSessionResponseDto = {
  id: 2,
  userId: 1,
  currentActId: null,
  createdAt: '2024-01-01T00:00:00Z',
  playingCharacterSet: null,
  inventories: [],
};
