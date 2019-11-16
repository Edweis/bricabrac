import { useEffect, useCallback } from 'react';
import { useFirestore } from './helpers';
import firebase from '../firebase';
import { AcceptationT, StatusT } from '../constants/types';

export const ACCEPTATION_COLLECTION = 'acceptations';

export const genAcceptationId = (brickId: string, userId: string) =>
  `${userId}-${brickId}`;

export const useAcceptations = () => useFirestore(ACCEPTATION_COLLECTION);

export const useUserAcceptation = (userId: string): (string => StatusT) => {
  const acceptations = useAcceptations();

  useEffect(() => {
    console.debug('refreshing user acceptation');
  }, [acceptations]);

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
