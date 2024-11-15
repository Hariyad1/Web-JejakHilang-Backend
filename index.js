const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const path=require("path")
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const adminRoute = require('./routes/admin')
const ImageKit = require("imagekit");
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');

//database
const connectDB = async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("database is connected successfully")
  }
  catch(err){
    console.log(err)
  }
}

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)
app.use("/api/admin", adminRoute)
app.use(fileUpload());

//Image Upload
app.post("/api/upload", (req, res) => {
  console.log("Request files:", req.files); // Log untuk memeriksa isi req.files

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file; // Menggunakan key 'file' untuk mendapatkan file dari request
  const fileName = file.name; // Menggunakan nama asli file

  if (!file) {
    return res.status(400).send('File not found in request.');
  }

  imagekit.upload({
    file: file.data, // file buffer
    fileName: fileName, // Menggunakan nama asli file
    folder: "/uploads" // folder di ImageKit
  }, function(error, result) {
    if (error) {
      console.log("Error uploading to ImageKit:", error);
      return res.status(500).json("Error uploading image");
    } else {
      console.log("Image uploaded to ImageKit:", result);
      return res.status(200).json({ url: result.url });
    }
  });
});

app.listen(process.env.PORT,() => {
  connectDB()
  console.log("app is running on port "+process.env.PORT)

}) 