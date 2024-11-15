const express = require('express')
const router = express.Router()
const verifyAdmin = require('../middleware/adminCheck')
const Post = require('../models/Post')
const User = require('../models/User')

// Melihat semua laporan kehilangan
router.get('/lost-items', verifyAdmin, async (req, res) => {
  try {
    const reports = await Post.find()
    res.status(200).json(reports)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Menghapus laporan kehilangan berdasarkan ID
router.delete('/lost-items/:id', verifyAdmin, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).json("Report has been deleted")
  } catch (err) {
    res.status(500).json(err)
  }
})

// Mendapatkan semua postingan
router.get('/posts', verifyAdmin, async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'username');
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json(err);
  }
});

// Menghapus postingan berdasarkan ID
router.delete('/posts/:id', verifyAdmin, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted");
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json(err);
  }
});

// Mendapatkan semua data pengguna dengan role "user" atau role kosong
router.get('/users', verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({
      $or: [
        { role: 'user' },
        { role: { $exists: false } }, // Untuk role yang tidak ada
        { role: null } // Untuk role yang null
      ]
    }).select('username email role');
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json(err);
  }
});

// Menghapus pengguna berdasarkan ID
router.delete('/users/:id', verifyAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json(err);
  }
});

module.exports = router 