jest.mock("axios");
const axios = require("axios").default;
const faker = require("faker");
const URLShortner = require("../../../src/lib/URL-shortener");

const BITLY_URL = "https://api-ssl.bitly.com/v4/shorten";
const OLD_ENV = process.env;

beforeAll(() => {
    process.env.HOST_NAME = "localhost";
    process.env.PORT = 8080;
    process.env.BITLY_ACCESS_TOKEN = faker.random.uuid()
});

afterEach(() => {
    jest.clearAllMocks();
    process.env = OLD_ENV;
});

describe("URL Shortener Suite", () => {
    describe("Shortens a url", () => {
        test("A registration request with an empty body", async () => {
            const restaurantId = mongoObjectId();
            const url = `http://${process.env.HOST_NAME}.localhost:${process.env.PORT}?restaurantId=${restaurantId}`
            const id = mongoObjectId()
            const bitlyResponse = {
                "created_at": faker.date.recent(),
                "id": `bit.ly/${id}`,
                "link": `https://bit.ly/${id}`,
                "custom_bitlinks": [],
                "long_url": url,
                "archived": false,
                "tags": [],
                "deeplinks": [],
                "references": {
                    "group": `https://api-ssl.bitly.com/v4/groups/${mongoObjectId()}`
                }
            }
            axios.post.mockResolvedValue({
                data: bitlyResponse
            });

            const response = await URLShortner(restaurantId);

            expect(axios.post).toBeCalledWith(BITLY_URL, {
                long_url: url
            }, {
                headers: {
                    Authorization: `Bearer ${process.env.BITLY_ACCESS_TOKEN}`,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
            expect(response.data).toEqual(bitlyResponse)
        })
    })
});

const mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};