const weatherBox = document.querySelector('.weatherBox');
const changeLocationBox = document.querySelector('.changeLocation');
const insideBox = document.querySelector('.inside-box');
const termInput = document.getElementById('termInput');
const btns = document.querySelectorAll('.btn');

fetchApi();
function fetchApi(term = 'bucharest') {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${term}&mode=json&units=metric&appid=bd15987f32b3d8bc21b83633bbb05fdc`).then(resp => {
        if (resp.ok) {
            return resp.json();
        } else {
            throw new Error('No city with this name!');
        }
    }).then(respData => {
        weatherBox.innerHTML = '';
        createWeather(respData);
    }).catch(error => alert(error));
}

function createWeather(data) {
    let weatherStr = document.createElement('div');
    weatherStr.classList.add('weatherStr');
    let weathersStr = ` <h2>What's the weather like today in ${data.name}?</h2>
    <div class="weathers">
        <div class="weather">${data.weather[0].description}</div>
        <div class="weather">${data.main.temp}°C</div>
        <div class="weather">Feels like: ${data.main.feels_like}°C</div>
        <div class="weather">Pressure: ${data.main.pressure}hPa</div>
        <div class="weather">Humidity: ${data.main.humidity}%</div>
        <div class="weather">Wind: ${data.wind.speed}km/h</div>
    </div>`;
    weatherStr.innerHTML = weathersStr;
    weatherBox.appendChild(weatherStr);
}

change_location();
function change_location() {
    btns.forEach(btn => {
        btn.addEventListener('click', _ => {
            if (btn.classList.contains('changeLocationBtn')) {
                showLocationBox();
            } else if (btn.classList.contains('closeChangeLocationBtn') || 
            btn.classList.contains('close-btn')) {
                closeLocationBox();
            } else if (btn.classList.contains('change-btn')) {
                if (termInput.value !== '') {
                    fetchApi(termInput.value);
                    closeLocationBox();
                } else {
                    alert('Please enter city name!');
                }
            }
        });
    });
}

function closeLocationBox() {
    changeLocationBox.classList.remove('show');
    insideBox.classList.remove('style');
    termInput.value = '';
}

function showLocationBox() {
    changeLocationBox.classList.add('show');
    insideBox.classList.add('style');
}