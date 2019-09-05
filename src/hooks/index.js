import { useState, useEffect } from 'react';
import { firebase } from '../firebase';

const BRIC_COLLECTION = 'brics';

const DEFAULT_BRIC = {
  concepts: 'One concept',
  status: 'none',
  title: '',
  description: '',
  isDefinition: false,
};
export const useBrics = () => {
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
        setBrics(newBrics);
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
