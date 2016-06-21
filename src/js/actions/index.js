import {
  ADD_CITY,
  REMOVE_CITY,
  TOGGLE_EDIT_MODE,
  UPDATE_CITIES_WEATHER,
  UPDATE_CITY
} from '../constants';

export const addCity = (city, current = false) => {
  return {
    type: ADD_CITY,
    payload: {
      city,
      current
    }
  };
};

export const updateCity = (city) => {
  return {
    type: UPDATE_CITY,
    payload: {
      city
    }
  };
};

export const removeCity = (cityId) => {
  return {
    type: REMOVE_CITY,
    payload: {
      cityId
    }
  };
};

export const updateCitiesWeather = (cities) => {
  return {
    type: UPDATE_CITIES_WEATHER,
    payload: {
      cities
    }
  };
};

export const toggleEditMode = () => {
  return {
    type: TOGGLE_EDIT_MODE
  };
};
