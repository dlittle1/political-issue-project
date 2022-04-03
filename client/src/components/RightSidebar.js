import React, { useEffect, useContext, useState } from 'react';
import { RequestContext } from '../context/RequestProvider';
import './componentStyles/rightSidebar.css';

const RightSidebar = () => {
  const context = useContext(RequestContext);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    context.getTags().then((response) => setTags(response[0].tags));
  }, []);

  return (
    <div className='tags'>
      <div className='tags-title'>Tags:</div>

      <div className='tags-container'>
        {tags.map((tag, index) => (
          <span className='tag' key={tag + '-' + index}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
