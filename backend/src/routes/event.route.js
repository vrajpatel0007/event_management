const express = require("express");
const router = express.Router();
const recipe_controller = require("../controllers/event.controller");
const { authUser } = require("../middleware/auth");
const upload = require("../middleware/multer");

router.post("/create", authUser,upload.fields([{ name: "image", maxCount: 1 }]), recipe_controller.createEvent)
router.get("/event_list", authUser, recipe_controller.getallevents)
router.post("/rsvp", authUser, recipe_controller.rsvpEvent )
router.put("/update_recipe", authUser,upload.fields([{ name: "image", maxCount: 1 }]), recipe_controller.updateevent)
router.delete("/recipe_delete", authUser, recipe_controller.deleteevent)



module.exports = router;