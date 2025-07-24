import { run } from "mitata";

// Import all benchmark files
// The 'group' calls in each file will be collected by mitata
// import "./bench/libsodium.js";
import "./bench/noble.js";
import './bench/rust.js';
import './bench/zig.js';
import "./bench/node-native-crypto.js";
import "./bench/web-crypto.js";

console.log("Running benchmarks...");

// Run all collected benchmarks
await run({
  percentiles: false, // Turn off percentiles for cleaner output
});
