const { isFirstElement, isLastElement } = require("../../list-helper");
const Response = require("../../HTTP/response");

class StructureValidator {
    getMissingProperties(object, properties) {
        return properties.filter((property) => {
            return !object[property]
        });
    }

    isMissingProperties(missingProperties) {
        return missingProperties.length !== 0;
    }

    sendMissingPropertyError(res, missingProperties) {
        Response.sendError(res, {
            error: getMissingPropertyErrorMessage(missingProperties)
        });
    }
}

function getMissingPropertyErrorMessage(missingProperties) {
    return `No ${getMissingPropertiesList(missingProperties)} was provided`;
}

function getMissingPropertiesList(missingProperties) {
    if (isMissingOneProperty(missingProperties)) {
        return getSingleMissingPropertyList(missingProperties);
    }
    if (isMissingTwoProperties(missingProperties)) {
        return getTwoMissingPropertiesList(missingProperties);
    }
    return getMultipleMissingPropertiesList(missingProperties);
}

function isMissingOneProperty(missingProperties) {
    return missingProperties.length === 1;
}

function getSingleMissingPropertyList(missingProperties) {
    return missingProperties[0];
}

function isMissingTwoProperties(missingProperties) {
    return missingProperties.length === 2;
}

function getTwoMissingPropertiesList(missingProperties) {
    return `${missingProperties[0]} or ${missingProperties[1]}`;
}

function getMultipleMissingPropertiesList(missingProperties) {
    return missingProperties.reduce((errorMessage, missingProperty, i) => {
        if (isFirstElement(i, missingProperties)) {
            return missingProperty
        } else if (isLastElement(i, missingProperties)) {
            return errorMessage + `, or ${missingProperty}`;
        } else {
            return errorMessage + `, ${missingProperty}`;
        }
    });
}

module.exports = new StructureValidator();