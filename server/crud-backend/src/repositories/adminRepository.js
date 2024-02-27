const User = require('../models/userModel')

async function getAllUsers(){
          return User.find()
}
async function searchResults(req){
          const searchText = req.query.searchText
const results = await User.find({
          $or: [
            { email: { $regex: new RegExp(searchText, 'i') } },
            { username: { $regex: new RegExp(searchText, 'i') } },
       
          ],})
          return results 
}

async function updateUser(email,name){
const updatedUser = await User.findOneAndUpdate({email:email},{$set:{username:name}},{new:true})
return updatedUser
}

module.exports = {
          getAllUsers,searchResults,updateUser
}