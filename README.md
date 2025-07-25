# Crypto Benchmark

A comprehensive benchmark suite for comparing cryptographic operations across multiple libraries and languages (Node.js, Rust, Zig, WebCrypto, etc).

## 📊 Performance Benchmarks

<!-- BENCHMARK_START -->

*Last updated: Fri, 25 Jul 2025 02:34:48 GMT for commit [`e04026d`](https://github.com/jlucaso1/crypto-benchmark/commit/e04026d)*

| Benchmark | Avg. Time per Iteration |
|-----------|-------------------------|
| `noble - createKeypair` | `232.11 µs` |
| `noble - sign` | `427.30 µs` |
| `noble - edwardsToMontgomery` | `155.01 µs` |
| `Rust (WASM with XEd25519 - Optimized) - createKeypair` | `55.61 µs` |
| `Rust (WASM with XEd25519 - Optimized) - sign` | `166.28 µs` |
| `Rust (WASM with XEd25519 - Optimized) - verify` | `166.53 µs` |
| `Node.js native crypto - createKeypair` | `48.13 µs` |
| `Node.js native crypto - sign` | `40.28 µs` |
| `Web Crypto API - createKeypair` | `102.04 µs` |
| `Web Crypto API - sign` | `83.29 µs` |
| `Zig (WASM with XEd25519 - Optimized) - createKeypair` | `451.85 µs` |
| `Zig (WASM with XEd25519 - Optimized) - sign` | `1.08 ms` |
| `Zig (WASM with XEd25519 - Optimized) - verify` | `709.98 µs` |
| `libsodium-js - createKeypair` | `142.12 µs` |
| `libsodium-js - sign` | `52.62 µs` |


[**➡️ View Full Benchmark History Chart**](https://jlucaso1.github.io/crypto-benchmark/)

<!-- BENCHMARK_END -->

## Overview

This project runs a set of cryptographic benchmarks using various libraries and implementations. The results are tracked over time and visualized automatically using GitHub Actions and GitHub Pages.

- **Automated Benchmarks:** Benchmarks are run on every push to the main branch.
- **Historical Tracking:** Results are appended to a history file and visualized as a chart.
- **README Summary:** The latest results are summarized in this README.
- **Interactive Chart:** Full history is available as an interactive chart on GitHub Pages.

## Usage

### Running Benchmarks Locally

```sh
npm install
npm run build
npm run bench
```

### Viewing Results

- The latest summary is always available above in this README.
- Full interactive history: [GitHub Pages Chart](https://jlucaso1.github.io/crypto-benchmark/)

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements or new benchmarks.

## License

MIT
