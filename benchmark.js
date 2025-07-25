import { run } from "mitata";
import { writeFileSync } from "fs";
import { execSync } from "child_process";

// Import all benchmark files (these use mitata's bench/group directly)
import "./bench/libsodium.js";
import "./bench/noble.js";
import "./bench/rust.js";
import "./bench/zig.js";
import "./bench/node-native-crypto.js";
import "./bench/web-crypto.js";

console.log("Running benchmarks...");

async function main() {
  const results = [];
  const summary = await run({
    percentiles: false,
    silent: true,
  });

  // Extract group names from layout
  const groupNames = summary.layout.map((g) => g && g.name);

  // For each benchmark, compute avg/min/max from runs
  for (const bench of summary.benchmarks) {
    const groupName = groupNames[bench.group] || "unknown";
    if (!bench.runs || !bench.runs.length || !bench.runs[0].stats) continue;
    const stats = bench.runs[0].stats;
    results.push({
      group: groupName,
      name: bench.alias,
      avg: stats.avg,
      min: stats.min,
      max: stats.max,
    });
  }

  // Get current commit info
  let commitHash = "";
  let commitMessage = "";
  try {
    commitHash = execSync("git rev-parse --short HEAD").toString().trim();
    commitMessage = execSync("git log -1 --pretty=%B").toString().trim();
  } catch (e) {
    commitHash = "unknown";
    commitMessage = "unknown";
  }

  const output = {
    commit: {
      hash: commitHash,
      message: commitMessage,
      date: new Date().toISOString(),
    },
    benchmarks: results,
  };

  writeFileSync("bench-results.json", JSON.stringify(output, null, 2));
  console.log("Benchmark results saved to bench-results.json");
}

main();
