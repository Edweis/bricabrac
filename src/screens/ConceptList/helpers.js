import type { BrickT } from '../../constants/types';
import { normalize } from '../../helpers';

export const matchBrickWithSearch = (brick: BrickT, search: string): boolean =>
  normalize(brick.parentConcept).includes(normalize(search));

export const a = 1;
