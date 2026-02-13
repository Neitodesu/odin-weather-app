import { displayWeatherInfo } from './form';
import { format, parseISO } from 'date-fns';

const apiKey = import.meta.env.VITE_API_KEY;

class Weather {
  constructor(
    condition,
    currTemp,
    date,
    feelsLike,
    humidity,
    maxTemp,
    minTemp,
    windSpeed,
  ) {
    this.condition = condition;
    this.currTemp = currTemp;
    this.date = date;
    this.feelsLike = feelsLike;
    this.humidity = humidity;
    this.maxTemp = maxTemp;
    this.minTemp = minTemp;
    this.windSpeed = windSpeed;
  }
}

const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/?key=${apiKey}`,
    );
    const data = await response.json();
    console.log(data);
    const setDate = parseISO(data.days[0].datetime);
    const newDate = format(setDate, 'eeee');
    const currentWeatherStats = new Weather(
      data.days[0].conditions,
      data.days[0].temp,
      newDate,
      data.days[0].feelslike,
      data.days[0].humidity,
      data.days[0].tempmax,
      data.days[0].tempmin,
      data.days[0].windspeed,
    );
    displayWeatherInfo(currentWeatherStats);
  } catch (err) {
    console.log(`Could not find location`);
  }
};

export { getWeather };
