import firebase, { getCurrentUserId, getCurrentUser } from '../../firebase';
import { BrickT } from '../../constants/types';
import { setUser } from '../users';
import { useUserAcceptation, setAcceptation } from '../acceptations';
import { useFilteredBricks, useBrickWithAcceptation } from './helpers';
import { useFirestore } from '../helpers';
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
    ...brick,
    submitTime: new Date(),
    author: userId
  };

  // Get the status and update it
  const { status } = enrichedBrick;
  delete enrichedBrick.status;

  // Get the id of the brick and remove it
  const id = enrichedBrick.id || null;
  delete enrichedBrick.id;

  setUser(getCurrentUser());

  const collection = firebase.firestore().collection(BRICK_COLLECTION);
  // if there is an Id, we edit the brick, otherwise we add it. Dirty.
  const setter =
    id != null
      ? collection.doc(id).set(enrichedBrick)
      : collection.add(enrichedBrick);
  setter
    .then(postedBrick => {
      const acceptation = {
        userId,
        brickId: postedBrick ? postedBrick.id : id,
        status
      };
      setAcceptation(acceptation);
    })
    .then(() => {
      console.log(id != null ? 'Brick Edited' : 'Brick added !');
      console.log({ enrichedBrick });
    })
    .catch(err => console.error(err));
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
