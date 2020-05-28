const Restaurant = require("../models/restaurant");
const { streamQRCode } = require("../lib/QR-code");
const { Response } = require("../lib/HTTP");
const URLShortner = require("../lib/URL-shortener");
const { logger } = require("../lib/logging");

async function generateQRCode(req, res) {
    logger.info(`Generating a QR Code for restaurant with id ${req.params.restaurantId}`);
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
    logger.debug(`Finding a restaurant with id ${restaurantId}`);
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        logger.debug(`Found a restaurant with id ${restaurantId}`);
        return restaurant;
    } catch (error) {
        logger.debug(`Failed to find a restaurant with id ${restaurantId}`);
        return null;
    }
}

async function registerRestaurant(req, res) {
    logger.info(`Registering ${req.body.name} as a restaurant`);
    await saveRestaurantToDB(req.body);
    logger.info(`Registered ${req.body.name} as a restaurant`);
    return sendSuccessfulRegistration(res, req.body.name)
}

async function saveRestaurantToDB(body) {
    logger.debug(`Saving a restaurant by the name ${body.name} to the database`);
    const doc = new Restaurant({
        name: body.name,
        number: body.number,
        url: ""
    });
    await doc.save({
        url: (await URLShortner(doc._id)).data.link
    });
    logger.debug(`Saved a restaurant with the name ${body.name} to the database`)
}

function sendSuccessfulRegistration(res, name) {
    logger.info(`Successfully registered ${name}`);
    return Response.sendData(res, {
        message: `Successfully registered ${name}`,
    })
}

async function getRestaurant(req, res) {
    logger.info(`Finding restaurant with the id ${req.params.restaurantId}`);
    const restaurant = await findRestaurant(req.params.restaurantId);
    if (restaurant) {
        logger.info(`Found restaurant with the id ${req.params.restaurantId}`);
        return Response.sendData(res, {
            restaurant
        });
    } else {
        logger.info(`Failed to find a restaurant with the id ${req.params.restaurantId}`);
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