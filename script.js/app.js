// API Key: 6YFXtA3AdLMG3intmmzhoZgwPGLO6uc0
const key = 'R2ebsIxzM2aIRuj1PyQ6YDGrUSfRgOsB';

// get city key
const getCityData = async (city) => {
    try {
        const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'
        const query = `?apikey=${key}&q=${city}`

        const response = await fetch(base + query)
        const data = await response.json();
        const cityKey = data[0].Key;
        //console.log(cityKey);
        return cityKey;
    } catch (error) {
        console.error(error)
    }
}
// get weather from city key

const getWeatherData = async (id) => {
    try {
        const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
        const query = `${id}?apikey=${key}`;

        const response = await fetch(base + query);
        const weatherData = await response.json();

        //console.log(weatherData)
        return weatherData;

    } catch (error) {
        console.error(error)
    }
}

// get DOM element

const cityForm = document.querySelector('form');
const cityName = document.querySelector('h5');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')

// get submit information
const getSubmitInfo = () => {

    // listen to submit event
    cityForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const city = cityForm.city.value.trim();
        const cityKey = await getCityData(city);
        const cityWeather = await getWeatherData(cityKey);
        const { cityWeatherText, cityTemp } = await getFinaldata(cityKey);
        updateUI(city, cityWeather, cityWeatherText, cityTemp);
        cityForm.reset()
    })

    const getFinaldata = async (cityKey) => {
        const cityWeather = await getWeatherData(cityKey);
        console.log(cityWeather);
        const cityWeatherText = cityWeather[0].WeatherText
        const cityTemp = cityWeather[0].Temperature.Metric.Value
        console.log(cityWeatherText)
        console.log(cityTemp)
        return { cityWeather, cityWeatherText, cityTemp }
    };

}

// Update UI
const updateUI = (city, cityWeather, cityWeatherText, cityTemp) => {
    details.innerHTML = `
      <h5 class="my-3">City Name:${city}</h5>
      <div class="my-3">Weather Condition: ${cityWeatherText}</div>
      <div class="display-4 my-4">
        <span>temp ${cityTemp}</span>
        <span>&deg;C</span>
      </div>
    `;

    //update night and day & icon images

    let timeSrc = null;
    if (cityWeather[0].IsDayTime) {
        timeSrc = 'img/day.svg'
    } else {
        timeSrc = 'img/night.svg'
    }

    time.setAttribute('src', timeSrc);

    if (time) {
        time.setAttribute('src', timeSrc);
    }

    const iconSrc = `img/icons/${cityWeather[0].WeatherIcon}.svg`;
    if (icon) {
        icon.setAttribute('src', iconSrc);
    }


    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }


};

getSubmitInfo();
