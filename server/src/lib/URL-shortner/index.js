const axios = require("axios").default;

const BITLY_URL = "https://api-ssl.bitly.com/v4/shorten";

async function generateBitlyLink(restaurantId) {
    return await axios.post(BITLY_URL, {
        group_guid: "",
        domain: "bit.ly",
        long_url: getLongUrl(restaurantId)
    }, {
        headers: {
            Authorization: `Bearer ${process.env.BITLY_ACCESS_TOKEN}`
        }
    })
}

function getLongUrl(restaurantId) {
    if (process.env.NODE_ENV === "development") {
        return `http://${process.env.HOSTNAME}:${process.env.PORT}?restaurantId=${restaurantId}`;
    } else {
        return `http://${process.env.HOSTNAME}?restaurantId=${restaurantId}`;
    }
}

module.exports = generateBitlyLink;