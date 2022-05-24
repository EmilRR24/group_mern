const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const GamerSchema = mongoose.Schema({
    first_name:{
        type:String,
        required:[true, "REQUIRES A FIRST NAME!"],
        minLength:[2, "First Name must be at least 2 characters!"],
        maxLength:[30, "First Name can be at most 30 characters!"]
    },
    last_name:{
        type:String,
        required:[true, "REQUIRES A LAST NAME!"],
        minLength:[2, "Last Name must be at least 2 characters!"],
        maxLength:[50, "Last Name can be at most 50 characters!"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "EMAIL ALREADY EXISTS!"],
      lowercase: true,
      dropDups: true,
      // VALIDATES FOR EMAIL REGEX
      validate: {
          validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
          message: "Please enter a valid email"
      }
  },
    user_name: {
      type: String
      // required: [true, "REQUIRES A USER NAME!"],
      // minLength:[2, "User Name must be at least 2 characters!"],
      // maxLength:[30, "User Name can be at most 30 characters!"],
      // unique: [true, "USER NAME ALREADY EXISTS!"]
    },
    password: {
      type: String, //BCRYPT
      required:[true, "REQUIRES A PASSWORD!"],
      minLength: [10, "Password must be at least 10 characters!"]
    },
    stream_link: {
      type: String,
      required: [true, "REQUIRES A STREAM LINK!"]
    }

}, {timestamps:true})

// CREATE A TEMPORARY CONFIRM PASSWORD ATTRIBUTE IN OUR SCHEMA
GamerSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

// CREATE VALIDATIONS FOR THE CONFIRM PASSWORD
GamerSchema.pre("validate", function(next){
  if(this.password !== this.confirmPassword){
      this.invalidate("confirmPassword", "Password and confirm password must match")
  }
  next()
})

// BEFORE SAVING THE USER, SWAP OUT PASSWORD WITH HASHED PASSWORD
GamerSchema.pre("save", function(next){
  bcrypt.hash(this.password, 10)
      .then(hashedPassword => {
          this.password = hashedPassword
          next()
      })
})




  module.exports.Gamer = mongoose.model("Gamer", GamerSchema)