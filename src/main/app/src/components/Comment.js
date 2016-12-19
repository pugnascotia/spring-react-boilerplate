/* @flow */
import React from 'react';

const Comment = (props : { content: string, author : string }) => (
  <div className="message">
    <h3>{props.content}</h3>
    <p>By {props.author}</p>
  </div>
);

export default Comment;
