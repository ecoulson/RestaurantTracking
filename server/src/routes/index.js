const router = require("express").Router();
const restaurantRoute = require("./restaurant");
const checkInRoute = require("./check-in");
const authenticate = require("../lib/middleware/authentication");

router.use("/restaurant", authenticate, restaurantRoute);
router.use("/check_in", checkInRoute);

module.exports = router;