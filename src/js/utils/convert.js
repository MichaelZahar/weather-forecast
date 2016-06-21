export const convertKelvinsToCelsius = (degInKelvin) => {
  return Math.round(degInKelvin - 273.15);
};

export const convertHPaToMmHg = (hPa) => {
  return Math.round(hPa * 100 / 133.22);
};
