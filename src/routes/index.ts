import { Router } from "express";
import restaurantRoute from "./restaurant";
import CheckInRouterConfiguration from "./check-in";

const CheckinConfiguration : CheckInRouterConfiguration = new CheckInRouterConfiguration();

const router = Router();

router.use("/restaurant", restaurantRoute);
router.use("/check_in", CheckinConfiguration.setup());

export default router;