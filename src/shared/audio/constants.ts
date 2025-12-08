export const SOUND_URLS = {
  buttonClick: '/sounds/sfx/button-click.mp3',
  typing: '/sounds/sfx/typing-sound.mp3',
  toggleSwitch: '/sounds/sfx/toggle-switch.wav',
  popupClick: '/sounds/sfx/popup-click.wav',
  intro1MartAmbience: '/sounds/bgm/intro1-mart-ambience.mp3',
} as const;

export type SoundKey = keyof typeof SOUND_URLS;

export const CLICK_SOUND_VARIANTS = {
  default: SOUND_URLS.buttonClick,
  popup: SOUND_URLS.popupClick,
  toggle: SOUND_URLS.toggleSwitch,
} as const;

export type ClickSoundVariant = keyof typeof CLICK_SOUND_VARIANTS;
