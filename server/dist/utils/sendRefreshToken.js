"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRefreshToken = void 0;
const constants_1 = require("../constants");
const sendRefreshToken = (res, token) => {
    res.cookie('qid', token, {
        httpOnly: true,
        secure: constants_1.___prod___
    });
};
exports.sendRefreshToken = sendRefreshToken;
//# sourceMappingURL=sendRefreshToken.js.map