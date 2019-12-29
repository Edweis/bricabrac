import { EMPTY_SOURCE } from '../constants/defaults';

export const normalize = (str: string | null): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim();
};

export const matchSearch = (
  value: string | null,
  search: string | null,
): boolean => {
  if (search === '') return true;
  if (!search || !value) return false;
  return normalize(value).includes(normalize(search));
};

type MatcheableObject = { parentConcept: string; content: string };
export const matchBrickSearch = (
  brick: MatcheableObject,
  search: string,
): boolean => {
  return (
    matchSearch(brick.parentConcept, search) ||
    matchSearch(brick.content, search)
  );
};

export const getDisplayedSource = (source: string) =>
  !source || source === '' ? EMPTY_SOURCE : source;
