const cities = [
  { name: "Kuala Lumpur", state: "Wilayah Persekutuan", lat: 3.139, lon: 101.6869 },
  { name: "George Town", state: "Pulau Pinang", lat: 5.4141, lon: 100.3288 },
  { name: "Johor Bahru", state: "Johor", lat: 1.4927, lon: 103.7414 },
  { name: "Kota Kinabalu", state: "Sabah", lat: 5.9804, lon: 116.0735 },
  { name: "Kuching", state: "Sarawak", lat: 1.5533, lon: 110.3592 },
  { name: "Ipoh", state: "Perak", lat: 4.5975, lon: 101.0901 },
  { name: "Shah Alam", state: "Selangor", lat: 3.0738, lon: 101.5183 },
  { name: "Melaka", state: "Melaka", lat: 2.1896, lon: 102.2501 },
  { name: "Seremban", state: "Negeri Sembilan", lat: 2.7297, lon: 101.9381 },
  { name: "Alor Setar", state: "Kedah", lat: 6.121, lon: 100.3678 }
];

const select = document.getElementById("citySelect");
const ctx = document.getElementById("weatherChart").getContext("2d");
let chart;

// Isi dropdown
cities.forEach(city => {
  const option = document.createElement("option");
  option.value = `${city.lat},${city.lon}`;
  option.textContent = `${city.name}, ${city.state}`;
  select.appendChild(option);
});

select.addEventListener("change", async () => {
  const [lat, lon] = select.value.split(",");
  const apiKey = "7b6ac545cb6419467c2b9309c38e4af2"; // Gantikan dengan API key anda
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const selectedCity = cities.find(c => c.lat == lat && c.lon == lon);

  try {
    const res = await fetch(url);
    const data = await res.json();

    const chartData = {
      labels: ["Temperature (°C)", "Feels Like (°C)", "Humidity (%)"],
      datasets: [{
        label: `Weather in ${data.name}, ${selectedCity.state}`,
        data: [data.main.temp, data.main.feels_like, data.main.humidity],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)"
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)"
        ],
        borderWidth: 1
      }]
    };

    if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              font: { weight: "bold" }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Measurement Value",
              font: { weight: "bold" }
            }
          }
        }
      }
    });

  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Something went wrong. Please check your internet connection or API key.");
  }
});
