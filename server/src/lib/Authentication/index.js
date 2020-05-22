const response = require("../HTTP/response");

function authenticate(req, res, next) {
    if (!hasAuthorizationHeader(req.headers)) {
        return response.sendForbidden(res)
    }
    const token = getAuthToken(req.headers);
    if (!isValidToken(token)) {
        return response.sendForbidden(res);
    }
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
    return token && token === process.env.SERVER_SECRET
}

module.exports = authenticate;