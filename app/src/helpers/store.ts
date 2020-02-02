import {
  ProjectService,
  FirestoreService,
  LoadingService,
  BricksService,
  TimerService,
} from './services';

import {
  ConceptDepsT,
  UserT,
  CollectionE,
  ReadingTimeT,
} from '../constants/types';

export const loadingService = new LoadingService();
export const projectService = new ProjectService();
export const usersService = new FirestoreService<UserT>(CollectionE.USERS);
export const bricksService = new BricksService();
export const timerService = new TimerService();
export const readingTimesService = new FirestoreService<ReadingTimeT>(
  CollectionE.READING_TIMES,
);
export const conceptDepsService = new FirestoreService<ConceptDepsT>(
  CollectionE.CONCEPT_DEPS,
);

export const firestoreSyncAllWithState = () => {
  const subscriptions = [
    usersService,
    bricksService,
    readingTimesService,
    conceptDepsService,
  ].map(service => service.sync());
  return () => subscriptions.map(subscription => subscription.unsubscribe());
};
