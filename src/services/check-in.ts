import { Response } from "../lib/HTTP";
import CheckIn from "../models/check-in/CheckInModel";
import RestaurantModel from "../models/restaurant/RestaurantModel";
import requestIp from "request-ip";
import { Response as ExpressRes, Request } from "express";
import { Document } from "mongoose";

async function checkIn(req, res) {
    const restaurant = await RestaurantModel.findById(req.body.restaurantId);
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
        restaurantId: req.body.restaurantId,
        ipAddress: requestIp.getClientIp(req)
    });
    await checkIn.save();
}

async function findCheckinsByRestaurant(req : Request, res : ExpressRes) {
    const checkIns = await CheckIn.findByRestaurantId(req.query.restaurantId as string);
    res.status(200).send(convertCheckinsByRestaurntToCSV(checkIns));
}

function convertCheckinsByRestaurntToCSV(checkIns : Document[]) {
    if (checkIns.length === 0) {
        return "";
    }
    checkIns = checkIns.map((checkIn) => {
        return (checkIn as any).serialize();
    })
    let csv = [];
    let row = [];
    const keys = Object.keys(checkIns[0]).sort();
    for (let key of keys) {
        row.push(`"${key}"`);
    }
    csv.push(row.join(","));
    for (let checkIn of checkIns) {
        row = [];
        for (let key of keys) {
            row.push(`"${checkIn[key]}"`);
        }
        csv.push(row.join(","));
    }
    return csv.join("\n");
}

export {
    checkIn,
    findCheckinsByRestaurant
}