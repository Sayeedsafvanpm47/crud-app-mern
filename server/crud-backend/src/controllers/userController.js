
const userService = require('../services/userService')
const generateToken = require('../utils/generateToken')



async function getAllUsers(req,res){
          try {
                  const users = await userService.getAllUsers()
                 
                  
                  res.json(users) 
          } catch (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
          }
}

async function createUser(req,res){
          try {

                const {username,email,password} = req.body 
                const userExist = await userService.findExistingUser(email)
                if(userExist){
                  res.status(409).json({error:'Conflict occured'})
            }else{
                  const newUser = await userService.createUser(username,email,password)
                  if(newUser){
                        generateToken(res,newUser._id)
                        res.status(201).json({
                              _id:newUser._id,
                              email:newUser.email,
                              username:newUser.username
                        })

                  }else{
                        res.status(400).json({error:'invalid user data!'})
                  }
                    
            }
           
          } catch (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
          }
}

async function authUser(req,res){
      try {
            const {email,password} = req.body 
            const user = await userService.authUser(email)
            if(user && await user.matchPassword(password)){
                  generateToken(res,user._id)
                  res.status(201).json({
                        _id:user._id,
                        email:user.email,
                        username:user.username
                  })
            
            }
            else
            {
                  res.status(400).json({error:'invalid credentials'})
            }
      } catch (error) {
            console.log(error)
          res.status(500).json({error:error})
      }
}

async function userProfile(req,res){
      try {
            res.status(200).json({message:'welcome user'})
            
      } catch (error) {
            console.log(error)
            res.status(500).json({error:'Internal server error!'})
      }
}

async function logoutUser(req,res){
      try {
            res.cookie('jwt','',{
                  httpOnly:true,
                  expires : new Date(0)
            })
            res.status(200).json({message:'user logged out'})
      } catch (error) {
            res.status(500).json({error:'Internal server error'})
      }
}

module.exports = {
          getAllUsers,createUser,authUser,logoutUser,userProfile
}