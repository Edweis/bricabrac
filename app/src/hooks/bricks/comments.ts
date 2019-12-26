import { setFirestore } from '../firestore';
import { getCurrentUserId, Timestamp } from '../../firebase';
import { getCommentCollection } from './constants';
import { useObservable } from '../../helpers/observable';
import { bricksService } from '../../helpers/store';

export const useBrickComments = (brickId: string) =>
  useObservable(bricksService.commentsService(brickId));

export const updateBrickComment = (brickId: string, comment: string) => {
  const collection = getCommentCollection(brickId);
  const userId = getCurrentUserId();
  const enrichedComment = {
    author: userId,
    datetime: Timestamp.now(),
    text: comment,
  };

  setFirestore(collection, enrichedComment);
};
