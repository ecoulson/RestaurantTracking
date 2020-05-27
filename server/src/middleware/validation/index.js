const hapiValidation = require("./hapi-validation");
const QueryDupliciationMiddleware = require("./query-duplication");

module.exports = {
    checkQueryDuplication: QueryDupliciationMiddleware,
    hapiValidation
}