const StructureValidator = require("./structure-validator");

function validationMiddleware(location, properties) {
    return (req, res, next) => {
        let missingProperties = StructureValidator.getMissingProperties(
            req[location], 
            properties
        );
        if (StructureValidator.isMissingProperties(missingProperties)) {
            return StructureValidator.sendMissingPropertyError(res, missingProperties);
        }
        return next();
    }
}

module.exports = {
    body: (properties) => validationMiddleware("body", properties),
    query: (properties) => validationMiddleware("query", properties),
    params: (properties) => validationMiddleware("params", properties)
}
