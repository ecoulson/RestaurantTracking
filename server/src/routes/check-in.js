const router = require("express").Router();
const { validateQuery, validateBody } = require("../lib/middleware/validation");
const { Response } = require("../lib/HTTP");
const CheckIn = require("../models/check-in");

const CHECK_IN_PROPERTIES = ["email", "number", "restaurantId"]
const GET_CHECK_INS_PROPERTIES = ["restaurantId"]

router.post("/", validateBody(CHECK_IN_PROPERTIES), routeHandler, async (req, res) => {
    try {
        await saveCheckInToDB(req);
        Response.sendData(res, {
            message: "Successfully checked in"
        })
    } catch (error) {
        return Response.sendError(res, { error: error.message });
    }
});

async function saveCheckInToDB(req) {
    const checkIn = new CheckIn({
        number: req.body.number,
        email: req.body.email,
        restaurantId: req.body.restaurantId
    })
    await checkIn.save();
}

router.get("/", validateQuery(GET_CHECK_INS_PROPERTIES), async (req, res) => {
    if (queryHasDuplicateRestaurantId(req.query)) {
        return sendDuplicateError(res);
    }
    try {
        return Response.sendData(res, { checkIns: await CheckIn.findByRestaurantId(req.query.restaurantId) })
    } catch(error) {
        return Response.sendError(res, { error: error.message });
    }
});

function queryHasDuplicateRestaurantId(query) {
    return Array.isArray(query.restaurantId)
}

function sendDuplicateError(res) {
    Response.sendError(res, {
        error: "Duplicate restaurantId was provided"
    });
}

module.exports = router;