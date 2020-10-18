const COORDS = 'coords';
const API_KEY = "e76c9376dde0b938a69669347758427f";
const weather = document.querySelector(".js-weather");

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} C @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    //getWeather(latitude, longitude);
}


function handleGeoError(){
    console.log("Can't read geo location")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(){
    const loadedCodrds = localStorage.getItem(COORDS);
    if (loadedCodrds === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCodrds);
        console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();

//> 사용법에 appid = 나의apiKey를 추가하여 호출합니다.
/*
( ex> http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=e76c9376dde0b938a69669347758427f
     )
*/