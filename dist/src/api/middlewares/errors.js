"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.createErrorHandler = void 0;
const UnauthorizerError_1 = require("../errors/UnauthorizerError");
const ApplicationError_1 = require("../../app/errors/ApplicationError");
const ValidationError_1 = require("../../app/errors/ValidationError");
const AccessDeniedError_1 = require("../errors/AccessDeniedError");
const NotFoundError_1 = require("../../app/errors/NotFoundError");
const internalServerErrorCode = "internal_server_error";
const internalServerError = "Internal server error";
function createErrorHandler(logger) {
    return (err, req, res, next) => {
        var _a;
        let status = 500;
        if (err instanceof UnauthorizerError_1.UnauthorizedError) {
            status = 401;
        }
        else if (err instanceof AccessDeniedError_1.AccessDeniedError) {
            status = 403;
        }
        else if (err instanceof NotFoundError_1.NotFoundError) {
            status = 404;
        }
        else if (err instanceof ApplicationError_1.ApplicationError) {
            const { message, meta: context } = err;
            logger.error({ message, context });
        }
        else {
            logger.error((_a = err.message) !== null && _a !== void 0 ? _a : internalServerError);
        }
        const error = {
            code: err instanceof ApplicationError_1.ApplicationError ? err.code : internalServerErrorCode,
            message: err instanceof ApplicationError_1.ApplicationError ? err.message : internalServerError,
        };
        if (err instanceof ValidationError_1.ValidationError) {
            status = 422;
            error.field = err.field;
        }
        res.status(status);
        res.json({
            errors: [error],
        });
        next(err);
    };
}
exports.createErrorHandler = createErrorHandler;
function notFoundHandler(req, res) {
    res.status(404);
    res.json({
        errors: [
            {
                code: "not_found",
                message: "Resource not found",
            },
        ],
    });
}
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=errors.js.map