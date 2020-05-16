const router = require("express").Router();
const qrcode = require("qrcode");

const SUCCESS_CODE = 200;
const FAILURE_CODE = 400;

router.get("/code", (req, res) => {
    missingProperties = getMissingProperties(req.query, ["restaurant"]);
    if (isMissingProperties(missingProperties)) {
        return sendMissingPropertyError(res, missingProperties);
    }
    streamQRCode(res, getQRCodeContent(req.query.restaurant));
});

function streamQRCode(res, qrCodeContent) {
    return qrcode.toFileStream(res, qrCodeContent);
}

function getQRCodeContent(restaurant) {
    return `SMSTO:4255035202:Bob's Burgers`
}

router.post("/register", (req, res) => {
    missingProperties = getMissingProperties(req.body, ["name", "number"]);
    if (isMissingProperties(missingProperties)) {
        return sendMissingPropertyError(res, missingProperties);
    }
    return sendSuccess(res, `Successfully registered ${req.body.name}`);
});

function getMissingProperties(object, properties) {
    return properties.filter((property) => {
        return !object[property]
    });
}

function isMissingProperties(missingProperties) {
    return missingProperties.length !== 0;
}

function sendMissingPropertyError(res, missingProperties) {
    sendError(res, getMissingPropertyErrorMessage(missingProperties));
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
        if (i === missingProperties.length - 1) {
            return errorMessage + `, or ${missingProperty}`;
        } else if (i === 0) {
            return missingProperty
        }
        else {
            return errorMessage + `, ${missingProperty}`;
        }
    }, "");
}

function sendError(res, message) {
    sendResponse(res, message, FAILURE_CODE)
}

function sendResponse(res, message, status) {
    res.status(status).json({
        success: status === SUCCESS_CODE,
        message: message
    });
}

function sendSuccess(res, message) {
    sendResponse(res, message, SUCCESS_CODE)
}

module.exports = router;