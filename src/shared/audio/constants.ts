export const SOUND_URLS = {
  buttonClick: '/sounds/sfx/button-click.mp3',
  typing: '/sounds/sfx/typing-sound.mp3',
  toggleSwitch: '/sounds/sfx/toggle-switch.wav',
  popupClick: '/sounds/sfx/popup-click.wav',
  intro1MartAmbience: '/sounds/sfx/intro1-mart-ambience.mp3',
  waterDrop: '/sounds/sfx/water-drop.mp3',
  mainBgm1: '/sounds/bgm/main-bgm-1.wav',
  mainBgm2: '/sounds/bgm/main-bgm-2.wav',
  introBagChoiceBgm: '/sounds/bgm/intro-bagchoice.wav',
  itemChoiceBgm: '/sounds/bgm/item-choice.wav',
} as const;

export type SoundKey = keyof typeof SOUND_URLS;

export const CLICK_SOUND_VARIANTS = {
  default: SOUND_URLS.buttonClick,
  popup: SOUND_URLS.popupClick,
  toggle: SOUND_URLS.toggleSwitch,
  waterDrop: SOUND_URLS.waterDrop,
} as const;

export type ClickSoundVariant = keyof typeof CLICK_SOUND_VARIANTS;
