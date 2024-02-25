const bcrypt = require("bcrypt")
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
        
    username: {
      type: String,
      
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  
  { collection: 'Users', timestamps: true }
);
// hash pass
userSchema.pre('save',async function (next){
  if(!this.isModified('password')){
    next()
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt)
})
// compare and validate pass 
userSchema.methods.matchPassword  = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}
const model = mongoose.model('userData',userSchema)
module.exports = model