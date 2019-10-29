import type { BrickT } from '../../constants/types';

const getBrickError = (brick: BrickT): string | null => {
  if (!brick.content) return 'Invalid content';
  return null;
};

export const checkBrickError = (brick, onSuccess, onError = () => {}) => {
  const error = getBrickError(brick);
  if (error != null) return onError(error);
  return onSuccess();
};

export const a = 1;
