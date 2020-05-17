class MethodMocker {
    constructor(model) {
        this.model = model

        mockReturn = mockReturn.bind(this);
    }

    mockSave(value) {
        mockReturn("save", value);
    }
}

function mockReturn (method, value) {
    this.model.prototype[method] = jest.fn().mockReturnValue(Promise.resolve(value));
}

module.exports = MethodMocker;