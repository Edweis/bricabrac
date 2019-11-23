import firebase, { getCurrentUserId, getCurrentUser } from '../../firebase';
import { BrickT } from '../../constants/types';
import { setUser } from '../users';
import { useUserAcceptation, setAcceptation } from '../acceptations';
import { useFilteredBricks, useBrickWithAcceptation } from './helpers';
import { useFirestore, setFirestore } from '../helpers';
import { BRICK_COLLECTION } from './constants';

export const useBricks = (projectSource?: string) => {
  const userId = getCurrentUserId();
  const getUserAcceptation = useUserAcceptation(userId);
  const bricks = useFirestore(BRICK_COLLECTION, 'status');

  const filteredBricks = useFilteredBricks(bricks, projectSource);
  const bricksWithAcceptation = useBrickWithAcceptation(
    filteredBricks,
    getUserAcceptation
  );
  return bricksWithAcceptation;
};

export const setBrick = (brick: BrickT) => {
  const userId = getCurrentUserId();

  const enrichedBrick = {
    submitTime: new Date(),
    ...brick,
    lastEditTime: new Date(),
    author: userId
  };

  // Get the status and update it
  const { status } = enrichedBrick;
  delete enrichedBrick.status;

  const setAcceptationFromBrick = brickWithId => {
    const acceptation = {
      userId,
      brickId: brickWithId.id,
      status
    };
    setAcceptation(acceptation);
  };

  Promise.all([
    setFirestore(BRICK_COLLECTION, enrichedBrick, setAcceptationFromBrick),
    setUser(getCurrentUser())
  ]);
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
