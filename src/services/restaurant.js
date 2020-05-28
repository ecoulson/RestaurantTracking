const Restaurant = require("../models/restaurant");
const { streamQRCode } = require("../lib/QR-code");
const { Response } = require("../lib/HTTP");
const URLShortner = require("../lib/URL-shortener");
const { logger } = require("../lib/logging");

async function generateQRCode(req, res) {
    logger.debug(`>>> generating a QR Code for restaurant with id ${req.params.restaurantId}`);
    const restaurant = await findRestaurant(req.params.restaurantId);
    if (!restaurant) {
        logger.error(`Failed to generate a QR Code for restaurant with id ${req.params.restaurantId} because it does not exsist`);
        return Response.sendError(res, {
            error: `Failed to find a restaurant with id ${req.params.restaurantId}`
        });
    }
    return streamQRCode(res, restaurant);
}

async function findRestaurant(restaurantId) {
    logger.debug(`>>> finding a restaurant with id ${restaurantId}`);
    return await Restaurant.findById(restaurantId);
}

async function registerRestaurant(req, res) {
    await saveRestaurantToDB(req.body);
    return sendSuccessfulRegistration(res, req.body.name)
}

async function saveRestaurantToDB(body) {
    const doc = new Restaurant({
        name: body.name,
        number: body.number,
        url: ""
    });
    await doc.save();
    await doc.update({
        url: (await URLShortner(doc._id)).data.link
    });
}

function sendSuccessfulRegistration(res, name) {
    return Response.sendData(res, {
        message: `Successfully registered ${name}`,
    })
}

async function getRestaurant(req, res) {
    const restaurant = await findRestaurant(req.params.restaurantId);
    if (restaurant) {
        return Response.sendData(res, {
            restaurant
        });
    } else {
        return Response.sendError(res, {
            error: "Could not find restaurant"
        })
    }
}

module.exports = {
    generateQRCode,
    registerRestaurant,
    getRestaurant
}