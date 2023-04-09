'use strict';
const url = `http://api.weatherstack.com/current`;
const accessKey = localStorage.getItem('accessKey')

const cities = ["Kiev", "Kharkiv", "Lviv", "Dnipro", "Odessa"];

const citySelect = document.querySelector('dropdown ul');
const weatherDiv = document.getElementById("weather")

for (let city of cities) {
    const li = document.createElement("li");
    li.classList.add('animate')
    li.textContent = city;
    citySelect.appendChild(li);
}

window.addEventListener('load',() => {
    const firstLi = document.querySelector('dropdown ul li:first-of-type');
    firstLi.classList.add('selected')
    getWeather(firstLi.textContent)
})

citySelect.addEventListener("click", (event) => {
    const allLi = document.querySelectorAll('dropdown ul li')
    const selectedCity = event.target.closest('li');
    const city = selectedCity.textContent
    if (selectedCity.tagName==='LI'){
        for (let item of allLi) {
            item.classList.remove('selected')
        }
        selectedCity.classList.add('selected')
    }
    getWeather(city);
});

function getWeather(city) {
    weatherDiv.innerHTML = `
    <div class="weather__loading">
        <img src="./img/loading.gif" alt="Loading..."/>
    </div>
    `;
    fetch(`${url}?access_key=${accessKey}&query=${city}`)
        .then((response) => response.json())
        .then((response) => {
            weatherDiv.innerHTML = `
        <div class="weather__header">
          <div class="weather__main">
            <div class="weather__city">${city}</div>
            <div class="weather__status">${response.current.weather_descriptions[0]}</div>
          </div>
          <div class="weather__icon">
            <img
                src="${response.current.weather_icons[0]}"
                alt="image"
            />
          </div>
        </div> 
        <div class="weather__temp">${response.current.temperature}</div>
        <div class="weather__feels-like">Feels like: ${response.current.feelslike}</div>  
      `;
        })
        .catch((error) => {
            console.error(error);
            weatherDiv.textContent = 'Error'
        });
}
