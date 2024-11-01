const mongoose = require("mongoose");
const schema = mongoose.Schema({
  PersonID:{type:Number,unique:true,required:true},
  Name:{type:String,required:true},
  Description:{type:String,required:false},
  gender:{type:String,required:false},
})
module.exports = mongoose.model("Person",schema);
