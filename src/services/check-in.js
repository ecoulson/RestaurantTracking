const { Response } = require("../lib/HTTP");
const CheckIn = require("../models/check-in");

async function checkIn(req, res) {
    await saveCheckInToDB(req);
    Response.sendData(res, {
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