import firebase, { getCurrentUserId } from '../../firebase';
import { BrickT, ConceptT } from '../../constants/types';
import { useFilteredBricks } from './helpers';
import { setFirestore } from '../firestore';
import { BRICK_COLLECTION } from './constants';
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

  setFirestore(BRICK_COLLECTION, enrichedBrick);
};

export const deleteBrick = (brickId: string) => {
  firebase
    .firestore()
    .collection(BRICK_COLLECTION)
    .doc(brickId)
    .delete()
    .then(() => {
      console.log('Brick deleted !');
    });
};
