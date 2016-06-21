import city from './city';
import { updateCity } from '../actions';
import {
  ADD_CITY,
  REMOVE_CITY,
  TOGGLE_EDIT_MODE,
  UPDATE_CITIES_WEATHER
} from '../constants';

export default (
  state = { editMode: false, items: [] },
  action
) => {
  let cityId;
  let newItems;

  switch (action.type) {
  case ADD_CITY:
    cityId = action.payload.city.id;
    const oldItem = state.items.filter(item => item.id === cityId)[0];
    const current = action.payload.current;

    if (oldItem) {
      return state;
    }

    if (current) {
      // prepend, user's weather is the most important
      newItems = [
        city(undefined, action),
        ...state.items.filter(item => !item.current && item.id !== cityId)
      ];
    } else {
      // append
      newItems = [
        ...state.items.filter(item => item.id !== cityId),
        city(undefined, action)
      ];
    }

    return { ...state, items: newItems };

  case UPDATE_CITIES_WEATHER:
    const mapById = action.payload.cities.reduce((result, update) => {
      result[update.id] = update;

      return result;
    }, {});

    newItems = state.items.map(item => {
      cityId = item.id;

      if (cityId in mapById) {
        return city(item, updateCity(mapById[cityId]));
      }

      return city;
    });

    return { ...state, items: newItems };

  case REMOVE_CITY:
    cityId = action.payload.cityId;
    newItems = state.items.filter(item => item.id !== cityId);

    return { ...state, items: newItems };

  case TOGGLE_EDIT_MODE:
    return { ...state, editMode: !state.editMode };

  default:
    return state;
  }
};
