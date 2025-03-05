const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
    {

        userId:{
            type:Number,
        },
        UserName:{
            type:String
        },
        Email:{
            type:String
        },
        Password:{
            type:Number
        },
        Role:{
            type:String

        },
        DateJoined:{
            type:Date  
        },
        roleId:{
            type:Schema.Types.ObjectId,
            ref:"roles"
        }
    }
)

module.exports = mongoose.model("users",userSchema)