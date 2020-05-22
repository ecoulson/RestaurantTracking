class StaticMocker {
    constructor(model) {
        this.model = model
        this.shouldThrow = false;

        mockReturn = mockReturn.bind(this);
    }

    setErrorMode() {
        this.shouldThrow = true;
    }

    mockFindById(value) {
        mockReturn("findById", value);
    }

    mockFind(value) {
        mockReturn("find", value);
    }
}

function mockReturn (method, value) {
    if (this.shouldThrow) {
        this.model[method] = jest.fn().mockImplementationOnce(() => {
            this.shouldThrow = false;
            throw new Error("Database error");
        });
    } else {
        this.model[method] = jest.fn().mockReturnValueOnce(Promise.resolve(value));
    }
}

module.exports = StaticMocker;