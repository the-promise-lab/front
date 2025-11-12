export type ChannelName = 'bgm' | 'sfx';

export type PlayOptions = {
  channel?: ChannelName;
  loop?: boolean;
  volume?: number;
  fadeInMs?: number;
  at?: number;
  detune?: number;
  useMediaElement?: boolean;
  ducking?: boolean;
};

export type PlayHandle = {
  stop: (fadeOutMs?: number) => void;
};
