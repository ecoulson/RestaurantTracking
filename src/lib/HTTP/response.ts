const FAILURE_CODE = 400;
const SUCCESS_CODE = 200;
const FORBIDDEN_CODE = 403;

function sendError(res, error) {
    sendResponse(res, error, FAILURE_CODE)
}

function sendResponse(res, data, status) {
    res.status(status).json({
        success: status === SUCCESS_CODE,
        data: data
    });
}

function sendData(res, data) {
    sendResponse(res, data, SUCCESS_CODE)
}

function sendForbidden(res) {
    sendResponse(res, {
        error: "Access forbidden"
    }, FORBIDDEN_CODE)
}

export {
    sendError,
    sendData,
    sendForbidden
}