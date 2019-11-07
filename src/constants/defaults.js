import firebase from '../firebase';
import type { BrickT } from './types';

export const DEFAULT_BRICK: BrickT = {
  id: 'idBrick1',
  childrenConcepts: [],
  content: 'loading content ...',
  datetime: firebase.firestore.Timestamp.now(),
  submitTime: firebase.firestore.Timestamp.now(),
  parentConcept: 'loading concept ...',
  source: 'loading source ...',
  relationship: 'undefined'
};

export const EMPTY_BRICK: BrickT = {
  childrenConcepts: [],
  content: '',
  datetime: firebase.firestore.Timestamp.now(),
  submitTime: firebase.firestore.Timestamp.now(),
  parentConcept: '',
  status: 'none',
  author: null
};

export const DEFAULT_CONCEPT = {
  title: 'loading concept ...'
};

export const EMPTY_SOURCE = '(sans source)';
