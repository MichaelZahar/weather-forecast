import React from 'react';


export default ({ deleteHandler }) => {
  return (
    <a href="#" className="delete" onClick={(e) => {
      e.preventDefault();
      deleteHandler();
    }}>-</a>
  );
};
