const router = require("express").Router();
const restaurant = require("./restaurant");

router.use("/restaurant", restaurant);

module.exports = router;