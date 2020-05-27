const URL = "http://localhost:4040/api/tunnels"
const axios = require("axios").default;

async function hasNgrokTunnel() {
    try {
        const res = await axios.get(URL);
        return res.status === 200;
    }
    catch(error) {
        return false;
    }
}

async function getNgrokUrl() {
    const res = await axios.get(URL);
    return res.data.tunnels[0].public_url;
}

module.exports = {
    getNgrokUrl,
    hasNgrokTunnel
}