const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({ 

title:{
    type:String,
    required:true,
},
category:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true,
},
timmings:{
    type:String,
    required:true,
},
active:{
    type:Boolean,
    required:true,
},
contactNumber:{
    type:String,
    required:true,
},
address:{
    type:String,
    required:true,
},
stateId:{
    type: Schema.Types.ObjectId,
    ref: 'State', 
    required: true
},
cityId:{
    type:Schema.Types.ObjectId,
    ref:"City",
},
areaId:{
    type:Schema.Types.ObjectId,
    ref:"Area",
},
userId:{
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
},
foodtype:{
    type:String,
    required:true,
},
latitude:{
    type:String,
    required:true,
},
longtitude:{
    type:String,
    required:true,
},

});

module.exports = mongoose.model('Location', locationSchema);