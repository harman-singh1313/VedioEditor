require("dotenv").config();
const dns = require("dns");
dns.setServers(["1.1.1.1"]);

const express = require("express");
const cors = require("cors");


// 3. Database
const connectDB = require("./src/config/db");


// 4. Routes
const projectRoutes = require("./src/routes/projectRoutes");
const contactRoutes = require("./src/routes/contactRoutes");
const authRoutes=require("./src/routes/authRoutes")

// 5. Cloudinary Configuration
// ===============================
require("./src/config/cloudinary");

// 7. Express App
// ===============================
const app = express();

// 8. Middleware
// ===============================

// Frontend ton API requests allow
app.use(cors());

// JSON request body read karan layi
app.use(express.json());

// 9. API Routes
// ===============================

// Project related APIs
app.use("/api/projects", projectRoutes);

// Contact form related APIs
app.use("/api/contact", contactRoutes);
app.use("/api/auth",authRoutes)

// ===============================
// 10. Test Route
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "Backend server is running",
  });
});


// ===============================
// 11. Server Port
// ===============================

const PORT = process.env.PORT || 5000;


// ===============================
// 12. Start Server
// ===============================

const startServer = async () => {
  try {
    // Pehlan MongoDB connect hovega
    await connectDB();

    // MongoDB connect hon ton baad server start hovega
    app.listen(PORT, () => {
      console.log(
        `Backend running at http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start server:",
      error.message
    );

    process.exit(1);
  }
};


// Start backend
startServer();