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
  deleteLike,
  getLikePost,
  getCurrentUserLikedPosts,
} = postController;

postRouter.route('/').get(getAllPosts).post(createPost);
postRouter.route('/:postId').get(getOnePost).put(updatePost).delete(deletePost);
postRouter
  .route('/:postId/like')
  .put(likePost)
  .get(getLikePost)
  .delete(deleteLike);

module.exports = postRouter;
