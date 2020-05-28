import { Router } from "express";
import restaurantRoute from "./restaurant";
import checkInRoute from "./check-in";

const router = Router();

router.use("/restaurant", restaurantRoute);
router.use("/check_in", checkInRoute);

export default router;