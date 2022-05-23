const mongoose = require("mongoose")

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
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please add a valid email address.',
      ],
      required: [true, 'Please enter Email Address'],
      unique: [true, "EMAIL ALREADY EXISTS!"],
      lowercase: true,
      dropDups: true
    },
    user_name: {
      type: String, 
      required: [true, "REQUIRES A USER NAME!"],
      minLength:[2, "User Name must be at least 2 characters!"],
      maxLength:[30, "User Name can be at most 30 characters!"],
      unique: [true, "USER NAME ALREADY EXISTS!"],
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

module.exports.Gamer = mongoose.model("Gamer", GamerSchema)