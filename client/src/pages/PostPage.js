import React, { useEffect, useState, useContext } from 'react';
import { RequestContext } from '../context/RequestProvider';
import { useParams } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import '../styles/postPage.css';
import { BigHead } from '@bigheads/core';
import LikeButton from '../components/LikeButton';

const Post = () => {
  const context = useContext(RequestContext);
  const params = useParams();
  const [post, setPost] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState(' ');
  const timeAgo = new TimeAgo('en-US');

  const { getLikePost, likePost, deleteLike, createCommentOnPost } = context;

  useEffect(() => {
    context
      .getOnePost(params.postId)
      .then((response) => setPost(response))
      .then((response) => setLoading(false))
      .catch((error) => console.log(error));
  }, []);

  const commentFormStyle = { display: isCommenting ? 'block' : 'none' };

  const handleChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setComment(value);
  };

  const handleSubmit = () => {
    createCommentOnPost(post._id, comment)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  console.log(comment);
  return (
    <div className='post-page'>
      {!loading && (
        <>
          <div className='post-page-container'>
            <h1>{post.title}</h1>
            <p>
              <span style={{ marginRight: '20px' }}>
                Created {timeAgo.format(new Date(post.createdAt))}
              </span>
              <LikeButton
                likes={post.upvotes}
                getLikePost={getLikePost}
                likePost={likePost}
                deleteLike={deleteLike}
                _id={post._id}
              />
            </p>
            <hr />
            <p>{post.description}</p>
            <div className='post-page-created-by'>
              <p className='post-page-written-by'>Written by:</p>
              <div className='post-page-user-container'>
                <BigHead {...post.createdBy.avatar} />
                <p>{post.createdBy.username}</p>
              </div>
            </div>
          </div>
          <hr />
          <p
            className='post-page-comment-link'
            onClick={() => setIsCommenting((prevState) => !prevState)}
          >
            comment
          </p>
          <form
            className='post-page-comment-form'
            style={commentFormStyle}
            onSubmit={handleSubmit}
          >
            <input
              type='text'
              name='body'
              placeholder='Comment...'
              className='post-page-comment-input'
              value={comment}
              onChange={handleChange}
            />
            <button className='post-page-comment-button'>Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Post;
