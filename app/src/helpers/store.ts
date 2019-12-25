import {
  ProjectService,
  FirestoreService,
  LoadingService,
  BricksService,
} from './services';

import {
  ConceptT,
  UserT,
  CollectionE,
  AcceptationT,
  ReadingTimeT,
} from '../constants/types';

export const loadingService = new LoadingService();
export const projectService = new ProjectService();
export const usersService = new FirestoreService<UserT>(CollectionE.USERS);
export const bricksService = new BricksService();
export const acceptationService = new FirestoreService<AcceptationT>(
  CollectionE.ACCEPTATIONS,
);
export const readingTimesService = new FirestoreService<ReadingTimeT>(
  CollectionE.READING_TIMES,
);
export const conceptDepsService = new FirestoreService<ConceptT>(
  CollectionE.CONCEPT_DEPS,
);
