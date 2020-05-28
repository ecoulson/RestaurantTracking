const { Response } = require("../../lib/HTTP");
const { logger } = require("../../lib/logging");

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

module.exports = {
    devErrorHandler,
    errorHandler,
    catchErrors
}