const userRepository = require('../repositories/userRepository')

async function getAllUsers(){
          return userRepository.getAllUsers();
}
async function createUser(username,email,password)
{
          return userRepository.createUser(username,email,password);
}
async function findExistingUser(email){
          return userRepository.findExistingUser(email)
}
async function authUser(email){
          return userRepository.authUser(email)
}
module.exports = {
          getAllUsers,createUser,findExistingUser,authUser
}