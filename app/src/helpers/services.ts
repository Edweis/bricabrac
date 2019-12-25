/* eslint-disable max-classes-per-file */
import { Observable } from './observable';
import {
  ConceptT,
  ProjectT,
  UserT,
  BrickT,
  CollectionE,
  AcceptationT,
  ReadingTimeT,
} from '../constants/types';
import { subscribeFirestore } from './firestore';

export class ReadingTimesService {
  readonly readingTimes: Observable<ReadingTimeT[]>;

  constructor() {
    this.readingTimes = new Observable<ReadingTimeT[]>([]);
    const firestoreObs = subscribeFirestore<ReadingTimeT[]>(
      CollectionE.READING_TIMES,
    );
    firestoreObs.subscribe(docs => this.readingTimes.set(docs));
  }
}

export class AcceptationService {
  readonly acceptations: Observable<AcceptationT[]>;

  constructor() {
    this.acceptations = new Observable<AcceptationT[]>([], 'status');
    const firestoreObs = subscribeFirestore<AcceptationT[]>(
      CollectionE.ACCEPTATIONS,
    );
    firestoreObs.subscribe(docs => this.acceptations.set(docs));
  }
}

export class BricksService {
  readonly bricks: Observable<BrickT[]>;

  constructor() {
    this.bricks = new Observable<BrickT[]>([], 'status');
    const firestoreObs = subscribeFirestore<BrickT[]>(CollectionE.BRICKS);
    firestoreObs.subscribe(docs => this.bricks.set(docs));
  }
}

export class ConceptDepsService {
  readonly concepts: Observable<ConceptT[]>;

  constructor() {
    this.concepts = new Observable<ConceptT[]>([]);
    const firestoreObs = subscribeFirestore<ConceptT[]>(
      CollectionE.CONCEPT_DEPS,
    );
    firestoreObs.subscribe(docs => this.concepts.set(docs));
  }
}

export class UsersService {
  readonly users: Observable<UserT[]>;

  constructor() {
    this.users = new Observable<UserT[]>([]);
    const firestoreObs = subscribeFirestore<UserT[]>(CollectionE.USERS);
    firestoreObs.subscribe(docs => this.users.set(docs));
  }
}

export class ProjectService {
  readonly project = new Observable<ProjectT>(null);

  reset() {
    this.project.set(null);
  }

  set(project: ProjectT) {
    this.project.set(project);
  }
}
