const apiKey = 'YOUR_API_KEY'; // Replace this with your actual API key

function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        document.getElementById('weatherResult').innerHTML = `<p class="text-red-600">City not found.</p>`;
        return;
      }

      const weatherHTML = `
        <div class="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
          <h2 class="text-2xl font-bold text-blue-800 mb-2">${data.name}</h2>
          <p>🌡️ Temp: ${data.main.temp}°C</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>🌥️ Condition: ${data.weather[0].main}</p>
        </div>
      `;
      document.getElementById('weatherResult').innerHTML = weatherHTML;
    })
    .catch(error => {
      console.error(error);
      document.getElementById('weatherResult').innerHTML = `<p class="text-red-600">Error retrieving data.</p>`;
    });
}
