import firebase from '../firebase';
import type { BrickT, ReadingTimeT } from './types';

export const DEFAULT_BRICK: BrickT = {
  id: 'idBrick1',
  childrenConcepts: [],
  content: 'loading content ...',
  datetime: firebase.firestore.Timestamp.now(),
  submitTime: firebase.firestore.Timestamp.now(),
  parentConcept: 'loading concept ...',
  source: 'loading source ...',
  relationship: 'undefined',
};

export const EMPTY_BRICK: BrickT = {
  childrenConcepts: [],
  content: '',
  datetime: firebase.firestore.Timestamp.now(),
  submitTime: firebase.firestore.Timestamp.now(),
  parentConcept: '',
  status: 'none',
  author: null,
  relationship: 'undefined',
};

export const DEFAULT_CONCEPT = {
  title: 'loading concept ...',
};

export const EMPTY_SOURCE = 'Aucune source';

export const DEFAULT_READING_TIME: ReadingTimeT = {
  startTime: firebase.firestore.Timestamp.now(),
  endtime: firebase.firestore.Timestamp.now(),
  startPage: 0,
  endPage: 0,
  source: '',
};
