import React from 'react';

export default ({
  onAdd,
  placeholder
}) => {
  let input;

  return (
    <div className="add-form">
      <input ref={node => input = node } placeholder={placeholder} />
      <a href="#" onClick={(e) => {
        e.preventDefault();

        const value = input.value.trim();
        const isEmpty = !value;

        if (isEmpty) {
          return;
        }

        onAdd(value);

        input.value = '';
      }}>+</a>
    </div>
  );
};
