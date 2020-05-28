const { Response } = require("../../lib/HTTP");
const { logger } = require("../../lib/logging");

function hapiValidation(schema, property) {
    return (req, res, next) => {
        logger.debug(`Validating the request to ${req.originalUrl} against the schema`);
        const validationResult = schema.validate(req[property]);
        if (validationResult.error) {
            logger.warn(`Failed to validate schema for request to ${req.originalUrl} in the ${property}`)
            return Response.sendError(res, {
                error: getErrors(validationResult.error)
            })
        }
        logger.debug(`Validated the request to ${req.originalUrl}`);
        return next();
    }
}

function getErrors(errors) {
    return errors.details.map((error) => {
        return error.message;
    })
}

module.exports = hapiValidation