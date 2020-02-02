import { Timestamp } from '../firebase';
import { BrickT, ReadingTimeSetT } from './types';

export const EMPTY_BRICK: Partial<BrickT> = {
  childrenConcepts: [],
  content: '',
  datetime: Timestamp.now(),
  submitTime: Timestamp.now(),
  parentConcept: '',
};

export const EMPTY_SOURCE = 'Aucune source';

export const DEFAULT_READING_TIME: Partial<ReadingTimeSetT> = {
  startTime: Timestamp.now(),
  endTime: null,
  startPage: 0,
  endPage: 0,
  source: '',
};
