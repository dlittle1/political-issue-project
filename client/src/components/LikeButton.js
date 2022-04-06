import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/pro-solid-svg-icons';
const LikeButton = (props) => {
  const { likes, likePost, deleteLike, _id } = props;
  const [hasLikedPost, setHasLikedPost] = useState(false);
  const [numLikes, setNumLikes] = useState(likes);

  useEffect(() => {
    const postId = _id;
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts'));

    let likedPost = likedPosts.filter((post) => post._id === postId);

    if (likedPost.length !== 0) {
      setHasLikedPost(true);
    } else {
      setHasLikedPost(false);
    }
    return () => {
      likedPost = [];
    };
  }, []);

  const deleteFromLocalStorage = (postId) => {
    const currentLikedPosts = JSON.parse(localStorage.getItem('likedPosts'));

    const removePostFromLikes = currentLikedPosts.filter(
      (likedPost) => likedPost._id !== postId
    );

    localStorage.setItem('likedPosts', JSON.stringify(removePostFromLikes));
  };

  const addToLocalStorage = (postId) => {
    const currentLikedPosts = JSON.parse(localStorage.getItem('likedPosts'));
    currentLikedPosts.push({ _id: postId });

    localStorage.setItem('likedPosts', JSON.stringify(currentLikedPosts));
  };

  const handleLikeClick = (postId) => {
    hasLikedPost
      ? deleteLike(postId)
          .then(() => {
            setHasLikedPost(false);
            setNumLikes((prevState) => prevState - 1);
            deleteFromLocalStorage(postId);
          })
          .catch((err) => console.dir(err))
      : likePost(postId)
          .then(() => {
            setHasLikedPost(true);
            setNumLikes((prevState) => prevState + 1);
            addToLocalStorage(postId);
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
