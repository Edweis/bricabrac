import _ from 'lodash';
import { useState, useEffect } from 'react';
import firebase, { getCurrentUserId, getCurrentUser } from '../firebase';
import { DEFAULT_BRICK } from '../constants/defaults';
import { ConceptT, BrickT } from '../constants/types';
import { setUser } from './users';
import { useUserAcceptation, setAcceptation } from './acceptations';

export const BRICK_COLLECTION = 'bricks';
export const COMMENT_COLLECTION = 'comments';

export const useBricks = (concept: ConceptT) => {
  const userId = getCurrentUserId();
  const [bricks, setBricks] = useState([DEFAULT_BRICK]);
  const getUserAcceptation = useUserAcceptation(userId);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(BRICK_COLLECTION)
      .onSnapshot(snapshot => {
        const newBrics = snapshot.docs.map(brick => ({
          ...brick.data(),
          id: brick.id,
          status: getUserAcceptation(brick.id)
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
  const userId = getCurrentUserId();

  const enrichedBrick = {
    ...brick,
    submitTime: new Date(),
    author: userId
  };

  // Get the status and update it
  const { status } = enrichedBrick;
  delete enrichedBrick.status;

  // Get the id of the brick and remove it
  const id = enrichedBrick.id || null;
  delete enrichedBrick.id;

  setUser(getCurrentUser());

  const collection = firebase.firestore().collection(BRICK_COLLECTION);
  // if there is an Id, we edit the brick, otherwise we add it. Dirty.
  const setter =
    id != null
      ? collection.doc(id).set(enrichedBrick)
      : collection.add(enrichedBrick);
  setter
    .then(() => {
      console.log(id != null ? 'Brick Edited' : 'Brick added !');
      console.log({ enrichedBrick });
    })
    .then(postedBrick => {
      console.debug({ postedBrick });
      l();
      const acceptation = { userId, brickId: postedBrick.id, status };
      setAcceptation(acceptation);
    })
    .catch(err => console.error(err));
};

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
