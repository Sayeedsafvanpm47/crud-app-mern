const express = require('express')
const adminController = require('../controllers/adminController')
const {protect} = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/home',protect,adminController.getAllUsers)
router.get('/search',protect,adminController.searchResults)
router.patch('/update',protect,adminController.updateUser)
router.delete('/delete',protect,adminController.deleteUser)

module.exports = router 
