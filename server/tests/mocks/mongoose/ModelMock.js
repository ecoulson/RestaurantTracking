const MethodMocker = require("./MethodMocker")
const StaticMocker = require("./StaticMocker");

class ModelMock {
    constructor(model) {
        this.model = model;

        this.statics = new StaticMocker(model);
        this.methods = new MethodMocker(model);
    }
}

module.exports = ModelMock;