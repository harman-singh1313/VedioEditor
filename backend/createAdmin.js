require("dotenv").config();

const dns = require("dns");
dns.setServers(["1.1.1.1"]);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./src/models/Admin");

const createAdmin = async () => {
  try {
    // Direct MongoDB connection
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");

    // Admin details
    const username = "admin";
    const email = "admin@gmail.com";
    const password = "admin123";

    // Check existing admin
    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { email }],
    });

    if (existingAdmin) {
      console.log("Admin already exists!");
      await mongoose.disconnect();
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin
    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log("Admin created successfully!");
    console.log("Username:", admin.username);
    console.log("Email:", admin.email);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();