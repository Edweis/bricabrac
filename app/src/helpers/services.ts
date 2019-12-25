/* eslint-disable max-classes-per-file */
import _ from 'lodash';
import rxjs from 'rxjs';
import { Observable } from './observable';
import {
  ProjectT,
  CollectionE,
  LoadingT,
  BrickT,
  ComputedCollection,
  CommentT,
} from '../constants/types';
import { subscribeFirestore } from './firestore';

export class FirestoreService<T> {
  readonly value: Observable<T[]>;

  readonly subscription: rxjs.Subscription;

  constructor(collection: CollectionE) {
    this.value = new Observable<T[]>([]);
    const firestoreObs = subscribeFirestore<T[]>(collection);
    this.subscription = firestoreObs.subscribe(docs => this.value.set(docs));
  }
}

export const getCommentCollection = (brickId: string): ComputedCollection =>
  `${CollectionE.BRICKS}/${brickId}/${CollectionE.COMMENTS}`;

export class BricksService extends FirestoreService<BrickT> {
  readonly comments: { [brickId: string]: Observable<CommentT[]> } = {};

  constructor() {
    super(CollectionE.BRICKS);
  }

  commentsService(brickId: string) {
    const collection = getCommentCollection(brickId);
    if (!(brickId in this.comments)) {
      this.comments[brickId] = new Observable<CommentT[]>([]);
      const firestoreObs = subscribeFirestore<CommentT[]>(collection);
      const subscription = firestoreObs.subscribe(docs =>
        this.comments[brickId].set(docs),
      );
      this.subscription.add(subscription);
    }
    return this.comments[brickId];
  }
}

export class LoadingService {
  readonly loadings = new Observable<LoadingT>({ shouldLoadAgain: false });

  isLoading() {
    const { loadings } = this;
    if (loadings.get().shouldLoadAgain) return false;
    return false;
    // const values = _.values(loadings);
    // const isLoading = values.length === 0 || values.some(value => value);
    // if (!isLoading) loadings.set({ ...loadings.get(), shouldLoadAgain: true });
    // return isLoading;
  }

  set(collection: CollectionE | string, status: boolean) {
    const { loadings } = this;
    loadings.set({ ...loadings.get(), [collection]: status });
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
