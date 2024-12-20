const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

//REGISTER
router.post('/register',async(req,res)=>{
  try{
    const{username,email,password,isAdmin} = req.body
    const salt=await bcrypt.genSalt(10)
    const hashedPassword =await bcrypt.hashSync(password, salt)
    const newUser = new User({username,email,password:hashedPassword,role:isAdmin?'admin':'user'})
    const savedUser=await newUser.save()
    res.status(200).json(savedUser)
  }
  catch(err){
    res.status(500).json(err)
  }
})


//LOGIN 
router.post('/login', async (req, res) => {
  try {
    console.log("Login request received:", req.body);
    console.log("SECRET:", process.env.SECRET);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found!");
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json("Wrong credentials!");
    }
    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email, role: user.role },
      process.env.SECRET,
      { expiresIn: "3d" }
    );
    const { password, ...info } = user._doc;
    res.cookie('token', token, { httpOnly: true, secure: true });
    res.status(200).json({ ...info, token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json(err);
  }
})


//LOGOUT
router.get("/logout",async(req,res)=>{
  try{
    res.clearCookie("token",{sameSite:"none",secure:"true"}).status(200).send("User logged out successfully")

  }
  catch(err){
    res.status(500).json(err)
  }
})

//REFETCH USER
router.get("/refetch", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(401).json(err);
    }
    res.status(200).json(data);
  });
})

module.exports=router
