const express=require('express')
const router=express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const verifyToken = require('../middleware/verifyToken')

//CREATE
router.post("/create",verifyToken,async(req,res) => {
  try{
    const newComment = new Comment(req.body)
    const savedComment = await newComment.save()
    res.status(200).json(savedComment)
  }
  catch(err) {
    res.status(500).json(err)
  }
})

//UPDATE
router.put("/:id",verifyToken,async(req,res)=>{
  try {
    const UpdatedComment=await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.status(200).json(UpdatedComment)}  

    catch (err) {
      res.status(500).json(err)
    }
})

//DELETE
router.delete("/:id",verifyToken,async(req,res)=>{
  try {
    await Comment.findByIdAndDelete(req.params.id)
    
    res.status(200).json("Comment has been deleted ")
  }
    catch (err) {
      res.status(500).json(err)
    }
})


//GET POST COMMENTS
router.get("/post/:postId",async(req,res)=>{
  try {
    const Comments =await Comment.find({postId:req.params.postId})
    res.status(200).json(Comments)
  }
    catch (err) {
      res.status(500).json(err)
    }
})

module.exports=router