/* eslint-disable max-classes-per-file */
import { Observable } from './observable';
import { ProjectT, CollectionE } from '../constants/types';
import { subscribeFirestore } from './firestore';

export class FirestoreService<T> {
  readonly value: Observable<T[]>;

  constructor(collection: CollectionE) {
    this.value = new Observable<T[]>([]);
    const firestoreObs = subscribeFirestore<T[]>(collection);
    firestoreObs.subscribe(docs => this.value.set(docs));
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
