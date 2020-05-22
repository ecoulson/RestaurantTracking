const request = require("supertest");
const app = require("../../../src/app");

async function makePostRequest(url, data) {
    return await makeRequest("post", url, data);
}

async function makeRequest(method, url, data) {
    if (data) {
        return await request(app)[method](url)
                        .set('Authorization', "Bearer token")
                        .send(data);
    } 
    return await request(app)[method](url)
                    .set('Authorization', "Bearer token");
}

async function makeGetRequest(url) {
    return await makeRequest("get", url);
}

module.exports = {
    makeGetRequest,
    makePostRequest,
    makeRequest
}