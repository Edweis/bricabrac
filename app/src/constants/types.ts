import firebase from '../firebase';

type Timestamp = firebase.firestore.Timestamp;

export type ConceptT = string;
export type ConceptDepsT = {
  name: ConceptT;
  deps: ConceptT[];
  datetime: Date;
};
export enum CollectionE {
  CONCEPT_DEPS = 'conceptDeps',
  USERS = 'users',
  BRICKS = 'bricks',
  COMMENTS = 'comments',
  ACCEPTATIONS = 'acceptations',
  READING_TIMES = 'readingTimes',
}
export type ComputedCollection = string;
export type LoadingT = {
  shouldLoadAgain: boolean;
  [keys: string]: boolean;
};
export type SourceT = string;
export type ProjectT = SourceT | null;
export enum StatusT {
  'accepted',
  'refused',
  'none',
}
/**
 * Represents bricks comming from the database.
 */
export type BrickRawT = {
  id: string;
  childrenConcepts: ConceptT[];
  content: string;
  submitTime: Timestamp;
  datetime: Timestamp;
  parentConcept: ConceptT;
  source: string;
  isDefinition: boolean;
  author: string;
};
/**
 * Brick used in the app.
 */
export type BrickT = BrickRawT & { status: StatusT };
export type UserT = {
  id: string;
  email: string;
};
export type CommentT = {
  id: string;
  author: string;
  text: string;
  datetime: Timestamp;
};
export type AcceptationT = {
  id: string;
  brickId: string;
  userId: string;
  status: StatusT;
  datetime: Timestamp;
};
export type ProjectSourceT = SourceT;
export type ProjectSetterT = [
  ProjectSourceT,
  (project: ProjectSourceT) => void,
];
export type ReadingTimeT = {
  startTime: Timestamp;
  endTime: Timestamp | null;
  startPage: number;
  endPage: number;
  source: SourceT;
  userId: string;
};
