fetch('https://disease.sh/v3/covid-19/all')
  .then(res => res.json())
  .then(data => {
    const ctx = document.getElementById('covidChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Cases', 'Recovered', 'Deaths'],
        datasets: [{
          label: 'Global Data',
          data: [data.cases, data.recovered, data.deaths],
          backgroundColor: ['#3B82F6', '#10B981', '#EF4444']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  })
  .catch(error => console.error('Error:', error));
