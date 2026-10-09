const express = require("express");

const {
  loginAdmin,updateAdmin,forgotPassword,verifyResetOTP,resetPassword
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Admin login
router.post("/login", loginAdmin);
 
// forgotPassword 

router.post("/forgot-password", forgotPassword);

router.post("/verify-reset-otp", verifyResetOTP);

router.post("/reset-password", resetPassword);
// update admin
router.put("/update",protect,updateAdmin)

// Protected test route
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You are authenticated",
    admin: req.admin,
  });
});

module.exports = router;