import { useCallback } from 'react';
import { setFirestore } from './firestore';
import { AcceptationT, StatusT } from '../constants/types';
import { useObservable } from '../helpers/observable';
import { acceptationService } from '../helpers/store';

export const ACCEPTATION_COLLECTION = 'acceptations';

export const genAcceptationId = (brickId: string, userId: string) =>
  `${userId}-${brickId}`;

export const useUserAcceptation = (
  userId: string,
): ((acceptation: string) => StatusT) => {
  const acceptations = useObservable(acceptationService.value);

  return useCallback(
    brickId => {
      if (!userId) return 'none';
      const foundAcceptations = acceptations.filter(
        a => a.id === genAcceptationId(brickId, userId),
      );
      return foundAcceptations.length ? foundAcceptations[0].status : 'none';
    },
    [acceptations],
  );
};

export const setAcceptation = (acceptation: AcceptationT) => {
  const enrichedAcceptation = {
    ...acceptation,
    datetime: new Date(),
    id: genAcceptationId(acceptation.brickId, acceptation.userId),
  };

  setFirestore(ACCEPTATION_COLLECTION, enrichedAcceptation);
};
