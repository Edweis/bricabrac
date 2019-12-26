import firebase from '../firebase';
import { BrickT, ReadingTimeT, StatusT } from './types';

export const DEFAULT_BRICK: BrickT = {
  id: 'idBrick1',
  childrenConcepts: [],
  content: 'loading content ...',
  datetime: firebase.firestore.Timestamp.now(),
  submitTime: firebase.firestore.Timestamp.now(),
  parentConcept: 'loading concept ...',
  source: 'loading source ...',
  isDefinition: false,
  status: StatusT.none,
};

export const EMPTY_BRICK: Partial<BrickT> = {
  childrenConcepts: [],
  content: '',
  datetime: firebase.firestore.Timestamp.now(),
  submitTime: firebase.firestore.Timestamp.now(),
  parentConcept: '',
  status: StatusT.none,
};

export const DEFAULT_CONCEPT = {
  title: 'loading concept ...',
};

export const EMPTY_SOURCE = 'Aucune source';

export const DEFAULT_READING_TIME: ReadingTimeT = {
  startTime: firebase.firestore.Timestamp.now(),
  endTime: null,
  startPage: 0,
  endPage: 0,
  source: '',
};
