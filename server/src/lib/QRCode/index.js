const qrcode = require("qrcode");

function streamQRCode(res, restaurant) {
    qrcode.toFileStream(res, getQRCodeContent(restaurant))
}

function getQRCodeContent(restaurant) {
    return `http://localhost:8080/checking?restaurant=${restaurant._id}`
}

module.exports = {
    streamQRCode
}