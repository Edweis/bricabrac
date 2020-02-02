import { Observable } from '../observable';
import { CollectionE, BrickT, CommentT } from '../../constants/types';
import FirestoreService, { subscribeFirestore } from './firestore';
import { getCommentCollection } from './helpers';

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
      if (this.subscription != null) this.subscription.add(subscription);
    }
    return this.comments[brickId];
  }
}
