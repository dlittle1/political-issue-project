import React from 'react';
import './componentStyles/post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/pro-solid-svg-icons';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

const Post = (props) => {
  const { index, title, description, likes, tags, postAuthor, createdAt } =
    props;
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo('en-US');
  console.log(props);
  return (
    <div key={index} className='post-container'>
      <h2 className='post-title'>{title}</h2>
      <h5>{description}</h5>
      <div className='post-details'>
        <p>
          <span className='post-thumbs-up'>
            <FontAwesomeIcon icon={faThumbsUp} size='sm' />
          </span>
          {likes.length}
        </p>
        <ul>
          {tags.map((tag, index) => (
            <li key={index + tag} className='post-tag'>
              {tag}
            </li>
          ))}
        </ul>
        <p>
          Posted by: {postAuthor[0].username}{' '}
          {timeAgo.format(new Date(createdAt))}
        </p>
      </div>
    </div>
  );
};

export default Post;
