async function renderChart() {
  const response = await fetch("benchmark-history.json");
  const history = await response.json();

  const datasets = {};
  const labels = history.map((run) => run.commit.date);

  // Group data by benchmark name
  history.forEach((run) => {
    run.benchmarks.forEach((bench) => {
      const key = `${bench.group} - ${bench.name}`;
      if (!datasets[key]) {
        datasets[key] = {
          label: key,
          data: [],
          fill: false,
          tension: 0.1,
        };
      }
    });
  });

  // Populate data for each run
  history.forEach((run) => {
    const runBenchmarks = new Map(
      run.benchmarks.map((b) => [`${b.group} - ${b.name}`, b.avg]),
    );
    for (const key in datasets) {
      // Convert ns to µs for display
      datasets[key].data.push(
        runBenchmarks.get(key) ? runBenchmarks.get(key) / 1000 : null,
      );
    }
  });

  const ctx = document.getElementById("benchmarkChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: Object.values(datasets),
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Time (microseconds, µs)",
          },
        },
        x: {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "PPpp",
          },
          title: {
            display: true,
            text: "Commit Date",
          },
        },
      },
      plugins: {
        tooltip: {
          mode: "index",
          intersect: false,
        },
        legend: {
          position: "top",
        },
      },
      responsive: true,
    },
  });
}

renderChart();
