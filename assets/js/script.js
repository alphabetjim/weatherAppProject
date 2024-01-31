const API_KEY = '73d499e28f7c2384f34a674628d16456';
// const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Bristol,uk&appid=${API_KEY}&units=metric`;
const API_URL_root = `https://api.openweathermap.org/data/2.5/forecast?q=`;
const API_URL_keyEtc = `&appid=${API_KEY}&units=metric`;

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.getElementsByClassName('weather-icon-now');
const weather = document.getElementsByClassName('weather-now')[0];
const errorMsg = document.getElementsByClassName('error')[0];

async function checkWeather(city) {
    let API_URL_complete = `${API_URL_root}${city}${API_URL_keyEtc}`;
    console.log(API_URL_complete);
    const response = await fetch(`${API_URL_complete}`);
    console.log(response);
    var data = await response.json();
    console.log(data);
    if (response.status == 404) {
        errorMsg.style.display = 'block';
        weather.style.display = 'none';
    } else{
        errorMsg.style.display = 'none';
        
        // Update weather now
        document.querySelector(".city").innerHTML = data.city.name;
        document.querySelector(".temp-now").innerHTML = Math.round(data.list[0].main.temp) + '°C';
        document.querySelector(".humidity-now").innerHTML = data.list[0].main.humidity + '%';
        document.querySelector(".wind-now").innerHTML = `${Math.round(data.list[0].wind.speed)}m/s ${getDirectionName(data.list[0].wind.deg)}`;
        document.getElementsByClassName("wind-icon-now")[0].style.rotate = `${-90 + data.list[0].wind.deg+180}deg`;
        console.log(data.list[0].wind.deg);

        if (data.list[0].weather[0].main == "Clouds") {
            weatherIcon[0].src = "assets/images/clouds.png";
        } else if (data.list[0].weather[0].main == "Clear") {
            weatherIcon[0].src = "assets/images/sun.png";
        } else if (data.list[0].weather[0].main == "Rain") {
            weatherIcon[0].src = "assets/images/rain.png";
        } else if (data.list[0].weather[0].main == "Drizzle") {
            weatherIcon[0].src = "assets/images/drizzle.png";
        } else if (data.list[0].weather[0].main == "Mist") {
            weatherIcon[0].src = "assets/images/mist.png";
        }

        console.log(weather);
        weather.style.display = 'block';

        // Update forecast weather
        for (let i=1; i<5; i++){
            updateForecast(data, i, 8*i);
        }
    }
}

// update forecast at given time stamp index
function updateForecast(data, forecastID, timestampID) {
    // console.log(data.list[0].dt);
    let thisDate = new Date(data.list[timestampID].dt*1000);
    console.log(thisDate);
    console.log(typeof thisDate);
    let dateTimeEntry = `${thisDate.getDate()}/${thisDate.getMonth()+1} ${thisDate.getHours()}:00`;
    document.getElementsByClassName(`time-forecast${forecastID}`)[0].innerHTML = dateTimeEntry;
    // document.querySelector(".city").innerHTML = data.city.name;
    document.querySelector(`.temp-forecast${forecastID}`).innerHTML = Math.round(data.list[timestampID].main.temp) + '°C';
    document.querySelector(`.humidity-forecast${forecastID}`).innerHTML = data.list[timestampID].main.humidity + '%';
    document.querySelector(`.wind-forecast${forecastID}`).innerHTML = `${Math.round(data.list[timestampID].wind.speed)}m/s ${getDirectionName(data.list[timestampID].wind.deg)}`;
    document.getElementsByClassName(`wind-icon-forecast${forecastID}`)[0].style.rotate = `${-90 + data.list[timestampID].wind.deg+180}deg`;
    console.log(data.list[timestampID].wind.deg);
    
    if (data.list[timestampID].weather[0].main == "Clouds") {
        document.getElementsByClassName(`weather-icon-forecast${forecastID}`)[0].src = "assets/images/clouds.png";
    } else if (data.list[timestampID].weather[0].main == "Clear") {
        document.getElementsByClassName(`weather-icon-forecast${forecastID}`)[0].src = "assets/images/sun.png";
    } else if (data.list[timestampID].weather[0].main == "Rain") {
        document.getElementsByClassName(`weather-icon-forecast${forecastID}`)[0].src = "assets/images/rain.png";
    } else if (data.list[timestampID].weather[0].main == "Drizzle") {
        document.getElementsByClassName(`weather-icon-forecast${forecastID}`)[0].src = "assets/images/drizzle.png";
    } else if (data.list[timestampID].weather[0].main == "Mist") {
        document.getElementsByClassName(`weather-icon-forecast${forecastID}`)[0].src = "assets/images/mist.png";
    }
    let thisWeather = document.getElementsByClassName(`wf${forecastID}`)[0];
    console.log(thisWeather);
    thisWeather.style.display = 'block';
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

document.addEventListener('load', checkWeather("Bristol, UK"));