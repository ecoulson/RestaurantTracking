import path from "path";
import mongoose from "mongoose";

const pathToModels = path.join(__dirname, "..", "..", "..", "src", "models");

function createModelMock(filePath : string) {
    function Mock() { } 

    const modelPath = path.join(pathToModels, filePath.split("models")[1]);
    const model : any = require(modelPath);

    const modelStatics = Object.keys(mongoose.Model);
    const modelMethods = Object.keys(mongoose.Model.prototype);
    const additionalStatics = Object.keys(model.default.schema.statics);
    const additionalMethods = Object.keys(model.default.schema.methods);
    for (const method of modelMethods) {
        Mock.prototype[method] = jest.fn((mongoose.Model as any)[method]);
    }
    for (const method of additionalMethods) {
        Mock.prototype[method] = jest.fn();
    }
    Mock.prototype["update"] = jest.fn();
    
    for (const modelStatic of modelStatics) {
        (Mock as any)[modelStatic] = jest.fn();
    }
    for (const additionalStatic of additionalStatics) {
        (Mock as any)[additionalStatic] = jest.fn();
    }
    
    doJestMock(modelPath, Mock);
}

function doJestMock(modelPath : string, mock : () => void) {
    jest.mock(modelPath, () => {
        return mock;
    });
}

export { 
    createModelMock
};