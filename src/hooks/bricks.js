import _ from 'lodash';
import { useState, useEffect } from 'react';
import firebase from '../firebase';
import { DEFAULT_BRICK } from '../constants/defaults';
import { ConceptT } from '../constants/types';
import { setUser } from './users';

export const BRICK_COLLECTION = 'bricks';
export const COMMENT_COLLECTION = 'comments';

export const useBricks = (concept: ConceptT) => {
  const [bricks, setBricks] = useState([DEFAULT_BRICK]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(BRICK_COLLECTION)
      .onSnapshot(snapshot => {
        const newBrics = snapshot.docs.map(brick => ({
          id: brick.id,
          ...brick.data()
        }));
        if (!_.isEqual(newBrics, bricks)) setBricks(newBrics);
      });
    return () => unsubscribe();
  }, []);
  if (concept != null)
    return bricks.filter(brick => brick.parentConcept === concept);
  return bricks;
};

export const addBrick = brick => {
  const user = firebase.auth().currentUser;

  const enrichedBrick = {
    ...brick,
    submitTime: new Date(),
    author: user.uid
  };

  delete enrichedBrick.id;

  setUser(user);

  firebase
    .firestore()
    .collection(BRICK_COLLECTION)
    .add(enrichedBrick)
    .then(() => {
      console.log('Brick added !');
      console.log({ enrichedBrick });
    })
    .catch(err => console.error(err));
};

export const useBrickComments = (brickId: string) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(BRICK_COLLECTION)
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
  }, []);

  return comments;
};
