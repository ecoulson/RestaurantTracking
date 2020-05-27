const mongoose = require("mongoose");

function Mock() { } 

function createMock(model) {
    const modelStatics = Object.keys(mongoose.Model);
    const modelMethods = Object.keys(mongoose.Model.prototype);
    const additionalStatics = Object.keys(model.schema.statics);
    const additionalMethods = Object.keys(model.schema.methods);
    for (const method of modelMethods) {
        Mock.prototype[method] = jest.fn();
    }
    for (const method of additionalMethods) {
        Mock.prototype[method] = jest.fn();
    }
    for (const static of modelStatics) {
        Mock[static] = jest.fn();
    }
    for (const static of additionalStatics) {
        Mock[static] = jest.fn();
    }
    return Mock;
}

module.exports = createMock;