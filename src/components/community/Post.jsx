import React from 'react';
import "./Post.css";

function Post({ inside }) { // Accept props and destructure 'inside'
  return (
    <div>
      <div className="container">
        <p className="inside">{inside}</p> {/* Use the 'inside' prop */}
      </div>
    </div>
  );
}

export default Post;
