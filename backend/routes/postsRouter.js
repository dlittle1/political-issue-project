const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/postController');
const {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  deleteLike,
  getLikePost,
  createCommentOnPost,
} = postController;

postRouter.route('/').get(getAllPosts).post(createPost);
postRouter.route('/:postId/comments').post(createCommentOnPost);
postRouter.route('/:postId').get(getOnePost).put(updatePost).delete(deletePost);
postRouter
  .route('/:postId/like')
  .put(likePost)
  .get(getLikePost)
  .delete(deleteLike);

module.exports = postRouter;
