import { create } from 'zustand';

type AssetStatus = 'idle' | 'loading' | 'loaded' | 'error';
interface AssetEntry {
  status: AssetStatus;
  blob?: Blob;
  objectUrl?: string;
  error?: string;
}
interface AssetState {
  entries: Map<string, AssetEntry>;
  setLoading: (url: string) => void;
  setLoaded: (url: string, blob: Blob, objectUrl: string) => void;
  setError: (url: string, error: string) => void;
  getObjectUrl: (url: string) => string | undefined;
  revoke: (url: string) => void;
  revokeAll: () => void;
}

export const useAssetStore = create<AssetState>((set, get) => ({
  entries: new Map(),
  setLoading: url =>
    set(s => {
      const next = new Map(s.entries);
      next.set(url, { status: 'loading' });
      return { entries: next };
    }),
  setLoaded: (url, blob, objectUrl) =>
    set(s => {
      const next = new Map(s.entries);
      next.set(url, { status: 'loaded', blob, objectUrl });
      return { entries: next };
    }),
  setError: (url, error) =>
    set(s => {
      const next = new Map(s.entries);
      next.set(url, { status: 'error', error });
      return { entries: next };
    }),
  getObjectUrl: url => get().entries.get(url)?.objectUrl,
  revoke: url =>
    set(s => {
      const next = new Map(s.entries);
      const e = next.get(url);
      if (e?.objectUrl) URL.revokeObjectURL(e.objectUrl);
      next.delete(url);
      return { entries: next };
    }),
  revokeAll: () =>
    set(s => {
      for (const [, e] of s.entries)
        if (e.objectUrl) URL.revokeObjectURL(e.objectUrl);
      return { entries: new Map() };
    }),
}));
