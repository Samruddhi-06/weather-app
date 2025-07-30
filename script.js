const apiKey = "57394a97829aa65f20be89e526b8a615";

function getWeather(){
    const city = document.getElementById("cityInput").value.trim();
    const weatherInfo = document.getElementById("weatherInfo");
    const errorMsg = document.getElementById("errorMsg");

    if(!city){
        errorMsg.textContent = "Please enter a city name.";
        weatherInfo.innerHTML = "";
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
    .then(response => {
        if(!response.ok){
            throw new Error("City not found");
        }
        return response.json();
    })
    .then(data => {
        const { name, main, weather } = data;
        const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

      weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <img src="${iconUrl}" alt="${weather[0].description}"/>
    <p><strong>Temperature:</strong> ${main.temp}℃</p>
    <p><strong>Condition:</strong> ${weather[0].description}</p>
    <p><strong>Humidity:</strong> ${main.humidity}%</p>
    <p><strong>Pressure:</strong> ${main.pressure} hPa</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    <p><strong>Sunrise:</strong> ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
    <p><strong>Sunset:</strong> ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
`;
        errorMsg.textContent = "";

        const body = document.getElementById("body");
let bg = "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)";

    const mainWeather = weather[0].main.toLowerCase();
    if(mainWeather.includes("cloud")){
        bg = "linear-gradient(120deg, #d7d2cc 0%, #304352 100%)";
    }else if (mainWeather.includes("rain")){
            bg = "linear-gradient(120deg, #4e54c8 0%, #8f94fb 100%)";
    }else if (mainWeather.includes("clear")){
            bg = "linear-gradient(120deg, #fceabb 0%, #f8b500 100%)";
    }else if (mainWeather.includes("snow")){
            bg = "linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)";
    }else if (mainWeather.includes("thunder")){
            bg = "linear-gradient(120deg, #373b44 0%, #4286f4 100%)";
    }else if (mainWeather.includes("mist")){
            bg = "linear-gradient(120deg, #cfd9df 0%, #e2ebf0 100%)";
    }

    body.style.background = bg;
    


    })
    .catch(error => {
        weatherInfo.innerHTML = "";
        errorMsg.textContent = "City not found. Try again."
    });

}

    function updateDateTime(){
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        document.getElementById('dateTime').textContent = now.toLocaleDateString(undefined,options)+" "+now.toLocaleTimeString();

    }
    setInterval(updateDateTime, 1000);
    updateDateTime();

    function toggleClearBtn() {
    const cityInput = document.getElementById("cityInput");
    cityInput.addEventListener("keypress", function(e){
    if(e.key === "Enter") getWeather();
});

    const clearBtn = document.getElementById("clearBtn");

    clearBtn.style.display = cityInput.value.trim() ? "block" : "none";
}
   
function clearInput() {
    const cityInput = document.getElementById("cityInput");
    const clearBtn = document.getElementById("clearBtn");
    const weatherInfo = document.getElementById("weatherInfo");
    const errorMsg = document.getElementById("errorMsg");

    cityInput.value = "";
    cityInput.focus();
    clearBtn.style.display = "none";
    weatherInfo.innerHTML = "";
    errorMsg.textContent = "";
}
cityInput.focus();

