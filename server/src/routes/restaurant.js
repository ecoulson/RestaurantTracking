const router = require("express").Router();

router.get("/code", (req, res) => {
    res.send("Hello").status(200)
});

router.post("/register", (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Failed to register account"
        })
    }
    return res.status(200).json({
        success: true,
        message: `Successfully registered ${req.body.name}`
    })
});

module.exports = router;