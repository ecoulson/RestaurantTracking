class MethodMocker {
    constructor(model) {
        this.model = model
        this.shouldThrow = false;

        mockReturn = mockReturn.bind(this);
    }

    setErrorMode() {
        this.shouldThrow = true;
    }

    mockSave(value) {
        mockReturn("save", value);
    }
}

function mockReturn (method, value) {
    if (this.shouldThrow) {
        this.model.prototype[method] = jest.fn().mockImplementationOnce(() => {
            this.shouldThrow = false;
            throw new Error("Database error");
        });
    } else {
        this.model.prototype[method] = jest.fn().mockReturnValueOnce(
            Promise.resolve(value)
        );
    }
}

module.exports = MethodMocker;