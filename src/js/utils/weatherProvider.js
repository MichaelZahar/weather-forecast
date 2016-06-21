const apiUrl = '//api.openweathermap.org/data/2.5';
const appId = '44c37c7d8481b434433e7db3ec2ffeb3';

export const fetchByCityName = (name) => {
  return fetch(`${apiUrl}/weather?q=${name}&APPID=${appId}`)
    .then((response) => response.json());
};

export const fetchByPosition = (position) => {
  const { latitude, longitude } = position.coords;

  return fetch(`${apiUrl}/weather?lat=${latitude}&lon=${longitude}&APPID=${appId}`)
    .then((response) => response.json());
};

export const fetchByCityId = (id) => {
  return fetch(`${apiUrl}/weather?id=${id}&APPID=${appId}`)
    .then((response) => response.json());
};

export const fetchByCityIds = (ids) => {
  const query = ids.join(',');

  return fetch(`${apiUrl}/group?id=${query}&APPID=${appId}`)
    .then((response) => response.json());
};

export const fetch5DaysByCityId = (cityId) => {
  return fetch(`${apiUrl}/forecast?id=${cityId}&APPID=${appId}`)
    .then((response) => response.json());
};
