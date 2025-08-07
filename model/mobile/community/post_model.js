// model/post_model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  userId: { type: String, required: true, index: true },
  authorName: { type: String, required: true },
  authorAvatarUrl: { type: String },
  content: { type: String, required: true },
  imageUrl: { type: String },
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);