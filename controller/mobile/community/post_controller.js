const Post = require('../../../model/mobile/community/post_model');
const { clerkClient } = require('@clerk/clerk-sdk-node');

const post_controller = {
  index: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ msg: "Error fetching posts", error: error.message });
    }
  },

// controller/post_controller.js

  store: async (req, res) => {
    try {
      const { userId } = req.auth;

      if (!userId) {
        return res.status(401).json({ msg: "User not authenticated." });
      }

      const user = await clerkClient.users.getUser(userId);
      const { content, imageUrl } = req.body;

      if (!content) {
        return res.status(400).json({ msg: "Post content cannot be empty." });
      }

      const authorName = `${user.firstName || ''} ${user.lastName || ''}`.trim();

      const newPost = await Post.create({
        userId,
        authorName: authorName || "Anonymous",
        authorAvatarUrl: user.imageUrl,
        content,
        imageUrl: imageUrl || null,
      });

      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error in Create Post Controller:", error);
      res.status(500).json({ msg: "Internal server error", error: error.message });
    }
  },
}


module.exports = post_controller;
