jest.unmock('../../reducers/city');
jest.unmock('../../constants');

import city from '../../reducers/city';
import {
  ADD_CITY,
  UPDATE_CITY
} from '../../constants';

describe('city reducer', () => {
  it('called with unknown events', () => {
    const action = {
      type: 'UNKNOWN',
      payload: {
        city: {
          id: 1,
          name: 'Moscow'
        }
      }
    };
    const oldCity = {
      id: 1,
      name: 'London'
    };

    expect(
      city(oldCity, action)
    ).toEqual(oldCity);
  });

  it('called with ADD_CITY event', () => {
    const action = {
      type: ADD_CITY,
      payload: {
        city: {
          id: 1,
          name: 'Moscow'
        }
      }
    };
    const newCity = {
      ...action.payload.city,
      current: false
    };

    expect(
      city(undefined, action)
    ).toEqual(newCity);
  });

  it('called with ADD_CITY event (current)', () => {
    const action = {
      type: ADD_CITY,
      payload: {
        city: {
          id: 1,
          name: 'Moscow'
        },
        current: true
      }
    };
    const newCity = {
      ...action.payload.city,
      current: true
    };

    expect(
      city(undefined, action)
    ).toEqual(newCity);
  });

  it('called with UPDATE_CITY event', () => {
    const action = {
      type: UPDATE_CITY,
      payload: {
        city: {
          id: 1,
          name: 'Paris',
          dt: Date.now(),
          weather: [],
          main: {}
        }
      }
    };
    const oldCity = {
      id: 1,
      name: 'Moscow'
    };
    const newCity = {
      id: 1,
      name: action.payload.city.name,
      dt: action.payload.city.dt,
      weather: [],
      main: {}
    };

    expect(
      city(oldCity, action)
    ).toEqual(newCity);
  });
});
