import { Response } from "supertest";

function expectStatusCode(response : Response, status : number) {
    expect(response.status).toBe(status);
}

function expectErrorResponse(response : Response, message : any) {
    expectJSONResponse(response, {
        success: false,
        data: {
            error: message
        }
    })
}

function expectJSONResponse(response : Response, body : any) {
    expectContentType(response, "application/json; charset=utf-8");
    expect(response.body).toEqual(body);
}

function expectContentType(response : Response, contentType : string) {
    expectHeader(response, "content-type", contentType);
}

function expectHeader(response : Response, header : string, value : string) {
    expect(response.header[header]).toBe(value);
}

function expectSuccessResponse(response : Response, data : any) {
    expectJSONResponse(response, {
        success: true,
        data: data
    })
}

export {
    expectStatusCode,
    expectErrorResponse,
    expectSuccessResponse,
    expectHeader,
}