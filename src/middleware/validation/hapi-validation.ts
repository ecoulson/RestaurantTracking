import Joi from "@hapi/joi";
import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../../lib/HTTP/ErrorResponse";

const { logger } = require("../../lib/logging");

function hapiValidation(schema : Joi.ObjectSchema , property : string) {
    return (req : Request, res : Response, next : NextFunction) => {
        logger.debug(`Validating the request to ${req.originalUrl} against the schema`);
        const toValidate = (req as any)[property];
        const validationResult = schema.validate(toValidate);
        if (validationResult.error) {
            logger.warn(`Failed to validate schema for request to ${req.originalUrl} in the ${property}`)
            return new ErrorResponse(res).send({
                error: getErrors(validationResult.error)
            });
        }
        logger.debug(`Validated the request to ${req.originalUrl}`);
        return next();
    }
}

function getErrors(errors : Joi.ValidationError) {
    return errors.details.map((error) => {
        return error.message;
    })
}

export { 
    hapiValidation
}