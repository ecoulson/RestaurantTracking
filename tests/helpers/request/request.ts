import request from "supertest";
import app from "../../../src/app";

async function makePostRequest(url : string, data : any) {
    return await makeRequest("post", url, data);
}

async function makeRequest(method : string, url : string, data? : any) {
    if (data) {
        return await (request(app) as any)[method](url)
                        .set('Authorization', "Bearer token")
                        .send(data);
    } 
    return await (request(app) as any)[method](url)
                    .set('Authorization', "Bearer token");
}

async function makeGetRequest(url : string) {
    return await makeRequest("get", url, null);
}

export {
    makeGetRequest,
    makePostRequest,
    makeRequest
}