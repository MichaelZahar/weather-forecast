import React from 'react';
import { convertKelvinsToCelsius } from '../utils/convert';

export default ({ data, title }) => {
  const { weather, main } = data;
  const temp = main.temp;

  return (
    <li className="forecast">
      <p className="title">{title}</p>
      <p className="weather-date">
        <img src={`//openweathermap.org/img/w/${weather[0].icon}.png`} alt="" />
        {convertKelvinsToCelsius(temp)}°
      </p>
    </li>
  );
};
