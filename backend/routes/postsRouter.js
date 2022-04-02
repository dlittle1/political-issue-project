const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/postController');
const {
  getAllPosts,
  getOnePost,
  getCurrentUserPosts,
  getPostsByPopularity,
  getNewPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = postController;

postRouter.route('/').get(getAllPosts).post(createPost);
postRouter.get('/popular', getPostsByPopularity);
postRouter.get('/new', getNewPosts);
postRouter.get('/user', getCurrentUserPosts);
postRouter.route('/:postId').get(getOnePost).put(updatePost).delete(deletePost);
postRouter.put('/:postId/like', likePost);

module.exports = postRouter;
