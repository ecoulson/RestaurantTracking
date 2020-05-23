const Restaurant = require("../models/restaurant");
const { streamQRCode } = require("../lib/QR-code");
const { Response } = require("../lib/HTTP");
const urlShortner = require("../lib/URL-shortner");

async function generateQRCode(req, res) {
    const restaurant = await findRestaurant(req.params.restaurantId);
    return streamQRCode(res, restaurant);
}

async function findRestaurant(restaurantId) {
    return await Restaurant.findById(restaurantId);
}

async function registerRestaurant(req, res) {
    await saveRestaurantToDB(req.body);
    return sendSuccessfulRegistration(res, req.body.name)
}

async function saveRestaurantToDB(body) {
    const doc = new Restaurant({
        name: body.name,
        number: body.number
    });
    doc.update({
        url: await urlShortner(doc._id) 
    })
    await doc.save();
}

function sendSuccessfulRegistration(res, name) {
    return Response.sendData(res, {
        message: `Successfully registered ${name}`,
    })
}

async function getRestaurant(req, res) {
    const restaurant = await findRestaurant(req.params.restaurantId);
    return Response.sendData(res, {
        restaurant
    });
}

module.exports = {
    generateQRCode,
    registerRestaurant,
    getRestaurant
}