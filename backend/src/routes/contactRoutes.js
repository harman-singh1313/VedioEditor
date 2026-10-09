// Express import
const express = require("express");

const protect= require("../middleware/authMiddleware")

// Contact controller import
const {
  createContact,getContacts
} = require("../controllers/contactController");

// Router create
const router = express.Router();

// POST /api/contact
router.post("/", createContact);

// MongoDB ton saare leads leke aayega
router.get("/",protect, getContacts);
// Router export
module.exports = router;