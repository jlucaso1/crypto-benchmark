const fs = require("fs");
const path = require("path");

const resultsPath = "bench-results.json";
const readmePath = "README.md";

function formatTime(ns) {
  if (ns < 1000) return `${ns.toFixed(2)} ns`;
  if (ns < 1000 * 1000) return `${(ns / 1000).toFixed(2)} µs`;
  return `${(ns / (1000 * 1000)).toFixed(2)} ms`;
}

function generateMarkdownTable(latestRun) {
  let table = `| Benchmark | Avg. Time per Iteration |\n`;
  table += `|-----------|-------------------------|\n`;
  latestRun.benchmarks.forEach((b) => {
    table += `| \`${b.group} - ${b.name}\` | \`${formatTime(b.avg)}\` |\n`;
  });
  return table;
}

try {
  const readmeContent = fs.readFileSync(readmePath, "utf8");
  const latestRun = JSON.parse(fs.readFileSync(resultsPath, "utf8"));

  // Compose commit info and table
  const commitInfo = `*Last updated: ${new Date().toUTCString()} for commit [\`${latestRun.commit.hash}\`](https://github.com/jlucaso1/crypto-benchmark/commit/${latestRun.commit.hash})*`;
  const table = generateMarkdownTable(latestRun);

  // Replace the benchmark section
  const newContent = readmeContent.replace(
    /<!-- BENCHMARK_START -->[\s\S]*<!-- BENCHMARK_END -->/,
    `<!-- BENCHMARK_START -->\n\n${commitInfo}\n\n${table}\n\n[**➡️ View Full Benchmark History Chart**](https://jlucaso1.github.io/crypto-benchmark/)\n\n<!-- BENCHMARK_END -->`,
  );

  fs.writeFileSync(readmePath, newContent);
  console.log("README.md updated successfully.");
} catch (error) {
  console.error("Failed to update README:", error);
  process.exit(1);
}
