import { useEffect } from 'react';
import { useAssetStore } from './assetStore';

interface Options {
  concurrency?: number;
  onProgress?: (done: number, total: number) => void;
  signal?: AbortSignal;
  requestInit?: RequestInit;
}

/**
 * @description urls를 미리 받아 Blob/ObjectURL로 스토어에 저장
 * @param urls 미리 받을 파일 경로 배열
 * @param opts 옵션
 */
export function usePreloadAssets(urls: string[], opts: Options = {}) {
  const { setLoading, setLoaded, setError, entries } = useAssetStore();
  const { concurrency = 4, onProgress, signal, requestInit } = opts;

  useEffect(() => {
    if (!urls?.length) return;
    const uniq = Array.from(new Set(urls));
    const pending = uniq.filter(u => entries.get(u)?.status !== 'loaded');

    if (!pending.length) return;

    let done = 0;
    let aborted = false;
    const ac = new AbortController();
    const sig = signal ?? ac.signal;

    const run = async () => {
      const queue = pending.slice();
      const workers = Array.from(
        { length: Math.min(concurrency, queue.length) },
        async () => {
          while (!aborted && queue.length) {
            const url = queue.shift()!;
            try {
              setLoading(url);
              const res = await fetch(url, {
                cache: 'force-cache',
                signal: sig,
                ...requestInit,
              });
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              const blob = await res.blob();
              const objectUrl = URL.createObjectURL(blob);
              setLoaded(url, blob, objectUrl);
            } catch (e: unknown) {
              const error = e as Error;
              if (error?.name !== 'AbortError')
                setError(url, error?.message ?? 'fetch failed');
            } finally {
              done += 1;
              onProgress?.(done, pending.length);
            }
          }
        }
      );
      await Promise.all(workers);
    };

    run();
    return () => {
      aborted = true;
      ac.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(urls)]);
}
