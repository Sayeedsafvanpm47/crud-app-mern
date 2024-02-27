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

async function updateUser(email,name,firstname,lastname){
const updatedUser = await User.findOneAndUpdate({email:email},{$set:{username:name,firstname:firstname,lastname:lastname}},{new:true})
return updatedUser
}

async function deleteUser(_id){
  await User.deleteOne({_id:_id})
  return res.status(200).json({message:'Deleted successfully :)'})
}

module.exports = {
          getAllUsers,searchResults,updateUser,deleteUser
}