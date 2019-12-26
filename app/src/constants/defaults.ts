import { Timestamp } from '../firebase';
import { BrickT, ReadingTimeT, StatusT } from './types';

export const DEFAULT_BRICK: Partial<BrickT> = {
  id: 'idBrick1',
  childrenConcepts: [],
  content: 'loading content ...',
  datetime: Timestamp.now(),
  submitTime: Timestamp.now(),
  parentConcept: 'loading concept ...',
  source: 'loading source ...',
  isDefinition: false,
  status: StatusT.none,
};

export const EMPTY_BRICK: Partial<BrickT> = {
  childrenConcepts: [],
  content: '',
  datetime: Timestamp.now(),
  submitTime: Timestamp.now(),
  parentConcept: '',
  status: StatusT.none,
};

export const EMPTY_SOURCE = 'Aucune source';

export const DEFAULT_READING_TIME: Partial<ReadingTimeT> = {
  startTime: Timestamp.now(),
  endTime: null,
  startPage: 0,
  endPage: 0,
  source: '',
};
