import RestaurantModel from "../models/restaurant/RestaurantModel";
import { streamQRCode } from "../lib/QR-code";
import { Response } from "../lib/HTTP";
import URLShortner from "../lib/URL-shortener";
import { logger } from "../lib/logging";

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
        const restaurant = await RestaurantModel.findById(restaurantId);
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
    const restaurant : any = new RestaurantModel({
        name: body.name,
        number: body.number,
        url: ""
    });
    restaurant.url = (await URLShortner(restaurant._id)).data.link 
    await restaurant.save();
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

export {
    generateQRCode,
    registerRestaurant,
    getRestaurant
}