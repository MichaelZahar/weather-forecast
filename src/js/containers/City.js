import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DayForecast from '../components/DayForecast';
import { fetchByCityId, fetch5DaysByCityId } from '../utils/weatherProvider';
import { convertKelvinsToCelsius } from '../utils/convert';

import '../../styles/city.styl';

const mapStateToProps = (state, ownProps) => {
  const cityId = ownProps.cityId;

  return {
    city: state.cities.items.filter((city) => city.id === cityId)[0]
  };
};

export default class City extends Component {
  static propTypes = {
    cityId: PropTypes.number.isRequired,
    city: PropTypes.object,
    forecast: PropTypes.object
  }

  state = {
    city: this.props.city,
    loading: true
  }

  componentDidMount() {
    if (!this.state.city) {
      this.loadCurrentForecast();
    }

    this.loadForecast();
  }

  loadCurrentForecast() {
    fetchByCityId(this.props.cityId)
      .then((json) => {
        if (parseInt(json.cod, 10) !== 200) {
          this.setState({ loading: false });
          return;
        }

        this.setState({
          city: {
            id: json.id,
            dt: json.dt,
            name: json.name,
            main: json.main,
            weather: json.weather
          },
          loading: false
        });
      });
  }

  loadForecast() {
    const cityId = this.props.cityId;

    return fetch5DaysByCityId(cityId).then((json) => {
      if (parseInt(json.cod, 10) !== 200) {
        return;
      }

      this.setState({
        forecast: json.list
      });
    });
  }

  renderForecast() {
    const forecast = this.state.forecast;

    if (!forecast) {
      return <div className="loading"><img src="/images/ajax-loader.gif" alt="" /></div>;
    }

    return (
      <DayForecast forecast={forecast} />
    );
  }

  render() {
    if (!this.state.city) {
      if (this.state.loading) {
        return (
          <div className="loading"><p><img src="/images/ajax-loader.gif" alt="" /> Loading...</p></div>
        );
      }

      return (
        <div className="not-found"><p>Not found</p></div>
      );
    }

    const { name, main, weather } = this.state.city;

    return (
      <section className="city">
        <div className="current-weather">
          <h1>{name}</h1>
          <p>{weather[0].description}</p>
          <h2>{convertKelvinsToCelsius(main.temp)}&deg;</h2>
        </div>
        {this.renderForecast()}
        <p className="back"><a href="#/cities">Back</a></p>
      </section>
    );
  }
}

export default connect(mapStateToProps)(City);
