import { ProjectService, FirestoreService } from './services';

import {
  ConceptT,
  UserT,
  BrickT,
  CollectionE,
  AcceptationT,
  ReadingTimeT,
} from '../constants/types';

export const projectService = new ProjectService();
export const conceptDepsService = new FirestoreService<ConceptT>(
  CollectionE.CONCEPT_DEPS,
);
export const usersService = new FirestoreService<UserT>(CollectionE.USERS);
export const bricksService = new FirestoreService<BrickT>(CollectionE.BRICKS);
export const acceptationService = new FirestoreService<AcceptationT>(
  CollectionE.ACCEPTATIONS,
);
export const readingTimesService = new FirestoreService<ReadingTimeT>(
  CollectionE.READING_TIMES,
);
