const key = 'weatherState';

export function getCities() {
  const stringData = localStorage[key];

  if (stringData) {
    try {
      return JSON.parse(stringData);
    } catch (error) {
      console.log(error);
    }
  }

  return undefined;
}

export function saveCities(state) {
  localStorage.setItem(key, JSON.stringify(state));
}
