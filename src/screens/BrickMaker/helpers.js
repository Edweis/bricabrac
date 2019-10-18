import type { BrickT, SourceT } from '../../constants/types';

export const getBrickError = (brick: BrickT): string | null => {
  if (!brick.content) return 'Invalid content';
  return null;
};

export const matchSourceWithSearch = (
  sources: SourceT[],
  search: string
) => source => source.toLowerCase().includes(search.toLowerCase());

export const a = 1;
