const qrcode = require("qrcode");

function streamQRCode(res, restaurant) {
    qrcode.toFileStream(res, getUrl(restaurant), {
        errorCorrectionLevel: "H"
    })
}

function getUrl(restaurant) {
    if (process.env.NODE_ENV === "production") {
        return `http://${process.env.HOST_NAME}?restaurantId=${restaurant._id}`;
    } else {    
        return restaurant.url
    }
}

module.exports = {
    streamQRCode
}