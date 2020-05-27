const router = require("express").Router();
const restaurantRoute = require("./restaurant");
const checkInRoute = require("./check-in");

router.use("/restaurant", restaurantRoute);
router.use("/check_in", checkInRoute);

module.exports = router;