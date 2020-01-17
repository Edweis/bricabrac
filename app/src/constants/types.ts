import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import firebase from '../firebase';

type Timestamp = firebase.firestore.Timestamp;
export type NavigationProp = NavigationScreenProp<NavigationRoute>;
export type ConceptT = string;
export type ConceptDepSetT = {
  name: ConceptT;
  deps: ConceptT[];
  id: string;
};
export type ConceptDepsT = {
  datetime: Date;
} & ConceptDepSetT;
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
  accepted = 'accepted',
  refused = 'refused',
  none = 'none',
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
export type AcceptationSetT = {
  brickId: string;
  userId: string;
  status: StatusT;
};
export type AcceptationT = AcceptationSetT & {
  id: string;
  datetime: Timestamp;
};
export type ProjectSourceT = SourceT;
export type ProjectSetterT = [
  ProjectSourceT,
  (project: ProjectSourceT) => void,
];
export type ReadingTimeSetT = {
  startTime: Timestamp;
  endTime: Timestamp | null;
  startPage: number;
  endPage: number;
  source: SourceT;
};
export type ReadingTimeT = ReadingTimeSetT & {
  userId: string;
  id: string;
};
export type ConceptAnalysisT = { deps: ConceptT[]; isCyclical: boolean };
