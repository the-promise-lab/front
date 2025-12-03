import type { ReactNode } from 'react';
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
    <div className='mx-auto mt-9.5 flex h-full w-full max-w-190 flex-col gap-14 text-white'>
      {/* 배경음 */}
      <SettingRow label='배경음'>
        <ToggleButton isOn={!bgmMuted} onToggle={handleBgmToggle} />
      </SettingRow>

      {/* 효과음 */}
      <SettingRow label='효과음'>
        <ToggleButton isOn={!sfxMuted} onToggle={handleSfxToggle} />
      </SettingRow>

      {/* 계정 연동 */}
      <div className='flex items-start justify-between'>
        <Typography variant='h4-eb' className='text-white uppercase'>
          계정 연동
        </Typography>

        <div className='flex w-130 flex-col gap-10'>
          {/* 카카오 계정 정보 */}
          <div className='flex items-center gap-5.5 px-2.5'>
            <div className='flex size-12 items-center justify-center rounded-lg bg-[#fee500]'>
              <KakaoIcon className='size-6' />
            </div>
            <Typography variant='button-b' className='text-white'>
              {user?.email || user?.name || '계정 정보 없음'}
            </Typography>
          </div>

          {/* 로그아웃 버튼 */}
          <div className='rounded border-[0.4px] border-white/35 p-2.5 lg:border-2'>
            <button
              onClick={onLogoutClick}
              className='flex h-20 w-full items-center justify-center rounded border-[0.4px] border-white bg-white/30 lg:border-2'
            >
              <Typography variant='button-b' className='text-white'>
                로그아웃
              </Typography>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SettingRowProps {
  label: string;
  children: ReactNode;
}

function SettingRow({ label, children }: SettingRowProps) {
  return (
    <div className='flex items-center justify-between'>
      <Typography variant='h4-eb' className='text-white uppercase'>
        {label}
      </Typography>
      {children}
    </div>
  );
}

interface ToggleButtonProps {
  isOn: boolean;
  onToggle: (enabled: boolean) => void;
}

function ToggleButton({ isOn, onToggle }: ToggleButtonProps) {
  return (
    <div className='w-130 rounded border-[0.4px] border-white/35 p-2.5 lg:border-2'>
      <div className='flex h-20 items-center rounded bg-white/15'>
        {/* ON 버튼 */}
        <button
          onClick={() => onToggle(true)}
          className={cn(
            'flex h-full w-80 items-center justify-center rounded transition-all',
            isOn
              ? 'border-[0.4px] border-white bg-white/30 lg:border-2'
              : 'border-0 bg-transparent'
          )}
        >
          <Typography
            variant='button-eb'
            className={cn('uppercase', isOn ? 'text-white' : 'text-white/50')}
          >
            ON
          </Typography>
        </button>

        {/* OFF 버튼 */}
        <button
          onClick={() => onToggle(false)}
          className={cn(
            'flex h-full flex-1 items-center justify-center rounded transition-all',
            !isOn
              ? 'border-[0.4px] border-white bg-white/30 lg:border-2'
              : 'border-0 bg-transparent'
          )}
        >
          <Typography
            variant='button-eb'
            className={cn('uppercase', !isOn ? 'text-white' : 'text-white/50')}
          >
            OFF
          </Typography>
        </button>
      </div>
    </div>
  );
}

function KakaoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 4C7.02944 4 3 7.16426 3 11.0909C3 13.5663 4.55878 15.7412 6.93181 17.0287L6.01591 20.4545C5.94182 20.7273 6.25 20.9545 6.48636 20.8182L10.5545 18.0909C11.0227 18.1364 11.5045 18.1818 12 18.1818C16.9706 18.1818 21 15.0175 21 11.0909C21 7.16426 16.9706 4 12 4Z'
        fill='black'
      />
    </svg>
  );
}
