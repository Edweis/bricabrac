import { useCallback, useState, useEffect } from 'react';
import _ from 'lodash';

import firebase from '../firebase';
import { AcceptationT, StatusT } from '../constants/types';

export const ACCEPTATION_COLLECTION = 'acceptations';

export const genAcceptationId = (brickId: string, userId: string) =>
  `${userId}-${brickId}`;

export const useAcceptations = (userId?: string) => {
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
        if (!_.isEqual(newAcceptation, acceptations))
          setAcceptations(newAcceptation);
      });
    return () => unsubscribe();
  }, []);
  if (userId != null)
    return acceptations.filter(acceptation => acceptation.userId === userId);
  return acceptations;
};

export const useUserAcceptation = (userId: string): (string => StatusT) => {
  const acceptations = useAcceptations(userId);
  return useCallback(
    brickId =>
      _.find(
        acceptations,
        a => a.userId === genAcceptationId(brickId, userId)
      ) || 'none',
    [userId]
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
