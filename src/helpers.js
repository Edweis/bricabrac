import type { BrickT, ConceptDepsT } from './constants/types';

export const normalize = (str: ?string): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim();
};

export const matchSearch = (value: ?string, search: ?string): boolean => {
  if (search === '') return true;
  if (!search || !value) return false;
  return normalize(value).includes(normalize(search));
};

export const matchBrickSearch = (brick: BrickT, search: string): boolean => {
  return (
    matchSearch(brick.parentConcept, search) ||
    matchSearch(brick.content, search)
  );
};
