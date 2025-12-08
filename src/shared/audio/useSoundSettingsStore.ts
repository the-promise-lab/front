import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SoundSettingsState {
  isBgmMuted: boolean;
  isSfxMuted: boolean;
}

interface SoundSettingsActions {
  toggleBgmMute: () => void;
  toggleSfxMute: () => void;
  setBgmMuted: (muted: boolean) => void;
  setSfxMuted: (muted: boolean) => void;
}

export const useSoundSettingsStore = create<
  SoundSettingsState & SoundSettingsActions
>()(
  persist(
    set => ({
      // State
      isBgmMuted: false,
      isSfxMuted: false,

      // Actions
      toggleBgmMute: () => {
        set(state => ({ isBgmMuted: !state.isBgmMuted }));
      },

      toggleSfxMute: () => {
        set(state => ({ isSfxMuted: !state.isSfxMuted }));
      },

      setBgmMuted: (muted: boolean) => {
        set({ isBgmMuted: muted });
      },

      setSfxMuted: (muted: boolean) => {
        set({ isSfxMuted: muted });
      },
    }),
    {
      name: 'bttf-sound-settings',
      partialize: state => ({
        isBgmMuted: state.isBgmMuted,
        isSfxMuted: state.isSfxMuted,
      }),
    }
  )
);

// Selectors
export const bgmMutedSelector = (state: SoundSettingsState) => state.isBgmMuted;
export const sfxMutedSelector = (state: SoundSettingsState) => state.isSfxMuted;
