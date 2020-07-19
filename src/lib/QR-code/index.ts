import { Response } from "express";
import IRestaurant from "../../models/Restaurant/IRestaurant";
import qrcode from "qrcode";

function streamQRCode(res : Response, restaurant : IRestaurant) {
    qrcode.toFileStream(res, getUrl(restaurant), {
        errorCorrectionLevel: "H"
    })
}

function getUrl(restaurant : IRestaurant) {
    if (process.env.NODE_ENV === "production") {
        return `http://${process.env.HOST_NAME}?restaurantId=${restaurant._id}`;
    } else {    
        return restaurant.url
    }
}

export {
    streamQRCode
}