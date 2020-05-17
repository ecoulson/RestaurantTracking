const router = require("express").Router();
const qrcode = require("qrcode");
const { StructureValidator } = require("../lib/HTTP");
const { Response } = require("../lib/HTTP");

router.get("/code", (req, res) => {
    let missingProperties = StructureValidator.getMissingProperties(req.query, ["restaurant"]);
    if (StructureValidator.isMissingProperties(missingProperties)) {
        return StructureValidator.sendMissingPropertyError(res, missingProperties);
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
    let missingProperties = StructureValidator.getMissingProperties(req.body, ["name", "number"]);
    if (StructureValidator.isMissingProperties(missingProperties)) {
        return StructureValidator.sendMissingPropertyError(res, missingProperties);
    }
    return Response.sendData(res, {
        message: `Successfully registered ${req.body.name}`
    })
});

module.exports = router;