import { CollectionE, ComputedCollection } from '../../constants/types';

export const getCommentCollection = (brickId: string): ComputedCollection =>
  `${CollectionE.BRICKS}/${brickId}/${CollectionE.COMMENTS}`;
