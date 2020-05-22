const StructureValidator = require("./structure-validator");
const ValidationMiddleware = require("./middleware");
const QueryDupliciationMiddleware = require("./query-duplication");

module.exports = {
    StructureValidator,
    validateBody: ValidationMiddleware.body,
    validateQuery: ValidationMiddleware.query,
    validateParams: ValidationMiddleware.params,
    checkQueryDuplication: QueryDupliciationMiddleware
}