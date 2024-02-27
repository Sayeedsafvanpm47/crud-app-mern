const adminRepository = require('../repositories/adminRepository')

async function getAllUsers(){
          return adminRepository.getAllUsers();
}
async function searchResults(req){
          return adminRepository.searchResults(req)
}
async function updateUser(email,name,firstname,lastname){
          return adminRepository.updateUser(email,name,firstname,lastname)
}
async function deleteUser(_id){
          return adminRepository.deleteUser(_id)
}

module.exports = {
          getAllUsers,searchResults,updateUser,deleteUser
}