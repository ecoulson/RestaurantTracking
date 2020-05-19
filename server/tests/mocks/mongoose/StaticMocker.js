class StaticMocker {
    constructor(model) {
        this.model = model

        mockReturn = mockReturn.bind(this);
    }

    mockFindById(value) {
        mockReturn("findById", value);
    }

    mockFind(value) {
        mockReturn("find", value);
    }
}

function mockReturn (method, value) {
    this.model[method] = jest.fn().mockReturnValue(Promise.resolve(value));
}

module.exports = StaticMocker;