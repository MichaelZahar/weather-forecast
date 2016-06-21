import React from 'react';
import { connect } from 'react-redux';
import { toggleEditMode } from '../actions';

const mapStateToProps = (state) => {
  return {
    editMode: state.cities.editMode
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch(toggleEditMode());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({ editMode, onClick }) => {
  const linkTitle = editMode ? 'Done' : 'Edit';

  return (
    <a href="#"
      className="edit"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}>
      {linkTitle}
    </a>
  );
});
