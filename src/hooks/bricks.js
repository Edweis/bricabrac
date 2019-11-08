import _ from 'lodash';
import React, { useState, useEffect, useContext } from 'react';
import firebase, { getCurrentUserId, getCurrentUser } from '../firebase';
import { DEFAULT_BRICK } from '../constants/defaults';
import { ConceptT, BrickT } from '../constants/types';
import { setUser } from './users';
import { useUserAcceptation, setAcceptation } from './acceptations';
import { usePrevious } from './helpers';

export const BRICK_COLLECTION = 'bricks';
export const COMMENT_COLLECTION = 'comments';

export const BrickContext = React.createContext([]);

export const useBrickContext = (concept: ConceptT = null) => {
  const bricks = useContext(BrickContext);

  if (concept != null)
    return bricks.filter(brick => brick.parentConcept === concept);
  return bricks;
};

export const useBricks = (projectSource?: string) => {
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
          id: brick.id
        }));

        if (!_.isEqual(newBrics, _.omit(bricks, 'status'))) setBricks(newBrics);
      });
    return () => unsubscribe();
  }, []);

  // filter bricks by project
  const prevBricks = usePrevious(bricks);
  const prevProjectSource = usePrevious(projectSource);
  useEffect(() => {
    const didChange =
      !_.isEqual(prevBricks, bricks) ||
      !_.isEqual(prevProjectSource, projectSource);

    if (didChange) {
      const filteredBricks = bricks.filter(
        brick => !projectSource || brick.source === projectSource
      );
      setBricks(filteredBricks);
    }
  }, [bricks, projectSource]);

  // Update when acceptations changes
  // TODO look if we can use relationship in firestore database
  useEffect(() => {
    if (!_.isEqual(prevBricks, bricks)) {
      const updatedBricks = bricks.map(brick => ({
        ...brick,
        status: getUserAcceptation(brick.id)
      }));
      setBricks(updatedBricks);
    }
  }, [bricks, getUserAcceptation]);

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
    .then(postedBrick => {
      const acceptation = {
        userId,
        brickId: postedBrick ? postedBrick.id : id,
        status
      };
      setAcceptation(acceptation);
    })
    .then(() => {
      console.log(id != null ? 'Brick Edited' : 'Brick added !');
      console.log({ enrichedBrick });
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
