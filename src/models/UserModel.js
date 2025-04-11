const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
    {

    
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
      // role: {
      //   type: String,
      //   enum: ['user', 'admin', 'manager'],
      //   default: 'user'
      // },
      roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role', // assuming you have a role model
        // required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }, {
      timestamps: true
    });

module.exports = mongoose.model("user",userSchema)