const express = require('express')
const adminController = require('../controllers/adminController')
const {protect} = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/',adminController.getAllUsers)

module.exports = router 
