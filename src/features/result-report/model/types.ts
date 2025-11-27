export interface CollectionCard {
  endingTitle: string;
  endingThumbnailUrl: string | null;
}

export interface CollectionCharacterSet {
  id: number;
  name: string;
  images: {
    active: string;
    disabled: string;
    default: string;
  };
  collectionCards: CollectionCard[];
}
