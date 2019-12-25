"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("../helpers");
var firebase_1 = require("../../firebase");
var constants_1 = require("./constants");
exports.useBrickComments = function (brickId) {
    return helpers_1.useFirestore(constants_1.getCommentCollection(brickId));
};
exports.updateBrickComment = function (brickId, comment) {
    var collection = constants_1.getCommentCollection(brickId);
    var userId = firebase_1.getCurrentUserId();
    var enrichedComment = {
        author: userId,
        datetime: new Date(),
        text: comment,
    };
    helpers_1.setFirestore(collection, enrichedComment);
};
