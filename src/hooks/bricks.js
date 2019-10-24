import _ from 'lodash';
import { useState, useEffect } from 'react';
import firebase from '../firebase';
import { DEFAULT_BRICK } from '../constants/defaults';
import { ConceptT } from '../constants/types';

export const BRICK_COLLECTION = 'bricks';

export const useBricks = (concept: ConceptT) => {
  const [bricks, setBricks] = useState([DEFAULT_BRICK]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(BRICK_COLLECTION)
      .onSnapshot(snapshot => {
        const newBrics = snapshot.docs.map(bric => ({
          id: bric.id,
          ...bric.data()
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
  const enrichedBrick = {
    ...brick,
    submitTime: new Date()
  };

  delete enrichedBrick.id;

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
