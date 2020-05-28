import { Response } from "../lib/HTTP";
import CheckIn from "../models/check-in";
import Restaurant from "../models/restaurant";

// comment to test CI
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
        checkIns: await (CheckIn as any).findByRestaurantId(req.query.restaurantId) 
    })
}

export {
    checkIn,
    findRestuarant
}