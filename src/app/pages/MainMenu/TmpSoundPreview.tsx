import { useState } from 'react';
import { useGameSound, type PlayHandle } from '@shared/audio';

const MOCK_AUDIO_URLS = {
  bgm1: '/sounds/bgm-example-01.mp3',
  bgm2: '/sounds/bgm-example-02.mp3',
  sfx1: '/sounds/sfx-example-01.mp3',
  sfx2: '/sounds/sfx-example-02.mp3',
} as const;

export default function TmpSoundPreview() {
  const [showSoundPreview, setShowSoundPreview] = useState(false);
  const audio = useGameSound();

  const [isPreloaded, setIsPreloaded] = useState(false);
  const [bgmVolume, setBgmVolume] = useState(1);
  const [sfxVolume, setSfxVolume] = useState(1);
  const [isBgmMuted, setIsBgmMuted] = useState(false);
  const [isSfxMuted, setIsSfxMuted] = useState(false);

  const [currentBgm, setCurrentBgm] = useState<{
    url: string;
    handle: PlayHandle;
  } | null>(null);

  const handlePreload = async () => {
    try {
      await audio.preload(Object.values(MOCK_AUDIO_URLS));
      setIsPreloaded(true);
      console.log('✅ All audio files preloaded');
    } catch (error) {
      console.error('❌ Failed to preload audio:', error);
    }
  };

  const handlePlayBgm = async (bgmKey: 'bgm1' | 'bgm2') => {
    const handle = await audio.crossfadeBgm(
      currentBgm?.url ?? null,
      MOCK_AUDIO_URLS[bgmKey],
      300
    );
    setCurrentBgm({ url: MOCK_AUDIO_URLS[bgmKey], handle });
  };

  const handlePlaySfx = async (sfxKey: 'sfx1' | 'sfx2') => {
    try {
      await audio.play({
        url: MOCK_AUDIO_URLS[sfxKey],
        channel: 'sfx',
        volume: sfxVolume,
      });
      console.log(`🔊 Playing ${sfxKey}`);
    } catch (error) {
      console.error(`❌ Failed to play ${sfxKey}:`, error);
    }
  };

  const handleStopBgm = () => {
    if (currentBgm) {
      currentBgm.handle.stop(300);
      setCurrentBgm(null);
      console.log('⏹️ BGM stopped');
    }
  };

  const handleBgmVolumeChange = (value: number) => {
    setBgmVolume(value);
    audio.setVolume('bgm', value);
  };

  const handleSfxVolumeChange = (value: number) => {
    setSfxVolume(value);
    audio.setVolume('sfx', value);
  };

  const handleToggleBgmMute = () => {
    const newMuted = !isBgmMuted;
    setIsBgmMuted(newMuted);
    audio.mute('bgm', newMuted);
  };

  const handleToggleSfxMute = () => {
    const newMuted = !isSfxMuted;
    setIsSfxMuted(newMuted);
    audio.mute('sfx', newMuted);
  };

  return (
    <>
      <button
        onClick={() => setShowSoundPreview(true)}
        className='fixed right-16 bottom-4 h-12 w-12 font-medium'
      >
        🎵
      </button>

      {showSoundPreview && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='relative h-[90vh] w-[90vw] overflow-auto rounded-lg bg-white p-8 shadow-2xl'>
            <button
              onClick={() => setShowSoundPreview(false)}
              className='absolute top-4 right-4 text-2xl hover:text-red-500'
            >
              ✕
            </button>

            {/* Preload Section */}
            <section className='mb-8 rounded-lg border-2 border-gray-200 p-4'>
              <h2 className='mb-4 text-xl font-semibold'>📦 프리로드</h2>
              <div className='flex gap-4'>
                <button
                  onClick={handlePreload}
                  className='rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50'
                  disabled={isPreloaded}
                >
                  {isPreloaded ? '✅ 프리로드 완료' : '프리로드 시작'}
                </button>
              </div>
              <p className='mt-2 text-sm text-gray-600'>
                현재 상태: {isPreloaded ? '프리로드됨' : '프리로드 안됨'}
              </p>
            </section>

            {/* BGM Section */}
            <section className='mb-8 rounded-lg border-2 border-purple-200 bg-purple-50 p-4'>
              <h2 className='mb-4 text-xl font-semibold'>🎼 BGM</h2>

              <div className='mb-4 flex gap-4'>
                <button
                  onClick={() => handlePlayBgm('bgm1')}
                  className='rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600'
                >
                  ▶️ BGM 1 재생
                </button>
                <button
                  onClick={() => handlePlayBgm('bgm2')}
                  className='rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600'
                >
                  ▶️ BGM 2 재생
                </button>
                <button
                  onClick={handleStopBgm}
                  className='rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600'
                  disabled={!currentBgm}
                >
                  ⏹️ BGM 정지
                </button>
              </div>

              <div className='space-y-2'>
                <div className='flex items-center gap-4'>
                  <label className='w-20 font-medium'>음량:</label>
                  <input
                    type='range'
                    min='0'
                    max='1'
                    step='0.01'
                    value={bgmVolume}
                    onChange={e =>
                      handleBgmVolumeChange(Number(e.target.value))
                    }
                    className='flex-1'
                  />
                  <span className='w-16 text-right'>
                    {Math.round(bgmVolume * 100)}%
                  </span>
                </div>

                <div className='flex items-center gap-4'>
                  <label className='w-20 font-medium'>음소거:</label>
                  <button
                    onClick={handleToggleBgmMute}
                    className={`rounded-lg px-4 py-2 text-white ${
                      isBgmMuted
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {isBgmMuted ? '🔇 음소거됨' : '🔊 재생중'}
                  </button>
                </div>
              </div>
            </section>

            {/* SFX Section */}
            <section className='mb-8 rounded-lg border-2 border-orange-200 bg-orange-50 p-4'>
              <h2 className='mb-4 text-xl font-semibold'>🔊 SFX</h2>

              <div className='mb-4 flex gap-4'>
                <button
                  onClick={() => handlePlaySfx('sfx1')}
                  className='rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600'
                >
                  ▶️ SFX 1 재생
                </button>
                <button
                  onClick={() => handlePlaySfx('sfx2')}
                  className='rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600'
                >
                  ▶️ SFX 2 재생
                </button>
              </div>

              <div className='space-y-2'>
                <div className='flex items-center gap-4'>
                  <label className='w-20 font-medium'>음량:</label>
                  <input
                    type='range'
                    min='0'
                    max='1'
                    step='0.01'
                    value={sfxVolume}
                    onChange={e =>
                      handleSfxVolumeChange(Number(e.target.value))
                    }
                    className='flex-1'
                  />
                  <span className='w-16 text-right'>
                    {Math.round(sfxVolume * 100)}%
                  </span>
                </div>

                <div className='flex items-center gap-4'>
                  <label className='w-20 font-medium'>음소거:</label>
                  <button
                    onClick={handleToggleSfxMute}
                    className={`rounded-lg px-4 py-2 text-white ${
                      isSfxMuted
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {isSfxMuted ? '🔇 음소거됨' : '🔊 재생중'}
                  </button>
                </div>
              </div>
            </section>

            {/* Info Section */}
            <section className='rounded-lg border-2 border-gray-200 bg-gray-50 p-4'>
              <h2 className='mb-2 text-xl font-semibold'>ℹ️ 테스트 정보</h2>
              <ul className='list-inside list-disc space-y-1 text-sm text-gray-700'>
                <li>BGM은 루프 재생되며, MediaElement를 사용합니다</li>
                <li>SFX는 한 번만 재생되며, AudioBuffer를 사용합니다</li>
                <li>BGM 재생 시 이전 BGM은 페이드아웃됩니다 (300ms)</li>
              </ul>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
