import type { BrickT } from '../../constants/types';

export const matchBrickWithSearch = (brick: BrickT, search: string): boolean =>
  brick.parentConcept.toLowerCase().includes(search.toLowerCase());

export const a = 1;
