import { getCurrentUserId } from '../../firebase';
import { BrickT, ConceptT, CollectionE } from '../../constants/types';
import { useFilteredBricks } from './helpers';
import { setFirestore, deleteFirestore } from '../firestore';

import { useObservable } from '../../helpers/observable';
import { bricksService } from '../../helpers/store';

export const useBricks = (concept?: ConceptT) => {
  const bricks = useObservable(bricksService.value);
  const filteredBricks = useFilteredBricks(bricks, concept);
  return filteredBricks;
};

export const setBrick = (brick: BrickT) => {
  const userId = getCurrentUserId();

  const enrichedBrick = {
    submitTime: new Date(),
    ...brick,
    lastEditTime: new Date(),
    author: userId,
  };

  setFirestore(CollectionE.BRICKS, enrichedBrick);
};

export const deleteBrick = (brickId: string) => {
  deleteFirestore(CollectionE.BRICKS, brickId);
};
