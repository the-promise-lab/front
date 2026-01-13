import { SOUND_URLS, useGameSound } from '@shared/audio';
import { useEffect } from 'react';
import { usePreloadAssets } from '@shared/preload-assets';

interface Props {
  assets: string[];
}

export default function PreloadAssets({ assets }: Props) {
  usePreloadAssets(assets, {});

  const { preload } = useGameSound();
  useEffect(() => {
    const sfxUrls = Object.values(SOUND_URLS).filter(url =>
      url.includes('sfx')
    );
    void preload(Object.values(sfxUrls));
  }, [preload]);

  return null;
}
