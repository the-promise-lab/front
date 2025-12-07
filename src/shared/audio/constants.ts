export const SOUND_URLS = {
  buttonClick: '/sounds/button-click.mp3',
  typing: '/sounds/typing-sound.mp3',
} as const;

export type SoundKey = keyof typeof SOUND_URLS;

export const CLICK_SOUND_VARIANTS = {
  default: SOUND_URLS.buttonClick,
} as const;

export type ClickSoundVariant = keyof typeof CLICK_SOUND_VARIANTS;
