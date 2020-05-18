const router = require("express").Router();
const { StructureValidator } = require("../lib/HTTP");
const { Response } = require("../lib/HTTP");
const Restaurant = require("../models/restaurant");
const { streamQRCode } = require("../lib/QRCode");

const CODE_PROPERTIES = ["restaurantId"];
const RESTAURANT_PROPERTIES = ["name", "number"]

router.get("/code/:restaurantId", async (req, res) => {
    let missingProperties = StructureValidator.getMissingProperties(req.params, CODE_PROPERTIES);
    if (StructureValidator.isMissingProperties(missingProperties)) {
        return StructureValidator.sendMissingPropertyError(res, missingProperties);
    }
    const restaurant = await getRestaurant(req.params);
    return streamQRCode(res, restaurant);
});

async function getRestaurant(params) {
    return await Restaurant.findById(params.restaurantId);
}

router.post("/register", async (req, res) => {
    let missingProperties = StructureValidator.getMissingProperties(req.body, RESTAURANT_PROPERTIES);
    if (StructureValidator.isMissingProperties(missingProperties)) {
        return StructureValidator.sendMissingPropertyError(res, missingProperties);
    }
    await saveRestaurantToDB(req.body);
    return sendSuccessfulRegistration(res, req.body.name)
});

async function saveRestaurantToDB(body) {
    const doc = new Restaurant({
        name: body.name,
        number: body.number
    });
    await doc.save();
}

function sendSuccessfulRegistration(res, name) {
    return Response.sendData(res, {
        message: `Successfully registered ${name}`,
    })
}

module.exports = router;