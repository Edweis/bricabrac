/* eslint-disable max-classes-per-file */
import _ from 'lodash';
import { Observable } from '../observable';
import {
  ProjectT,
  CollectionE,
  LoadingT,
  BrickRawT,
  ComputedCollection,
  CommentT,
} from '../../constants/types';
import FirestoreService, { subscribeFirestore } from './firestore';

export const getCommentCollection = (brickId: string): ComputedCollection =>
  `${CollectionE.BRICKS}/${brickId}/${CollectionE.COMMENTS}`;

export class BricksService extends FirestoreService<BrickRawT> {
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
      if (this.subscription != null) this.subscription.add(subscription);
    }
    return this.comments[brickId];
  }
}

export class LoadingService {
  readonly loadings = new Observable<LoadingT>({ shouldLoadAgain: true });

  isLoading() {
    const { loadings } = this;
    const loadingObject = loadings.get();
    if (!loadingObject.shouldLoadAgain) return false;
    const values = _(loadingObject)
      .omit('shouldLoadAgain')
      .values()
      .value();
    const isLoading = values.length === 0 || values.some(value => value);
    if (!isLoading) loadings.set({ ...loadingObject, shouldLoadAgain: false });

    return isLoading;
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
