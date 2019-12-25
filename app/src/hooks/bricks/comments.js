import { useFirestore, setFirestore } from '../firestore';
import { getCurrentUserId } from '../../firebase';
import { getCommentCollection } from './constants';

export const useBrickComments = (brickId: string) =>
  useFirestore(getCommentCollection(brickId));

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
