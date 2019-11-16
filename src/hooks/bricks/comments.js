import _ from 'lodash';
import { useState, useEffect } from 'react';
import firebase, { getCurrentUserId } from '../../firebase';

import { BRICK_COLLECTION, COMMENT_COLLECTION } from './constants';

export const useBrickComments = (brickId: string) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (brickId == null) return () => {};
    const collection = firebase.firestore().collection(BRICK_COLLECTION);
    const unsubscribe = collection
      .doc(brickId)
      .collection(COMMENT_COLLECTION)
      .onSnapshot(snapshot => {
        const newComments = snapshot.docs.map(comment => ({
          id: comment.id,
          ...comment.data()
        }));
        if (!_.isEqual(newComments, comments)) setComments(newComments);
      });
    return () => unsubscribe();
  }, [brickId]);

  return comments;
};

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
