const MethodMocker = require("./MethodMocker")
const StaticMocker = require("./StaticMocker");

class ModelMock {
    constructor(model) {
        this.model = model;
        this.statics = new StaticMocker(model);
        this.methods = new MethodMocker(model);
    }

    shouldThrow() {
        this.methods.setErrorMode();
        this.statics.setErrorMode();
        return this;
    }
}

module.exports = ModelMock;