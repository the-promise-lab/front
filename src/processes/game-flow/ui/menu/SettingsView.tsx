import { useState, useEffect } from 'react';
import { useGameSound } from '@shared/audio/useGameSound';
import { useAuthStore } from '@shared/auth/model/useAuthStore';
import Typography from '@shared/ui/Typography';
import { cn } from '@shared/lib/utils';

interface SettingsViewProps {
  onLogoutClick: () => void;
}

export function SettingsView({ onLogoutClick }: SettingsViewProps) {
  const { mute } = useGameSound();
  const { user } = useAuthStore();
  const [bgmMuted, setBgmMuted] = useState(false);
  const [sfxMuted, setSfxMuted] = useState(false);

  useEffect(() => {
    // 초기 상태는 AudioManager에서 가져올 수 없으므로 로컬 스토리지에서 복원
    const savedBgmMuted = localStorage.getItem('bgmMuted') === 'true';
    const savedSfxMuted = localStorage.getItem('sfxMuted') === 'true';
    setBgmMuted(savedBgmMuted);
    setSfxMuted(savedSfxMuted);

    // AudioManager에 적용
    mute('bgm', savedBgmMuted);
    mute('sfx', savedSfxMuted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBgmToggle = (enabled: boolean) => {
    setBgmMuted(!enabled);
    mute('bgm', !enabled);
    localStorage.setItem('bgmMuted', (!enabled).toString());
  };

  const handleSfxToggle = (enabled: boolean) => {
    setSfxMuted(!enabled);
    mute('sfx', !enabled);
    localStorage.setItem('sfxMuted', (!enabled).toString());
  };

  return (
    <div className='flex h-full w-full flex-col gap-12 text-white'>
      {/* 배경음 */}
      <div className='flex items-center justify-between'>
        <Typography variant='dialogue-m' className='text-white'>
          배경음
        </Typography>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => handleBgmToggle(true)}
            className={cn(
              'rounded-l-lg border border-white/20 px-6 py-3 text-sm font-semibold transition-all',
              !bgmMuted
                ? 'bg-white/20 text-white'
                : 'bg-transparent text-white/60 hover:bg-white/5'
            )}
          >
            ON
          </button>
          <button
            onClick={() => handleBgmToggle(false)}
            className={cn(
              'rounded-r-lg border border-l-0 border-white/20 px-6 py-3 text-sm font-semibold transition-all',
              bgmMuted
                ? 'bg-white/20 text-white'
                : 'bg-transparent text-white/60 hover:bg-white/5'
            )}
          >
            OFF
          </button>
        </div>
      </div>

      {/* 효과음 */}
      <div className='flex items-center justify-between'>
        <Typography variant='dialogue-m' className='text-white'>
          효과음
        </Typography>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => handleSfxToggle(true)}
            className={cn(
              'rounded-l-lg border border-white/20 px-6 py-3 text-sm font-semibold transition-all',
              !sfxMuted
                ? 'bg-white/20 text-white'
                : 'bg-transparent text-white/60 hover:bg-white/5'
            )}
          >
            ON
          </button>
          <button
            onClick={() => handleSfxToggle(false)}
            className={cn(
              'rounded-r-lg border border-l-0 border-white/20 px-6 py-3 text-sm font-semibold transition-all',
              sfxMuted
                ? 'bg-white/20 text-white'
                : 'bg-transparent text-white/60 hover:bg-white/5'
            )}
          >
            OFF
          </button>
        </div>
      </div>

      {/* 계정 연동 */}
      <div className='flex flex-col gap-4'>
        <Typography variant='dialogue-m' className='text-white'>
          계정 연동
        </Typography>
        <div className='flex items-center gap-3'>
          <div className='flex h-8 w-8 items-center justify-center rounded border border-black bg-yellow-400'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              className='text-black'
            >
              <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
            </svg>
          </div>
          <Typography variant='dialogue-m' className='text-white'>
            {user?.email || '계정 정보 없음'}
          </Typography>
        </div>
      </div>

      {/* 로그아웃 버튼 */}
      <div className='mt-auto flex justify-center'>
        <button
          onClick={onLogoutClick}
          className='rounded-lg border border-white/20 bg-black/40 px-12 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10'
        >
          <Typography variant='dialogue-m' className='text-white'>
            로그아웃
          </Typography>
        </button>
      </div>
    </div>
  );
}
