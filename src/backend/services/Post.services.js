const { Post } = require('../models');

const createPost = async (data) => {
  return await Post.create(data);
};

const getAllPosts = async () => {
  return await Post.findAll();
};

const getPostById = async (id) => {
  return await Post.findByPk(id);
};

const updatePost = async (id, data) => {
  const post = await Post.findByPk(id);
  if (!post) return null;
  return await post.update(data);
};

const deletePost = async (id) => {
  const post = await Post.findByPk(id);
  if (!post) return null;
  await post.destroy();
  return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
