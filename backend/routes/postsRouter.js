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
} = postController;

postRouter.route('/').get(getAllPosts).post(createPost);
postRouter.get('/popular', getPostsByPopularity);
postRouter.get('/new', getNewPosts);
postRouter.get('/user', getCurrentUserPosts);
postRouter.route('/:postId').get(getOnePost).put(updatePost).delete(deletePost);
postRouter.put('/:postId/like', likePost);
postRouter.get('/:postId/like', getLikePost);
postRouter.put('/:postId/like/delete', deleteLike);

module.exports = postRouter;
