const express = require('express')
const userController = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')


const router = express.Router()


router.post('/register',userController.createUser)
router.post('/login',userController.authUser)
router.get('/profile',protect,userController.userProfile)
router.put('/profile',protect,userController.updateProfile)

router.get('/logout',userController.logoutUser)
module.exports = router