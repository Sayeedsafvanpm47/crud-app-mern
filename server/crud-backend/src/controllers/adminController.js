const userService = require('../services/adminService')

async function getAllUsers(req,res){
          try {
                  const users = await userService.getAllUsers()
                 
                  
                  res.json(users) 
          } catch (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
          }
}

module.exports = {getAllUsers}
