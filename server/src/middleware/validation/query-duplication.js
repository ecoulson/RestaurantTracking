const { Response } = require("../../lib/HTTP");

function queryDuplicationMiddleware(param) {
    return (req, res, next) => {
        if (hasDuplication(req.query[param])) {
            return sendDuplicateError(res);
        }
        return next();
    }
}

// Is a duplicate if we are not expecting an array,
// otherwise duplication won't have an effect
function hasDuplication(param) {
    return Array.isArray(param)
}

function sendDuplicateError(res) {
    Response.sendError(res, {
        error: "Duplicate restaurantId was provided"
    });
}

module.exports = queryDuplicationMiddleware;