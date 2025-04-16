const Post = require('../models/Post');

const createPost = async (title, content, authorId) => {
  const newPost = new Post({
    title,
    content,
    author: authorId
  });
  return await newPost.save();
};

const getAllPosts = async () => {
  return await Post.find().populate('author', 'username');
};

const getPostById = async (id) => {
  return await Post.findById(id).populate('author', 'username');
};

const updatePost = async (id, title, content) => {
  return await Post.findByIdAndUpdate(id, { title, content }, { new: true });
};

const deletePost = async (id) => {
  return await Post.findByIdAndDelete(id);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};
