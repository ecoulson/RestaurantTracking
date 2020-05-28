const { Response } = require("../lib/HTTP");
const CheckIn = require("../models/check-in");
const Restaurant = require("../models/restaurant");

async function checkIn(req, res) {
    const restaurant = await Restaurant.findById(req.body.restaurantId);
    if (!restaurant) {
        return Response.sendError(res, {
            error: "Can not check in to a restaurant that does not exist"
        })
    }
    await saveCheckInToDB(req);
    return Response.sendData(res, {
        message: "Successfully checked in"
    });
}

async function saveCheckInToDB(req) {
    const checkIn = new CheckIn({
        number: req.body.number,
        email: req.body.email,
        restaurantId: req.body.restaurantId
    })
    await checkIn.save();
}

async function findRestuarant(req, res) {
    return Response.sendData(res, { 
        checkIns: await CheckIn.findByRestaurantId(req.query.restaurantId) 
    })
}

module.exports = {
    checkIn,
    findRestuarant
}