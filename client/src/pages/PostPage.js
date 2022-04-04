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
  const [comment, setComment] = useState({ body: '' });
  const [comments, setComments] = useState([]);
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
    const { name, value } = e.target;
    setComment({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCommentOnPost(post._id, comment)
      .then((response) =>
        setPost((prevState) => ({
          ...prevState,
          comments: [...prevState.comments, response],
        }))
      )
      .catch((error) => console.log(error));
  };
  return (
    <div className='post-page'>
      {!loading && (
        <>
          <div className='post-page-container'>
            <h1>{post.title}</h1>
            <div className='post-page-title-contents'>
              <span style={{ marginRight: '20px' }}>
                Created {timeAgo.format(new Date(post.createdAt))}
              </span>
              <span className='post-like-button'>
                <LikeButton
                  likes={post.upvotes}
                  getLikePost={getLikePost}
                  likePost={likePost}
                  deleteLike={deleteLike}
                  _id={post._id}
                />
              </span>
            </div>
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

          <p
            className='post-page-comment-link'
            onClick={() => setIsCommenting((prevState) => !prevState)}
          >
            comment
          </p>
          {post.comments && (
            <div>
              {post.comments.map((comment, index) => (
                <div key={comment + index}>
                  <hr />
                  <div className='post-comment'>
                    <p>{comment.body}</p>
                    <p>
                      {' '}
                      -{' '}
                      <span className='post-comment-user'>
                        {comment.user.username}
                      </span>{' '}
                      <span className='post-comment-created'>
                        {timeAgo.format(new Date(comment.createdAt))}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

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
              value={comment.body}
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
