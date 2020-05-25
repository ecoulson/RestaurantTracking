const axios = require("axios").default;
const ngrok = require("../../../tools/ngrok")

const BITLY_URL = "https://api-ssl.bitly.com/v4/shorten";

async function generateBitlyLink(restaurantId) {
    try {
        return await axios.post(BITLY_URL, {
            long_url: await getLongUrl(restaurantId)
        }, {
            headers: {
                Authorization: `Bearer ${process.env.BITLY_ACCESS_TOKEN}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        throw new Error("Failed to shorten restaurant url");
    }
}

async function getLongUrl(restaurantId) {
    if (await ngrok.hasNgrokTunnel()) {
        return await `${await ngrok.getNgrokUrl()}?restaurantId=${restaurantId}`;
    } else if (process.env.NODE_ENV !== "production") {
        return `http://${process.env.HOST_NAME}.localhost:${process.env.PORT}?restaurantId=${restaurantId}`;
    } else {
        return `http://${process.env.HOST_NAME}?restaurantId=${restaurantId}`;
    }
}

module.exports = generateBitlyLink;