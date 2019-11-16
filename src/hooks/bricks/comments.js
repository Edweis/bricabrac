import { useFirestore } from '../helpers';
import firebase, { getCurrentUserId } from '../../firebase';

import {
  getCommentCollection,
  BRICK_COLLECTION,
  COMMENT_COLLECTION
} from './constants';

export const useBrickComments = (brickId: string) =>
  useFirestore(getCommentCollection(brickId));

export const updateBrickComment = (brickId: string, comment: string) => {
  const userId = getCurrentUserId();
  const enrichedComment = {
    author: userId,
    datetime: new Date(),
    text: comment
  };
  firebase
    .firestore()
    .collection(BRICK_COLLECTION)
    .doc(brickId)
    .collection(COMMENT_COLLECTION)
    .add(enrichedComment)
    .then(() => {
      console.log('Comment added !');
      console.log({ enrichedComment });
    });
};
