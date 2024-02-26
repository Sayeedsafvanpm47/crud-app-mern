const User = require('../models/userModel')

async function getAllUsers(){
          return User.find()
}

module.exports = {
          getAllUsers
}