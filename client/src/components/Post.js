import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './componentStyles/post.css';
import TimeAgo from 'javascript-time-ago';
import { RequestContext } from '../context/RequestProvider';
import { UserContext } from '../context/UserProvider';
import LikeButton from './LikeButton';
import { BigHead } from '@bigheads/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/pro-solid-svg-icons';

const Post = (props) => {
  const requestContext = useContext(RequestContext);
  const userContext = useContext(UserContext);
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
    comments,
  } = props;

  const { user } = userContext;

  const { likePost, getLikePost, deleteLike } = requestContext;

  const timeAgo = new TimeAgo('en-US');
  return (
    <div key={index} className='post-container'>
      <div className='post-info'>
        <div className='post-title-body'>
          <Link to={`/posts/${_id}`}>
            <h2 className='post-title'>{title}</h2>
          </Link>
          <h5>{description}</h5>
        </div>
        {user._id === createdBy._id && (
          <div className='post-options'>
            <Link to={`/posts/edit/${_id}`}>
              <span className='post-edit'>
                <p>edit</p>
              </span>
            </Link>
            <span className='post-delete'>
              <p onClick={() => props.handleDelete(_id)}>delete</p>
            </span>
          </div>
        )}
      </div>

      <div className='post-details'>
        <div className='post-icons'>
          <div className='post-icon'>
            <LikeButton
              likePost={likePost}
              getLikePost={getLikePost}
              deleteLike={deleteLike}
              likes={upvotes}
              _id={_id}
            />
          </div>
          <div className='post-icon'>
            <FontAwesomeIcon
              icon={faComment}
              style={{ color: 'rgb(89,115,252)' }}
            />
            <p>{comments.length}</p>
          </div>
        </div>

        <ul>
          {tags.map((tag, index) => (
            <li key={index + tag} className='post-tag'>
              {tag}
            </li>
          ))}
        </ul>

        <div className='post-avatar-user'>
          <BigHead {...createdBy.avatar} />
          <p>-{createdBy.username || postAuthor[0].username}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
