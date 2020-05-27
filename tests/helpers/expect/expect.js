function expectStatusCode(response, status) {
    expect(response.status).toBe(status);
}

function expectErrorResponse(response, message) {
    expectJSONResponse(response, {
        success: false,
        data: {
            error: message
        }
    })
}

function expectJSONResponse(response, body) {
    expectContentType(response, "application/json; charset=utf-8");
    expect(response.body).toEqual(body);
}

function expectContentType(response, contentType) {
    expectHeader(response, "content-type", contentType);
}

function expectHeader(response, header, value) {
    expect(response.header[header]).toBe(value);
}

function expectSuccessResponse(response, data) {
    expectJSONResponse(response, {
        success: true,
        data: data
    })
}

module.exports = {
    expectStatusCode,
    expectErrorResponse,
    expectSuccessResponse,
    expectHeader,
}