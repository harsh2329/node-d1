const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
    {

    //     userId:{
    //         type:Number,
    //     },
    //     UserName:{
    //         type:String
    //     },
    //     Email:{
    //         type:String,
    //         unique:true
    //     },
    //     Password:{
    //         type:String
    //     },
    //     ConfirmPassword:{
    //         type:String
    //     },
    //     Role:{
    //         type:String

    //     },
    //     DateJoined:{
    //         type:Date  
    //     },
    //     roleId:{
    //         type:Schema.Types.ObjectId,
    //         ref:"roles"
    //     },
    // // }
    
      firstname: {
        type: String,
        required: true,
        trim: true
      },
      lastname: {
        type: String,
        required: true,
        trim: true
      },
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
      },
      contact: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Please provide a valid email']
      },
      password: {
        type: String,
        required: true,
        minlength: 8
      },
      // confirmPassword:{
      //   type:String,
      //   required:true
      // },
      age: {
        type: Number,
        required: true,
        min: 18,
        max: 120
      },
      profilePicPath: {
        type: String,
        default: '' // Default to empty string, can be updated later
      },
      role: {
        type: String,
        enum: ['user', 'admin', 'manager'],
        default: 'user'
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }, {
      timestamps: true
    });

module.exports = mongoose.model("user",userSchema)