import React, { useState, useContext, useEffect } from 'react';
import { RequestContext } from '../context/RequestProvider';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/postForm.css';

const PostForm = () => {
  const context = useContext(RequestContext);
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', description: '', tags: [] });
  const [tagInput, setTagInput] = useState('');
  const { createPost } = context;

  const { postId } = params;

  useEffect(() => {
    if (postId) {
      context
        .getOnePost(postId)
        .then((response) => {
          setTagInput(response.tags.join(','));
          setPost(response);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const handleTagInput = (e) => {
    setTagInput(e.target.value);
  };

  useEffect(() => {
    setPost((prevState) => ({
      ...prevState,
      tags: tagInput
        .split(',')
        .slice(0, 3)
        .map((value) => value.trim().replace(/[\W_]+/g, '')),
    }));
  }, [tagInput]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postId) {
      context
        .updatePost(postId, post)
        .then((response) => navigate(`/posts/${postId}`))
        .catch((error) => console.log(error));
    } else {
      createPost(post)
        .then((response) => navigate(`/posts/${response._id}`))
        .catch((err) => console.log(err));
    }
    navigate('/new', { replace: true });
  };

  return (
    <div className='post-form'>
      <div className='post-form-title'>
        {postId ? <h1>Edit post!</h1> : <h1>Create a new post!</h1>}
      </div>
      <form className='post-form-form' onSubmit={handleSubmit}>
        <h3>Title</h3>
        <p>Be as specific as possible, this is your elevator pitch.</p>
        <input
          type='text'
          placeholder='title'
          name='title'
          className='post-form-input'
          value={post.title}
          onChange={handleChange}
        />
        <h3>Body</h3>
        <p>
          Include as much information as possible to make your position clear.
        </p>
        <textarea
          type='textarea'
          placeholder='description'
          name='description'
          className='post-form-input post-form-body'
          cols='100'
          value={post.description}
          onChange={handleChange}
        />
        <h3>Tags</h3>
        <p>
          These are comma separated, choose up to 3, if tag is more than one
          word you can combine them with Uppercase lettering of each word. These
          are permanent. Cannot be edited in the future.
        </p>
        <input
          type='text'
          placeholder='politics, humanitarian, nationalParks'
          name='tags'
          className='post-form-input'
          value={tagInput}
          onChange={handleTagInput}
        />
        <button className='post-form-button'>Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
