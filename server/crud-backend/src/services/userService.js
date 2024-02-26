const userRepository = require('../repositories/userRepository')


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
         createUser,findExistingUser,authUser
}