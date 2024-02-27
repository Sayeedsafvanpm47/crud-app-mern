require('dotenv').config();
const cloudinary = require('cloudinary').v2; 
cloudinary.config({
          cloud_name:process.env.CLOUD_NAME,
          api_key:process.env.CLOUD_APIKEY,
          api_secret:process.env.CLOUD_SECRET
})
module.exports = {cloudinary}