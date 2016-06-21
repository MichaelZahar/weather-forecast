import React from 'react';
import { connect } from 'react-redux';
import Forecast from '../components/Forecast.js';

/**
 * Пусть:
 * - погода утром отображается по прогнозу 6am
 * - погода днем отображается по прогнозу 12pm
 * - погода вечером/ночью отображается по прогнозу на 9pm
 *
 * Из прогнозов надо достать данные к этим датам.
 * Так как у нас нет данных за прошедшее время,
 * будем отображать прогноз за текущее время суток
 * + следующие 2.
 */

const daytimeMap = {
  6: 'morning',
  12: 'noon',
  21: 'evening'
};

const getDayForecast = (forecast) => {
  const result = [];

  for (let data of forecast) {
    const hours = new Date(data.dt * 1000).getHours();

    if (hours in daytimeMap) {
      result.push({
        title: daytimeMap[hours],
        data
      });
    }

    if (result.length >= 3) {
      break;
    }
  }

  return result;
};

export default connect()(({ forecast }) => {
  const dayForecast = getDayForecast(forecast);

  return (
    <ul className="day-forecast">
      {dayForecast.map((item, index) =>
        <Forecast key={index} data={item.data} title={item.title} />
      )}
    </ul>
  );
});
