const path = require("path");
const mongoose = require("mongoose");

const pathToModels = path.join(__dirname, "..", "..", "..", "src", "models");

function Mock() { } 

function createModelMock(filePath) {
    const modelPath = path.join(pathToModels, filePath.split("models")[1]);
    const model = require(modelPath);

    const modelStatics = Object.keys(mongoose.Model);
    const modelMethods = Object.keys(mongoose.Model.prototype);
    const additionalStatics = Object.keys(model.schema.statics);
    const additionalMethods = Object.keys(model.schema.methods);
    for (const method of modelMethods) {
        Mock.prototype[method] = jest.fn(mongoose.Model[method]);
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
    
    jest.mock(modelPath, () => {
        return Mock;
    });
}

module.exports = createModelMock;