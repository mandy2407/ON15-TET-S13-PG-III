const express = require("express")

const router = express.Router();

const controller = require ("../controller/noteController");

router.get("/all", controller.getAll);

router.post("/create", controller.createNote);

router.put("/update/:id", controller.updateNote)

router.delete("/delete/:id", controller.deleteNote);

module.exports = router;



