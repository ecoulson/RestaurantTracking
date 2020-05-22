const StructureValidator = require("./structure-validator");
const Middleware = require("./middleware");

module.exports = {
    StructureValidator,
    validateBody: Middleware.body,
    validateQuery: Middleware.query,
    validateParams: Middleware.params
}