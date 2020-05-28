const { Response } = require("../../lib/HTTP");
const { logger } = require("../../lib/logging");

function authenticate(req, res, next) {
    logger.debug(`Checking for authorization headers`);
    if (!hasAuthorizationHeader(req.headers)) {
        logger.warn(`Failed to find authorization header for request to ${req.originalUrl}`);
        return Response.sendForbidden(res)
    }
    logger.debug(`Parsing authentication token`);
    const token = getAuthToken(req.headers);
    logger.debug(`Parsed authentication token`);
    if (!isValidToken(token)) {
        logger.warn(`Invalid token sent from ${req.originalUrl}`);
        return Response.sendForbidden(res);
    }
    logger.debug(`Authenticated request`);
    return next();
}

function hasAuthorizationHeader(headers) {
    return headers["authorization"] || headers["Authorization"];
}

function getAuthToken(headers) {
    return getAuthHeader(headers).split(" ")[1];
}

function getAuthHeader(headers) {
    if (headers["authorization"]) {
        return headers["authorization"];
    }
    return headers["Authorization"];
}

function isValidToken(token) {
    logger.debug(`Validating token`);
    return token && token === process.env.SERVER_SECRET
}

module.exports = authenticate;