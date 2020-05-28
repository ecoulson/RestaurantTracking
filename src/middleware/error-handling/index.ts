import { Response } from "../../lib/HTTP";
import { logger } from "../../lib/logging";

function devErrorHandler(err, req, res, next) {
    logger.error(err.message);
    err.stack = err.stack || ''
    Response.sendError(res, { 
        error: err.message,
        stack: err.stack
    })
}

const errorHandler = (err, req, res, next) => Response.sendError(res, { error: err.message });

const catchErrors = action => (req, res, next) => action(req, res).catch(next)

export {
    devErrorHandler,
    errorHandler,
    catchErrors
}