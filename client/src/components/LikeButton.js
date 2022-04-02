import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/pro-solid-svg-icons';
const LikeButton = (props) => {
  const { likes, getLikePost, likePost, deleteLike, _id } = props;
  const [hasLikedPost, setHasLikedPost] = useState(false);
  const [numLikes, setNumLikes] = useState(likes.length);

  useEffect(() => {
    getLikePost(_id).then((response) => {
      if (response) {
        setHasLikedPost(true);
      } else {
        setHasLikedPost(false);
      }
    });
  }, []);

  const handleLikeClick = (postId) => {
    hasLikedPost
      ? deleteLike(postId)
          .then(() => {
            setHasLikedPost(false);
            setNumLikes((prevState) => prevState - 1);
          })
          .catch((err) => console.dir(err))
      : likePost(postId)
          .then(() => {
            setHasLikedPost(true);
            setNumLikes((prevState) => prevState + 1);
          })
          .catch((err) => console.dir(err));
  };

  let likeButtonStyle;
  if (hasLikedPost) {
    likeButtonStyle = {
      color: 'rgb(102, 156, 201)',
    };
  }

  return (
    <>
      <span className='post-thumbs-up' style={likeButtonStyle}>
        <FontAwesomeIcon
          icon={faThumbsUp}
          size='sm'
          onClick={() => handleLikeClick(_id)}
        />
      </span>
      {numLikes}
    </>
  );
};

export default LikeButton;
