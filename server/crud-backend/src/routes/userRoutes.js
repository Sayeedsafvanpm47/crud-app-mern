const express = require('express')
const userController = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')


const router = express.Router()

router.get('/users',userController.getAllUsers)
router.post('/register',userController.createUser)
router.post('/login',userController.authUser)
router.get('/profile',protect,userController.userProfile)
router.get('/logout',userController.logoutUser)
module.exports = router