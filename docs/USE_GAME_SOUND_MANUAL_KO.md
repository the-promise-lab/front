# useGameSound 훅 매뉴얼

`useGameSound` 훅은 브라우저 게임에서 SFX(효과음)과 BGM(배경음악)을 빠르게 제어할 수 있도록 설계된 명령형 오디오 API를 제공합니다. Web Audio 그래프 구성을 싱글턴 `AudioManager`가 대신 처리하므로, 개발자는 게임 로직에만 집중할 수 있습니다.

## 설치 & 준비

1. 번들 대상 브라우저가 Web Audio API를 지원하는지 확인하세요. 환경에서 `AudioContext`(`webkitAudioContext`)를 제공하지 않으면 훅 초기화 시 예외가 발생합니다.
2. 공유 오디오 배럴에서 훅을 임포트합니다.

```ts
import { useGameSound } from '@shared/audio';
```

훅 내부에는 React 상태가 없으므로, 일반 훅 사용 규칙만 지킨다면 어떤 컴포넌트나 커스텀 훅에서도 안전하게 사용할 수 있습니다.

## 빠른 시작

```tsx
import { useEffect } from 'react';
import { useGameSound } from '@shared/audio';

export function BattleScene() {
  const { preload, play, crossfadeBgm, mute, setVolume } = useGameSound();

  useEffect(() => {
    void preload(['/audio/sfx/explosion.mp3', '/audio/bgm/loop.mp3']);
  }, [preload]);

  const startScene = async () => {
    await crossfadeBgm(null, '/audio/bgm/loop.mp3', 800);
  };

  const triggerExplosion = () => {
    void play({
      url: '/audio/sfx/explosion.mp3',
      channel: 'sfx',
      volume: 0.9,
      ducking: true,
    });
  };

  return (
    <div>
      <button onClick={startScene}>Start Scene</button>
      <button onClick={triggerExplosion}>Explosion!</button>
      <button onClick={() => mute('bgm', true)}>Mute BGM</button>
      <button onClick={() => setVolume('sfx', 0.5)}>Half SFX Volume</button>
    </div>
  );
}
```

## 훅 반환값

`useGameSound()`는 다음과 같은 헬퍼 함수를 반환합니다.

| 함수                                    | 설명                                                                                                                                              |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `context`                               | 싱글턴 `AudioContext` 인스턴스입니다. 고급 진단이나 커스텀 오디오 그래프를 구성할 때 활용할 수 있습니다.                                          |
| `preload(urls)`                         | 문자열 또는 문자열 배열을 받아 오디오 파일을 가져오고 디코딩하여 메모리에 `AudioBuffer`로 캐시합니다. 모든 버퍼가 준비되면 프로미스를 해결합니다. |
| `play({ url, ...options })`             | 지정한 채널에서 재생을 시작합니다. `stop(fadeOutMs?)` 함수를 가진 핸들을 반환하며, 수동 정지나 페이드아웃에 사용할 수 있습니다.                   |
| `setVolume(channel, value)`             | 채널별 논리 볼륨(0~1)을 설정합니다. Web Audio 게인이 즉시 갱신되며 덕킹 상태도 함께 고려됩니다.                                                   |
| `mute(channel, on)`                     | 지정한 채널을 음소거하거나 해제합니다. 이전에 설정한 볼륨 값은 유지됩니다.                                                                        |
| `crossfadeBgm(prev, next, durationMs?)` | 이전 BGM URL을 페이드아웃하면서 새로운 URL을 같은 시간 동안 페이드인합니다. 새 트랙의 `PlayHandle`을 반환합니다.                                  |

## 재생 옵션

`play` 함수는 내부적으로 `AudioManager.play`에 위임되므로 모든 `PlayOptions`를 사용할 수 있습니다.

| 옵션              | 타입             | 기본값                     | 비고                                                                                                                         |
| ----------------- | ---------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `channel`         | `'bgm' \| 'sfx'` | `'sfx'`                    | 사용할 논리 채널을 선택합니다. 채널마다 별도의 게인 노드와 볼륨/음소거 상태가 존재합니다.                                    |
| `loop`            | `boolean`        | `false`                    | 버퍼 경로와 미디어 엘리먼트 경로 모두에 적용됩니다.                                                                          |
| `volume`          | `number`         | `1`                        | 재생 인스턴스에 적용되는 정규화 볼륨입니다. 채널 볼륨/음소거는 별도로 적용됩니다.                                            |
| `fadeInMs`        | `number`         | `0`                        | 재생 시작 시 볼륨을 선형으로 상승시키는 페이드인을 추가합니다.                                                               |
| `at`              | `number`         | `audioContext.currentTime` | 오디오 컨텍스트 시계를 기준으로 시작 시점을 예약합니다. 미디어 엘리먼트의 경우 0보다 큰 값은 재생 전 해당 위치로 이동합니다. |
| `detune`          | `number`         | `0`                        | 브라우저가 지원하는 경우 버퍼 재생의 음정을 센트 단위로 조정합니다. 미디어 엘리먼트에는 적용되지 않습니다.                   |
| `useMediaElement` | `boolean`        | `false`                    | 미디어 엘리먼트 경로를 강제로 사용합니다. 긴 BGM 루프나 스트리밍 오디오에 권장됩니다.                                        |
| `ducking`         | `boolean`        | `false`                    | `sfx` 채널에서 true로 설정하면 해당 사운드가 재생되는 동안 BGM 게인이 일시적으로 감소합니다.                                 |

## 채널 운용 팁

- **프리로드를 미리 수행하세요.** 부팅 시점이나 씬 로딩 중에 `preload`를 호출하면 첫 재생 시 네트워크 지연을 피할 수 있습니다. 이후 호출은 캐시된 버퍼를 재사용합니다.
- **자동재생 정책을 신경 쓰지 않아도 됩니다.** 매니저는 최초 사용자 상호작용을 감지하여 오디오 컨텍스트를 자동으로 재개합니다.
- **UI 설정과 조합하세요.** “오디오 설정” 화면에서 슬라이더는 `setVolume`, 토글은 `mute`에 연결하면 됩니다. 훅이 명령형 API를 제공하므로 UI 상태를 독립적으로 관리할 수 있습니다.
- **크로스페이드와 덕킹을 활용하세요.** 씬 전환 시 `crossfadeBgm`을 사용하고, 중요한 SFX에는 `ducking`을 켜서 음악과 내레이션이 겹칠 때도 자연스럽게 들리도록 만드세요.

## 오류 처리

- 네트워크 또는 디코딩 실패 시 반환된 프로미스가 거부되고 콘솔에 로그가 출력됩니다.
- 미디어 엘리먼트 재생 실패(예: 자동재생 제한)는 `play` 프로미스가 거부됩니다. 매니저가 이벤트 리스너를 정리하므로 안전하게 재시도할 수 있습니다.

## 확장 아이디어

- `ChannelName` 유니온을 확장하고 생성자에서 채널 초기화를 추가하면 더 많은 채널을 만들 수 있습니다.
- React 상태와의 선언적 연동이 필요하다면, 명령형 API 위에 도메인 특화 훅을 구성해 보세요.
- 사용자 설정(볼륨 슬라이더, 음소거 토글)을 별도 컨텍스트로 노출하고 내부적으로는 이 헬퍼들을 호출하도록 구성할 수 있습니다.
