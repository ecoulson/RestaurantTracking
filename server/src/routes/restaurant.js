const router = require("express").Router();

router.get("/code", (req, res) => {
    res.send("Hello").status(200)
});

router.post("/register", (req, res) => {
    res.send("Hello").status(200)
});

module.exports = router;