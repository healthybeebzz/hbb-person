"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
/**
 * Catches the errors so that the application does not crash.
 * Sends the errors to the global error handler.
 * @param cb
 */
const asyncHandler = (cb) => {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        }
        catch (error) {
            // Forward error to the global error handler
            next(error);
        }
    };
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=async-handler.js.map