import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import City from './City';
import CitiesList from './CitiesList';
import { addCity } from '../actions';
import { fetchByPosition } from '../utils/weatherProvider';


const mapStateToProps = (state) => {
  return {
    cities: state.cities
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReceivedCurrentCity(json) {
      if (parseInt(json.cod, 10) !== 200) {
        return;
      }

      dispatch(addCity(json, true));
    }
  };
};

const getCityIdByRout = (rout) => {
  return parseInt(rout[1], 10);
};

class App extends Component {
  state = {
    location: document.location.hash
  }

  componentDidMount() {
    const router = this.handleHashchange.bind(this);
    const { onReceivedCurrentCity } = this.props;

    window.addEventListener('hashchange', router, false);
    this.unsubscribeRouter = () => window.removeEventListener('hashchange', router);

    this.requestCurrentPosition()
      .then(fetchByPosition)
      .then(onReceivedCurrentCity);
  }

  componentWillUnmount() {
    this.unsubscribeRouter();
  }

  handleHashchange() {
    this.setState({ location: location.hash });
  }

  requestCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geo location isn\'t supported');
      }

      navigator.geolocation.getCurrentPosition(
        resolve,
        reject
      );
    });
  }

  citiesList() {
    return (
      <div>
        <CitiesList />
        <Footer />
      </div>
    );
  }

  cityDetails(cityId) {
    return (
      <City cityId={cityId} />
    );
  }

  render() {
    const rout = this.state.location.match(/#\/cities\/(\d+)/);
    const isDetails = rout !== null;

    /**
     * There is `react-router` to do it.
     * But test issue said I couldn't use additional libraries.
     */
    const content = isDetails ? this.cityDetails(getCityIdByRout(rout)) : this.citiesList();

    return (
      <div className="app-container">
        {content}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
