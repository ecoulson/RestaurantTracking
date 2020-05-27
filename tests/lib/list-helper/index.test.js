const { isFirstElement, isLastElement } = require("../../../src/lib/list-helper");;

describe("List Helper Suite", () => {
    describe("First element tests", () => {
        test("Is first element", () => {
            expect(isFirstElement(0, [1, 2, 3])).toBe(true);
        })

        test("Is not first element", () => {
            expect(isFirstElement(1, [1, 2, 3])).toBe(false)
        })
    })

    describe("Last element tests", () => {
        test("Is last element", () => {
            expect(isLastElement(2, [1, 2, 3])).toBe(true);
        })

        test("Is not last element", () => {
            expect(isLastElement(0, [1, 2, 3])).toBe(false)
        })
    })
})