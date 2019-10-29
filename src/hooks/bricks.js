import _ from 'lodash';
import { useState, useEffect } from 'react';
import firebase from '../firebase';
import { DEFAULT_BRICK } from '../constants/defaults';
import { ConceptT, BrickT } from '../constants/types';
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

export const setBrick = (brick: BrickT) => {
  const user = firebase.auth().currentUser;

  const enrichedBrick = {
    ...brick,
    submitTime: new Date(),
    author: user.uid
  };

  const id = enrichedBrick.id || null;
  delete enrichedBrick.id;

  setUser(user);

  const collection = firebase.firestore().collection(BRICK_COLLECTION);
  // if there is an Id, we edit the brick.
  const doc = id != null ? collection.doc(id) : collection.doc();
  doc
    .set(enrichedBrick)
    .then(() => {
      console.log(id != null ? 'Brick Edited' : 'Brick added !');
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
