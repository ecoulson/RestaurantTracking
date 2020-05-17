const router = require("express").Router();
const { StructureValidator } = require("../lib/HTTP");
const { Response } = require("../lib/HTTP");
const CheckIn = require("../models/check-in");

const CHECK_IN_PROPERTIES = ["email", "number", "restaurantId"]

router.post("/", async (req, res) => {
    let missingProperties = StructureValidator.getMissingProperties(req.body, CHECK_IN_PROPERTIES);
    if (StructureValidator.isMissingProperties(missingProperties)) {
        return StructureValidator.sendMissingPropertyError(res, missingProperties);
    }
    await saveCheckInToDB(req);
    Response.sendData(res, {
        message: "Successfully checked in"
    })
});

async function saveCheckInToDB(req) {
    const checkIn = new CheckIn({
        number: req.body.number,
        email: req.body.email,
        restaurantId: req.body.restaurantId
    })
    await checkIn.save();
}

module.exports = router;