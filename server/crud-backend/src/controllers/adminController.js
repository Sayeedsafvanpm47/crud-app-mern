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

async function searchResults(req,res){
        try {
                const users = await userService.searchResults(req)
                res.json(users)
        } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
        }
}

async function updateUser(req,res){
        try {
                console.log(req.body)
                const {email,name,firstname,lastname} = req.body 
                console.log(email,name)
                const user = await userService.updateUser(email,name,firstname,lastname)
                console.log('update complete')
                res.status(200).json(user);
                
        } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
        }
}

async function deleteUser(req,res){
        try {
                const {_id} = req.body 
                await userService.deleteUser(_id)
                res.status(200).json({message:'user deleted succesfully'});
        } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
        }
}


module.exports = {getAllUsers,searchResults,updateUser,deleteUser}
