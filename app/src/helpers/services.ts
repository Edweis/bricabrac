/* eslint-disable max-classes-per-file */
import { Observable } from './observable';
import { ConceptT, ProjectT, UserT, CollectionE } from '../constants/types';
import { subscribeFirestore } from './firestore';

export class ConceptDepsService {
  readonly concepts = new Observable<ConceptT[]>([]);

  constructor() {
    const firestoreObs = subscribeFirestore<ConceptT[]>(
      CollectionE.CONCEPT_DEPS,
    );
    firestoreObs.subscribe(this.concepts.set);
  }
}
export class UsersService {
  readonly users = new Observable<UserT[]>([]);
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
