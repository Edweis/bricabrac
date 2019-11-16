export const BRICK_COLLECTION = 'bricks';
export const COMMENT_COLLECTION = 'comments';
export const getCommentCollection = (brickId: string) =>
  `${BRICK_COLLECTION}/${brickId}/${COMMENT_COLLECTION}`;
