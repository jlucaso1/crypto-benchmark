function createChart(canvasId, datasets, labels) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: datasets,
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

// Main function to fetch data, set up the DOM, and render all charts
async function initializeCharts() {
  // 1. Fetch benchmark data
  const response = await fetch("benchmark-history.json");
  if (!response.ok) {
    console.error("Failed to fetch benchmark-history.json");
    document.getElementById("chartsContainer").innerText =
      "Error: Could not load benchmark data.";
    return;
  }
  const history = await response.json();
  if (!history || history.length === 0) {
    console.warn("Benchmark history is empty or invalid.");
    document.getElementById("chartsContainer").innerText =
      "No benchmark data available to display.";
    return;
  }

  const labels = history.map((run) => run.commit.date);
  const chartContainer = document.getElementById("chartsContainer");
  chartContainer.innerHTML = ""; // Clear previous content

  // 2. Discover all unique operations and unique libraries (groups)
  const operations = new Set();
  const libraries = new Set();
  history.forEach((run) => {
    run.benchmarks.forEach((bench) => {
      operations.add(bench.name);
      libraries.add(bench.group);
    });
  });

  // 3. For each operation, prepare data and render a chart
  operations.forEach((operation) => {
    const datasets = [];
    // For each library, create a dataset for the current operation
    libraries.forEach((library) => {
      const dataset = {
        label: library,
        data: [],
        fill: false,
        tension: 0.1,
      };

      // Populate the data for this library and this operation across all commits
      history.forEach((run) => {
        const benchmark = run.benchmarks.find(
          (b) => b.group === library && b.name === operation,
        );
        // Convert ns to µs for display, or push null if no data
        dataset.data.push(benchmark ? benchmark.avg / 1000 : null);
      });

      // Only add the dataset if it has at least one data point
      if (dataset.data.some((d) => d !== null)) {
        datasets.push(dataset);
      }
    });

    // 4. If we have data for this operation, create the DOM elements and the chart
    if (datasets.length > 0) {
      const title = operation.charAt(0).toUpperCase() + operation.slice(1);
      const canvasId = `${operation}Chart`;

      const wrapper = document.createElement("div");
      wrapper.className = "chart-wrapper";
      wrapper.innerHTML = `
                <h2>${title}</h2>
                <canvas id="${canvasId}"></canvas>
            `;
      chartContainer.appendChild(wrapper);

      createChart(canvasId, datasets, labels);
    }
  });
}

// Run the initialization
initializeCharts();
