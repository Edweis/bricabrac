/* eslint-disable max-classes-per-file */
import { Observable } from './observable';
import {
  ConceptT,
  ProjectT,
  UserT,
  BrickT,
  CollectionE,
} from '../constants/types';
import { subscribeFirestore } from './firestore';

export class BricksService {
  readonly bricks: Observable<BrickT[]>;

  constructor() {
    this.bricks = new Observable<BrickT[]>([], 'status');
    const firestoreObs = subscribeFirestore<BrickT[]>(CollectionE.BRICKS);
    firestoreObs.subscribe(b => this.bricks.set(b));
  }
}

export class ConceptDepsService {
  readonly concepts: Observable<ConceptT[]>;

  constructor() {
    this.concepts = new Observable<ConceptT[]>([]);
    const firestoreObs = subscribeFirestore<ConceptT[]>(
      CollectionE.CONCEPT_DEPS,
    );
    firestoreObs.subscribe(this.concepts.set);
  }
}

export class UsersService {
  readonly users: Observable<UserT[]>;

  constructor() {
    this.users = new Observable<UserT[]>([]);
    const firestoreObs = subscribeFirestore<UserT[]>(CollectionE.USERS);
    firestoreObs.subscribe(this.users.set);
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
