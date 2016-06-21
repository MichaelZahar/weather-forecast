import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CityItem from '../components/CityItem';
import { removeCity, updateCitiesWeather } from '../actions';
import { fetchByCityIds } from '../utils/weatherProvider';
import { saveCities } from '../utils/localStorage';

import '../../styles/cities-list.styl';

// Сколько ms считать актуальнымм данные о погоде в городе
const expireAfter = 5 * 60 * 1000;

const mapStateToProps = (state) => {
  return state.cities;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReceivedWeatherData(json) {
      dispatch(updateCitiesWeather(json.list));
    },

    onDeleteClick(cityId) {
      dispatch(removeCity(cityId));
    },

    onCityClick(cityId) {
      document.location.hash = '#/cities/' + cityId;
    }
  };
};

/**
 * Компонент выводит список текущих прогнозов погоды
 * для отслеживаемых городов.
 *
 * @class CitiesList
 * @extends React.Component
 */
class CitiesList extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  componentDidMount() {
    const { store } = this.context;

    this.updateWeatherDataIfRequired();
    this.unsibscribe = store.subscribe(::this.updateLocalStorageData);
  }

  componentWillUnmount() {
    this.unsibscribe();
  }

  // Если данные устарели или неполные, обновляем их.
  updateWeatherDataIfRequired() {
    const { items, onReceivedWeatherData } = this.props;
    const expirationDate = Date.now() - expireAfter;
    const udpatedCityIds = items.reduce((result, city) => {
      const isUpdateRequired = !city.main || city.dt < expirationDate;

      if (isUpdateRequired) {
        result.push(city.id);
      }

      return result;
    }, []);

    if (udpatedCityIds.length > 0) {
      fetchByCityIds(udpatedCityIds)
        .then(onReceivedWeatherData);
    }
  }

  updateLocalStorageData() {
    const cities = this.context.store.getState().cities;
    const items = this.props.items;
    const itemsChanged = items !== cities.items;

    if (itemsChanged) {
      saveCities(cities.items);
    }
  }

  render() {
    const { items, editMode, onCityClick, onDeleteClick } = this.props;
    const ulClass = ['cities-list'];

    if (editMode) {
      ulClass.push('edit');
    }

    return (
      <ul className={ulClass.join(' ')}>
        {items.map(city =>
          <CityItem
            key={city.id}
            city={city}
            onClick={() => onCityClick(city.id)}
            onDelete={() => onDeleteClick(city.id)}
          />
        )}
      </ul>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CitiesList);
