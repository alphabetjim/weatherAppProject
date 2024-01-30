const API_KEY = '73d499e28f7c2384f34a674628d16456';
// const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Bristol,uk&appid=${API_KEY}&units=metric`;
const API_URL_root = `https://api.openweathermap.org/data/2.5/weather?q=`;
const API_URL_keyEtc = `&appid=${API_KEY}&units=metric`;

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

async function checkWeather(city) {
    let API_URL_complete = `${API_URL_root}${city}${API_URL_keyEtc}`;
    const response = await fetch(`${API_URL_complete}`);
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + 'km/h';
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(searchBox.value);
})

checkWeather('Bristol,uk');