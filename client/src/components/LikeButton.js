import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/pro-solid-svg-icons';
const LikeButton = (props) => {
  const { likes, getLikePost, likePost, deleteLike, _id } = props;
  const [hasLikedPost, setHasLikedPost] = useState(false);
  const [numLikes, setNumLikes] = useState(likes);

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
      color: 'rgb(89,115,252)',
    };
  }

  return (
    <>
      {/* like-button styling at home.css */}
      <span style={likeButtonStyle} className='like-button'>
        <FontAwesomeIcon
          icon={faThumbsUp}
          onClick={() => handleLikeClick(_id)}
        />
      </span>
      <p>{numLikes}</p>
    </>
  );
};

export default LikeButton;
