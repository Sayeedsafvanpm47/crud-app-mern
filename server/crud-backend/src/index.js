const express = require('express')
const cors =  require('cors')      
const User = require('./models/model')
const mongoose = require('mongoose')
const app = express()
let db = require('./connection/database')
app.use(express.json())
app.use(cors())

        
app.post('/api/register',async (req,res)=>{
          try{
                    const {email,password} = req.body 
                    const user = await User.create({
                      email,
                      password
                    })
                    console.log(req.body)
          console.log(req.body.email)
          console.log(req.body.password)}
          catch(error){
          console.log(error)
          }
})
 
db.once('open', () => {
          app.listen(3000, () => {
            console.log('Server started, database successfully connected');
          });
        });
     


