import type { BrickT, SourceT } from '../../constants/types';
import { normalize } from '../../helpers';

const getBrickError = (brick: BrickT): string | null => {
  if (!brick.content) return 'Invalid content';
  return null;
};

export const matchSourceWithSearch = (
  sources: SourceT[],
  search: string
) => source => normalize(source).includes(normalize(search));

export const checkBrickError = (brick, onSuccess, onError = () => {}) => {
  const error = getBrickError(brick);
  if (error != null) return onError(error);
  return onSuccess();
};

export const a = 1;
