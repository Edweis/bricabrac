import _ from 'lodash';
import { useState, useEffect } from 'react';
import { firebase } from '../firebase';

const BRIC_COLLECTION = 'brics';

const DEFAULT_BRIC = {
  id: -1,
  concepts: 'One concept',
  status: 'none',
  title: '',
  description: '',
  isDefinition: false,
};
export const useBricks = () => {
  const [brics, setBrics] = useState([DEFAULT_BRIC]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(BRIC_COLLECTION)
      .onSnapshot((snapshot) => {
        const newBrics = snapshot.docs.map((bric) => ({
          id: bric.id,
          ...bric.data(),
        }));
        if (!_.isEqual(newBrics, brics)) setBrics(newBrics);
      });
    return () => unsubscribe();
  }, []);
  return brics;
};

export const addBrick = (brick) => {
  firebase
    .firestore()
    .collection(BRIC_COLLECTION)
    .add(brick)
    .then(() => console.log('Brick added !'))
    .catch((err) => console.error(err));
};

export const useUsers = () => {};
