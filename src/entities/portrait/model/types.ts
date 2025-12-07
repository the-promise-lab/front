export type PortraitPosition = 'left' | 'center' | 'right';

export interface PortraitCharacter {
  id: number | string;
  name: string | null;
  profileImage: string | null;
  position?: PortraitPosition | null;
}

export interface PortraitData {
  speaker: string;
  text: string;
}
