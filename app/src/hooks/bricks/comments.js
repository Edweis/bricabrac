import { setFirestore } from '../firestore';
import { getCurrentUserId } from '../../firebase';
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
    datetime: new Date(),
    text: comment,
  };

  setFirestore(collection, enrichedComment);
};
