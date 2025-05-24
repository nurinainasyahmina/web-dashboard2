const countries = [
  "Argentina", "Australia", "Brazil", "Canada", "China", "Denmark", "Finland", "France", "Germany",
  "India", "Indonesia", "Italy", "Japan", "Malaysia", "Mexico", "Netherlands", "Norway",
  "Philippines", "Poland", "Russia", "Saudi Arabia", "South Africa", "South Korea",
  "Spain", "Sweden", "Thailand", "Turkey", "Ukraine", "United Kingdom", "United States"
];

const countrySelect = document.getElementById('countrySelect');
const chartCtx = document.getElementById('covidChart').getContext('2d');
let covidChart;

// Populate dropdown
countries.forEach(country => {
  const option = document.createElement('option');
  option.value = country;
  option.textContent = country;
  countrySelect.appendChild(option);
});

countrySelect.addEventListener('change', async () => {
  const selected = countrySelect.value;
  const apiURL = `https://disease.sh/v3/covid-19/countries/${selected}?strict=true`;

  try {
    const res = await fetch(apiURL);
    const data = await res.json();

    const chartData = {
      labels: ["Confirmed", "Recovered", "Deaths"],
      datasets: [{
        label: `${data.country} COVID-19 Stats`,
        data: [data.cases, data.recovered, data.deaths],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 99, 132, 0.7)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    };

    if (covidChart) covidChart.destroy(); // Replace chart
    covidChart = new Chart(chartCtx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    alert('Failed to load data. Please try again.');
  }
});
