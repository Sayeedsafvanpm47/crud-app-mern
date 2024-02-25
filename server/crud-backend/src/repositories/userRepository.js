const User = require('../models/userModel')

async function getAllUsers(){
          return User.find()
}

async function createUser(username,email,password){
          const newUser = new User({username,email,password})
          return newUser.save()
}

async function authUser(email){
          const authUser = await User.findOne({email})
          return authUser 
}
async function findExistingUser(email){
          const existingUser = await User.findOne({email})
          if(existingUser){
                   return true
          }else{
                    return false
          }
}
module.exports = {
          getAllUsers,createUser,findExistingUser,authUser
}