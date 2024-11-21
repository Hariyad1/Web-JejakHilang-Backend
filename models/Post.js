const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  title :{
    type:String,
    required:true,
    unique:true
  },
  desc:{
    type:String,
    required:true,
    unique:true
  },
  photo:{
    type:String,
    required:false,
  },
  username:{
    type:String,
    required:true,
  },
  userId:{
    type:String,
    required:true,
  },
  categories:{
    type:Array,
  },
  contactNo:{
    type:String,
    required:true,
    match: [/^\+?[0-9]{9,15}$/, 'Please enter a valid contact number'],
  },
  reportType: {
    type: String,
    enum: ['Penemu', 'Pencari'],
  }
},
  {timestamps:true})

module.exports = mongoose.model("Post",PostSchema)