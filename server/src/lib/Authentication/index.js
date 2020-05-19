const response = require("../HTTP/response");

function authenticate(req, res, next) {
    if (!req.headers["authorization"]) {
        return response.sendForbidden(res)
    }
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if (!token) {
        return response.sendForbidden(res);
    }
    if (token !== process.env.SERVER_SECRET) {
        return response.sendForbidden(res);
    }
    return next();
}

module.exports = authenticate;