import { useCallback } from 'react';
import { useFirestore, setFirestore } from './helpers';
import { AcceptationT, StatusT } from '../constants/types';

export const ACCEPTATION_COLLECTION = 'acceptations';

export const genAcceptationId = (brickId: string, userId: string) =>
  `${userId}-${brickId}`;

export const useAcceptations = () => useFirestore(ACCEPTATION_COLLECTION);

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
    datetime: new Date(),
    id: genAcceptationId(acceptation.brickId, acceptation.userId)
  };

  setFirestore(ACCEPTATION_COLLECTION, enrichedAcceptation);
};
