const adminRepository = require('../repositories/adminRepository')

async function getAllUsers(){
          return adminRepository.getAllUsers();
}

module.exports = {
          getAllUsers
}