const router = require("express").Router();
const restaurantRoute = require("./restaurant");
const checkInRoute = require("./check-in");
const authenticate = require("../lib/Authentication");

router.use("/restaurant", authenticate, restaurantRoute);
router.use("/check_in", checkInRoute);

module.exports = router;