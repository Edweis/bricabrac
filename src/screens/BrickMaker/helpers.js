import type { BrickT, SourceT } from '../../constants/types';

const getBrickError = (brick: BrickT): string | null => {
  if (!brick.content) return 'Invalid content';
  return null;
};

export const matchSourceWithSearch = (
  sources: SourceT[],
  search: string
) => source => source.toLowerCase().includes(search.toLowerCase());

export const checkBrickError = (brick, onSuccess, onError = () => {}) => {
  const error = getBrickError(brick);
  if (error != null) return onError(error);
  return onSuccess();
};

export const a = 1;
