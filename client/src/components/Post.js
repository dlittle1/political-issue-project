import React, { useContext, useEffect, useState } from 'react';
import './componentStyles/post.css';
import TimeAgo from 'javascript-time-ago';
import { RequestContext } from '../context/RequestProvider';
import LikeButton from './LikeButton';

const Post = (props) => {
  const requestContext = useContext(RequestContext);
  const {
    index,
    title,
    description,
    upvotes,
    tags,
    postAuthor,
    createdAt,
    createdBy,
    _id,
  } = props;

  const { likePost, getLikePost, deleteLike } = requestContext;

  const timeAgo = new TimeAgo('en-US');
  return (
    <div key={index} className='post-container'>
      <h2 className='post-title'>{title}</h2>
      <h5>{description}</h5>
      <div className='post-details'>
        <p>
          <LikeButton
            likePost={likePost}
            getLikePost={getLikePost}
            deleteLike={deleteLike}
            likes={upvotes}
            _id={_id}
          />
        </p>
        <ul>
          {tags.map((tag, index) => (
            <li key={index + tag} className='post-tag'>
              {tag}
            </li>
          ))}
        </ul>
        <p>
          Posted by: {createdBy.username || postAuthor[0].username}{' '}
          {timeAgo.format(new Date(createdAt))}
        </p>
      </div>
    </div>
  );
};

export default Post;
