const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,

  timeout: 120000,
});

console.log("Cloud:", cloudinary.config().cloud_name);
console.log("Key:", cloudinary.config().api_key);
console.log("Secret exists:", !!cloudinary.config().api_secret);
console.log("Secret length:", cloudinary.config().api_secret?.length);

module.exports = cloudinary;