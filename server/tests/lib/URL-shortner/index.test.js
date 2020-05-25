jest.mock("axios");
const axios = require("axios").default;
const URLShortner = require("../../../src/lib/URL-shortner");

describe("URL Shortener Suite", () => {
    describe("Shortens a url", () => {
        test("A registration request with an empty body", async () => {
            axios.post.mockResolvedValue({
                a: 1
            })
            const x = await URLShortner("1");
        })
    })
});