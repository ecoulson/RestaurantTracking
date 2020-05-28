const { Response } = require("../../lib/HTTP");
const { logger } = require("../../lib/logging");

function queryDuplicationMiddleware(param) {
    return (req, res, next) => {
        logger.debug(`Checking query for a duplicate of the ${param} parameter`);
        if (hasDuplication(req.query[param])) {
            logger.warn(`Found a duplicate of the ${param} parameter`);
            return sendDuplicateError(res, param);
        }
        logger.debug(`No duplicate of the ${param} parameter`);
        return next();
    }
}

// Is a duplicate if we are not expecting an array,
// otherwise duplication won't have an effect
function hasDuplication(param) {
    logger.debug(`Checking if ${param} is an array`);
    return Array.isArray(param)
}

function sendDuplicateError(res, param) {
    logger.debug(`Sending duplicate response for ${param}`);
    Response.sendError(res, {
        error: `Duplicate ${param} was provided`
    });
}

module.exports = queryDuplicationMiddleware;