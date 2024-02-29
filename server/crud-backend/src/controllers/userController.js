
const userService = require('../services/userService')
const generateToken = require('../utils/generateToken')
const {cloudinary} = require('../utils/cloudinary')


// getAllUsers Route



// createUser Route
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
                              username:newUser.username,
                              role:newUser.role ,
                              profilePic:newUser.profilePic,
                              firstname : newUser.firstname || '',
                              lastname : newUser.lastname || ''
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

// authUser Route
async function authUser(req,res){
      try {
            const {email,password} = req.body 
            const user = await userService.authUser(email)
            if(user && await user.matchPassword(password)){
                  generateToken(res,user._id)
                  res.status(201).json({
                        _id:user._id,
                        email:user.email,
                        username:user.username,
                        role:user.role ,
                        profilePic:user.profilePic,
                        firstname : user.firstname || '',
                        lastname : user.lastname || ''
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

// userProfile Route
async function userProfile(req,res){
      try {
            console.log(req.user)
            console.log(req.user.email)
            res.status(200).json(req.user)
            
      } catch (error) {
            console.log(error)
            res.status(500).json({error:'Internal server error!'})
      }
}

//updateProfile Route 

async function updateProfile(req,res){
      try {
            const user = req.user
            let uploadedResponse
           if(user){
            const pic = req.body.profilePic
           if(pic){
            uploadedResponse = await cloudinary.uploader.upload(pic,{
                  upload_preset:'ayem7vrh'
            })
            user.profilePic = uploadedResponse.public_id || '';
      }
            console.log(uploadedResponse.public_id)
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.role = req.body.role || 'user'
      
            user.firstname = req.body.firstname || ''
            user.lastname = req.body.lastname || ''
            if(req.body.password){
                  user.password = req.body.password
            }
           
           const updatedUser =  await user.save()
           res.status(200).json({_id:updatedUser._id,username:updatedUser.username,email:updatedUser.email,profilePic:uploadedResponse.public_id,firstname:updatedUser.firstname,lastname:updatedUser.lastname,role:updatedUser.role})
           }
           else
           {
            res.status(400).json({error:'User not found'})
           }
           
      } catch (error) {
            console.log(error)
            res.status(500).json({error:'Internal server error'})
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
            console.log(error)
            res.status(500).json({error:'Internal server error'})
      }
}

module.exports = {
         createUser,authUser,logoutUser,userProfile,updateProfile
}