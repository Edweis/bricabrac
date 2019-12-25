"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
exports.BrickContext = react_1.createContext([]);
exports.useBrickContext = function (concept) {
    if (concept === void 0) { concept = null; }
    var bricks = react_1.useContext(exports.BrickContext);
    if (concept != null)
        return bricks.filter(function (brick) { return brick.parentConcept === concept; });
    return bricks;
};
