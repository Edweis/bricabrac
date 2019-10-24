import firebase from '../firebase';
import type { BrickT } from './types';

export const DEFAULT_BRICK: BrickT = {
  id: 'idBrick1',
  authorId: 'idAuthor1',
  childrenConcepts: [],
  content: 'loading content ...',
  datetime: firebase.firestore.Timestamp.now(),
  submitTime: firebase.firestore.Timestamp.now(),
  parentConcept: 'loading concept ...',
  source: 'loading source ...',
  status: 'none'
};

export const EMPTY_BRICK: BrickT = {
  childrenConcepts: [],
  content: '',
  datetime: firebase.firestore.Timestamp.now(),
  submitTime: firebase.firestore.Timestamp.now(),
  parentConcept: '',
  source: '',
  status: 'none'
};

export const DEFAULT_CONCEPT = {
  title: 'loading concept ...'
};
