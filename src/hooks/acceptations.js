import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';

import firebase from '../firebase';
import { AcceptationT, StatusT } from '../constants/types';

export const ACCEPTATION_COLLECTION = 'acceptations';

export const genAcceptationId = (brickId: string, userId: string) =>
  `${userId}-${brickId}`;

export const useAcceptations = () => {
  const [acceptations, setAcceptations] = useState([]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(ACCEPTATION_COLLECTION)
      .onSnapshot(snapshot => {
        const newAcceptation = snapshot.docs.map(accceptation => ({
          id: accceptation.id,
          ...accceptation.data()
        }));
        if (!_.isEqual(newAcceptation, acceptations)) {
          setAcceptations(newAcceptation);
        }
      });
    return () => unsubscribe();
  }, []);

  // const filteredAcceptation = useMemo(() => {
  //   return acceptations.filter(acceptation => acceptation.userId === userId);
  // }, [acceptations, userId]);
  return acceptations;
};

export const useUserAcceptation = (userId: string): (string => StatusT) => {
  const acceptations = useAcceptations();

  return useCallback(
    brickId => {
      if (!userId) return 'none';
      const foundAcceptations = acceptations.filter(
        a => a.id === genAcceptationId(brickId, userId)
      );
      return foundAcceptations.length ? foundAcceptations[0].status : 'none';
    },
    [acceptations]
  );
};

export const setAcceptation = (acceptation: AcceptationT) => {
  const enrichedAcceptation = {
    ...acceptation,
    datetime: new Date()
  };

  const id = genAcceptationId(acceptation.brickId, acceptation.userId);
  firebase
    .firestore()
    .collection(ACCEPTATION_COLLECTION)
    .doc(id)
    .set(enrichedAcceptation)
    .then(() => {
      console.log('Acceptation Edited or added !');
      console.log({ enrichedAcceptation });
    })
    .catch(err => console.error(err));
};
