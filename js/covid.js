const countries = [
  "Argentina", "Australia", "Brazil", "Canada", "China", "Denmark", "Finland", "France", "Germany",
  "India", "Indonesia", "Italy", "Japan", "Malaysia", "Mexico", "Netherlands", "Norway",
  "Philippines", "Poland", "Russia", "Saudi Arabia", "South Africa", "South Korea",
  "Spain", "Sweden", "Thailand", "Turkey", "Ukraine", "United Kingdom", "United States"
];

const countrySelect = document.getElementById('countrySelect');
const chartCtx = document.getElementById('covidChart').getContext('2d');
let covidChart;

// Masukkan senarai negara ke dalam dropdown
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
          'rgba(255, 99, 99, 0.8)',   // Confirmed - Light red
          'rgba(255, 160, 160, 0.8)', // Recovered - Softer red
          'rgba(180, 0, 0, 0.8)'      // Deaths - Deep red
        ],
        borderColor: [
          'rgba(255, 0, 0, 1)',       // Confirmed border
          'rgba(255, 80, 80, 1)',     // Recovered border
          'rgba(120, 0, 0, 1)'        // Deaths border
        ],
        borderWidth: 2
      }]
    };

    if (covidChart) covidChart.destroy(); // Hapus carta lama
    covidChart = new Chart(chartCtx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#b30000', // Warna label legend merah
              font: {
                weight: 'bold'
              }
            }
          },
          title: {
            display: true,
            text: `COVID-19 Stats for ${data.country}`,
            color: '#b30000',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#b30000'
            },
            grid: {
              color: '#ffcccc'
            }
          },
          x: {
            ticks: {
              color: '#b30000'
            },
            grid: {
              color: '#ffcccc'
            }
          }
        }
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    alert('Failed to load data. Please try again.');
  }
});
