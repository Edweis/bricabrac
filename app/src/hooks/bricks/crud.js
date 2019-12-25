import firebase, { getCurrentUserId } from '../../firebase';
import { BrickT } from '../../constants/types';
import { useUserAcceptation, setAcceptation } from '../acceptations';
import { useFilteredBricks, useBrickWithAcceptation } from './helpers';
import { setFirestore } from '../firestore';
import { BRICK_COLLECTION } from './constants';
import { useObservable } from '../../helpers/observable';
import { bricksService } from '../../helpers/store';

export const useBricks = (concept?: ConceptT) => {
  const userId = getCurrentUserId();
  const getUserAcceptation = useUserAcceptation(userId);
  const bricks = useObservable(bricksService.bricks);
  const filteredBricks = useFilteredBricks(bricks, concept);
  const bricksWithAcceptation = useBrickWithAcceptation(
    filteredBricks,
    getUserAcceptation, // PUT ME IN TYHE FUCNTION
  );
  return bricksWithAcceptation;
};

export const setBrick = (brick: BrickT) => {
  const userId = getCurrentUserId();

  const enrichedBrick = {
    submitTime: new Date(),
    ...brick,
    lastEditTime: new Date(),
    author: userId,
  };

  // Get the status and update it
  const { status } = enrichedBrick;
  delete enrichedBrick.status;

  const setAcceptationFromBrick = brickWithId => {
    const acceptation = {
      userId,
      brickId: brickWithId.id,
      status,
    };
    setAcceptation(acceptation);
  };

  setFirestore(BRICK_COLLECTION, enrichedBrick, setAcceptationFromBrick);
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
