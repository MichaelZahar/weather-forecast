import React from 'react';
import DeleteLink from './DeleteLink';
import { convertKelvinsToCelsius, convertHPaToMmHg } from '../utils/convert';

const pathToLoader = '/images/ajax-loader.gif';

export default ({
  onClick,
  onDelete,
  city
}) => {
  const weather = city.weather;
  const main = city.main || {};
  const { temp, humidity, pressure } = main;

  const iconPath = weather ? `//openweathermap.org/img/w/${weather[0].icon}.png` : pathToLoader;
  const tempStr = temp ? convertKelvinsToCelsius(temp) + '°' : '...';
  const humidityStr = humidity ? `${humidity}%` : '...';
  const pressureStr = pressure ? `${convertHPaToMmHg(pressure)} mmHg` : '...';

  return (
    <li className="city-item">
      <DeleteLink deleteHandler={onDelete} />
      <div className="container" onClick={onClick}>
        <img className="status" src={iconPath} alt="" />
        <span className="degrees">{tempStr}</span>
        <div className="info">
          <p className="details">humidity: {humidityStr}, pressure: {pressureStr} </p>
          <p className="name">{city.name}</p>
        </div>
      </div>
    </li>
  );
};
