const qrcode = require("qrcode");

function streamQRCode(res, restaurant) {
    qrcode.toFileStream(res, restaurant.url, {
        errorCorrectionLevel: "H"
    })
}

module.exports = {
    streamQRCode
}