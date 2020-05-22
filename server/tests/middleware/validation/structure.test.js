const { StructureValidator } = require("../../../src/middleware/validation");

describe("Request Structure Test Suite", () => {
    describe("getMissingProperties", () => {
        test("Gets all missing properties with none present", () => {
            const missingProperties = StructureValidator.getMissingProperties({
                a: "b",
                b: "c"
            }, ["c", "d"]);

            expect(missingProperties).toHaveLength(2);
            expect(missingProperties).toEqual(["c", "d"])
        })

        test("Gets all missing properties with some present", () => {
            const missingProperties = StructureValidator.getMissingProperties({
                a: "b",
                b: "c"
            }, ["b", "d"]);

            expect(missingProperties).toHaveLength(1);
            expect(missingProperties).toEqual(["d"])
        })

        test("Gets all missing properties with all present", () => {
            const missingProperties = StructureValidator.getMissingProperties({
                a: "b",
                b: "c"
            }, ["b"]);

            expect(missingProperties).toHaveLength(0);
            expect(missingProperties).toEqual([])
        })
    });

    describe("isMissingProperties", () => {
        test("Is not missing properties", () => {
            expect(StructureValidator.isMissingProperties([])).toBe(false)
        });

        test("Is missing properties", () => {
            expect(StructureValidator.isMissingProperties(["A"])).toBe(true)
        })
    });
})