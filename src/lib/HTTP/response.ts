import { Response } from "express";

const FAILURE_CODE = 400;
const SUCCESS_CODE = 200;
const FORBIDDEN_CODE = 403;

function sendError(res : Response, error : any) {
    sendResponse(res, error, FAILURE_CODE)
}

function sendResponse(res : Response, data : any, status : number) {
    res.status(status).json({
        success: status === SUCCESS_CODE,
        data: data
    });
}

function sendData(res : Response, data : any) {
    sendResponse(res, data, SUCCESS_CODE)
}

function sendForbidden(res : Response) {
    sendResponse(res, {
        error: "Access forbidden"
    }, FORBIDDEN_CODE)
}

export {
    sendError,
    sendData,
    sendForbidden
}