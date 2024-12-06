const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/User')
const { verifyAdmin } = require('../middleware/authMiddleware');
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
        { role: { $exists: false } },
        { role: null }
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