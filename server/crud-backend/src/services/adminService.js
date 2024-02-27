const adminRepository = require('../repositories/adminRepository')

async function getAllUsers(){
          return adminRepository.getAllUsers();
}
async function searchResults(req){
          return adminRepository.searchResults(req)
}
async function updateUser(email,name){
          return adminRepository.updateUser(email,name)
}

module.exports = {
          getAllUsers,searchResults,updateUser
}