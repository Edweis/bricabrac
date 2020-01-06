import { useCallback } from 'react';
import { setFirestore } from './firestore';
import { Timestamp } from '../firebase';
import { AcceptationT, StatusT, AcceptationSetT } from '../constants/types';
import { useObservable } from '../helpers/observable';
import { acceptationService } from '../helpers/store';

export const ACCEPTATION_COLLECTION = 'acceptations';

export const genAcceptationId = (brickId: string, userId: string) =>
  `${userId}-${brickId}`;

export const useUserAcceptation = (
  userId: string,
): ((brickId: string) => StatusT) => {
  const acceptations = useObservable(acceptationService.value);

  return useCallback(
    brickId => {
      if (!userId) return StatusT.none;
      const accId = genAcceptationId(brickId, userId);
      const foundAcceptations = acceptations.filter(acc => acc.id === accId);
      console.debug(foundAcceptations.length, accId);
      return foundAcceptations.length
        ? foundAcceptations[0].status
        : StatusT.none;
    },
    [acceptations],
  );
};

export const setAcceptation = (acceptation: AcceptationSetT) => {
  const enrichedAcceptation = {
    ...acceptation,
    datetime: Timestamp.now(),
    id: genAcceptationId(acceptation.brickId, acceptation.userId),
  } as AcceptationT;

  setFirestore(ACCEPTATION_COLLECTION, enrichedAcceptation);
};
