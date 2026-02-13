import { getWeather } from './api.js';
import sunImg from '../assets/sun.png';
import rainImg from '../assets/rain.png';
import cloudyImg from '../assets/cloudy.png';
import snowImg from '../assets/snowy.png';
import overcastImg from '../assets/overcast.png';

const app = document.querySelector('#app');
const currTemp = document.createElement('p');
const currCondition = document.createElement('img');

const getCondition = (condition) => {
  let conditionArr = condition.split(',');
  condition = conditionArr[0];
  console.log(conditionArr);

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
  header.textContent = 'Odin Weather';
  header.classList.add('header');
  elem.appendChild(header);
};

const displayWeatherInfo = (obj) => {
  currTemp.classList.add('current-temp');
  currCondition.classList.add('current-condition');
  currTemp.textContent = Math.round(obj.currTemp) + '°F';
  currCondition.src = getCondition(obj.condition);
  app.appendChild(currCondition);
  app.appendChild(currTemp);
  console.log(obj);
};

const renderForm = () => {
  displayHeader(app);
  const form = document.createElement('form');
  const cityInput = document.createElement('input');
  const errSpan = document.createElement('span');
  const formSubmitBtn = document.createElement('button');
  cityInput.type = 'text';
  cityInput.setAttribute('placeholder', 'Enter Country, State, City, or ZIP');
  cityInput.classList.add('city-input');
  formSubmitBtn.textContent = 'Submit';
  errSpan.classList.add('error');
  form.appendChild(cityInput);
  form.appendChild(formSubmitBtn);
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
  });
};

export { renderForm, displayWeatherInfo };
