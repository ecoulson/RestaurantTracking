const qrcode = require("qrcode");

function streamQRCode(res, restaurant) {
    qrcode.toFileStream(res, getQRCodeContent(restaurant))
}

// Should get cuttly link
function getQRCodeContent(restaurant) {
    return `http://cnn.com`
}