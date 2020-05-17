const router = require("express").Router();
const { StructureValidator } = require("../lib/HTTP");
const { Response } = require("../lib/HTTP");
const Restaurant = require("../models/restaurant");
const { streamQRCode } = require("../lib/QRCode");

router.get("/code", async (req, res) => {
    let missingProperties = StructureValidator.getMissingProperties(req.query, ["restaurant"]);
    if (StructureValidator.isMissingProperties(missingProperties)) {
        return StructureValidator.sendMissingPropertyError(res, missingProperties);
    }
    const restaurant = await getRestaurant(req.query);
    streamQRCode(res, restaurant);
});

async function getRestaurant(query) {
    return await Restaurant.findById(query.restaurant);
}

router.post("/register", async (req, res) => {
    let missingProperties = StructureValidator.getMissingProperties(req.body, ["name", "number"]);
    if (StructureValidator.isMissingProperties(missingProperties)) {
        return StructureValidator.sendMissingPropertyError(res, missingProperties);
    }
    await saveRestaurantToDB(req.body);
    return Response.sendData(res, {
        message: `Successfully registered ${req.body.name}`,
    })
});

async function saveRestaurantToDB(body) {
    const doc = new Restaurant({
        name: body.name,
        number: body.number
    });
    Restaurant.create(doc);
    await doc.save();
}

module.exports = router;