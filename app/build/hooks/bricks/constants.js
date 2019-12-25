"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BRICK_COLLECTION = 'bricks';
exports.COMMENT_COLLECTION = 'comments';
exports.getCommentCollection = function (brickId) {
    return exports.BRICK_COLLECTION + "/" + brickId + "/" + exports.COMMENT_COLLECTION;
};
