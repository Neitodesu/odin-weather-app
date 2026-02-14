import { getWeather } from './api.js';
import sunImg from '../assets/sun.png';
import rainImg from '../assets/rain.png';
import cloudyImg from '../assets/cloudy.png';
import snowImg from '../assets/snowy.png';
import overcastImg from '../assets/overcast.png';

const app = document.querySelector('#app');
const currTemp = document.createElement('p');
const currCondition = document.createElement('img');
const statsContainer = document.createElement('div');
const topSection = document.createElement('div');
const midSection = document.createElement('div');
const midLeftSection = document.createElement('div');
const midRightSection = document.createElement('div');
const bottomSection = document.createElement('div');
const bottomLeftSection = document.createElement('div');
const bottomMidSection = document.createElement('div');
const bottomRightSection = document.createElement('div');
const currDate = document.createElement('p');
const currFeelsLike = document.createElement('p');
const currFeelsLikeTitle = document.createElement('p');
const currHumidity = document.createElement('p');
const currHumidityTitle = document.createElement('p');
const currWindSpeed = document.createElement('p');
const windSpeedTitle = document.createElement('p');
const currMinTemp = document.createElement('p');
const minTempTitle = document.createElement('p');
const currMaxTemp = document.createElement('p');
const maxTempTitle = document.createElement('p');

const getCondition = (condition) => {
  let conditionArr = condition.split(',');
  condition = conditionArr[0];

  if (condition === 'Clear') {
    return sunImg;
  }
  if (condition === 'Partially cloudy') {
    return cloudyImg;
  }
  if (condition === 'Rain') {
    return rainImg;
  }
  if (condition === 'Snow') {
    return snowImg;
  }
  if (condition === 'Overcast') {
    return overcastImg;
  } else {
    return sunImg;
  }
};

const displayHeader = (elem) => {
  const header = document.createElement('h1');
  header.textContent = `Today's Weather`;
  header.classList.add('header');

  elem.appendChild(header);
};

const displayWeatherInfo = (obj) => {
  topSection.classList.add('top-section');
  midSection.classList.add('mid-section');
  midRightSection.classList.add('mid-right-section');
  midLeftSection.classList.add('mid-left-section');
  bottomSection.classList.add('bottom-section');
  bottomLeftSection.classList.add('bottom-left-section');
  bottomMidSection.classList.add('bottom-mid-section');
  bottomRightSection.classList.add('bottom-right-section');
  currDate.classList.add('current-date');

  currDate.textContent = obj.date;
  currTemp.textContent = Math.round(obj.currTemp) + '°F';
  currCondition.src = getCondition(obj.condition);
  currFeelsLike.textContent = Math.round(obj.feelsLike) + '°F';
  currFeelsLikeTitle.textContent = `Feels Like`;
  currHumidity.textContent = Math.round(obj.humidity) + '%';
  currHumidityTitle.textContent = `Humdity`;
  currWindSpeed.textContent = Math.round(obj.windSpeed);
  windSpeedTitle.textContent = `Wind (MPH)`;
  currMinTemp.textContent = Math.round(obj.minTemp) + '°F';
  minTempTitle.textContent = 'Min Temp';
  currMaxTemp.textContent = Math.round(obj.maxTemp) + '°F';
  maxTempTitle.textContent = 'Max Temp';

  topSection.appendChild(currTemp);
  topSection.appendChild(currCondition);
  midRightSection.appendChild(currHumidityTitle);
  midRightSection.appendChild(currHumidity);
  midLeftSection.appendChild(currFeelsLikeTitle);
  midLeftSection.appendChild(currFeelsLike);
  midSection.appendChild(midLeftSection);
  midSection.appendChild(midRightSection);
  bottomLeftSection.appendChild(windSpeedTitle);
  bottomLeftSection.appendChild(currWindSpeed);
  bottomMidSection.appendChild(minTempTitle);
  bottomMidSection.appendChild(currMinTemp);
  bottomRightSection.appendChild(maxTempTitle);
  bottomRightSection.appendChild(currMaxTemp);
  bottomSection.appendChild(bottomLeftSection);
  bottomSection.appendChild(bottomMidSection);
  bottomSection.appendChild(bottomRightSection);
  statsContainer.appendChild(currDate);
  statsContainer.appendChild(topSection);
  statsContainer.appendChild(midSection);
  statsContainer.appendChild(bottomSection);

  // Animations
  currTemp.classList.add('tempSlideUp');
  currCondition.classList.add('imgSlideLeft');
  midLeftSection.classList.add('popIn1');
  midRightSection.classList.add('popIn2');
  bottomLeftSection.classList.add('popIn3');
  bottomMidSection.classList.add('popIn4');
  bottomRightSection.classList.add('popIn5');
};

const renderForm = () => {
  displayHeader(app);
  const form = document.createElement('form');
  const cityInput = document.createElement('input');
  const formSubmitBtn = document.createElement('button');
  cityInput.type = 'text';
  cityInput.setAttribute('placeholder', 'Enter Country, State, City, or ZIP');
  cityInput.classList.add('city-input');
  formSubmitBtn.textContent = 'See Weather';
  statsContainer.classList.add('stats-container');
  form.appendChild(cityInput);
  form.appendChild(formSubmitBtn);
  app.appendChild(statsContainer);
  app.appendChild(form);

  cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (cityInput.value === '') {
        return;
      }
      getWeather(cityInput.value);
      cityInput.value = '';
      cityInput.blur();
    }
  });
  formSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (cityInput.value === '') {
      return;
    }
    getWeather(cityInput.value);
    cityInput.value = '';
  });
};

export { renderForm, displayWeatherInfo };
