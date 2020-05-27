const { Response } = require("../../lib/HTTP");

function hapiValidation(schema, property) {
    return (req, res, next) => {
        const validationResult = schema.validate(req[property]);
        if (validationResult.error) {
            return Response.sendError(res, {
                error: getErrors(validationResult.error)
            })
        }
        return next();
    }
}

function getErrors(errors) {
    return errors.details.map((error) => {
        return error.message;
    })
}

module.exports = hapiValidation