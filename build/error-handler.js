"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.log("err ", err);
    res.status(500).send('Oops, something went wrong!');
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map