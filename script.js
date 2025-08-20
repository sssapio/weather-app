const address = document.getElementById("address");
const locationInput = document.getElementById("location");
const searchBtn = document.getElementById("searchBtn");
const condition = document.getElementById("condition")
const humidity = document.getElementById("humidity")
const currentTemp = document.getElementById("currentTemp")
const wind = document.getElementById("wind");
const loading = document.getElementById("loading")


async function getWeather() {
  if (!locationInput.value) {
    alert("Please enter a city name");
    return;
  }
  loading.style.display = "block";
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput.value}?key=YCA4RCF29M4W5CZWGAYAHZYN4`,
      { mode: "cors" }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const weatherData = await response.json();
    const addressData = weatherData.address.toUpperCase();
    const currentTempData = `Temperature: ${weatherData.currentConditions.temp}°C`;
    const conditionData = `Condition: ${weatherData.currentConditions.conditions}`;
    const humidityData = `Humidity: ${weatherData.currentConditions.humidity}%`;
    const windData = `WindSpeed: ${weatherData.currentConditions.windspeed} km/h`;

    address.textContent = addressData;
    currentTemp.textContent = currentTempData
    condition.textContent = conditionData
    humidity.textContent = humidityData
    wind.textContent = windData

    console.log(weatherData.address);
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    address.textContent = "Could not fetch weather data.";
  } finally {
    loading.style.display = "none"
  }
}
searchBtn.addEventListener("click", getWeather);

locationInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    getWeather();
  }
});
