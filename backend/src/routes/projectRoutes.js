const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");
const protect = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects,
  deleteProject,
  updateproject
} = require("../controllers/projectController");

router.get("/", getProjects);

router.delete("/:id", protect, deleteProject);

router.put("/:id", protect, updateproject);

router.post(
  "/",
  protect,
  upload.fields([
    { name: "video", maxCount: 10 },
    { name: "coverImages", maxCount: 10 },
    { name: "poster", maxCount: 10 },
  ]),
  createProject
);

module.exports = router;