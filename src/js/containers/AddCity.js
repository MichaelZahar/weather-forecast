import React from 'react';
import { connect } from 'react-redux';
import { addCity } from '../actions';
import AddForm from '../components/AddForm';
import { fetchByCityName } from '../utils/weatherProvider';

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCity(value) {
      fetchByCityName(value).then((json) => {
        if (parseInt(json.cod, 10) !== 200) {
          console.log(`Can't find weather forecast for city ${value}`);
          return;
        }

        dispatch(addCity(json));
      });
    }
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(({ onAddCity }) => (
  <AddForm placeholder="Input city name" onAdd={onAddCity} />
));
