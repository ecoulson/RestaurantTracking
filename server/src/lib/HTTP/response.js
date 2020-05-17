const FAILURE_CODE = 400;
const SUCCESS_CODE = 200;

function sendError(res, data) {
    sendResponse(res, data, FAILURE_CODE)
}

function sendData(res, data) {
    sendResponse(res, data, SUCCESS_CODE)
}

function sendResponse(res, data, status) {
    res.status(status).json({
        success: status === SUCCESS_CODE,
        data: data
    });
}

module.exports = {
    sendError,
    sendData,
}