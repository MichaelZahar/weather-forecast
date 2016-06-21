import { ADD_CITY, UPDATE_CITY } from '../constants';

export default (state, action) => {
  let data;

  switch (action.type) {
  case ADD_CITY:
    data = action.payload.city;

    return {
      id: data.id,
      current: !!action.payload.current,
      name: data.name,
      dt: data.dt,
      main: data.main,
      weather: data.weather
    };

  case UPDATE_CITY:
    data = action.payload.city;

    return {
      ...state,
      id: data.id,
      name: data.name,
      dt: data.dt,
      main: data.main,
      weather: data.weather
    };

  default:
    return state;
  }
};
