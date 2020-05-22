const router = require("express").Router();
const { validateParams, validateBody } = require("../lib/middleware/validation");
const { Response } = require("../lib/HTTP");
const Restaurant = require("../models/restaurant");
const { streamQRCode } = require("../lib/QR-code");

const CODE_PROPERTIES = ["restaurantId"];
const FIND_BY_ID_PROPERTIES = ["restaurantId"];
const RESTAURANT_PROPERTIES = ["name", "number"]

router.get("/:restaurantId/generate", validateParams(CODE_PROPERTIES), async (req, res) => {
    try {
        const restaurant = await getRestaurant(req.params.restaurantId);
        return streamQRCode(res, restaurant);
    } catch (error) {
        return Response.sendError(res, { error: error.message });
    } 
});

async function getRestaurant(restaurantId) {
    return await Restaurant.findById(restaurantId);
}

router.post("/register", validateBody(RESTAURANT_PROPERTIES), async (req, res) => {
    try {
        await saveRestaurantToDB(req.body);
        return sendSuccessfulRegistration(res, req.body.name)
    } catch(error) {
        return Response.sendError(res, { error: error.message });
    }
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

router.get("/:restaurantId", validateParams(FIND_BY_ID_PROPERTIES),  async (req, res) => {
    try {
        const restaurant = await getRestaurant(req.params.restaurantId);
        return Response.sendData(res, {
            restaurant
        });
    } catch (error) {
        return Response.sendError(res, { error: error.message });
    }
});

module.exports = router;