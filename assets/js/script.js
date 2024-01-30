const API_KEY = '73d499e28f7c2384f34a674628d16456';
// const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Bristol,uk&appid=${API_KEY}&units=metric`;
const API_URL_root = `https://api.openweathermap.org/data/2.5/weather?q=`;
const API_URL_keyEtc = `&appid=${API_KEY}&units=metric`;

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.getElementsByClassName('weather-icon');
const weather = document.getElementsByClassName('weather')[0];
const errorMsg = document.getElementsByClassName('error')[0];

async function checkWeather(city) {
    let API_URL_complete = `${API_URL_root}${city}${API_URL_keyEtc}`;
    const response = await fetch(`${API_URL_complete}`);
    var data = await response.json();

    if (response.status == 404) {
        errorMsg.style.display = 'block';
        weather.style.display = 'none';
    } else{
        errorMsg.style.display = 'none';
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
        document.querySelector(".wind").innerHTML = `${Math.round(data.wind.speed)}m/s ${getDirectionName(data.wind.deg)}`;
        document.getElementsByClassName("wind-icon")[0].style.rotate = `${-90 + data.wind.deg}deg`;
        console.log(data.wind.deg);

        if (data.weather[0].main == "Clouds") {
            weatherIcon[0].src = "assets/images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon[0].src = "assets/images/sun.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon[0].src = "assets/images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon[0].src = "assets/images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon[0].src = "assets/images/mist.png";
        }

        weather.style.display = 'block';
    }
}

function getDirectionName(windDeg) {
    if ((windDeg >= 337.5) || (windDeg < 22.5)){
        return 'N';
    } else if ((windDeg >= 22.5) && (windDeg < 67.5)){
        return 'NE';
    } else if ((windDeg >= 67.5) && (windDeg < 112.5)){
        return 'E';
    } else if ((windDeg >= 112.5) && (windDeg < 157.5)){
        return 'SE';
    } else if ((windDeg >= 157.5) && (windDeg < 202.5)){
        return 'S';
    } else if ((windDeg >= 202.5) && (windDeg < 247.5)){
        return 'SW';
    } else if ((windDeg >= 247.5) && (windDeg < 292.5)){
        return 'W';
    } else if ((windDeg >= 292.5) && (windDeg < 337.5)){
        return 'NW';
    }
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(searchBox.value);
})

window.addEventListener('keydown', (e) => {
    if(e.key === "Enter"){
        checkWeather(searchBox.value);
    }
})